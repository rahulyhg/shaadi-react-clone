import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Hammer from 'hammerjs';
import { SlideWrapper, SlideContainer } from './styles';

class Swiper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
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
    const { forceOverlay: newJustNow } = props;
    if (newJustNow !== this.props.forceOverlay) {
      const { delta } = this.state;
      const activeIndex = delta < 0 ? 1 : -1;
      this.setState({ animate: true, activeIndex, delta: -activeIndex * this.SlideWrapper.offsetWidth });
      setTimeout(() => {
        this.props.onSwipeFinish();
      }, 300);
    }
  }

  componentWillUnmount() {
    this.hammer.off(this.swipeEvents, this.handleSwipe);
  }

  handleSwipe = ev => {
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
    this.buffer.push({ activeIndex, delta: -activeIndex * offsetWidth });
    if (isSwipingLeft) {
      this.props.onSwipeLeft(activeIndex);
      return;
    }
    this.props.onSwipeRight(activeIndex);
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
    const { delta, animate } = this.state;
    const { children, renderOverlay, forceOverlay } = this.props;
    return (
      <div style={{ overflow: 'hidden' }} ref={node => (this.SlideWrapper = node)}>
        <SlideWrapper>
          <SlideContainer isSlowlyAnimated animate={animate} style={{ transform: `translateX(${delta}px)` }} passThrough={['style']}>
            {!!renderOverlay && renderOverlay(forceOverlay || delta > 0)}
            {children}
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
};

Swiper.propTypes = {
  children: PropTypes.node.isRequired,
  onSwipeLeft: PropTypes.func.isRequired,
  onSwipeRight: PropTypes.func.isRequired,
  onSwipeFinish: PropTypes.func.isRequired,
  renderOverlay: PropTypes.func.isRequired,
  forceOverlay: PropTypes.bool.isRequired,
};

export default Swiper;
