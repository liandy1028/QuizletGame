import { Scene } from 'phaser';
import { Assets, Scenes, Registry, GameEvents } from './constants';
import { AnimatedBackground } from './gameComponents';

type text = Phaser.GameObjects.Text;

export class GameOverScene extends Scene {
  constructor() {
    super(Scenes.GAME_OVER_SCENE);
  }

  scoreTextGameObject: text;

  textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    color: '#FFFFFF',
    fontSize: 150,
  };

  create() {
    let width = this.cameras.main.width;
    let height = this.cameras.main.height;

    this.scoreTextGameObject = this.add
      .text(width / 2, height / 2, 'Game Over', this.textStyle)
      .setOrigin(0.5, 0.5)
      .setAlign('left')
      .setInteractive();

    let bg = new AnimatedBackground(this, Assets.Anims.GAME_OVER_BACKGROUND);

    this.scoreTextGameObject.on(
      Phaser.Input.Events.GAMEOBJECT_POINTER_UP,
      this.handleContinue,
      this
    );
  }

  handleContinue() {
    this.scene.start(Scenes.MAIN_SCENE);
  }
}
