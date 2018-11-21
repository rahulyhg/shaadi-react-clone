import React from 'react';
import styled, { keyframes } from 'styled-components';
import withTheme from '@material-ui/core/styles/withTheme';

export const spinAnimation = keyframes`to { transform: rotate(360deg); }`;

const CircularProgress = styled.div`
  display: inline-block;
  width: ${({ size }) => size};
  height: ${({ size }) => size};

  border: ${({ thickness }) => thickness}px solid transparent;
  border-left-color: ${({ color }) => color};
  border-bottom-color: ${({ color }) => color};
  border-right-color: ${({ color }) => color};
  border-radius: 100%;

  animation: ${spinAnimation} ${({ duration }) => duration} linear infinite;
`;

// The reason this uses both withTheme and styled-components instead of withStyles is because I wanted the style declaration to be clean and seperate from the logic allowing us to mimic the material-ui api.
export default withTheme()(({ theme, ...p }) => {
  const color = theme.palette[p.color || 'primary'];
  const props = {
    ...p,
    color: color.main || p.color,
    size: `${p.size || 32}px`,
    thickness: p.thickness || 3,
    duration: p.duration || '0.8s',
  };
  return <CircularProgress {...props} />;
});
