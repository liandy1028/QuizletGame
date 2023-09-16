import { Game, Scene } from 'phaser';
import {
  Assets,
  Scenes,
  Registry,
  GameEvents,
  SortingLayers,
} from './constants';
import {
  AnimatedBackground,
  DefinitionCard,
  EnemyEntity,
  PlayerEntity,
} from './gameComponents';
import {
  SpawnManager,
  GameDirector,
  HandManager,
  QuizletSetBank,
} from './systems';
import TargetIndicatorEntity from './gameComponents/TargetIndicatorEntity';
import { CONFIG_FILES } from 'next/dist/shared/lib/constants';
import { BackgroundConfigs } from './configs';
import ComboManager from './systems/ComboManager';

type GameObject = Phaser.GameObjects.GameObject;

export default class MainScene extends Scene {
  constructor() {
    super(Scenes.MAIN_SCENE);
  }

  // State
  isGameOver: boolean;
  private score: number;

  // Components
  enemyManager: SpawnManager;
  handManager: HandManager;
  comboManager: ComboManager;
  player: PlayerEntity;
  gameDirector: GameDirector;
  targetIndicator: TargetIndicatorEntity;

  create() {
    this.initializeSystems();
    this.createBackground();
    this.setupEvents();
    this.isGameOver = false;
    this.score = 0;

    // Additively loads UI scene
    this.scene.launch(Scenes.MAIN_UI_SCENE);
  }

  update(time: number, deltaTime: number) {
    if (this.isGameOver) return;
    this.enemyManager.update(deltaTime);
    this.gameDirector.update(deltaTime);
    this.handManager.update(deltaTime);
    this.targetIndicator.update(deltaTime);
    this.comboManager.update(deltaTime);
  }

  private createBackground() {
    let bg = new AnimatedBackground(
      this,
      BackgroundConfigs.MAIN_BACKGROUND_CONFIG
    );
  }

  private initializeSystems() {
    let quizletSetBank: QuizletSetBank = this.registry.get(
      Registry.QUIZLET_SET_BANK
    );

    this.player = new PlayerEntity(this);

    this.enemyManager = new SpawnManager(this, this.player);

    this.targetIndicator = new TargetIndicatorEntity(this);

    this.handManager = new HandManager(5, this)
      .setPosition(this.cameras.main.width / 2 + 50, 570)
      .setSize(this.cameras.main.width * 0.8, 60)
      .setDepth(SortingLayers.HAND);

    this.comboManager = new ComboManager(this);

    this.gameDirector = new GameDirector(
      quizletSetBank,
      this.enemyManager,
      this.targetIndicator,
      this.handManager,
      this.comboManager,
      this
    );
  }

  private setupEvents() {
    this.events.addListener(
      GameEvents.ENEMY_TOUCHED_PLAYER,
      this.onPlayerKilled,
      this
    );
  }

  private onPlayerKilled(player: PlayerEntity, enemy: EnemyEntity) {
    this.handleGameOver();
  }

  private handleGameOver() {
    if (this.isGameOver) return;
    console.warn('Game over!');
    this.isGameOver = true;
    this.scene.stop(Scenes.MAIN_UI_SCENE);
    this.scene.start(Scenes.GAME_OVER_SCENE);
  }

  getScore() {
    return this.score;
  }

  addToScore(value: number) {
    this.score += value;
    this.events.emit(GameEvents.SCORE_ADD_EVENT, value);
  }
}
