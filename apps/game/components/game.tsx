import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { Preloader, MainScene, MainUIScene } from '../scenes';

export default function GameComponent() {
  function initPhaser() {
    var config = {
      type: Phaser.CANVAS,
      width: 800,
      height: 600,
      parent: 'phaser-game-content',
      canvas: document.getElementById('canvas') as HTMLCanvasElement,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: false,
        },
      },
      scene: [Preloader, MainScene, MainUIScene],
    };
    var game = new Phaser.Game(config);

    return game;
  }

  // Make sure the game is only initialized once
  const phaserGameRef = useRef<Phaser.Game>(null);
  useEffect(
    () => {
      if (phaserGameRef.current) {
        return;
      }

      phaserGameRef.current = initPhaser();
    },
    [] /* only run once; config ref elided on purpose */
  );

  return <canvas id="canvas" width="800" height="600"></canvas>;
}
