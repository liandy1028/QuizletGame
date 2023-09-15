import { Scene } from 'phaser';
import { ComboBar } from '../gameComponents';
import { ComboConfigs } from '../configs';

export default class ComboManager {
  constructor(scene: Scene) {
    this.comboBar = new ComboBar(scene, 25, 360);
  }

  // Dependencies
  scene: Scene;
  comboBar: ComboBar;

  // State
  currentComboIndex = 0;
  currentComboTimer = 0;

  update(deltaTime: number) {
    if (this.currentComboIndex > 0) {
      this.currentComboTimer -= deltaTime;
      if (this.currentComboTimer <= 0) {
        this.comboDown();
      }
    }

    this.comboBar.update(deltaTime);
    let currentComboLevel = ComboConfigs.ComboSetConfig[this.currentComboIndex];
    this.comboBar.setText(currentComboLevel.comboLevelDisplayName);
    this.comboBar.barColor = currentComboLevel.barColor;
    this.comboBar.setValue(
      this.currentComboTimer / currentComboLevel.comboDuration
    );
  }

  comboUp() {
    let maxComboLevel = ComboConfigs.ComboSetConfig.length;
    if (this.currentComboIndex < maxComboLevel - 1) {
      this.currentComboIndex++;
    }
    this.currentComboTimer =
      ComboConfigs.ComboSetConfig[this.currentComboIndex].comboDuration;
  }

  comboDown() {
    if (this.currentComboIndex == 0) {
      this.currentComboTimer = 0;
    } else {
      this.currentComboIndex--;
      this.currentComboTimer =
        ComboConfigs.ComboSetConfig[this.currentComboIndex].comboDuration;
    }
  }

  getCurrentComboDamage(): number {
    return ComboConfigs.ComboSetConfig[this.currentComboIndex].damage;
  }

  getRandomSpellConfig() {
    let spells = ComboConfigs.ComboSetConfig[this.currentComboIndex].spellPool;
    return spells[Phaser.Math.Between(0, spells.length - 1)];
  }
}
