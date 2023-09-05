import { group } from 'console';
import Fun from 'dataset/sets/Fun';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import GameComponent from './game'


// #region constants

const GAME_HEIGHT = 600;
const GAME_WIDTH = 850;
const BAR_HEIGHT = 50;
const CARD_HEIGHT = 120;
const CARD_WIDTH = GAME_WIDTH / 5;
const GRAVITY = 2;

// #endregion

// #region css


// #endregion

export default function MainPage() {
  const { disneyPrincessTrivia: quizletSet } = Fun.getAllSetsMap();
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [correctId, setCorrectId] = useState('');
  const [gameIsActive, setGameIsActive] = useState(false);
  const [rowPos, setRowPos] = useState(0);

  return (
    <div>
      <GameComponent></GameComponent>
      <div id="phaser-game-content"></div>
    </div>
  );
}
