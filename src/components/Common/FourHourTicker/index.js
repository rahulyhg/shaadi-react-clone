import React from 'react';
import s from './styles';

import PropTypes from '../../../PropTypes';

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

class FourHourTicker extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      willFade: false,
      timer: getTimer(props.ticker.target_time),
    };
    this.fourHourInterval = null;
    this.startTicking = this.startTicking.bind(this);
    this.stopTicking = this.stopTicking.bind(this);
    this.hideTicker = this.hideTicker.bind(this);
  }

  componentDidMount() {
    this.startTicking();
  }

  componentWillReceiveProps(props) {
    const timer = getTimer(props.ticker.target_time);
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
    if (this.fourHourInterval) return;
    this.fourHourInterval = setInterval(() => {
      const timer = getTimer(this.props.ticker.target_time);
      if (timer.timeLeft < 0) this.hideTicker();
      if (JSON.stringify(this.state.timer) !== JSON.stringify(timer)) {
        this.setState({ timer });
      }
    }, 1000);
  }

  stopTicking() {
    if (this.fourHourInterval) {
      clearInterval(this.fourHourInterval);
      this.fourHourInterval = null;
    }
  }

  hideTicker() {
    this.stopTicking();
    setTimeout(() => this.props.onAction('closeFourHour'), 1000);
    this.setState({ willFade: true });
  }

  render() {
    return (
      <s.FourHourTickerWrap willFade={this.state.willFade}>
        <s.FourHourTickerSubWrap>
          <s.FourHourTickerLeftWrap>
            <s.FourHourTickerMsg>
              Your Profile will be visible to your Matches in
              <s.CountDownHolder>
                <s.CountDownPosition>
                  <s.CountDigit animate={this.state.timer.hrsTensAnim}>{this.state.timer.hrsTens}</s.CountDigit>
                </s.CountDownPosition>
                <s.CountDownPosition>
                  <s.CountDigit animate={this.state.timer.hrsUnitAnim}>{this.state.timer.hrsUnit}</s.CountDigit>
                </s.CountDownPosition>
                <s.CountText>h</s.CountText>
                <s.CountColun>:</s.CountColun>
                <s.CountDownPosition>
                  <s.CountDigit animate={this.state.timer.minTenAnim}>{this.state.timer.minTens}</s.CountDigit>
                </s.CountDownPosition>
                <s.CountDownPosition>
                  <s.CountDigit animate={this.state.timer.minUnitAnim}>{this.state.timer.minUnit}</s.CountDigit>
                </s.CountDownPosition>
                <s.CountTextMin>m</s.CountTextMin>
                <s.CountColun>:</s.CountColun>
                <s.CountDownPosition>
                  <s.CountDigit animate={this.state.timer.secTensAnim}>{this.state.timer.secTens}</s.CountDigit>
                </s.CountDownPosition>
                <s.CountDownPosition>
                  <s.CountDigit animate={this.state.timer.secUnitAnim}>{this.state.timer.secUnit}</s.CountDigit>
                </s.CountDownPosition>
                <s.CountText>s</s.CountText>
              </s.CountDownHolder>
            </s.FourHourTickerMsg>

            <s.RequiredDoc>
              {(this.props.ticker.photo && (
                <s.RequiredDocLink isExternal to={`/my-shaadi/personal-profile/improve-profile`} icon="upload_your_photo">
                  Upload your Photo
                </s.RequiredDocLink>
              )) || <s.RequiredDocSpan icon="upload_your_photo">Upload your Photo</s.RequiredDocSpan>}
              {(this.props.ticker.career && (
                <s.RequiredDocLink isExternal to={`/my-shaadi/personal-profile/improve-profile#form_sec_career`} icon="add_career_details">
                  Add career details
                </s.RequiredDocLink>
              )) || <s.RequiredDocSpan icon="add_career_details">Add career details</s.RequiredDocSpan>}
              {(this.props.ticker.family_details && (
                <s.RequiredDocLink
                  isExternal
                  to={`/my-shaadi/personal-profile/improve-profile#form_sec_family`}
                  icon="add_family_details"
                  isLast
                >
                  Add family details
                </s.RequiredDocLink>
              )) || (
                <s.RequiredDocSpan icon="add_family_details" isLast>
                  Add family details
                </s.RequiredDocSpan>
              )}
            </s.RequiredDoc>
          </s.FourHourTickerLeftWrap>

          <s.FourHourBtn isExternal to={`/my-shaadi/personal-profile/improve-profile`}>
            Let&apos;s improve your Profile
          </s.FourHourBtn>

          <s.FourHourClose
            onClick={() => {
              this.hideTicker();
            }}
          />
        </s.FourHourTickerSubWrap>
      </s.FourHourTickerWrap>
    );
  }
}

FourHourTicker.propTypes = {
  onAction: PropTypes.func.isRequired,
  ticker: PropTypes.shape({
    family_details: PropTypes.bool.isRequired,
    astro: PropTypes.bool.isRequired, // not yet used?
    photo: PropTypes.bool.isRequired,
    career: PropTypes.bool.isRequired,
    target_time: PropTypes.number.isRequired,
  }).isRequired,
};

export default FourHourTicker;
