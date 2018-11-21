import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const styles = {};

styles.InputWrapper = styled('div')`
  text-align: center;
  position: relative;
  height: auto;
  display: block;
  width: 202px;
  margin: 0 auto;
`;

styles.InputButton = styled(Button)`
  && {
    border-radius: 3px;
    border: 0;
    width: ${props => props.width};
    margin: 30px 0 0;
    color: ${props => props.color};
    background-color: #00bcd5;
    cursor: pointer;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    transition: all 300ms ease;
    margin: ${props => props.margin};
    align-items: center;
    text-decoration: none;
    font: 400 16px/16px 'Roboto', sans-serif;
    color: #fff;
    height: ${props => props.height};
    padding: ${props => props.padding};
    text-transform: capitalize;
    z-index: ${({ zindex }) => zindex};
    @media (min-width: 769px) {
      &:hover {
        color: #fff !important;
        background-color: #0194a8;
        box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15) !important;
      }
    }
  }
`;

styles.AboutMeDrawer = styles.InputButton.extend`
  && {
    width: 192px;
    height: 44px;
    background-color: #00bcd5;
    color: #ffffff;
  }
`;

styles.AboutMeDrawerDisabled = styles.AboutMeDrawer.extend`
  && {
    background-color: #f1f1f2;
    color: #b1b3b9;
    pointer-events: none;
  }
`;

styles.DisabledInputButton = styles.InputButton.extend`
&& {
background-color: #cdced1;
}
`;

export default styles;
