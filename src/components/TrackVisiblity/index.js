import React, { Component } from 'react';
import EventListener, { withOptions } from 'react-event-listener';
import PropTypes from 'prop-types';

export default class TrackVisiblity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTracked: false,
    };
  }

  componentDidMount() {
    this.isComponentVisible();
  }

  handleScroll = elem => {
    this.isComponentVisible();
  };

  isVisible = ({ top, left, bottom, right, width, height }, windowWidth, windowHeight) => {
    const { offset, partialVisibility } = this.props;
    if (top + right + bottom + left === 0) {
      return false;
    }
    const topThreshold = 0 - offset;
    const leftThreshold = 0 - offset;
    const widthCheck = windowWidth + offset;
    const heightCheck = windowHeight + offset;
    return partialVisibility
      ? top + height >= topThreshold && left + width >= leftThreshold && bottom - height <= heightCheck && right - width <= widthCheck
      : top >= topThreshold && left >= leftThreshold && bottom <= heightCheck && right <= widthCheck;
  };

  isComponentVisible = () => {
    const html = document.documentElement;
    const element = document.querySelector(`#${this.props.nodeRef}`);
    const boundingClientRect = (element && element.getBoundingClientRect && element.getBoundingClientRect()) || {};
    const windowWidth = window.innerWidth || html.clientWidth;
    const windowHeight = window.innerHeight || html.clientHeight;

    const isVisible = this.isVisible(boundingClientRect, windowWidth, windowHeight);

    if (isVisible && !this.state.isTracked) {
      this.props.daTracking('scroll_view');
      this.setState({ isTracked: true });
    }
  };

  render() {
    return (
      <div>
        <EventListener target="window" onScroll={withOptions(this.handleScroll, { passive: true, capture: false })} />
        {this.props.children}{' '}
      </div>
    );
  }
}

TrackVisiblity.defaultProps = {
  daTracking: null,
  nodeRef: null,
  offset: 0,
  partialVisibility: true,
};

TrackVisiblity.propTypes = {
  daTracking: PropTypes.func,
  nodeRef: PropTypes.string,
  offset: PropTypes.number,
  partialVisibility: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
