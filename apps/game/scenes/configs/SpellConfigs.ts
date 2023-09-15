import { Assets } from '../constants';
import { SpellConfig } from '../types';

export const BasicSpell: SpellConfig = {
  spriteSheetPath: 'spells/basicSpell.png',
  spriteSheetFrameConfig: { frameWidth: 32, frameHeight: 32 },
  spellAnimation: {
    key: 'basic-spell-anim',
    frameNumbers: [0],
    frameRate: 1,
    repeat: -1,
  },
  homingDuration: 1000,
  acceleration: 300,
  initialSpeed: 600,
  launchAngleSpread: {
    min: 2,
    max: 35,
  },
  hitboxSize: {
    width: 50,
    height: 50,
  },
  castParticles: [],
  impactParticles: [
    {
      textureKey: Assets.Images.BASIC_PARTICLE,
      emitterConfig: {
        color: [0xfacc22, 0xf89800, 0xf83600, 0x9f0404],
        colorEase: 'quad.out',
        lifespan: 1000,
        scale: { start: 2, end: 0, ease: 'sine.out' },
        speed: {
          min: 200,
          max: 400,
        },
        advance: 100,
        frequency: 25,
        blendMode: 'ADD',
        duration: 100,
        angle: {
          min: -35,
          max: 35,
        },
      },
    },
  ],
  trailParticles: [
    {
      textureKey: Assets.Images.LINE_PARTICLE,
      emitterConfig: {
        color: [0xfacc22, 0xf89800, 0xf83600, 0x9f0404],
        colorEase: 'quad.out',
        lifespan: 1000,
        scale: { start: 0.6 * Assets.SPRITE_SCALE, end: 0, ease: 'sine.out' },
        speed: 0,
        advance: 500,
        frequency: 25,
        blendMode: 'ADD',
      },
    },
  ],
  castScreenShake: {
    duration: 50,
    intensity: 0.04,
  },
  impactScreenShake: {
    duration: 125,
    intensity: 0.02,
  },
};

export const AllSpells: SpellConfig[] = [BasicSpell];
