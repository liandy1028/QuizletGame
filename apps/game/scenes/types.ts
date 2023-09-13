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
  health: number;
  speed: number;
  spriteImage: string;
};
