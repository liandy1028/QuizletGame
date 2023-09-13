import { Scene } from 'phaser';
import { Assets, GameEvents } from '../constants';
import { Dataset, StudiableItem } from 'dataset/types';

import QuizletSetBank from './QuizletSetBank';
import EnemyManager from './EnemyManager';

export default class GameDirector {
  constructor(
    quizletSetBank: QuizletSetBank,
    enemyManager: EnemyManager,
    scene: Scene
  ) {
    this.quizletSetBank = quizletSetBank;
    this.scene = scene;
    this.enemyManager = enemyManager;

    // this.currentChargingAttacks = [];
  }

  // Dependencies
  scene: Scene;
  quizletSetBank: QuizletSetBank;
  enemyManager: EnemyManager;

  // State
  // currentChargingAttacks: EnemyChargingAttack[];

  update(deltaTime: number) {
    // Update charging attacks
    /* for (var i = this.currentChargingAttacks.length - 1; i >= 0; i--) {
      let chargingAttack = this.currentChargingAttacks[i];
      chargingAttack.update(deltaTime);

      // If launched then remove from active charging attacks
      if (chargingAttack.isLaunched) {
        this.currentChargingAttacks.splice(i, 1);
      }
    } */
    // Update positions of charging attacks
    /* for (var i = 0; i < this.currentChargingAttacks.length; i++) {
      let chargingAttack = this.currentChargingAttacks[i];

      let currentPosition = new Phaser.Math.Vector2(
        chargingAttack.attackContainer.x,
        chargingAttack.attackContainer.y
      );
      let targetPosition = new Phaser.Math.Vector2(100 + i * 240, 125);

      let tOS = 0.95;
      currentPosition.lerp(
        targetPosition,
        1 - Math.pow(1 - tOS, deltaTime / 1000)
      );

      chargingAttack.attackContainer.setPosition(
        currentPosition.x,
        currentPosition.y
      );
    } */
  }

  /* createEnemyChargingAttack(
    gameStudiableItem: GameStudiableItem,
    chargeupDuration: number
  ): EnemyChargingAttack {
    let chargingAttack = new EnemyChargingAttack(
      gameStudiableItem,
      chargeupDuration,
      this.scene
    );
    this.currentChargingAttacks.push(chargingAttack);
    return chargingAttack;
  } */
}
