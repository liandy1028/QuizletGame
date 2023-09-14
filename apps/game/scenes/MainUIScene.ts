import { Scene } from 'phaser';
import { Assets, Scenes, Registry, GameEvents } from './constants';

type sprite = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
type text = Phaser.GameObjects.Text;

export class MainUIScene extends Scene {
  constructor() {
    super(Scenes.MAIN_UI_SCENE);
    this.score = 0;
  }

  score: number;
  scoreTextGameObject: text;

  textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    color: '#FFFFF',
    fontSize: 45,
  };

  create() {
    this.scoreTextGameObject = this.add
      .text(0, 0, 'Score: ', this.textStyle)
      .setOrigin(0, 0)
      .setAlign('center')
      .setColor('#FFFF');

    const mainScene = this.scene.get(Scenes.MAIN_SCENE);

    mainScene.events.on(GameEvents.SCORE_ADD_EVENT, this.addScoreHandler, this);

    this.addScoreHandler(0);
  }

  addScoreHandler(value: number) {
    this.score += value;
    this.scoreTextGameObject.text = 'Score: ' + this.score;
  }

  update() {}
}
