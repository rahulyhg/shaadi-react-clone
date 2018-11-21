import React, { Fragment } from 'react';
import PropTypes from '../../../../../PropTypes';
import SvgCheckmark from '../../../../Common/SvgCheckmark';
import ss from '../../styles';
import s from '../styles';

const membershipTags = {
  diamond_plus: `Diamond+`,
  platinum_plus: `Platinum+`,
};

const isPremiumFeature = ({ isPaidUser, canCommunicate }) => isPaidUser || canCommunicate;
const isPremiumFeatureForWriteMsg = ({ isPaidUser, canCommunicate, isLoggerBothPartyPayUser }) =>
  isPaidUser || (canCommunicate && !isLoggerBothPartyPayUser);
const showUpgradeLink = ({ isPaidUser, canCommunicate }) => !isPaidUser && !canCommunicate;

const upgradeLink = profileId => (
  <Fragment>
    <ss.UpgradeTextLink isExternal to={`/payment?loc=list&profileid=${profileId}&source=search_listing`} target="_blank">
      Upgrade
    </ss.UpgradeTextLink>{' '}
    to{' '}
  </Fragment>
);

const PositiveCase = props => {
  if (props.justNow && props.type === 'featured') {
    return (
      <ss.AcceptedMsgWrap>
        <ss.PremSuccessMsg>
          <ss.InboxStatusText isItalicText isBold type={props.type}>
            <s.justNowCase type={props.type}>
              <s.SvgCheckmark type={props.type}>
                <SvgCheckmark isListingSvg />
              </s.SvgCheckmark>
              <ss.MsgSpacer />
              Invitation Accepted<br />
            </s.justNowCase>
          </ss.InboxStatusText>
        </ss.PremSuccessMsg>
      </ss.AcceptedMsgWrap>
    );
  }
  return (
    <ss.AcceptedMsgWrap>
      <ss.PremSuccessMsg>
        {props.type !== 'featured' && (
          <ss.InboxStatusText isItalicText type={props.type}>
            {props.justNow && (
              <s.justNowCase type={props.type}>
                <s.SvgCheckmark type={props.type}>
                  <SvgCheckmark isListingSvg />
                </s.SvgCheckmark>
                <ss.MsgSpacer />
                Invitation Accepted<br />
              </s.justNowCase>
            )}
            {props.type !== 'featured' && [
              showUpgradeLink(props) && <span key={`${props.type}_${props.profileId}`}>{upgradeLink(props.profileId)}</span>,
              !props.canCommunicate
                ? `Contact ${props.himHer.toLowerCase()} directly`
                : `You can contact a ${membershipTags[props.membershipTags] || ''} Member`,
            ]}
          </ss.InboxStatusText>
        )}
      </ss.PremSuccessMsg>

      <ss.ActiveBtnWrap type={props.type}>
        <s.MsgBtnGrp>
          {props.membershipTags === 'vip' ? (
            <ss.WriteMessageBtnVip
              onClick={props.onChatNow}
              isHovered={props.isHovered}
              isPaidUser={props.isPaidUser}
              title="Write Message"
              type={props.type}
            />
          ) : (
            <ss.WriteMessageBtn
              type={props.type}
              onClick={props.onChatNow}
              isHovered={props.isHovered}
              isPaidUser={isPremiumFeatureForWriteMsg(props)}
              title="Write Message"
            />
          )}
          <ss.WriteMessageBtnText
            onClick={props.onChatNow}
            isHovered={props.isHovered}
            isPaidUser={isPremiumFeatureForWriteMsg(props)}
            membershipTags={props.membershipTags}
          >
            Write Message
          </ss.WriteMessageBtnText>
        </s.MsgBtnGrp>
        <s.ContactBtnGrp type={props.type}>
          {props.membershipTags === 'vip' ? (
            <ss.VewContactBtnVip
              onClick={props.isPaidUser ? props.onShowContactDetails : props.onChatNow}
              isHovered={props.isHovered}
              isPaidUser={props.isPaidUser}
              title="View Contact"
              type={props.type}
            />
          ) : (
            <ss.VewContactBtn
              onClick={isPremiumFeature(props) ? props.onShowContactDetails : props.onChatNow}
              isHovered={props.isHovered}
              isPaidUser={isPremiumFeature(props)}
              title="View Contact"
              type={props.type}
            />
          )}
          <ss.VewContactBtnText
            onClick={isPremiumFeature(props) ? props.onShowContactDetails : props.onChatNow}
            isHovered={props.isHovered}
            isPaidUser={isPremiumFeature(props)}
            membershipTags={props.membershipTags}
          >
            View Contact
          </ss.VewContactBtnText>
        </s.ContactBtnGrp>
      </ss.ActiveBtnWrap>
    </ss.AcceptedMsgWrap>
  );
};
PositiveCase.defaultProps = {
  type: 'inbox',
  canCommunicate: false,
};
PositiveCase.propTypes = {
  type: PropTypes.string,
  himHer: PropTypes.oneOf(['Him', 'Her']).isRequired,
  isPaidUser: PropTypes.bool.isRequired,
  justNow: PropTypes.bool.isRequired,
  isHovered: PropTypes.bool.isRequired,
  membershipTags: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  onChatNow: PropTypes.func.isRequired,
  onShowContactDetails: PropTypes.func.isRequired,
  canCommunicate: PropTypes.bool,
};
export default PositiveCase;
