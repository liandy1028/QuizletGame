import { Scene } from 'phaser';
import { EnemyConfig, GameStudiableItem } from '../types';
import PlayerEntity from './PlayerEntity';
import { GameEvents, PhysicsConstants, SortingLayers } from '../constants';

export default class EnemyEntity extends Phaser.GameObjects.Container {
  constructor(enemyConfig: EnemyConfig, scene: Scene, player: PlayerEntity) {
    super(scene);

    this.enemyConfig = enemyConfig;
    this.player = player;

    this.currentHealth = enemyConfig.health;

    this.sprite = scene.add
      .sprite(0, 0, enemyConfig.spriteImage)
      .setName('sprite')
      .setDepth(SortingLayers.ENEMY_SPRITE)
      .setScale(3);

    this.termText = scene.add
      .text(0, 0, '', this.textStyle)
      .setName('text')
      .setOrigin(0.5, 1);

    this.add([this.sprite, this.termText]);
    this.setSize(120, 120);
    this.setX(scene.cameras.main.width);
    this.setY(300);
    this.setName('enemyEntity');

    // Setup physics
    this.physicsGroup = scene.physics.add.group(this, {
      key: PhysicsConstants.ENEMY_GROUP,
    });

    scene.physics.add.collider(
      player,
      this.physicsGroup,
      this.onHitPlayer,
      null,
      this
    );

    this.scene.add.existing(this);
  }

  textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    color: '#FFFFFF',
    align: 'center',
    fontStyle: 'bold',
  };

  enemyConfig: EnemyConfig;
  player: PlayerEntity;

  physicsGroup: Phaser.Physics.Arcade.Group;

  // state
  currentHealth: number;

  // Components
  sprite: Phaser.GameObjects.Sprite;
  termText: Phaser.GameObjects.Text;

  private onHitPlayer() {
    this.scene.events.emit(GameEvents.ENEMY_TOUCHED_PLAYER, this.player, this);
  }

  update(deltaTime: number) {
    // Move towards the player
    let cx = this.x;
    let px = this.player.x;
    let moveDist = Math.min(
      Math.abs(cx - px),
      (deltaTime * this.enemyConfig.speed) / 1000
    );

    this.x += moveDist * Math.sign(px - cx);
  }

  public displayGameStudiableItem(studiableItem: GameStudiableItem) {
    this.setDisplayText(studiableItem.word.text);
  }

  private setDisplayText(text: string) {
    this.termText.text = text;

    let fontSize = 35;
    let heightBound = 150;
    let widthBound = 145;

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
