import { Assets } from '../constants';
import { EnemyConfig } from '../types';

export const TEST_ENEMY: EnemyConfig = {
  maxHealth: 1,
  speed: 25,
  damageStunnedDuration: 1000,
  pointReward: 10,
  spawnCreditCost: 5,

  // Animations
  spriteSheetPath: 'enemies/dummyEnemy.png',
  spriteSheetFrameConfig: {
    frameWidth: 48,
    frameHeight: 48,
  },
  moveAnim: {
    key: 'dummyEnemy-move',
    frameNumbers: [0, 1],
    frameRate: 3,
    repeat: -1,
  },
  stunnedAnim: {
    key: 'dummyEnemy-stunned',
    frameNumbers: [2],
    frameRate: 1,
    repeat: -1,
  },
  deathAnim: {
    key: 'dummyEnemy-death',
    frameNumbers: [3, 4, 5, 6, 7],
    frameRate: 8,
    repeat: 0,
  },
};

// bird
// bunny
// turtle

export const AllEnemyConfigs: EnemyConfig[] = [TEST_ENEMY];
