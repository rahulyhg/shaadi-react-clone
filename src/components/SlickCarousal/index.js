import React from 'react';
import Slider from 'react-slick';
import PropTypes from '../../PropTypes';
import './slick.css';
import './slick-theme.css';

class SlickCarousal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      slideToMove: 4,
    };
  }

  render() {
    return <Slider {...this.props.settings}>{this.props.children}</Slider>;
  }
}
SlickCarousal.defaultProps = {
  settings: {},
};
SlickCarousal.propTypes = {
  children: PropTypes.node.isRequired,
  settings: PropTypes.shape({}),
};
export default SlickCarousal;
