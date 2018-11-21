import React from 'react';
import PropTypes from '../../../../../PropTypes';
import SvgLoader from '../../../../Common/SvgLoader';
import ss from '../../styles';
import s from '../styles';
import ImediateAction from './ImediateAction';

const actionMsg = source => {
  switch (source) {
    case 'featured': {
      return (
        <s.msgItem>
          <s.ActionMsg>Invitation Declined</s.ActionMsg>
          <s.ActHeading isVisible>Changed Your Mind?</s.ActHeading>
        </s.msgItem>
      );
    }
    default: {
      return <s.CtaHeading isVisible>Changed Your Mind?</s.CtaHeading>;
    }
  }
};
const NegativeCase = props => {
  if (props.justNow) {
    return <ImediateAction {...props} JustNowText="Invitation Declined" checkVisible={false} />;
  }
  return (
    <ss.InboxStatusSuccess isVisible>
      <s.InvitationBtnContainer isVisible>
        <ss.EoiWrapper source={props.type}>
          {actionMsg(props.type)}
          <s.AcceptGrp>
            <s.ListAcceptBtn onClick={props.onAccept} membershipTags={props.membershipTags} title="Accept" isHovered={props.isHovered} />

            <s.ListAcceptBtnText onClick={props.onAccept} membershipTags={props.membershipTags} isHovered={props.isHovered}>
              Accept
            </s.ListAcceptBtnText>
          </s.AcceptGrp>
          <SvgLoader isVisible={props.isPartialLoading} />
        </ss.EoiWrapper>
      </s.InvitationBtnContainer>
    </ss.InboxStatusSuccess>
  );
};
NegativeCase.defaultProps = {
  type: 'inbox',
  justNow: false,
  isPartialLoading: false,
};
NegativeCase.propTypes = {
  justNow: PropTypes.bool,
  type: PropTypes.string,
  isHovered: PropTypes.bool.isRequired,
  membershipTags: PropTypes.string.isRequired,
  onAccept: PropTypes.func.isRequired,
  isPartialLoading: PropTypes.bool,
};

export default NegativeCase;
