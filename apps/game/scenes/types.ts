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
  spawnCreditCost: number;

  // Spritesheet (reuse filepath as key)
  spriteSheetPath: string;
  spriteSheetFrameConfig: Phaser.Types.Loader.FileTypes.ImageFrameConfig;

  // anims
  moveAnim: GameAnimationConfig;
  stunnedAnim: GameAnimationConfig;
  deathAnim: GameAnimationConfig;
};

export type PlayerConfig = {
  xPos: number;
  yPos: number;
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
  spellPool: SpellConfig[];
  // comboBarUIAnimation : GameAnimationConfig;
};

export type SpellConfig = {
  initialSpeed: number;
  launchAngleSpread: {
    min: number;
    max: number;
  };
  homingDuration: number;
  acceleration: number;
  hitboxSize: {
    width: number;
    height: number;
  };

  spriteSheetPath: string;
  spriteSheetFrameConfig: Phaser.Types.Loader.FileTypes.ImageFrameConfig;
  spellAnimation: GameAnimationConfig;

  impactParticles: ParticleConfig[];
  trailParticles: ParticleConfig[];
  castParticles: ParticleConfig[];

  impactScreenShake?: ScreenShakeConfig;
  castScreenShake?: ScreenShakeConfig;
};

export type ParticleConfig = {
  emitterConfig: Phaser.Types.GameObjects.Particles.ParticleEmitterConfig;
  textureKey: string;
};

export type GameAnimationConfig = {
  key: string;
  frameNumbers: number[];
  // null by default property for easy anim creation in preload
  frames?: Phaser.Types.Animations.AnimationFrame[];
  frameRate: number;
  repeat: number;
};

export type SpawnSourceConfig = {
  spawnDelay: {
    min: number;
    max: number;
  };
  initialCredits: number;
  initialSpawnDelay: number;
  spawnCreditMultipler: number;
  spawnCreditGainCalculator: (score: number) => number;
};
