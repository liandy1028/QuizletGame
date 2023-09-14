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

export default class HealthBar extends Phaser.GameObjects.Container {
  constructor(scene: Scene, enemy: EnemyEntity) {
    super(scene);

    let spacing = 50;
    let health = enemy.enemyConfig.maxHealth;
    let offset = ((health - 1) / 2) * spacing;
    for (let i = 0; i < health; i++) {
      let healthIcon = scene.add
        .sprite(0, 0, Assets.Images.HEALTH_ICON)
        .setName('sprite')
        .setScale(Assets.SPRITE_SCALE)
        .setX(i * spacing - offset);

      this.add(healthIcon);
    }

    enemy.addListener(
      GameEvents.ENEMY_TOOK_DAMAGE,
      this.handleDamageTaken,
      this
    );

    this.y += 125;
    this.scene.add.existing(this);
  }

  update(deltaTime: number) {}

  private handleDamageTaken(prevHealth: number, newHealth: number) {
    console.log('Healthbar update');
    let damage = prevHealth - newHealth;
    let children = this.getAll();

    for (let i = children.length - 1; i >= 0; i--) {
      if (i > newHealth) {
        children[i].setActive(false);
        (children[i] as Phaser.GameObjects.Sprite).setVisible(false);
      } else {
        children[i].setActive(true);
        (children[i] as Phaser.GameObjects.Sprite).setVisible(true);
      }
    }
  }
}
