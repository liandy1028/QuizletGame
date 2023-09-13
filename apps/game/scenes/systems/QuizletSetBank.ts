import { Scene } from 'phaser';
import { Assets, GameEvents } from '../constants';
import { Dataset } from 'dataset/types';
import { GameStudiableItem } from '../types';

// A utlity wrapper around quizlet sets
export default class QuizletSetBank {
  constructor(usedQuizletSet: Dataset, loader: Phaser.Loader.LoaderPlugin) {
    this.dataSet = usedQuizletSet;
    this.loader = loader;

    this.initializeBank();
  }

  dataSet: Dataset;
  loader: Phaser.Loader.LoaderPlugin;
  gameStudiableItems: GameStudiableItem[] = [];

  // State

  private initializeBank() {
    // Id is also index in the array
    let currentId = 0;
    for (const studiableItem of this.dataSet.studiableItem) {
      let gameStudiableItem: GameStudiableItem = {
        id: currentId,
        word: { text: studiableItem.cardSides[0].media[0]['plainText'] },
        definition: { text: studiableItem.cardSides[1].media[0]['plainText'] },
      };
      if (studiableItem.cardSides[1].media.length > 1) {
        this.loader.image(
          studiableItem.cardSides[1].media[1]['url'],
          studiableItem.cardSides[1].media[1]['url']
        );
        gameStudiableItem.definition.imageID =
          studiableItem.cardSides[1].media[1]['url'];
      }
      this.gameStudiableItems.push(gameStudiableItem);
      currentId++;
    }
  }

  getRandomizedStudiableItems(): GameStudiableItem[] {
    let shuffledGameStudiableItems = [...this.gameStudiableItems];
    this.shuffleArray(shuffledGameStudiableItems);
    return shuffledGameStudiableItems;
  }

  // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
  private shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
}
