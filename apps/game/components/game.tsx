import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { Preloader, MainScene, MainUIScene, GameOverScene } from '../scenes';

export default function GameComponent() {
  function initPhaser() {
    var config: Phaser.Types.Core.GameConfig = {
      type: Phaser.CANVAS,
      width: 1280,
      height: 720,
      parent: 'phaser-game-content',
      canvas: document.getElementById('canvas') as HTMLCanvasElement,
      antialias: false,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: true,
        },
      },
      scene: [Preloader, MainScene, MainUIScene, GameOverScene],
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
