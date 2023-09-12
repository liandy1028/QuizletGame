import { Scene } from 'phaser';
import { Assets, Scenes, Registry } from './constants';

import Quizlet from 'dataset';

type sprite = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

export class Preloader extends Scene {
  constructor() {
    super(Scenes.PRELOADER_SCENE);
  }

  preload() {
    // https://photonstorm.github.io/phaser3-docs/Phaser.Loader.Events.html
    this.load.on('progress', this.onProgress, this);
    this.load.on('fileprogress', this.onFileProgress, this);

    // Load quizlet
    const quizletSets = Quizlet.getAllSets();
    let usedDataset = quizletSets[0];

    this.registry.set(Registry.USED_QUIZLET_DATASET, usedDataset);

    // Load game assets
    this.load.setPath('game/assets');
    this.load.image(Assets.SKY_IMAGE, 'sky.png');
    this.load.image(Assets.STAR_IMAGE, 'star.png');
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
    this.scene.start(Scenes.MAIN_SCENE);
  }
}
