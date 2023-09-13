import { group } from 'console';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';

// Dynamically load game component to prevent errors with importing phaser synchronously
const GameComponent = dynamic(() => import('../components/game'), {
  ssr: false,
  loading: () => <LoadingDiv>Loading...</LoadingDiv>,
});

// #region css

const GameWindow = styled.div`
  width: 100%;
  display: flex;
  canvas {
    margin: auto;
    width: 75%;
  }
`;

const Banner = styled.div`
  text-align: center;
  font-size: 50px;
`;

const LoadingDiv = styled.div`
  margin: auto;
  width: 75%;
  text-align: center;
  font-size: 50px;
`;

// #endregion

export default function MainPage() {
  return (
    <>
      <GameWindow id="phaser-game-content">
        <GameComponent></GameComponent>
      </GameWindow>
    </>
  );
}
