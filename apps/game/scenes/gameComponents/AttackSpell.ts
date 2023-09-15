import { Scene } from 'phaser';
import { Assets, GameEvents, SortingLayers } from '../constants';
import { GameStudiableItem, SpellConfig } from '../types';
import EnemyEntity from './EnemyEntity';

export default class AttackSpell extends Phaser.GameObjects.Container {
  constructor(
    x: number,
    y: number,
    targetEnemyEntity: EnemyEntity,
    spellConfig: SpellConfig,
    damage: number,
    scene: Scene
  ) {
    super(scene);
    this.targetEnemyEntity = targetEnemyEntity;
    this.damage = damage;
    this.spellConfig = spellConfig;

    // Setup sprite
    this.sprite = scene.add
      .sprite(0, 0, '')
      .setScale(Assets.SPRITE_SCALE)
      .play(spellConfig.spellAnimation.key);

    // Setup trail particles
    this.trailParticles = [];
    for (let trailParticleConfig of spellConfig.trailParticles) {
      // Make a shallow copy since we're setting the follow to the projectile
      let emitConfig = { ...trailParticleConfig.emitterConfig };
      emitConfig.follow = this;
      let trailParticles = scene.add.particles(
        0,
        0,
        trailParticleConfig.textureKey,
        emitConfig
      );
      trailParticles.setDepth(SortingLayers.SPELL);
      this.trailParticles.push(trailParticles);
    }

    // Setup cast particles
    for (let castParticleConfig of spellConfig.castParticles) {
      let castParticles = this.scene.add.particles(
        this.x,
        this.y,
        castParticleConfig.textureKey,
        castParticleConfig.emitterConfig
      );
      castParticles.setDepth(SortingLayers.SPELL);
      // When particles are complete, destroy them
      castParticles.once('complete', () => {
        castParticles.destroy();
      });
    }

    // Cast screen shake
    if (spellConfig.castScreenShake) {
      this.scene.cameras.main.shake(
        spellConfig.castScreenShake.duration,
        spellConfig.castScreenShake.intensity
      );
    }

    this.add([this.sprite]);
    this.setSize(spellConfig.hitboxSize.width, spellConfig.hitboxSize.height);
    this.setPosition(x, y);
    this.setDepth(SortingLayers.SPELL);

    // Setup physics
    scene.physics.add.existing(this, false);

    this.pBody = this.body as Phaser.Physics.Arcade.Body;
    this.pBody.setEnable(true);

    // initial spread and velocity
    let launchSpread = spellConfig.launchAngleSpread;
    let angle =
      ((Phaser.Math.Between(0, 1) * 2 - 1) *
        (Phaser.Math.FloatBetween(launchSpread.min, launchSpread.max) *
          Math.PI)) /
      180;

    let initialXVel = Math.cos(angle) * spellConfig.initialSpeed;
    let initialYVel = Math.sin(angle) * spellConfig.initialSpeed;
    this.pBody.setVelocity(initialXVel, initialYVel);

    this.initialAngle = angle;
    this.homingTimer = 0;

    scene.physics.add.overlap(
      this,
      targetEnemyEntity,
      this.onHitEnemy,
      null,
      this
    );

    scene.add.existing(this);
  }

  targetEnemyEntity: EnemyEntity;

  // Config
  damage: number;
  spellConfig: SpellConfig;

  // state
  initialAngle: number;
  homingTimer: number;

  // Components
  sprite: Phaser.GameObjects.Sprite;
  pBody: Phaser.Physics.Arcade.Body;
  trailParticles: Phaser.GameObjects.Particles.ParticleEmitter[];

  preUpdate(time: number, deltaTime: number) {
    let diffX = this.targetEnemyEntity.x - this.x;
    let diffY = this.targetEnemyEntity.y - this.y;

    let targetAngle = Math.atan2(diffY, diffX);
    let prevVel = this.pBody.velocity;
    let prevSpeed = prevVel.length();

    // Calculate angle steering from angularVelocity
    this.homingTimer += deltaTime;
    let newAngle = Phaser.Math.Linear(
      this.initialAngle,
      targetAngle,
      this.homingTimer / this.spellConfig.homingDuration
    );

    let newSpeed =
      prevSpeed + (deltaTime / 1000) * this.spellConfig.acceleration;

    let newVelX = Math.cos(newAngle) * newSpeed;
    let newVelY = Math.sin(newAngle) * newSpeed;

    this.pBody.setVelocity(newVelX, newVelY);
    console.log(newVelX, newVelY);
    this.setRotation(newAngle);

    // Rotate trail particles as well
    for (let trailParticles of this.trailParticles) {
      trailParticles.particleRotate = (newAngle * 180) / Math.PI;
    }
  }

  private onHitEnemy(self, targetEnemy) {
    let enemy: EnemyEntity = targetEnemy as EnemyEntity;
    enemy.takeDamage(this.damage);
    // Particles
    // Create particles for flame
    for (let impactParticleConfig of this.spellConfig.impactParticles) {
      let impactParticles = this.scene.add.particles(
        this.x,
        this.y,
        impactParticleConfig.textureKey,
        impactParticleConfig.emitterConfig
      );
      impactParticles.setAngle(this.angle);
      impactParticles.setDepth(SortingLayers.SPELL);
      // When particles are complete, destroy them
      impactParticles.once('complete', () => {
        impactParticles.destroy();
      });
    }

    // Impact screen shake
    if (this.spellConfig.impactScreenShake) {
      this.scene.cameras.main.shake(
        this.spellConfig.impactScreenShake.duration,
        this.spellConfig.impactScreenShake.intensity
      );
    }

    this.destroy();
  }

  destroy() {
    // Handle trail particles so that existing ones finish simulating before destroying
    for (let trailParticles of this.trailParticles) {
      trailParticles.emitting = false;
      trailParticles.start();
      trailParticles.duration = 1;
      trailParticles.once('complete', () => {
        trailParticles.destroy();
      });
    }
    this.trailParticles = [];
    super.destroy();
  }
}
