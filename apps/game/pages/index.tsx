import styled from 'styled-components';
import dynamic from 'next/dynamic';
import WordButton from '../components/WordButton';
import { useState } from 'react';

// Dynamically load game component to prevent errors with importing phaser synchronously
const GameComponent = dynamic(() => import('../components/GameComponent'), {
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
  const [setName, setSetName] = useState(null);

  const handleWordButtonClick = word => {
    setSetName(word);
  };

  return (
    <>
      <div>
        <div>
          <WordButton
            text="Disney Princess Trivia"
            onClick={() => handleWordButtonClick('Disney Princess Trivia')}
          />
          <WordButton
            text="Studio Ghibli Movie Trivia"
            onClick={() => handleWordButtonClick('Studio Ghibli Movie Trivia')}
          />
          <WordButton
            text="Chinese Food"
            onClick={() => handleWordButtonClick('Chinese Food')}
          />
          {/* Add more WordButtons as needed */}
        </div>
      </div>
      <GameWindow>
        <GameComponent />
      </GameWindow>
    </>
  );
}
