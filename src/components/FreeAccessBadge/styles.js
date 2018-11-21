import styled, { keyframes } from 'styled-components';

const styles = {};

const shimmerEffect = keyframes`
 0%{background-position: -468px 0;} 
 100%{background-position: 468px 0;}`;

styles.ExclusiveBox = styled.div`
  font: 700 9px 'Roboto', sans-serif;
  letter-spacing: 1px;
  margin-top: 8px;
  padding: 3px 8px;
  border-radius: 3px;
  color: #fff;
  background: #ffb301 linear-gradient(to right, #ffb301 0%, #ffd99d 20%, #ffb301 40%, #ffb301 100%) no-repeat;
  display: inline-block;
  cursor: pointer;
  animation: ${shimmerEffect} 4s linear infinite forwards;
`;

export default styles;
