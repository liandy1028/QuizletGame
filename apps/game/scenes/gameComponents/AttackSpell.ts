import { Scene } from 'phaser';
import { Assets, GameEvents } from '../constants';
import { GameStudiableItem } from '../types';

// Attacks have the definition, player matches the term to negate it
export default class ChargingAttack {
  constructor(item: GameStudiableItem, chargeupDuration: number, scene: Scene) {
    const x = Phaser.Math.Between(0, 800);
    const y = Phaser.Math.Between(0, 600);

    this.attackBackground = scene.add
      .sprite(0, 0, Assets.Images.CARD)
      .setName('background');

    this.attackText = scene.add
      .text(0, 0, item.definition.text, {
        color: '#FFFFFF',
      })
      .setName('text');

    this.attackContainer = scene.add
      .container(0, 0, [this.attackText, this.attackBackground])
      .setName('container')
      .setX(x)
      .setY(y)
      .setSize(50, 50);

    // this.chargeTimer = Phaser.Time.Clock

    return this;
  }

  chargeTimer: number;

  update() {}

  destroy() {
    this.attackContainer.destroy();
  }

  studiableItem: GameStudiableItem;
  attackBackground: Phaser.GameObjects.Sprite;
  attackText: Phaser.GameObjects.Text;
  attackContainer: Phaser.GameObjects.Container;

  onLaunchAttackEvent = new Phaser.Events.EventEmitter();
}
