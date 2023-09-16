import { Scene } from 'phaser';
import { Assets, GameEvents, Registry } from '../constants';
import { EffectConfigs } from '../configs';
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

  private initialize() {
    this.cards = [];
    this.heldCards = [];
    this.nextCards = [];
    while (this.cards.length < 2 * this.size + 1) {
      // let definitionCards = this.quizletSetBank.getRandomizedStudiableItems();
      // for (const definitionCard of definitionCards) {
      //   this.cards.push(
      //     new DefinitionCard(definitionCard, this.scene)
      //       .setActive(false)
      //       .setVisible(false)
      //   );
      // }
      this.cards = this.quizletSetBank.getRandomizedStudiableItems();
      for (let i = 0; i < this.size; ++i) {
        this.nextCards.push(
          new DefinitionCard(this.cards[i], this.scene)
            .setActive(false)
            .setVisible(false)
        );
      }
    }
  }

  quizletSetBank: QuizletSetBank;
  scene: Scene;
  size: number;
  cards: GameStudiableItem[];
  heldCards: DefinitionCard[];

  // Preload some cards
  nextCards: DefinitionCard[];

  allowSelection = true;
  public setAllowSelection(state: boolean) {
    this.allowSelection = state;
    if (state == true) {
      for (let card of this.heldCards) {
        card.setAlpha(1);
      }
      for (let card of this.nextCards) {
        card.setAlpha(1);
      }
      // this.setAlpha(1);
    } else {
      for (let card of this.heldCards) {
        card.setAlpha(0.6);
      }
      for (let card of this.nextCards) {
        card.setAlpha(0.6);
      }
      // this.setAlpha(0.6);
    }
  }

  private requesting = false;
  private requestCooldown = 200;
  private requestCard() {
    if (this.requesting) return;
    this.requesting = true;
    this.scene.time.delayedCall(this.requestCooldown, () => {
      this.requesting = false;
    });

    // let card = this.cards.shift();
    // let card = new DefinitionCard(this.cards.shift(), this.scene);

    this.nextCards.push(
      new DefinitionCard(this.cards[this.size], this.scene)
        .setActive(false)
        .setVisible(false)
    );
    this.cards.shift();
    let card = this.nextCards.shift();
    this.add(card);
    this.heldCards.push(card);

    card
      .setActive(true)
      .setVisible(true)
      .setPosition(2 * this.width, 0)
      .setInteractive()
      .on(
        Phaser.Input.Events.POINTER_OVER,
        () => {
          if (this.focused !== card) {
            this.focused = card;
            this.updateCardPositions();
          }
        },
        this
      )
      .on(
        Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,
        () => {
          if (this.focused === card) {
            this.removeCard(card);
            this.updateCardPositions();
          } else {
            this.focused = card;
            this.updateCardPositions();
          }
        },
        this
      );

    this.updateCardPositions();
  }

  private moveSpeed = 200;
  private maxRot = 20;
  private updateCardPositions() {
    if (this.heldCards.length == 0) return;
    let handWidth = Math.min(
      this.heldCards[0].width * this.heldCards.length * 0.8,
      this.width
    );
    let cardSpacing =
      handWidth / (this.heldCards.length + (this.focused ? 1 : 0));
    let x = -handWidth / 2 + cardSpacing / 2;
    for (let card of this.heldCards) {
      let config: Phaser.Types.Tweens.TweenBuilderConfig = {
        targets: card,
        x: x,
        y: Math.abs((x / this.width) * this.height),
        scale: 1,
        angle: ((2 * x) / this.width) * this.maxRot,
        duration: this.moveSpeed,
        ease: Phaser.Math.Easing.Quartic.Out,
      };
      if (this.focused === card) {
        x += cardSpacing / 2;
        config.x = x;
        config.y = -this.height;
        config.scale = 1.1;
        config.angle = 0;
      }
      this.scene.tweens.add(config);

      x += cardSpacing;
      if (this.focused === card) {
        x += cardSpacing / 2;
      }
      this.bringToTop(card);
    }
    if (this.focused) this.bringToTop(this.focused);
    if (this.usedCard) this.bringToTop(this.usedCard);
  }

  private usedCard: DefinitionCard;
  private focused: DefinitionCard;
  public update(deltaTime: number) {
    if (this.heldCards.length < this.size) {
      const newLocal = this;
      newLocal.requestCard();
    }
  }

  private removeCard(card: DefinitionCard) {
    if (!this.allowSelection) return;

    card.disableInteractive();
    this.focused = null;
    card.setDepth(0);
    let index = this.heldCards.indexOf(card);
    if (index !== -1) {
      this.heldCards.splice(index, 1);
    }

    // this.cards.push(card);
    this.cards.push(card.studiableItem);

    this.emit(GameEvents.CARD_CLICKED, card.studiableItem);

    this.flip({
      targets: card,
      onComplete: () => {
        this.remove(card);
        card.setActive(false).setVisible(false);
        card.destroy();
      },
    });
  }

  private flip(configs: Phaser.Types.Tweens.TweenBuilderConfig) {
    let correct = this.allowSelection;
    let stayDuration = correct ? 0 : EffectConfigs.TIMEOUT_TIME - 780;
    let card: DefinitionCard = configs.targets;
    this.usedCard = card;
    card.markCorrect(correct);
    card.setAlpha(1);

    configs.tweens = [
      {
        scaleX: 0,
        // x: 0,
        // y: -400,
        // angle: 45,
        y: -this.height * 2,
        duration: 150,
        ease: Phaser.Math.Easing.Sine,
        onComplete: () => {
          card.flip();
        },
      },
      {
        scaleX: 1,
        // angle: 90,
        duration: 90,
      },
      {
        scale: 1.5,
        duration: 75,
        ease: Phaser.Math.Easing.Expo.Out,
      },
      {
        scale: 1.2,
        duration: 375,
        hold: stayDuration,
        ease: Phaser.Math.Easing.Bounce.Out,
        onComplete: () => {
          card.flip();
          this.usedCard = null;
        },
      },
    ];

    this.scene.tweens.chain(configs);
  }

  public getRandomListOfCards(size: number) {
    let currentHand = new Array<GameStudiableItem>();
    for (let card of this.heldCards) {
      currentHand.push(card.studiableItem);
    }
    let i = 0;
    while (currentHand.length < this.size) {
      // currentHand.push(this.cards[i++].studiableItem);
      currentHand.push(this.cards[i++]);
    }

    let ret = new Array<GameStudiableItem>();
    while (ret.length < size) {
      let ind = Phaser.Math.Between(0, this.size - 1);
      ret.push(currentHand[ind]);
      // currentHand[i] = this.cards[i++].studiableItem;
      currentHand[i] = this.cards[i++];
    }
    return ret;
  }
}
