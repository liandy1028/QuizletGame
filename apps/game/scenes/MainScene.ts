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
  EnemyManager,
  GameDirector,
  HandManager,
  QuizletSetBank,
} from './systems';
import TargetIndicatorEntity from './gameComponents/TargetIndicatorEntity';

type GameObject = Phaser.GameObjects.GameObject;

export class MainScene extends Scene {
  constructor() {
    super(Scenes.MAIN_SCENE);

    this.score = 0;
  }

  // State
  score: number;
  isGameOver: boolean;

  // Components
  enemyManager: EnemyManager;
  handManager: HandManager;
  player: PlayerEntity;
  gameDirector: GameDirector;
  targetIndicator: TargetIndicatorEntity;

  create() {
    this.initializeSystems();
    this.createBackground();
    this.setupEvents();
    this.isGameOver = false;

    // Additively loads UI scene
    this.scene.launch(Scenes.MAIN_UI_SCENE);
  }

  update(time: number, deltaTime: number) {
    if (this.isGameOver) return;
    this.enemyManager.update(deltaTime);
    this.gameDirector.update(deltaTime);
    this.handManager.update(deltaTime);
    this.targetIndicator.update(deltaTime);
  }

  private createBackground() {
    let bg = new AnimatedBackground(this, Assets.Anims.MAIN_SCENE_BACKGROUND);
  }

  private initializeSystems() {
    let quizletSetBank: QuizletSetBank = this.registry.get(
      Registry.QUIZLET_SET_BANK
    );

    this.player = new PlayerEntity(this);

    this.enemyManager = new EnemyManager(this, this.player);

    this.targetIndicator = new TargetIndicatorEntity(this);

    this.handManager = new HandManager(5, this)
      .setPosition(this.cameras.main.width / 2, 600)
      .setSize(this.cameras.main.width * 0.6, 50)
      .setDepth(SortingLayers.HAND);

    this.gameDirector = new GameDirector(
      quizletSetBank,
      this.enemyManager,
      this.targetIndicator,
      this.handManager,
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
}
