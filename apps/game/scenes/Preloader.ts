import { Scene } from 'phaser';
import * as Assets from './AssetConstants';

type sprite = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

export class Preloader extends Scene {
  constructor() {
    super('preloader');
  }

  preload() {
    // https://photonstorm.github.io/phaser3-docs/Phaser.Loader.Events.html
    this.load.on('progress', this.onProgress, this);
    this.load.on('fileprogress', this.onFileProgress, this);

    this.load.setPath('game/assets');
    this.load.image(Assets.SKY_IMAGE, 'sky.png');
    this.load.image(Assets.GROUND_IMAGE, 'platform.png');
    this.load.image(Assets.STAR_IMAGE, 'star.png');
    this.load.image(Assets.BOMB_IMAGE, 'bomb.png');
    this.load.spritesheet(Assets.DUDE_IMAGE, 'dude.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  onProgress(loadProgress: number) {
    console.log('onProgress: ' + loadProgress);
  }

  onFileProgress(file: Phaser.Loader.File, percentComplete: number) {
    console.log(
      'onFileProgress: file.key=' +
        file.key +
        ' from ' +
        file.url +
        ' | progress: ' +
        percentComplete
    );
  }

  create() {
    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: Assets.PLAYER_LEFT_ANIM,
      frames: this.anims.generateFrameNumbers(Assets.DUDE_IMAGE, {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: Assets.PLAYER_TURN_ANIM,
      frames: [{ key: Assets.DUDE_IMAGE, frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: Assets.PLAYER_RIGHT_ANIM,
      frames: this.anims.generateFrameNumbers(Assets.DUDE_IMAGE, {
        start: 5,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.start('main-scene');
  }

  update() {}
}
