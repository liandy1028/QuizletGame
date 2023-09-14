import { Scene } from 'phaser';
import { EnemyConfig, GameStudiableItem } from '../types';
import PlayerEntity from './PlayerEntity';
import {
  Assets,
  GameEvents,
  PhysicsConstants,
  SortingLayers,
} from '../constants';
import EnemyEntity from './EnemyEntity';
import { AnimConfigs } from '../configs';

export default class HealthBar extends Phaser.GameObjects.Container {
  constructor(scene: Scene, enemy: EnemyEntity) {
    super(scene);

    let spacing = 50;
    let health = enemy.enemyConfig.maxHealth;
    let offset = ((health - 1) / 2) * spacing;
    for (let i = 0; i < health; i++) {
      let healthIcon = scene.add
        .sprite(0, 0, '')
        .setName('sprite')
        .setScale(Assets.SPRITE_SCALE)
        .setX(i * spacing - offset);
      healthIcon.setVisible(false);
      this.add(healthIcon);
    }

    enemy.addListener(GameEvents.ENEMY_TOOK_DAMAGE, this.updateHealthbar, this);

    this.y += 125;
    this.scene.add.existing(this);
  }

  initialized = false;

  update(deltaTime: number) {}

  private updateHealthbar(prevHealth: number, newHealth: number) {
    let damage = prevHealth - newHealth;
    let children = this.getAll();

    // Only show once damaged, start idle anim on all hearts
    if (!this.initialized) {
      this.initialized = true;
      for (let i = children.length - 1; i >= 0; i--) {
        let sprite = children[i] as Phaser.GameObjects.Sprite;
        sprite.setVisible(true);
        sprite.play(AnimConfigs.HEALTH_BAR_IDLE_ANIM.idleAnim);
      }
    }

    // play remove anim on newly removed hearts
    for (let i = children.length - 1; i >= 0; i--) {
      let sprite = children[i] as Phaser.GameObjects.Sprite;
      if (i >= newHealth && i < prevHealth) {
        sprite.play(AnimConfigs.HEALTH_BAR_IDLE_ANIM.removeAnim);
      }
    }
  }
}
