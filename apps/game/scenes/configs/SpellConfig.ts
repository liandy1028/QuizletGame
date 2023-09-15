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
  angularVelocity: 25,
  launchAngleRange: {
    min: -45,
    max: 45,
  },
  hitboxSize: {
    width: 50,
    height: 50,
  },
  initialSpeed: 200,
  castParticles: [],
  impactParticles: [
    {
      textureKey: Assets.Images.BASIC_PARTICLE,
      emitterConfig: {
        color: [0xfacc22, 0xf89800, 0xf83600, 0x9f0404],
        colorEase: 'quad.out',
        lifespan: 500,
        scale: { start: 0.7, end: 0, ease: 'sine.out' },
        speed: 200,
        advance: 500,
        frequency: 50,
        blendMode: 'ADD',
        duration: 100,
        angle: {
          min: -45,
          max: 45,
        },
      },
    },
  ],
  trailParticles: [
    {
      textureKey: Assets.Images.BASIC_PARTICLE,
      emitterConfig: {
        color: [0xfacc22, 0xf89800, 0xf83600, 0x9f0404],
        colorEase: 'quad.out',
        lifespan: 500,
        scale: { start: 0.25 * Assets.SPRITE_SCALE, end: 0, ease: 'sine.out' },
        speed: 25,
        advance: 500,
        frequency: 50,
        blendMode: 'ADD',
        follow: this,
      },
    },
  ],
};

export const AllSpells: SpellConfig[] = [BasicSpell];
