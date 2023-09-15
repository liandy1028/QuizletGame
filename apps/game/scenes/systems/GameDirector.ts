import { Scene } from 'phaser';
import { Assets, GameEvents } from '../constants';
import { Dataset, StudiableItem } from 'dataset/types';

import QuizletSetBank from './QuizletSetBank';
import EnemyManager from './EnemyManager';
import TargetIndicatorEntity from '../gameComponents/TargetIndicatorEntity';
import HandManager from './HandManager';
import { AttackSpell, EnemyEntity } from '../gameComponents';
import { GameStudiableItem } from '../types';
import { EffectConfigs, PlayerConfig } from '../configs';
import ComboManager from './ComboManager';

export default class GameDirector {
  constructor(
    quizletSetBank: QuizletSetBank,
    enemyManager: EnemyManager,
    targetIndicator: TargetIndicatorEntity,
    handManager: HandManager,
    comboManager: ComboManager,
    scene: Scene
  ) {
    this.quizletSetBank = quizletSetBank;
    this.enemyManager = enemyManager;
    this.targetIndicator = targetIndicator;
    this.handManager = handManager;
    this.comboManager = comboManager;

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
  comboManager: ComboManager;

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
      let damage = this.comboManager.getCurrentComboDamage();
      let spellConfig = this.comboManager.getRandomSpellConfig();
      console.log(spellConfig);

      this.currentTarget.tryMarkForDeath(damage);
      this.comboManager.comboUp();

      let spell = new AttackSpell(
        PlayerConfig.Config.xPos,
        PlayerConfig.Config.yPos,
        this.currentTarget,
        spellConfig,
        damage,
        this.scene
      );

      this.setupNewAttack();
    } else {
      let shakeConfig = EffectConfigs.INCORRECT_MATCH_SCREEN_SHAKE_CONFIG;
      this.scene.cameras.main.shake(
        shakeConfig.duration,
        shakeConfig.intensity
      );
      this.comboManager.comboDown();

      this.handManager.setAllowSelection(false);
      this.scene.time.delayedCall(EffectConfigs.TIMEOUT_TIME, () => {
        this?.handManager?.setAllowSelection(true);
      });
    }
  }
}
