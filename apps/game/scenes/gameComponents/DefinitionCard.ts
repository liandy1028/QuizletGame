import { Scene } from 'phaser';
import { Assets, GameEvents } from '../constants';
import { GameStudiableItem } from '../types';

export default class DefinitionCard extends Phaser.GameObjects.Container {
  constructor(studiableItem: GameStudiableItem, scene: Scene) {
    super(scene);
    scene.add.existing(this);
    this.studiableItem = studiableItem;
    this.add(
      scene.add
        .sprite(0, 0, Assets.Images.CARD)
        .setName('background')
        .setScale(5)
    );
    let background = this.getByName<Phaser.GameObjects.Sprite>('background');
    this.setSize(background.displayWidth, background.displayHeight);

    if (this.studiableItem.definition.imageID) {
      this.add(
        this.scene.add
          .sprite(0, -this.height / 4, this.studiableItem.definition.imageID)
          .setName('image')
          .setDisplaySize(this.width * 0.9, this.height * 0.45)
      );
    }

    let fontSize = 40;
    this.add(
      scene.add
        .text(0, 0, this.studiableItem.definition.text, {
          color: '#FFFFFF',
          fontSize: fontSize,
        })
        .setWordWrapWidth(this.width * 0.9)
        .setOrigin(0.5, 0)
        .setName('text')
    );
    let cardText = this.getByName<Phaser.GameObjects.Text>('text');
    while (
      cardText.width > this.width * 0.9 ||
      cardText.height > this.height * 0.45
    ) {
      fontSize *= 0.9;
      cardText.setFontSize(fontSize);
    }

    fontSize = 80;
    this.add(
      scene.add
        .text(0, 0, this.studiableItem.word.text, {
          color: '#FFFFFF',
          fontSize: fontSize,
        })
        .setWordWrapWidth(this.height * 0.9)
        .setOrigin(0.5, 0.5)
        .setName('back-text')
        .setAngle(-90)
    );
    cardText = this.getByName<Phaser.GameObjects.Text>('back-text');
    while (
      cardText.width > this.height * 0.9 ||
      cardText.height > this.width * 0.9
    ) {
      fontSize *= 0.9;
      cardText.setFontSize(fontSize);
    }
    cardText.setVisible(false);
  }

  public flip() {
    let text = this.getByName<Phaser.GameObjects.Text>('text');
    text.setVisible(!text.visible);
    text = this.getByName<Phaser.GameObjects.Text>('back-text');
    text.setVisible(!text.visible);
    let img = this.getByName<Phaser.GameObjects.Sprite>('image');
    img.setVisible(!img.visible);
    return this;
  }

  studiableItem: GameStudiableItem;
}
