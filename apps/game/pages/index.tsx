import { group } from 'console';
import Fun from 'dataset/sets/Fun';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import GameComponent from '../components/game';

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

// #endregion

export default function MainPage() {
  const { disneyPrincessTrivia: quizletSet } = Fun.getAllSetsMap();
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [correctId, setCorrectId] = useState('');
  const [gameIsActive, setGameIsActive] = useState(false);
  const [rowPos, setRowPos] = useState(0);

  return (
    <>
      <Banner>This is the greatest game probably</Banner>
      <GameWindow id="phaser-game-content">
        <GameComponent></GameComponent>
      </GameWindow>
    </>
  );
}
