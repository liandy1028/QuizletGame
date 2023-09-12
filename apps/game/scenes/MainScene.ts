import { Scene } from 'phaser';
import { Assets, Scenes, Registry, GameEvents } from './constants';
import { DefinitionCard } from './gameComponents';
type GameObject = Phaser.GameObjects.GameObject;

export class MainScene extends Scene {
  constructor() {
    super(Scenes.MAIN_SCENE);

    this.score = 0;
  }

  score: number;

  create() {
    // Setup quizlet studiable Items

    let usedStudiableItems = this.registry.get(
      Registry.USED_QUIZLET_DATASET
    ).studiableItem;
    //  Assets.A simple background for our game
    this.add.image(400, 300, Assets.SKY_IMAGE);

    for (const studiableItem of usedStudiableItems) {
      let card = new DefinitionCard(
        studiableItem.cardSides[0].media[0]['plainText'],
        studiableItem.cardSides[1].media[0]['plainText'],
        this
      );

      card.onClickEvent.addListener(
        GameEvents.CARD_CLICKED,
        () => {
          console.log('hitem with it');
          this.score += 1;
          this.events.emit(GameEvents.SCORE_ADD_EVENT, this.score);
        },
        this
      );
    }
    // Additively loads UI scene
    this.scene.launch(Scenes.MAIN_UI_SCENE);
  }

  update() {}
}
