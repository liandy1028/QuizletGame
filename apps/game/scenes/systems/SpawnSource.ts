import { EnemyEntity } from '../gameComponents';
import { EnemyConfig, SpawnSourceConfig } from '../types';

export default class SpawnSource {
  constructor(
    spawnSourceConfig: SpawnSourceConfig,
    enemyConfigPool: EnemyConfig[]
  ) {
    this.spawnCredits = spawnSourceConfig.initialCredits;
    this.enemyPool = enemyConfigPool;
    this.spawnSourceConfig = spawnSourceConfig;
    this.spawnTimer = spawnSourceConfig.initialSpawnDelay;
  }

  // Config
  enemyPool: EnemyConfig[];
  spawnSourceConfig: SpawnSourceConfig;

  // State
  private spawnCredits: number;
  private spawnTimer: number;

  private getEnemyToSpawn(): EnemyConfig {
    // find most expensive enemy that can be spawned
    // TODO: sort / Use binary search (probably not needed)
    let mostExpensiveEnemy: EnemyConfig = null;
    let mostExpensiveCost: number = 0;
    for (let enemy of this.enemyPool) {
      if (
        enemy.spawnCreditCost <= this.spawnCredits &&
        enemy.spawnCreditCost > mostExpensiveCost
      ) {
        mostExpensiveEnemy = enemy;
        mostExpensiveCost = enemy.spawnCreditCost;
      }
    }

    if (mostExpensiveEnemy != null) {
      this.spawnCredits -= mostExpensiveEnemy.spawnCreditCost;
    }
    return mostExpensiveEnemy;
  }

  // Returns an enemy config to spawn if appropriate
  tickSpawnManager(deltaTime: number, currentScore: number): EnemyConfig {
    this.spawnTimer -= deltaTime;
    this.updateSpawnCredits(deltaTime, currentScore);
    if (this.spawnTimer <= 0) {
      this.setRandomSpawnTimer();
      return this.getEnemyToSpawn();
    }
    return null;
  }

  private updateSpawnCredits(deltaTime: number, currentScore: number) {
    let deltaTimeSeconds = deltaTime / 1000;
    // console.log(this.spawnCredits);
    let spawCreditGain =
      deltaTimeSeconds *
      this.spawnSourceConfig.spawnCreditGainCalculator(currentScore);
    this.spawnCredits += spawCreditGain;
  }

  setRandomSpawnTimer() {
    let spawnDelay = this.spawnSourceConfig.spawnDelay;
    this.spawnTimer = Phaser.Math.Between(spawnDelay.min, spawnDelay.max);
  }

  resetTimer() {
    this.spawnTimer = 0;
  }

  enforceSpawnInterval(interval: number) {
    if (this.spawnTimer < interval) {
      this.spawnTimer = interval;
    }
  }

  addCredits(value: number) {
    this.spawnCredits += value;
  }
}
