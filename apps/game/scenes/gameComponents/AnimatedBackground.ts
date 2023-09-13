import { Scene } from 'phaser';
import { SortingLayers } from '../constants';

export default class AnimatedBackground extends Phaser.GameObjects.Sprite {
  constructor(scene: Scene, animationName: string) {
    super(scene, 0, 0, '');
    let width = scene.cameras.main.width;
    let height = scene.cameras.main.height;

    this.setOrigin(0, 0);

    this.play(animationName);

    // Scale to full screen
    let scaleX = width / this.width;
    let scaleY = scene.cameras.main.height / this.height;
    let scale = Math.max(scaleX, scaleY);
    this.setScale(scale).setDepth(SortingLayers.BACKGROUND);

    scene.add.existing(this);
  }
}
