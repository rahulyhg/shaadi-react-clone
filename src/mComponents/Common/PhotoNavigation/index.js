import React from 'react';
import PropTypes from '../../../PropTypes';
import { PhotoNavigationArrow } from './styles';

class PhotoNavigation extends React.PureComponent {
  render() {
    return <PhotoNavigationArrow isVisible={this.props.isVisible} type={this.props.type} onClick={this.props.onClick} />;
  }
}

PhotoNavigation.defaultProps = {
  isVisible: true,
  type: null,
  onClick: () => {},
};

PhotoNavigation.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  type: PropTypes.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PhotoNavigation;
