
import Fun from 'dataset/sets/Fun';
import styled from 'styled-components';

// #region constants

const GAME_HEIGHT = 500;
const GAME_WIDTH = 850;
const BAR_HEIGHT = 50;
const CARD_HEIGHT = 120;
const CARD_WIDTH = GAME_WIDTH / 5;

// #endregion

// #region css

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Box = styled.div`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  top: ${(props) => props.top}px;
  background-color: ${(props) => props.backgroundColor}px;
  position: absolute;
  overflow: hidden;
  & span {
    color: white;
    font-size: 24px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    text-align: center;
  }
`;

const Card = styled.div`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  position: relative;
  background-color: #118b81;
  border-radius: 10%;
`;

const Row = styled.div`
  gap: ${(props) => props.gap}px;
  top: ${(props) => props.top}px;
  position: relative;
  display: flex;
  flex-direction: row;
`;

// #endregion

export default function Game() {

  const { disneyPrincessTrivia: quizletSet } = Fun.getAllSetsMap();

  /* if (typeof window !== 'undefined') return null; */

  const getCards = () => {
    
  }

  return (
    <Container>
      <Box height={BAR_HEIGHT} width={GAME_WIDTH} top={0} backgroundColor="#FF0000;">
        <span>Score: 0 | Lives: 3</span>
      </Box>
      <Box height={GAME_HEIGHT} width={GAME_WIDTH} top={BAR_HEIGHT} backgroundColor="#000000;">
        <Row gap={CARD_WIDTH} top={25}>
          <Card height={CARD_HEIGHT} width = {CARD_WIDTH}>Cheese</Card>
          <Card height={CARD_HEIGHT} width = {CARD_WIDTH}>Cheese1</Card>
          <Card height={CARD_HEIGHT} width = {CARD_WIDTH}>Cheese2</Card>
        </Row>
      </Box>
      <Box height={BAR_HEIGHT} width={GAME_WIDTH} top={BAR_HEIGHT + GAME_HEIGHT} backgroundColor="#0000FF;">
        <span>Definition</span> 
      </Box>
    </Container>
  );
}
