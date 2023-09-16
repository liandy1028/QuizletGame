import { AnimatedBackgroundConfig } from '../types';

export const MAIN_BACKGROUND_CONFIG: AnimatedBackgroundConfig = {
  // Animations
  spriteSheetPath: 'backgrounds/mainBackground.png',
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
  spriteSheetPath: 'backgrounds/gameoverbackground.png',
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

export const LOADING_ASSETS_BACKGROUND_CONFIG: AnimatedBackgroundConfig = {
  // Animations
  spriteSheetPath: 'backgrounds/loadingBackground.png',
  spriteSheetFrameConfig: {
    frameWidth: 320,
    frameHeight: 180,
  },
  anim: {
    key: 'loading-bg',
    frameNumbers: [0, 1, 2, 3],
    frameRate: 8,
    repeat: -1,
  },
};

export const AllBackgroundConfigs: AnimatedBackgroundConfig[] = [
  MAIN_BACKGROUND_CONFIG,
  GAME_OVER_BACKGROUND_CONFIG,
];
