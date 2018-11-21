import React from 'react';
import Animated from 'animated/lib/targets/react-dom';
import HorizontalPan from '../HorizontalPan';
import PropTypes from '../../PropTypes';

class CardSwiper extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      transformX: new Animated.Value(0),
      overlayOpacity: new Animated.Value(0),
    };
  }

  onSwipeCancel = () => {
    Animated.timing(this.state.transformX, { toValue: 0, duration: 200 }).start();
    Animated.timing(this.state.overlayOpacity, { toValue: 0, duration: 200 }).start();
  };

  onSwipeLeft = () => {
    Animated.timing(this.state.transformX, { toValue: -window.innerWidth, duration: 300 }).start();
    this.props.onSwipeLeft();
  };

  onSwipeRight = () => {
    Animated.timing(this.state.transformX, { toValue: window.innerWidth, duration: 300 }).start();
    this.props.onSwipeRight();
  };

  onTap = () => {
    this.onSwipeCancel();
    this.props.onTap();
  };

  render() {
    const { id } = this.props;
    return (
      <div style={styles.wrapper} id={id}>
        <Animated.div
          style={{ ...styles.container, transform: [{ translateX: this.state.transformX }] }}
          {...new HorizontalPan({ animX: this.state.transformX, overlayOpacity: this.state.overlayOpacity }, id, {
            onSwipeCancel: this.onSwipeCancel,
            onSwipeLeft: this.onSwipeLeft,
            onSwipeRight: this.onSwipeRight,
            onTap: this.onTap,
          }).getLocalListeners()}
        >
          <Animated.div
            style={{
              ...this.props.overlayStyles,
              zIndex: this.state.overlayOpacity.interpolate({
                inputRange: [0, 0.01, 1],
                outputRange: [0, 1, 1],
              }),
              willChange: 'opacity',
              opacity: this.state.overlayOpacity,
            }}
          >
            {this.props.overlayText}
          </Animated.div>
          {this.props.children}
        </Animated.div>
      </div>
    );
  }
}

const styles = {
  wrapper: {
    width: '100%',
  },
  container: {
    position: 'relative',
    display: 'block',
    whiteSpace: 'nowrap',
    willChange: 'transform',
  },
};

CardSwiper.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onSwipeLeft: PropTypes.func.isRequired,
  onTap: PropTypes.func.isRequired,
  onSwipeRight: PropTypes.func.isRequired,
  overlayStyles: PropTypes.muiClasses.isRequired,
  overlayText: PropTypes.string.isRequired,
};

export default CardSwiper;
