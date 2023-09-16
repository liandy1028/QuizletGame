import styled from 'styled-components';
import dynamic from 'next/dynamic';
import WordButton from '../components/WordButton';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

// Dynamically load game component to prevent errors with importing phaser synchronously
const GameComponent = dynamic(() => import('../components/GameComponent'), {
  ssr: false,
  loading: () => <LoadingDiv>Loading...</LoadingDiv>,
});

// #region css

const OuterBox = styled.div`
  display: grid;
  * {
    grid-column: 1;
    grid-row: 1;
  }
  max-height: 100vh;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: #11141f;
`;

const GameWindow = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
  display: flex;
  canvas {
    margin: auto;
    max-height: 100%;
    max-width: 100%;
    touch-action: none;
  }
`;

const LoadingDiv = styled.div`
  margin: auto;
  width: 75%;
  text-align: center;
  font-size: 50px;
  color: #ffffff;
`;

// #endregion

export default function MainPage() {
  const [setName, setSetName] = useState('Jokes');

  const handleWordButtonClick = word => {
    setSetName(word);
  };

  return (
    <OuterBox>
      <Sidebar target={handleWordButtonClick} />
      <GameWindow>
        <GameComponent key={setName} setName={setName} />
      </GameWindow>
    </OuterBox>
  );
}
