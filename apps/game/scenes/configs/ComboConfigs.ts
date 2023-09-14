import { ComboLevelConfig } from '../types';

const ComboLevelC: ComboLevelConfig = {
  comboLevelDisplayName: 'C',
  comboDuration: 1,
  damage: 1,
  barColor: 0x000000,
};

const ComboLevelB: ComboLevelConfig = {
  comboLevelDisplayName: 'B',
  comboDuration: 7500,
  damage: 2,
  barColor: 0x47ffa9,
};

const ComboLevelA: ComboLevelConfig = {
  comboLevelDisplayName: 'A',
  comboDuration: 5500,
  damage: 3,
  barColor: 0x47a0ff,
};

const ComboLevelS: ComboLevelConfig = {
  comboLevelDisplayName: 'S',
  comboDuration: 4500,
  damage: 4,
  barColor: 0x7547ff,
};

const ComboLevelSSS: ComboLevelConfig = {
  comboLevelDisplayName: 'SSS',
  comboDuration: 2500,
  damage: 5,
  barColor: 0xff47ed,
};

export const ComboSetConfig: ComboLevelConfig[] = [
  ComboLevelC,
  ComboLevelB,
  ComboLevelA,
  ComboLevelS,
  ComboLevelSSS,
];
