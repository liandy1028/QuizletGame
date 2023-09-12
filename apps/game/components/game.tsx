import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { Preloader, MainScene } from '../scenes';

export default function GameComponent() {
  function initPhaser() {
    var config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'phaser-game-content',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: false,
        },
      },
      scene: [Preloader, MainScene],
    };
    var game = new Phaser.Game(config);

    return game;
  }

  // Make sure the game is only initialized once
  const phaserGameRef = useRef(null);
  useEffect(
    () => {
      if (phaserGameRef.current) {
        return;
      }
      phaserGameRef.current = initPhaser();
    },
    [] /* only run once; config ref elided on purpose */
  );

  return <></>;
}
