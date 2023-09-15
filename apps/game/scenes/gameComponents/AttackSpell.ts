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

    this.sprite = scene.add
      .sprite(0, 0, '')
      .setScale(Assets.SPRITE_SCALE)
      .play(spellConfig.spellAnimation.key);

    this.trailParticles = [];

    /* for (let trailParticles of spellConfig.trailParticles) {
      let newTrailParticle = scene.add.
    } */

    this.add([this.sprite]);
    this.setSize(50, 50);
    this.setPosition(x, y);
    this.setDepth(SortingLayers.SPELL);

    // Add projectile as dynamic physics body
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
    let impactParticles = this.scene.add.particles(
      this.x,
      this.y,
      Assets.Images.BASIC_PARTICLE,
      {
        color: [0xfacc22, 0xf89800, 0xf83600, 0x9f0404],
        colorEase: 'quad.out',
        lifespan: 500,
        scale: { start: 0.7, end: 0, ease: 'sine.out' },
        speed: 200,
        advance: 500,
        frequency: 50,
        blendMode: 'ADD',
        duration: 100,
        angle: {
          min: -45,
          max: 45,
        },
      }
    );
    impactParticles.setAngle(this.angle);
    impactParticles.setDepth(SortingLayers.SPELL);
    // When particles are complete, destroy them
    impactParticles.once('complete', () => {
      impactParticles.destroy();
    });

    this.destroy();
  }

  destroy() {
    super.destroy();
  }
}
