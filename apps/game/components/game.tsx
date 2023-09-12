import { useEffect, useState, useRef } from 'react';

export default function GameComponent() {
  async function initPhaser() {
    const Phaser = await import('phaser');
    const { Preloader } = await import('../scenes/Preloader');
    const { MainScene } = await import('../scenes/MainScene');
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
