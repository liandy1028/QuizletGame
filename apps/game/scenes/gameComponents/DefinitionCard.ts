import { Scene } from 'phaser';
import { Assets, GameEvents } from '../constants';
import { GameStudiableItem } from '../types';

export default class DefinitionCard extends Phaser.GameObjects.Container {
  constructor(studiableItem: GameStudiableItem, scene: Scene) {
    super(scene);
    scene.add.existing(this);
    this.studiableItem = studiableItem;
    this.cardBackground = scene.add
      .sprite(0, 0, Assets.Images.CARD)
      .setName('background')
      .setScale(3);

    this.cardText = scene.add
      .text(
        0,
        0,
        this.studiableItem.word.text +
          '\n' +
          this.studiableItem.definition.text,
        {
          color: '#000000',
        }
      )
      .setName('text');

    this.add([this.cardBackground, this.cardText]);
    this.setSize(
      this.cardBackground.displayWidth,
      this.cardBackground.displayHeight
    );
  }

  studiableItem: GameStudiableItem;
  cardBackground: Phaser.GameObjects.Sprite;
  cardText: Phaser.GameObjects.Text;
}
