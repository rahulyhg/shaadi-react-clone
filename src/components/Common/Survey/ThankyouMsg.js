import React, { Fragment } from 'react';
import PropTypes from '../../../PropTypes';
import Button from '../../Common/FormElements/Button';
import s from './styles';
import FieldTick from '../../Common/FieldTick';

const myshaadiPageRedirect = props => {
  window.location.href = props.isNative ? 'http://native_app_fake_url' : `${props.wwwBaseUrl}/my-shaadi`;
  window.location.target = `_blank`;
  return false;
};

class ThankyouMsg extends React.Component {
  componentDidMount() {
    setTimeout(() => myshaadiPageRedirect(this.props), 30000);
  }
  render() {
    return (
      <Fragment>
        <s.tickWapper>
          <FieldTick />
        </s.tickWapper>
        <s.ThankYouFor>{this.props.msg.map((m, index) => <Fragment key={m}>{m}</Fragment>)}</s.ThankYouFor>
        <s.CtaBtnWrp>
          <Button onClick={() => myshaadiPageRedirect(this.props)} layerBtn={'csat'} defaultWrap={s.ContinueButton}>
            Continue
          </Button>
        </s.CtaBtnWrp>
      </Fragment>
    );
  }
}
ThankyouMsg.defaultProps = {
  isNative: false,
};
ThankyouMsg.propTypes = {
  msg: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default ThankyouMsg;
