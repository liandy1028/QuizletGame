import { AnimatedBackgroundConfig } from '../types';

export const MAIN_BACKGROUND_CONFIG: AnimatedBackgroundConfig = {
  // Animations
  spriteSheetPath: 'mainBackground.png',
  spriteSheetFrameConfig: {
    frameWidth: 320,
    frameHeight: 180,
  },
  anim: {
    key: 'main-bg',
    frameNumbers: [0, 1],
    frameRate: 2,
    repeat: -1,
  },
};

export const GAME_OVER_BACKGROUND_CONFIG: AnimatedBackgroundConfig = {
  // Animations
  spriteSheetPath: 'gameoverbackground.png',
  spriteSheetFrameConfig: {
    frameWidth: 320,
    frameHeight: 180,
  },
  anim: {
    key: 'game-over-bg',
    frameNumbers: [0, 1],
    frameRate: 2,
    repeat: -1,
  },
};

export const AllBackgroundConfigs: AnimatedBackgroundConfig[] = [
  MAIN_BACKGROUND_CONFIG,
  GAME_OVER_BACKGROUND_CONFIG,
];
