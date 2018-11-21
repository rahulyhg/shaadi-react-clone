import React from 'react';
import PropTypes from '../../../../../PropTypes';
import SvgCheckmark from '../../../../Common/SvgCheckmark';
import ss from '../../styles';
import s from '../styles';

const ImediateAction = props => (
  <ss.PremSuccessMsg>
    <ss.InboxStatusText isBold type={props.type}>
      {props.justNow && (
        <s.justNowCase type={props.type}>
          {props.checkVisible && (
            <s.SvgCheckmark type={props.type}>
              <SvgCheckmark isListingSvg />
            </s.SvgCheckmark>
          )}
          {props.JustNowText}
          <br />
        </s.justNowCase>
      )}
    </ss.InboxStatusText>
  </ss.PremSuccessMsg>
);

ImediateAction.defaultProps = {
  type: 'inbox',
  isPartialLoading: false,
  justNow: false,
  checkVisible: true,
  JustNowText: '',
};
ImediateAction.propTypes = {
  type: PropTypes.string,
  justNow: PropTypes.bool,
  checkVisible: PropTypes.bool,
  JustNowText: PropTypes.string,
};

export default ImediateAction;
