import { Scene } from 'phaser';
import { Assets, Scenes, Registry } from './constants';
import { Dataset } from 'dataset/types';
import { QuizletSetBank } from './systems';

import Quizlet from 'dataset';
import {
  AnimConfigs,
  BackgroundConfigs,
  EnemyConfigs,
  SpellConfig,
} from './configs';
import { GameAnimationConfig } from './types';
import { AnimatedBackground } from './gameComponents';

export class PreloaderScene extends Scene {
  constructor() {
    super(Scenes.PRELOADER_SCENE);
  }

  preload() {
    // https://photonstorm.github.io/phaser3-docs/Phaser.Loader.Events.html
    this.load.on('progress', this.onProgress, this);
    this.load.on('fileprogress', this.onFileProgress, this);

    // Load quizlet
    const quizletSets = Quizlet.getAllSets();
    let setName: string = this.registry.get(Registry.QUIZLET_SET_NAME);
    let usedDataset: Dataset = {
      set: quizletSets[0].set, // placeholder
      studiableItem: [],
    };
    if (setName == Registry.QUIZLET_SET_ALL) {
      for (let set of quizletSets) {
        usedDataset.studiableItem.push(...set.studiableItem);
      }
    } else {
      for (let dataset of quizletSets) {
        if (dataset.set.title == setName) usedDataset = dataset;
      }
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

    // Load enemy spritesheets
    for (let enemyConfig of EnemyConfigs.AllEnemyConfigs) {
      this.load.spritesheet(
        enemyConfig.spriteSheetPath,
        enemyConfig.spriteSheetPath,
        enemyConfig.spriteSheetFrameConfig
      );
    }

    // load bg spritesheets
    for (let bgConfig of BackgroundConfigs.AllBackgroundConfigs) {
      this.load.spritesheet(
        bgConfig.spriteSheetPath,
        bgConfig.spriteSheetPath,
        bgConfig.spriteSheetFrameConfig
      );
    }

    // Load spell spritesheets
    for (let spellConfig of SpellConfig.AllSpells) {
      this.load.spritesheet(
        spellConfig.spriteSheetPath,
        spellConfig.spriteSheetPath,
        spellConfig.spriteSheetFrameConfig
      );
    }

    this.load.spritesheet(
      AnimConfigs.HEALTH_BAR_IDLE_ANIM.spriteSheetPath,
      AnimConfigs.HEALTH_BAR_IDLE_ANIM.spriteSheetPath,
      AnimConfigs.HEALTH_BAR_IDLE_ANIM.spriteSheetFrameConfig
    );
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
    // Healthbar anims
    this.createAnimFromConfig(
      AnimConfigs.HEALTH_BAR_IDLE_ANIM.spriteSheetPath,
      AnimConfigs.HEALTH_BAR_IDLE_ANIM.idleAnim
    );

    this.createAnimFromConfig(
      AnimConfigs.HEALTH_BAR_IDLE_ANIM.spriteSheetPath,
      AnimConfigs.HEALTH_BAR_IDLE_ANIM.removeAnim
    );

    // Load enemy animations
    for (let enemyConfig of EnemyConfigs.AllEnemyConfigs) {
      // Create frames from frameNumbers
      this.createAnimFromConfig(
        enemyConfig.spriteSheetPath,
        enemyConfig.moveAnim
      );
      this.createAnimFromConfig(
        enemyConfig.spriteSheetPath,
        enemyConfig.stunnedAnim
      );
      this.createAnimFromConfig(
        enemyConfig.spriteSheetPath,
        enemyConfig.deathAnim
      );
    }

    // Load background animations
    for (let bgConfig of BackgroundConfigs.AllBackgroundConfigs) {
      this.createAnimFromConfig(bgConfig.spriteSheetPath, bgConfig.anim);
    }

    // Load spell projectile animations
    for (let spellConfig of SpellConfig.AllSpells) {
      this.createAnimFromConfig(
        spellConfig.spriteSheetPath,
        spellConfig.spellAnimation
      );
    }

    let loadingBG = new AnimatedBackground(
      this,
      BackgroundConfigs.LOADING_BACKGROUND_CONFIG
    );

    this.scene.start(Scenes.MAIN_SCENE);
  }

  private createAnimFromConfig(
    spriteSheetPath: string,
    animationConfig: GameAnimationConfig
  ) {
    animationConfig.frames = this.anims.generateFrameNumbers(spriteSheetPath, {
      frames: animationConfig.frameNumbers,
    });
    this.anims.create(animationConfig);
  }
}
