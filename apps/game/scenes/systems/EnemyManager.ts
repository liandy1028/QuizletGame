import { Scene } from 'phaser';
import { Assets, GameEvents } from '../constants';
import { Dataset, StudiableItem } from 'dataset/types';
import { EnemyEntity, PlayerEntity } from '../gameComponents';
import { EnemyConfig } from '../types';

import QuizletSetBank from './QuizletSetBank';
import GameDirector from './GameDirector';
import { EnemyConfigs } from '../configs';

export default class EnemyManager {
  constructor(scene: Scene, player: PlayerEntity) {
    this.scene = scene;
    this.spawnTimer = 0;
    this.player = player;

    this.currentEnemies = [];
  }

  // stats
  spawnCooldown: number = 7000;

  // Dependencies
  gameDirector: GameDirector;
  scene: Scene;
  quizletSetBank: QuizletSetBank;
  player: PlayerEntity;

  // State
  spawnTimer: number;
  currentEnemies: EnemyEntity[];

  update(deltaTime: number) {
    this.spawnTimer -= deltaTime;

    // Spawn
    if (this.spawnTimer <= 0) {
      this.spawnEnemy(EnemyConfigs.AllEnemyConfigs[0]);
      this.spawnTimer = this.spawnCooldown;
    }

    // update enemies
    for (let enemy of this.currentEnemies) {
      enemy.update(deltaTime);
    }
  }

  private spawnEnemy(config: EnemyConfig): EnemyEntity {
    let enemy = new EnemyEntity(config, this.scene, this.player);
    this.currentEnemies.push(enemy);
    enemy.addListener(GameEvents.ENEMY_DIED, this.onEnemyDied, this);
    return enemy;
  }

  public getClosestEnemy(): EnemyEntity {
    let nearestX = Number.MAX_SAFE_INTEGER;
    let closestEnemy: EnemyEntity = null;
    for (let enemy of this.currentEnemies) {
      if (enemy.x < nearestX && !enemy.markedForDeath) {
        nearestX = enemy.x;
        closestEnemy = enemy;
      }
    }

    return closestEnemy;
  }

  private onEnemyDied(enemy: EnemyEntity) {
    // Delete enemy from update list
    let index = this.currentEnemies.findIndex(x => x == enemy);
    this.currentEnemies.splice(index, 1);

    // Award points
    this.scene.events.emit(
      GameEvents.SCORE_ADD_EVENT,
      enemy.enemyConfig.pointReward
    );
  }
}
