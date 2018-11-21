import React from 'react';
import { number, element } from 'prop-types';

class Timer extends React.Component {
  state = {
    elapsed: 0,
  };

  componentDidMount() {
    this.timer = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick = () => {
    this.setState(state => ({
      elapsed: state.elapsed + 1,
    }));
  };

  render() {
    const { elapsed } = this.state;
    const { loader, response, time } = this.props;

    return <div>{elapsed >= time ? response : loader}</div>;
  }
}

Timer.propTypes = {
  time: number.isRequired,
  loader: element.isRequired,
  response: element.isRequired,
};

export default Timer;
