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

export default class TargetIndicatorEntity extends Phaser.GameObjects
  .Container {
  constructor(scene: Scene) {
    super(scene);

    this.sprite = scene.add
      .sprite(0, 0, Assets.Images.TARGET_INDICATOR)
      .setName('sprite')
      .setDepth(SortingLayers.INDICATOR)
      .setScale(Assets.SPRITE_SCALE);

    this.termText = scene.add
      .text(0, 0, '', this.textStyle)
      .setName('text')
      .setDepth(SortingLayers.INDICATOR + 1)
      .setOrigin(0.5, 1);

    this.termText.y -= 100;

    this.add([this.sprite, this.termText]);
    this.setSize(120, 120);
    this.setX(scene.cameras.main.width);
    this.setY(300);
    this.setName('targetIndicator');
    this.setDepth(SortingLayers.INDICATOR);

    this.scene.add.existing(this);
  }

  textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    color: '#FFFFFF',
    align: 'center',
    fontStyle: 'bold',
  };

  // Components
  sprite: Phaser.GameObjects.Sprite;
  termText: Phaser.GameObjects.Text;

  currentTarget: EnemyEntity;

  update(deltaTime: number) {
    // Move towards the target
    this.setVisible(
      this.currentTarget != null && !this.currentTarget.markedForDeath
    );

    if (this.currentTarget != null) {
      this.x = this.currentTarget.x;
      this.y = this.currentTarget.y;
    }
  }

  public displayGameStudiableItem(studiableItem: GameStudiableItem) {
    this.setDisplayText(studiableItem.word.text);
  }

  private setDisplayText(text: string) {
    this.termText.text = text;

    let fontSize = 35;
    let heightBound = 100;
    let widthBound = 300;

    this.termText.setWordWrapWidth(widthBound).setFontSize(fontSize);

    while (
      this.termText.height > heightBound ||
      this.termText.width > widthBound
    ) {
      fontSize = Math.floor(fontSize * 0.9);
      this.termText.setFontSize(fontSize);
    }
  }
}
