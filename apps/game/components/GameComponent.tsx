import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { Preloader, MainScene, MainUIScene, GameOverScene } from '../scenes';
import { Registry } from '../scenes/constants';
import * as SizeConsts from './gameSize';

export default function GameComponent(props: { setName?: string }) {
  function initPhaser() {
    let config: Phaser.Types.Core.GameConfig = {
      type: Phaser.CANVAS,
      width: SizeConsts.WIDTH,
      height: SizeConsts.HEIGHT,
      canvas: document.getElementById('canvas') as HTMLCanvasElement,
      transparent: true,
      // antialias: true,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          // debug: true,
        },
      },
      scene: [Preloader, MainScene, MainUIScene, GameOverScene],
    };
    let game = new Phaser.Game(config);
    // game.canvas.addEventListener(
    //   Phaser.Input.Events.POINTER_WHEEL,
    //   function (event) {
    //     return false;
    //   },
    //   false
    // );
    game.registry.set(
      Registry.QUIZLET_SET_NAME,
      props.setName ? props.setName : Registry.QUIZLET_SET_ALL
    );

    return game;
  }

  // Make sure the game instance is cleaned up
  useEffect(
    () => {
      let phaserGame = initPhaser();
      // cleanup
      return () => {
        phaserGame.destroy(false);
      };
    },
    [] /* only run once; config ref elided on purpose */
  );

  return (
    <canvas
      id="canvas"
      width={SizeConsts.WIDTH}
      height={SizeConsts.HEIGHT}
    ></canvas>
  );
}
