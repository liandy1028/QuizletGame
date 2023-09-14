import { GameAnimationConfig, HealthbarConfig } from '../types';

export const HEALTH_BAR_IDLE_ANIM: HealthbarConfig = {
  spriteSheetPath: 'healthPoint.png',
  spriteSheetFrameConfig: {
    frameWidth: 24,
    frameHeight: 24,
  },
  idleAnim: {
    key: 'health-bar-idle',
    frameNumbers: [0],
    frameRate: 3,
    repeat: -1,
  },
  removeAnim: {
    key: 'health-bar-remove',
    frameNumbers: [1, 2, 3, 4, 5,6,7,8,9],
    frameRate: 12,
    repeat: 0,
  },
};
