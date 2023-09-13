import { Scene } from 'phaser';
import { Assets, GameEvents } from '../constants';
import { Dataset, StudiableItem } from 'dataset/types';
import { EnemyEntity, PlayerEntity } from '../gameComponents';
import { EnemyConfig } from '../types';

import QuizletSetBank from './QuizletSetBank';
import GameDirector from './GameDirector';

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

  // enemy Configs
  basicEnemy: EnemyConfig = {
    health: 5,
    speed: 170,
    spriteImage: Assets.Images.DUMMY_ENEMY,
  };

  update(deltaTime: number) {
    this.spawnTimer -= deltaTime;

    // Spawn
    if (this.spawnTimer <= 0) {
      this.spawnEnemy(this.basicEnemy);
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
    return enemy;
  }

  public getClosestEnemy(): EnemyEntity {
    let nearestX = Number.MAX_SAFE_INTEGER;
    let closestEnemy: EnemyEntity = null;
    for (let enemy of this.currentEnemies) {
      if (enemy.x < nearestX) {
        nearestX = enemy.x;
        closestEnemy = enemy;
      }
    }

    return closestEnemy;
  }
}
