import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

const ZERO_OPACITY = '0.00000001';

const transitionStyles = {
  entering: { opacity: ZERO_OPACITY },
  entered: { opacity: 1 },
};

const FadeInTransition = ({ children, duration, delay, exitDelay, show, ...props }) => (
  <Transition in={show} appear timeout={{ enter: delay, exit: exitDelay }}>
    {state => (
      <div
        {...props}
        style={{
          transition: `opacity ${duration}ms ease-in-out`,
          willChange: 'opacity',
          opacity: ZERO_OPACITY,
          ...transitionStyles[state],
        }}
      >
        {children}
      </div>
    )}
  </Transition>
);

FadeInTransition.defaultProps = {
  duration: 500,
  delay: 500,
  exitDelay: 0,
  show: true,
};

FadeInTransition.propTypes = {
  children: PropTypes.element.isRequired,
  duration: PropTypes.number,
  delay: PropTypes.number,
  exitDelay: PropTypes.number,
  show: PropTypes.bool,
};

export default FadeInTransition;
