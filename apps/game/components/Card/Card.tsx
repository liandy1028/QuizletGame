import styled from 'styled-components';

export const Card = styled.div<{
    height: number;
    width: number;
  }>`
    height: ${props => props.height}px;
    width: ${props => props.width}px;
    position: relative;
    background-color: #118b81;
    border-radius: 10%;
  `;
