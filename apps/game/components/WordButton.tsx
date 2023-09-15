import styled from 'styled-components';

// Define a styled button component
const Button = styled.button`
  background-color: #007bff;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
  text-align: center;
`;

// Define a styled span for the word
const Word = styled.span`
  font-size: 24px;
  font-weight: bold;
`;

const WordButton = ({ text, onClick }) => {
  return (
    <Button onClick={onClick}>
      <Word>{text}</Word>
    </Button>
  );
};

export default WordButton;
