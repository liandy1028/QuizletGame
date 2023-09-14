import { Scene } from 'phaser';
import {
  Assets,
  GameEvents,
  PhysicsConstants,
  SortingLayers,
} from '../constants';

export default class PlayerEntity extends Phaser.GameObjects.Container {
  constructor(scene: Scene) {
    super(scene);

    this.sprite = scene.add
      .sprite(0, 0, Assets.Images.PLAYER)
      .setName('sprite')
      .setScale(Assets.SPRITE_SCALE);

    this.add([this.sprite]);
    this.setSize(50, 125);
    this.setX(100);
    this.setY(300);
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
