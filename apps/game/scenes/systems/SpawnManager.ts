import { Scene } from 'phaser';
import { Assets, GameEvents } from '../constants';
import { Dataset, StudiableItem } from 'dataset/types';
import { EnemyEntity, PlayerEntity } from '../gameComponents';
import { EnemyConfig } from '../types';

import QuizletSetBank from './QuizletSetBank';
import GameDirector from './GameDirector';
import { EnemyConfigs, SpawnConfigs } from '../configs';
import { MainScene } from '../';
import SpawnSource from './SpawnSource';

export default class SpawnManager {
  constructor(scene: MainScene, player: PlayerEntity) {
    this.scene = scene;
    this.player = player;
    this.spawnSources = [
      new SpawnSource(
        SpawnConfigs.FastSpawnSource,
        EnemyConfigs.AllEnemyConfigs
      ),
      new SpawnSource(
        SpawnConfigs.SlowSpawnSource,
        EnemyConfigs.AllEnemyConfigs
      ),
    ];

    this.currentEnemies = [];
  }

  // spawning
  spawnSources: SpawnSource[];

  // Dependencies
  gameDirector: GameDirector;
  scene: MainScene;
  player: PlayerEntity;

  // State
  currentEnemies: EnemyEntity[];

  update(deltaTime: number) {
    // Update spawn sources
    let score = this.scene.getScore();
    for (let spawnSource of this.spawnSources) {
      let requestedEnemyConfig = spawnSource.tickSpawnManager(deltaTime, score);

      if (requestedEnemyConfig != null) {
        this.spawnEnemy(requestedEnemyConfig);
        // prevent overlapping spawns by enforcing delay between spawns
        for (let spawnSource of this.spawnSources) {
          spawnSource.enforceSpawnInterval(SpawnConfigs.MinSpawnInterval);
        }
        break;
      }
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
    enemy.addListener(
      GameEvents.ENEMY_MARKED_FOR_DEATH,
      this.onEnemyMarkedForDeath,
      this
    );
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

  private onEnemyMarkedForDeath(enemy: EnemyEntity) {
    // Make sure there is always at least one enemy to target on screen
    // If all enemies are marked for death then try to spawn one immediately
    for (let enemy of this.currentEnemies) {
      if (!enemy.markedForDeath) {
        return;
      }
    }

    // Hardcoded to only reset fast spawner
    this.spawnSources[0].addCredits(10);
    let requestedEnemyConfig = this.spawnSources[0].resetTimer();
  }

  private onEnemyDied(enemy: EnemyEntity) {
    // Delete enemy from update list
    let index = this.currentEnemies.findIndex(x => x == enemy);
    this.currentEnemies.splice(index, 1);

    this.scene.addToScore(enemy.enemyConfig.pointReward);
  }
}
