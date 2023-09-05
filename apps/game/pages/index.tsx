import { group } from 'console';
import Fun from 'dataset/sets/Fun';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box } from '../components/Box';
import { Card } from '../components/Card';

// #region constants

const GAME_HEIGHT = 600;
const GAME_WIDTH = 850;
const BAR_HEIGHT = 50;
const CARD_HEIGHT = 120;
const CARD_WIDTH = GAME_WIDTH / 5;
const GRAVITY = 2;

// #endregion

// #region css

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Row = styled.div<{ gap: number; top: number }>`
  gap: ${props => props.gap}px;
  top: ${props => props.top}px;
  position: relative;
  display: flex;
  flex-direction: row;
`;

// #endregion

export default function Game() {
  const { disneyPrincessTrivia: quizletSet } = Fun.getAllSetsMap();
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [correctId, setCorrectId] = useState('');
  const [gameIsActive, setGameIsActive] = useState(false);
  const [rowPos, setRowPos] = useState(0);

  // makes cards fall
  useEffect(() => {
    let timeId;
    if (gameIsActive && rowPos + CARD_HEIGHT < GAME_HEIGHT) {
      timeId = setInterval(() => {
        setRowPos(rowPos + GRAVITY);
      }, 12);
      return () => {
        clearInterval(timeId);
      };
    } else if (gameIsActive) {
      setLives(lives - 1);
      resetCards();
    }
  }, [gameIsActive, lives, rowPos]);

  // ends game when lives run out
  useEffect(() => {
    if (gameIsActive && lives <= 0) {
      setGameIsActive(false);
      resetCards();
    }
  }, [gameIsActive, lives]);

  /* if (typeof window !== 'undefined') return null; */

  const getCards = () => {
    // shuffle cards
    const shuffled = quizletSet.studiableItem.sort(() => 0.5 - Math.random());
    // select 3 random cards
    const selected = shuffled.slice(0, 3);
    // set the keywords
    for (var i = 0; i < selected.length; i++) {
      const word = selected[i].cardSides[0].media[0]['plainText'];
      document.getElementById(`card-${i}-text`).innerHTML = word;
    }
    // select a random correct card
    const id = Math.floor(Math.random() * 3);
    setCorrectId(`card-${id}`);
    // get and set the definition
    const def = selected[id].cardSides[1].media[0]['plainText'];
    document.getElementById('def-text').innerHTML = def;
  };

  // checks if the correct card was selected
  const handleClick = e => {
    if (e.target.id == correctId) {
      setScore(score + 1);
      resetCards();
    } else {
      e.target.style.backgroundColor = '#FF0000';
      e.target.style.pointerEvents = 'none';
      setLives(lives - 1);
    }
  };

  // starts the game if not yet started
  const startGame = () => {
    if (!gameIsActive) {
      setGameIsActive(true);
      setScore(0);
      setLives(3);
      resetCards();
    }
  };

  // resets the row back to the top and gets new cards
  const resetCards = () => {
    for (var i = 0; i < 3; i++) {
      document.getElementById(`card-${i}`).style.pointerEvents = 'auto';
      document.getElementById(`card-${i}`).style.backgroundColor = '#118b81';
    }
    setRowPos(0);
    getCards();
  };

  return (
    <Container onClick={startGame}>
      <Box
        height={BAR_HEIGHT}
        width={GAME_WIDTH}
        top={0}
        backgroundColor="#FF0000;"
      >
        <span>
          Score: {score} | Lives: {lives}
        </span>
      </Box>
      <Box
        height={GAME_HEIGHT}
        width={GAME_WIDTH}
        top={BAR_HEIGHT}
        backgroundColor="#000000;"
      >
        <Row gap={CARD_WIDTH} top={rowPos}>
          <Card
            id="card-0"
            height={CARD_HEIGHT}
            width={CARD_WIDTH}
            onClick={handleClick}
          >
            <span id="card-0-text">Word 0</span>
          </Card>
          <Card
            id="card-1"
            height={CARD_HEIGHT}
            width={CARD_WIDTH}
            onClick={handleClick}
          >
            <span id="card-1-text">Word 0</span>
          </Card>
          <Card
            id="card-2"
            height={CARD_HEIGHT}
            width={CARD_WIDTH}
            onClick={handleClick}
          >
            <span id="card-2-text">Word 0</span>
          </Card>
        </Row>
      </Box>
      <Box
        height={BAR_HEIGHT}
        width={GAME_WIDTH}
        top={BAR_HEIGHT + GAME_HEIGHT}
        backgroundColor="#0000FF;"
      >
        <span id="def-text">Definition</span>
      </Box>
    </Container>
  );
}
