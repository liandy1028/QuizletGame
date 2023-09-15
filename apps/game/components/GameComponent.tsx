import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { Preloader, MainScene, MainUIScene, GameOverScene } from '../scenes';
import { Registry } from '../scenes/constants';

export default function GameComponent(props: { setName?: string }) {
  function initPhaser() {
    var config: Phaser.Types.Core.GameConfig = {
      type: Phaser.CANVAS,
      width: 1280,
      height: 720,
      canvas: document.getElementById('canvas') as HTMLCanvasElement,
      antialias: true,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: true,
        },
      },
      scene: [Preloader, MainScene, MainUIScene, GameOverScene],
    };
    let game = new Phaser.Game(config);
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

  return <canvas id="canvas" width="1280" height="720"></canvas>;
}
