import { Scene } from 'phaser';
import { Assets, GameEvents } from '../constants';
import { Dataset, StudiableItem } from 'dataset/types';

import QuizletSetBank from './QuizletSetBank';
import EnemyManager from './EnemyManager';
import TargetIndicatorEntity from '../gameComponents/TargetIndicatorEntity';
import HandManager from './HandManager';
import { EnemyEntity } from '../gameComponents';
import { GameStudiableItem } from '../types';

export default class GameDirector {
  constructor(
    quizletSetBank: QuizletSetBank,
    enemyManager: EnemyManager,
    targetIndicator: TargetIndicatorEntity,
    handManager: HandManager,
    scene: Scene
  ) {
    this.quizletSetBank = quizletSetBank;
    this.enemyManager = enemyManager;
    this.targetIndicator = targetIndicator;
    this.handManager = handManager;

    this.scene = scene;

    this.handManager.addListener(
      GameEvents.CARD_CLICKED,
      this.cardClickedHandler,
      this
    );

    this.setupNewAttack();
  }

  // Dependencies
  scene: Scene;
  quizletSetBank: QuizletSetBank;
  enemyManager: EnemyManager;
  targetIndicator: TargetIndicatorEntity;
  handManager: HandManager;

  // State
  currentTarget: EnemyEntity;

  update(deltaTime: number) {
    if (this.currentTarget == null || this.currentTarget.markedForDeath) {
      this.setupNewAttack();
    }

    this.targetIndicator.currentTarget = this.currentTarget;
  }

  private setupNewAttack() {
    let closestEnemy = this.enemyManager.getClosestEnemy();
    if (closestEnemy == null) return;

    this.currentTarget = closestEnemy;
    this.targetIndicator.displayGameStudiableItem(
      this.handManager.getRandomListOfCards(1)[0]
    );
  }

  private cardClickedHandler(studiableItem: GameStudiableItem) {
    if (studiableItem.word.text == this.targetIndicator.termText.text) {
      this.currentTarget.takeDamage(1);
      this.setupNewAttack();
    } else {
      this.handManager.setAllowSelection(false);
      this.scene.time.delayedCall(1000, () => {
        this?.handManager?.setAllowSelection(true);
      });
    }
  }
}
