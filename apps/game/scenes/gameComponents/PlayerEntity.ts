import { Scene } from 'phaser';
import {
  Assets,
  GameEvents,
  PhysicsConstants,
  SortingLayers,
} from '../constants';
import { PlayerConfig } from '../configs';

export default class PlayerEntity extends Phaser.GameObjects.Container {
  constructor(scene: Scene) {
    super(scene);

    this.sprite = scene.add
      .sprite(0, 0, Assets.Images.PLAYER)
      .setName('sprite')
      .setScale(Assets.SPRITE_SCALE);

    this.add([this.sprite]);
    this.setSize(50, 125);
    this.setX(PlayerConfig.Config.xPos);
    this.setY(PlayerConfig.Config.yPos);
    this.setName('playerEntity');
    this.setDepth(SortingLayers.PLAYER_SPRITE);

    this.physicsGroup = scene.physics.add.staticGroup(this, {
      key: PhysicsConstants.PLAYER_STATIC_GROUP,
    });
    this.scene.add.existing(this);
  }

  // Components
  sprite: Phaser.GameObjects.Sprite;
  physicsGroup: Phaser.Physics.Arcade.StaticGroup;

  // Events
  onDeathEvent = new Phaser.Events.EventEmitter();

  update(deltaTime: number) {}
}
