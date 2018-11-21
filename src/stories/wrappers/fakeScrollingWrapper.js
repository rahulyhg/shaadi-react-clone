import React from 'react';
import PropTypes from 'prop-types';

export default class FakeScrollingWrapper extends React.Component {
  static propTypes = {
    renderSection: PropTypes.func.isRequired,
  };
  state = { scrollTop: 0 };
  componentDidMount() {
    setTimeout(this.startScroll, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  startScroll = () => {
    this.interval = setInterval(() => {
      const { scrollTop } = this.state;
      if (scrollTop > 500) {
        clearInterval(this.interval);
        return;
      }
      this.setState({ scrollTop: scrollTop + 3 });
      window.scrollTo(0, scrollTop);
    }, 4);
  };

  render() {
    const { scrollTop } = this.state;
    return <div style={{ width: '420px' }}>{this.props.renderSection(scrollTop)}</div>;
  }
}
