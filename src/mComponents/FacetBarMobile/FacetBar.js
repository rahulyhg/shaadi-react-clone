import React from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '../AppBar';
import { FacetBarWrapper, FacetBarContainer, FacetBarAction } from './styles';

class FacetBar extends React.PureComponent {
  componentWillMount() {
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
  }

  render() {
    const props = this.props;
    return (
      <FacetBarWrapper>
        <AppBar title="Refine Search" onBack={props.onModalClose} styles={{ backgroundColor: 'rgb(252, 91, 99)' }} />
        <FacetBarContainer>
          {props.children}
          <FacetBarAction>
            <Button fullWidth variant="raised" color="secondary" onClick={props.onModalClose}>
              Refine Search
            </Button>
          </FacetBarAction>
        </FacetBarContainer>

        <style
        >{`#portal-full-screen {position: fixed; top: 0; left: 0; right: 0; width: 100%; height: 100vh; z-index: 5; background: #fff;}`}</style>
      </FacetBarWrapper>
    );
  }
}

FacetBar.defaultProps = {};
FacetBar.propTypes = {};

export default FacetBar;
