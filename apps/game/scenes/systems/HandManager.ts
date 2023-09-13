import { Scene } from 'phaser';
import { Assets, GameEvents, Registry } from '../constants';
import { DefinitionCard } from '../gameComponents';
import { GameStudiableItem } from '../types';

import QuizletSetBank from './QuizletSetBank';

export default class HandManager extends Phaser.GameObjects.Container {
  constructor(size: number, scene: Scene) {
    super(scene);
    scene.add.existing(this);
    this.quizletSetBank = scene.registry.get(Registry.QUIZLET_SET_BANK);
    this.size = size;
    this.scene = scene;

    this.initialize();
  }

  destroy() {
    for (let definitionCard of this.cards) {
      definitionCard.destroy();
    }
  }

  initialize() {
    this.cards = [];
    this.heldCards = [];
    while (this.cards.length < 2 * this.size) {
      let definitionCards = this.quizletSetBank.getRandomizedStudiableItems();
      for (const definitionCard of definitionCards) {
        this.cards.push(
          new DefinitionCard(definitionCard, this.scene)
            .setActive(false)
            .setVisible(false)
        );
      }
    }
  }

  quizletSetBank: QuizletSetBank;
  scene: Scene;
  size: number;
  cards: DefinitionCard[];
  heldCards: DefinitionCard[];

  requesting = false;
  requestCooldown = 1000;
  requestCard() {
    if (this.requesting) return;
    this.requesting = true;
    this.scene.time.delayedCall(this.requestCooldown, () => {
      this.requesting = false;
    });

    let card = this.cards.shift();
    this.add(card);
    this.heldCards.push(card);

    card
      .setActive(true)
      .setVisible(true)
      .setPosition(2 * this.width, 0)
      .setInteractive()
      .on(
        'pointerover',
        () => {
          if (this.focused !== card) {
            this.focused?.setDepth(0);
            this.focused = card;
            card.setDepth(1);
            this.updateCardPositions();
          }
        },
        this
      )
      .on(
        'pointerdown',
        () => {
          if (this.focused === card) {
            this.focused = null;
            card.setDepth(0);
            this.removeCard(card);
            this.updateCardPositions();
          } else {
            this.focused = card;
            card.setDepth(1);
            this.updateCardPositions();
          }
        },
        this
      );

    this.updateCardPositions();
  }

  moveSpeed = 100;
  updateCardPositions() {
    let cardSpacing =
      this.width / (this.heldCards.length + (this.focused ? 1 : 0));
    let x = cardSpacing / 2;
    for (let card of this.heldCards) {
      let y = 0;
      if (this.focused === card) {
        y = -this.height;
        x += cardSpacing / 2;
      }
      this.scene.tweens.add({
        targets: card,
        x: x,
        y: y,
        duration: this.moveSpeed,
        ease: 'quart.out',
      });

      x += cardSpacing;
      if (this.focused === card) {
        x += cardSpacing / 2;
      }
      this.bringToTop(card);
    }
    if (this.focused !== null) this.bringToTop(this.focused);
  }

  focused: DefinitionCard;
  update(deltaTime: number) {
    if (this.length < this.size) {
      this.requestCard();
    }
  }

  removeCard(card: DefinitionCard) {
    console.log(card);

    this.remove(card);
    let index = this.heldCards.indexOf(card);
    if (index !== -1) {
      this.heldCards.splice(index, 1);
    }

    this.cards.push(card);

    card.setActive(false).setVisible(false);

    this.emit(GameEvents.CARD_CLICKED, card);
  }

  getRandomListOfCards(size: number) {
    let currentHand = new Array<GameStudiableItem>();
    for (let card of this.heldCards) {
      currentHand.push(card.studiableItem);
    }
    let i = 0;
    while (currentHand.length < this.size) {
      currentHand.push(this.cards[i++].studiableItem);
    }

    let ret = new Array<GameStudiableItem>();
    while (ret.length < size) {
      let ind = Phaser.Math.Between(0, this.size - 1);
      ret.push(currentHand[ind]);
      currentHand[i] = this.cards[i++].studiableItem;
    }
    return ret;
  }
}
