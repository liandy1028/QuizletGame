import styled from 'styled-components';

export const Box = styled.div<{
  height: number;
  width: number;
  top: number;
  backgroundColor: string;
}>`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  top: ${props => props.top}px;
  background-color: ${props => props.backgroundColor};
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
