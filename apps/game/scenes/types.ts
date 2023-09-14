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
  // Spritesheet (reuse filepath as key)
  spriteSheetPath: string;
  spriteSheetFrameConfig: Phaser.Types.Loader.FileTypes.ImageFrameConfig;

  // anims
  moveAnim: GameAnimationConfig;
  stunnedAnim: GameAnimationConfig;
  deathAnim: GameAnimationConfig;
};

export type GameAnimationConfig = {
  key: string;
  frameNumbers: number[];
  // null by default property for easy anim creation in preload
  frames?: Phaser.Types.Animations.AnimationFrame[];
  frameRate: number;
  repeat: number;
};
