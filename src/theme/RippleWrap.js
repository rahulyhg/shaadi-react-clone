import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const RippleWrap = styled(Button)`
  && {
    padding: ${({ padding = 0 }) => padding};
    min-width: ${({ minwidth }) => minwidth};
    min-height: ${({ minheight }) => minheight};
    height: ${({ height }) => height};
    width: ${({ width }) => width};
    background: ${({ bg }) => bg} !important;
    box-shadow: ${({ boxshadow }) => boxshadow} !important;
    &:hover {
      background: transparent !important;
    }
  }
`;

export default RippleWrap;
