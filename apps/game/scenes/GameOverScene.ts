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
    fontSize: 300,
  };

  create() {
    console.log('HERE');
    this.scoreTextGameObject = this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        'Game Over',
        this.textStyle
      )
      .setAlign('center')
      .setInteractive();

    let bg = new AnimatedBackground(this, Assets.Anims.GAME_OVER_BACKGROUND);

    // this.scoreTextGameObject.on('pointerup', this.handleContinue, this);
  }

  handleContinue() {
    this.scene.start(Scenes.MAIN_SCENE);
  }

  update() {}
}
