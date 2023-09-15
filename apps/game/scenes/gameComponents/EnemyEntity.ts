import { Scene } from 'phaser';
import { EnemyConfig, GameStudiableItem } from '../types';
import PlayerEntity from './PlayerEntity';
import {
  Assets,
  GameEvents,
  PhysicsConstants,
  SortingLayers,
} from '../constants';
import HealthBar from './HealthBar';

export const EnemyStates = {
  Moving: 'Moving',
  Stunned: 'Stunned',
  Dead: 'Dead',
};

export default class EnemyEntity extends Phaser.GameObjects.Container {
  constructor(enemyConfig: EnemyConfig, scene: Scene, player: PlayerEntity) {
    super(scene);

    this.enemyConfig = enemyConfig;
    this.player = player;

    this.markedForDeath = false;
    this.currentHealth = enemyConfig.maxHealth;

    this.sprite = scene.add
      .sprite(0, 0, '')
      .setName('sprite')
      .setScale(Assets.SPRITE_SCALE);

    this.healthBar = new HealthBar(scene, this);

    this.add([this.sprite, this.healthBar]);
    this.setSize(120, 120);
    this.setX(scene.cameras.main.width);
    this.setY(200);
    this.setName('enemyEntity');
    this.setDepth(SortingLayers.ENEMY_SPRITE);

    // Setup physics
    this.physicsGroup = scene.physics.add.group(this, {
      key: PhysicsConstants.ENEMY_GROUP,
    });

    scene.physics.add.collider(
      player,
      this.physicsGroup,
      this.onHitPlayer,
      null,
      this
    );

    this.scene.add.existing(this);

    this.switchState(EnemyStates.Moving);
  }

  textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    color: '#FFFFFF',
    align: 'center',
    fontStyle: 'bold',
  };

  enemyConfig: EnemyConfig;
  player: PlayerEntity;

  physicsGroup: Phaser.Physics.Arcade.Group;

  // state
  currentHealth: number;
  currentState: string;
  damageTintTimer: number;
  deathAnimTimer: number;
  markedForDeath: boolean;

  // Components
  sprite: Phaser.GameObjects.Sprite;
  healthBar: HealthBar;

  private onHitPlayer() {
    this.scene.events.emit(GameEvents.ENEMY_TOUCHED_PLAYER, this.player, this);
  }

  update(deltaTime: number) {
    switch (this.currentState) {
      case EnemyStates.Dead:
        this.handleDeadUpdate(deltaTime);
        break;
      case EnemyStates.Moving:
        this.handleMovingUpdate(deltaTime);
        break;
      case EnemyStates.Stunned:
        this.handleStunnedUpdate(deltaTime);
        break;
    }
  }

  private handleDeadUpdate(deltaTime: number) {}

  private handleMovingUpdate(deltaTime: number) {
    // Move towards the player
    let cx = this.x;
    let px = this.player.x;
    let moveDist = Math.min(
      Math.abs(cx - px),
      (deltaTime * this.enemyConfig.speed) / 1000
    );

    this.x += moveDist * Math.sign(px - cx);
  }

  private handleStunnedUpdate(deltaTime: number) {
    if (this.damageTintTimer > 0) {
      this.damageTintTimer -= deltaTime;
    } else {
      this.switchState(EnemyStates.Moving);
    }
  }

  private switchState(newState: string) {
    switch (newState) {
      case EnemyStates.Dead:
        this.sprite.play(this.enemyConfig.deathAnim.key);
        this.markedForDeath = true;
        this.sprite.on(
          Phaser.Animations.Events.ANIMATION_COMPLETE,
          this.handleDeath,
          this
        );
        break;
      case EnemyStates.Moving:
        this.sprite.play(this.enemyConfig.moveAnim.key);
        break;
      case EnemyStates.Stunned:
        this.sprite.play(this.enemyConfig.stunnedAnim.key);
        break;
    }
    this.currentState = newState;
  }

  takeDamage(damage: number) {
    if (this.currentState == EnemyStates.Dead) return;

    let prevHealth = this.currentHealth;
    this.currentHealth = Math.max(0, this.currentHealth - damage);

    this.emit(GameEvents.ENEMY_TOOK_DAMAGE, prevHealth, this.currentHealth);

    this.damageTintTimer = this.enemyConfig.damageStunnedDuration;
    if (this.currentHealth <= 0) {
      this.switchState(EnemyStates.Dead);
    } else {
      this.switchState(EnemyStates.Stunned);
    }
  }

  tryMarkForDeath(damage: number) {
    if (this.currentHealth <= damage) {
      this.markedForDeath = true;
    }
  }

  private handleDeath() {
    this.emit(GameEvents.ENEMY_DIED, this);
    this.destroy();
  }
}
