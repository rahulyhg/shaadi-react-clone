import React from 'react';
import s from './styles';

import PropTypes from '../../../PropTypes';
import Tooltip from '../Tooltip';

const getTimeLeft = target => target - Math.floor(new Date() / 1000);
const getTimer = target => {
  const timeLeft = getTimeLeft(target);
  if (timeLeft < 0) {
    return {
      hrsTens: 0,
      hrsUnit: 0,
      minTens: 0,
      minUnit: 0,
      secTens: 0,
      secUnit: 0,
      hrsTensAnim: false,
      hrsUnitAnim: false,
      minTensAnim: false,
      minUnitAnim: false,
      secTensAnim: false,
      secUnitAnim: false,
      timeLeft,
    };
  }
  const hrs = Math.floor(timeLeft / 3600);
  const min = Math.floor((timeLeft % 3600) / 60);
  const sec = Math.floor(timeLeft % 60);
  const timer = {
    hrsTens: Math.floor(hrs / 10),
    hrsUnit: hrs % 10,
    minTens: Math.floor(min / 10),
    minUnit: min % 10,
    secTens: Math.floor(sec / 10),
    secUnit: sec % 10,
    timeLeft,
  };
  timer.secUnitAnim = timer.timeLeft >= 0;
  timer.secTensAnim = timer.secUnitAnim && timer.secUnit === 0;
  timer.minUnitAnim = timer.secTensAnim && timer.secTens === 0;
  timer.minTensAnim = timer.minUnitAnim && timer.minUnit === 0;
  timer.hrsUnitAnim = timer.minTensAnim && timer.minTens === 0;
  timer.hrsTensAnim = timer.hrsUnitAnim && timer.hrsUnit === 0;
  return timer;
};

class RecommendationTicker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      willFade: false,
      timer: getTimer(props.target_time),
    };
    this.drInterval = null;
    this.startTicking = this.startTicking.bind(this);
    this.stopTicking = this.stopTicking.bind(this);
    this.hideTicker = this.hideTicker.bind(this);
  }

  componentDidMount() {
    this.startTicking();
  }

  componentWillReceiveProps(props) {
    const timer = getTimer(props.target_time);
    if (timer.timeLeft > 0) {
      this.startTicking();
    }
    if (JSON.stringify(this.state.timer) !== JSON.stringify(timer)) {
      this.setState({ timer });
    }
  }

  componentWillUnmount() {
    this.stopTicking();
  }

  startTicking() {
    if (this.drInterval) return;
    this.drInterval = setInterval(() => {
      const timer = getTimer(this.props.target_time);
      if (timer < 0) this.hideTicker();
      if (JSON.stringify(this.state.timer) !== JSON.stringify(timer)) {
        this.setState({ timer });
      }
    }, 1000);
  }

  stopTicking() {
    if (this.drInterval) {
      clearInterval(this.drInterval);
      this.drInterval = null;
    }
  }

  hideTicker() {
    this.stopTicking();
    // setTimeout(() => this.props.onAction('closeFourHour'), 1000);
    this.setState({ willFade: true });
  }

  render() {
    const {
      willFade,
      timer: {
        hrsTensAnim,
        hrsTens,
        hrsUnitAnim,
        hrsUnit,
        minTenAnim,
        minTens,
        minUnitAnim,
        minUnit,
        secTensAnim,
        secTens,
        secUnitAnim,
        secUnit,
      },
    } = this.state;
    return (
      <s.RecommendationTickerWrap willFade={willFade} profilePageBucket={this.props.profilePageBucket}>
        <s.RecommendationTickerMsg profilePageBucket={this.props.profilePageBucket}>
          {['B', 'C'].includes(this.props.profilePageBucket) ? 'Time left to Connect' : 'TIME LEFT TO CONNECT'}
          <Tooltip
            trigger="hover"
            placement="bottom"
            overlayClassName="rc-tooltip-dark-invite"
            offset={[0, -5]}
            isQuestionMark
            overlay={<span>This recommendation will not be available after the time expires. If you want to Connect, act now!</span>} //eslint-disable-line
          />
        </s.RecommendationTickerMsg>
        <s.CountDownHolder profilePageBucket={this.props.profilePageBucket}>
          <s.CountDownPosition>
            <s.CountDigit animate={hrsTensAnim}>{hrsTens}</s.CountDigit>
          </s.CountDownPosition>
          <s.CountDownPosition>
            <s.CountDigit animate={hrsUnitAnim}>{hrsUnit}</s.CountDigit>
          </s.CountDownPosition>
          <s.CountText>h</s.CountText>
          <s.CountColun profilePageBucket={this.props.profilePageBucket}>:</s.CountColun>
          <s.CountDownPosition>
            <s.CountDigit animate={minTenAnim}>{minTens}</s.CountDigit>
          </s.CountDownPosition>
          <s.CountDownPosition>
            <s.CountDigit animate={minUnitAnim}>{minUnit}</s.CountDigit>
          </s.CountDownPosition>
          <s.CountTextMin>m</s.CountTextMin>
          <s.CountColun profilePageBucket={this.props.profilePageBucket}>:</s.CountColun>
          <s.CountDownPosition>
            <s.CountDigit animate={secTensAnim}>{secTens}</s.CountDigit>
          </s.CountDownPosition>
          <s.CountDownPosition>
            <s.CountDigit animate={secUnitAnim}>{secUnit}</s.CountDigit>
          </s.CountDownPosition>
          <s.CountText>s</s.CountText>
        </s.CountDownHolder>
      </s.RecommendationTickerWrap>
    );
  }
}

RecommendationTicker.defaultProps = {
  profilePageBucket: 'A',
};
RecommendationTicker.propTypes = {
  target_time: PropTypes.number.isRequired,
  profilePageBucket: PropTypes.string,
};

export default RecommendationTicker;
