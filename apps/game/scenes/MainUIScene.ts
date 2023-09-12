import { Scene } from 'phaser';
import { Assets, Scenes, Registry, GameEvents } from './constants';

type sprite = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
type text = Phaser.GameObjects.Text;

export class MainUIScene extends Scene {
  constructor() {
    super(Scenes.MAIN_UI_SCENE);
  }

  scoreTextGameObject: text;

  textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    color: '#000000',
    fontSize: 25,
  };

  create() {
    this.scoreTextGameObject = this.add.text(0, 0, 'Score: ', this.textStyle);

    console.log('UI SCENE');

    const mainScene = this.scene.get(Scenes.MAIN_SCENE);

    mainScene.events.on(GameEvents.SCORE_ADD_EVENT, this.addScoreHandler, this);
  }

  addScoreHandler(value: number) {
    this.scoreTextGameObject.text = 'Score: ' + value;
  }

  update() {}
}
