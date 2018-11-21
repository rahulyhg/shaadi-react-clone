import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Hammer from 'hammerjs';
import { SlideWrapper, SlideContainer } from './styles';

class Swiper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: props.activeIndex,
      delta: 0,
      animate: false,
    };
    this.buffer = [];
    this.swipeEvents = 'panend pancancel panleft panright';
  }

  componentDidMount() {
    this.hammer = new Hammer.Manager(ReactDOM.findDOMNode(this.SlideWrapper), { touchAction: 'pan-y' }); //eslint-disable-line
    this.hammer.add(new Hammer.Pan({ threshold: 10 }));
    this.hammer.on(this.swipeEvents, this.handleSwipe);
  }

  componentWillReceiveProps(props) {
    const { activeIndex } = this.state;
    if (props.activeIndex !== activeIndex) {
      const delta = -props.activeIndex * this.SlideWrapper.offsetWidth;
      this.buffer = [];
      this.setState({ animate: true, activeIndex: props.activeIndex, delta });
    }
  }

  componentWillUnmount() {
    this.hammer.off(this.swipeEvents, this.handleSwipe);
  }

  handleSwipe = ev => {
    const { deltaX } = ev;
    const isSwipingLeft = deltaX < 0;
    const isSwipingRight = deltaX > 0;
    const { children } = this.props;
    const { activeIndex } = this.state;
    const isInvalidSwipe = (isSwipingRight && activeIndex === 0 && deltaX > 0) || (isSwipingLeft && activeIndex === children.length - 1);
    if (isInvalidSwipe) {
      return true;
    }
    this[ev.type] && this[ev.type](ev);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        this.animate();
      });
    });
    return true; //eslint-disable-line
  };

  animate = () => {
    this.setState(this.buffer.reduce((acc, st) => ({ ...acc, ...st }), {}));
    this.buffer = [];
  };

  panend = ev => {
    const { deltaX } = ev;
    const { offsetWidth } = this.SlideWrapper;
    let { activeIndex } = this.state;
    const thresholdDelta = offsetWidth * 0.5;
    const hasExcededThresholdDelta = Math.abs(deltaX) > thresholdDelta;
    if (!this.state.animate) {
      this.setState({ animate: true });
    }
    if (!hasExcededThresholdDelta) {
      this.resetPosition();
      return;
    }
    const isSwipingLeft = deltaX < 0;
    activeIndex = isSwipingLeft ? activeIndex + 1 : activeIndex - 1;
    // this.buffer.push({ activeIndex, delta: -activeIndex * offsetWidth });
    this.props[isSwipingLeft ? 'onSwipeLeft' : 'onSwipeRight'](activeIndex);
  };

  panleft = ev => {
    if (this.state.animate) {
      this.setState({ animate: false });
    }
    this.buffer.push({ delta: this.calculateDelta(ev.deltaX) });
  };

  panright = ev => {
    if (this.state.animate) {
      this.setState({ animate: false });
    }
    this.buffer.push({ delta: this.calculateDelta(ev.deltaX) });
  };

  resetPosition = () => {
    const { offsetWidth } = this.SlideWrapper;
    const { activeIndex } = this.state;
    const delta = -activeIndex * offsetWidth;
    this.buffer.push({ delta });
  };

  calculateDelta = (deltaX = 0) => {
    const { offsetWidth } = this.SlideWrapper;
    const { activeIndex } = this.state;
    const newDelta = deltaX - (activeIndex * offsetWidth); //eslint-disable-line
    return newDelta;
  };

  render() {
    const { animate, delta } = this.state;
    return (
      <div ref={node => (this.SlideWrapper = node)} style={this.props.styles}>
        <SlideWrapper>
          <SlideContainer animate={animate} style={{ transform: `translateX(${delta}px)` }} passThrough={['style']}>
            {this.props.children}
          </SlideContainer>
        </SlideWrapper>
      </div>
    );
  }
}

Swiper.defaultProps = {
  onSwipeLeft: () => {},
  onSwipeRight: () => {},
  activeSwipeIndex: 0,
  styles: {},
};

Swiper.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  styles: PropTypes.shape({}),
  onSwipeLeft: PropTypes.func.isRequired, //eslint-disable-line
  onSwipeRight: PropTypes.func.isRequired, //eslint-disable-line
};

export default Swiper;
