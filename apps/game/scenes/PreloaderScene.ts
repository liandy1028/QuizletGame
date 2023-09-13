import { Scene } from 'phaser';
import { Assets, Scenes, Registry } from './constants';
import { QuizletSetBank } from './systems';

import Quizlet from 'dataset';

export class PreloaderScene extends Scene {
  constructor() {
    super(Scenes.PRELOADER_SCENE);
  }

  preload() {
    // https://photonstorm.github.io/phaser3-docs/Phaser.Loader.Events.html
    this.load.on('progress', this.onProgress, this);
    this.load.on('fileprogress', this.onFileProgress, this);

    let ghibli = 'Studio Ghibli Movie Trivia';
    let disney = 'Disney Princess Trivia';
    // Load quizlet
    const quizletSets = Quizlet.getAllSets();
    for (let dataset of quizletSets) {
      if (dataset.set.title == ghibli) var usedDataset = dataset;
    }

    this.registry.set(Registry.USED_QUIZLET_DATASET, usedDataset);
    this.registry.set(
      Registry.QUIZLET_SET_BANK,
      new QuizletSetBank(usedDataset, this.load)
    );

    // Load game assets
    this.load.setPath('game/assets');

    // Load images
    for (let imagePath in Assets.Images) {
      this.load.image(Assets.Images[imagePath], Assets.Images[imagePath]);
    }

    // Load spritesheets
    this.load.spritesheet(
      Assets.SpriteSheets.MAIN_SCENE_BACKGROUND,
      Assets.SpriteSheets.MAIN_SCENE_BACKGROUND,
      { frameWidth: 320, frameHeight: 180 }
    );

    this.load.spritesheet(
      Assets.SpriteSheets.GAME_OVER_BACKGROUND,
      Assets.SpriteSheets.GAME_OVER_BACKGROUND,
      { frameWidth: 320, frameHeight: 180 }
    );
  }

  onProgress(loadProgress: number) {
    console.log('onProgress: ' + loadProgress);
  }

  onFileProgress(file: Phaser.Loader.File, percentComplete: number) {
    /* console.log(
      'onFileProgress: file.key=' +
      file.key +
        ' from ' +
        file.url +
        ' | progress: ' +
        percentComplete
    ); */
  }

  create() {
    // Load animations
    this.anims.create({
      key: Assets.Anims.MAIN_SCENE_BACKGROUND,
      frames: Assets.SpriteSheets.MAIN_SCENE_BACKGROUND,
      frameRate: 2,
      repeat: -1,
    });

    this.anims.create({
      key: Assets.Anims.GAME_OVER_BACKGROUND,
      frames: Assets.SpriteSheets.GAME_OVER_BACKGROUND,
      frameRate: 2,
      repeat: -1,
    });

    this.scene.start(Scenes.MAIN_SCENE);
  }
}
