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

  // Components
  sprite: Phaser.GameObjects.Sprite;
  pBody: Phaser.Physics.Arcade.Body;
  trailParticles: Phaser.GameObjects.Particles.ParticleEmitter[];

  preUpdate() {
    let diffX = this.targetEnemyEntity.x - this.x;
    let diffY = this.targetEnemyEntity.y - this.y;

    let angle = Math.atan2(diffY, diffX);
    this.setRotation(angle);

    let vec2 = new Phaser.Math.Vector2(diffX, diffY).normalize().scale(1000);

    this.pBody.setVelocity(vec2.x, vec2.y);
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
    for (let trailParticle of this.trailParticles) {
      trailParticle.destroy();
    }
    super.destroy();
  }
}
