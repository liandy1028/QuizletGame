export type GameStudiableItem = {
  id: number;
  word: {
    text: string;
  };
  definition: {
    text: string;
    imageID?: string;
  };
};

export type EnemyConfig = {
  maxHealth: number;
  speed: number;
  damageStunnedDuration: number;
  pointReward: number;

  // Spritesheet (reuse filepath as key)
  spriteSheetPath: string;
  spriteSheetFrameConfig: Phaser.Types.Loader.FileTypes.ImageFrameConfig;

  // anims
  moveAnim: GameAnimationConfig;
  stunnedAnim: GameAnimationConfig;
  deathAnim: GameAnimationConfig;
};

export type AnimatedBackgroundConfig = {
  spriteSheetPath: string;
  anim: GameAnimationConfig;
  spriteSheetFrameConfig: Phaser.Types.Loader.FileTypes.ImageFrameConfig;
};

export type ScreenShakeConfig = {
  intensity: number;
  duration: number;
};

export type HealthbarConfig = {
  spriteSheetPath: string;
  spriteSheetFrameConfig: Phaser.Types.Loader.FileTypes.ImageFrameConfig;
  idleAnim: GameAnimationConfig;
  removeAnim: GameAnimationConfig;
};

export type ComboLevelConfig = {
  comboLevelDisplayName: string;
  comboDuration: number;
  damage: number;
  barColor: number;
  // comboBarUIAnimation : GameAnimationConfig;
};

export type GameAnimationConfig = {
  key: string;
  frameNumbers: number[];
  // null by default property for easy anim creation in preload
  frames?: Phaser.Types.Animations.AnimationFrame[];
  frameRate: number;
  repeat: number;
};
