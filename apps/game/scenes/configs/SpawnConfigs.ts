import { SpawnSourceConfig } from '../types';

export const MinSpawnInterval: number = 2000;

export const FastSpawnSource: SpawnSourceConfig = {
  spawnDelay: {
    min: 2000,
    max: 5000,
  },
  initialCredits: 8,
  initialSpawnDelay: 0,
  spawnCreditMultipler: 0.6,
  spawnCreditGainCalculator: score =>
    FastSpawnSource.spawnCreditMultipler * (0.1 + Math.sqrt(score * 0.02)),
};

export const SlowSpawnSource: SpawnSourceConfig = {
  spawnDelay: {
    min: 6000,
    max: 12000,
  },
  initialCredits: 0,
  initialSpawnDelay: 10000,
  spawnCreditMultipler: 0.4,
  spawnCreditGainCalculator: score =>
    SlowSpawnSource.spawnCreditMultipler * (0.1 + Math.sqrt(score * 0.02)),
};
