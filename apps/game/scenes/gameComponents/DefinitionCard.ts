import { Scene } from 'phaser';
import { Assets, GameEvents } from '../constants';

export default class DefinitionCard {
  constructor(front: string, back: string, scene: Scene) {
    const x = Phaser.Math.Between(0, 800);
    const y = Phaser.Math.Between(0, 600);

    this.cardBackground = scene.add
      .sprite(0, 0, Assets.STAR_IMAGE)
      .setName('background');

    this.cardText = scene.add
      .text(0, 0, front + '\n' + back, {
        color: '#000000',
      })
      .setName('text');

    this.cardContainer = scene.add
      .container(0, 0, [this.cardText, this.cardBackground])
      .setName('container')
      .setX(x)
      .setY(y)
      .setSize(50, 50)
      .setInteractive();

    this.cardContainer.on('pointerup', this.clickHandler, this);
  }

  destroy() {
    this.cardContainer.destroy();
  }

  cardBackground: Phaser.GameObjects.Sprite;
  cardText: Phaser.GameObjects.Text;
  cardContainer: Phaser.GameObjects.Container;

  onClickEvent = new Phaser.Events.EventEmitter();

  clickHandler() {
    let textObject = this.cardText;
    console.log(textObject.text + ' Clicked');
    this.cardContainer.input.enabled = false;
    this.destroy();

    this.onClickEvent.emit(GameEvents.CARD_CLICKED);
  }
}
