import React from 'react';
import PropTypes from '../../../../PropTypes';
import s from './styles';
import ss from '../styles';
import listStyles from '../EoiDefault/listStyles';
import DashBoard from './DashBoard';

const labels = {
  profile: {
    'You have blocked this member.': 'You have already blocked this user',
  },
};

const icons = {
  profile: {
    error: 'user_block',
  },
};

const EoiMessage = props => {
  switch (props.type) {
    case 'dailyRecommendations':
    case 'profile': {
      const icon = icons.profile[props.justNowIcon] || props.justNowIcon;
      const text = labels.profile[props.justNowText] || props.justNowText;
      if (['B', 'C'].includes(props.profilePageBucket)) {
        return (
          <ss.InvitationBtnContainer isVisible>
            <ss.ProfileDeclineHeading isVisible>{text}</ss.ProfileDeclineHeading>
          </ss.InvitationBtnContainer>
        );
      }
      if (props.justNowText === 'You have reached your daily limit') {
        return (
          <s.BlockLimitExceededSection>
            <s.MessageHeading>{text}</s.MessageHeading>
            <s.MessageSubHeading>
              You cannot Block or Report more than 20 Members in a single day. Please try again after 24 hours.
            </s.MessageSubHeading>
          </s.BlockLimitExceededSection>
        );
      }

      return (
        <s.Message>
          {props.justNowClass ? (
            <span className={props.justNowClass}>{text}</span>
          ) : (
            <div>
              <s.FlashIcon icon={icon} />
              <s.Flash>{text}</s.Flash>
            </div>
          )}
        </s.Message>
      );
    }
    case 'list': {
      if (props.connectionAction === 'member_blocked') {
        return <ss.ListBlockText>You have blocked this Member.</ss.ListBlockText>;
      }
      return null;
    }

    case 'similarProfile': {
      const ListHiddenTextStyle = [
        {
          key: 'margin',
          value: 0,
        },
        {
          key: 'text-align',
          value: 'center',
        },
        {
          key: 'font-style',
          value: 'italic',
        },
      ];
      return <listStyles.ListHiddenText customStyle={ListHiddenTextStyle}>Oops! Something went wrong</listStyles.ListHiddenText>;
    }
    case 'dashboard':
      return (
        <DashBoard type={props.type} status={props.status} connectionAction={props.connectionAction} hiddenReason={props.hiddenReason} />
      );
    default:
      return null;
  }
};

EoiMessage.defaultProps = {
  justNowText: 'There was some problem processing your request.',
  justNowIcon: 'icon_error',
  justNowClass: null,
  profilePageBucket: 'A',
  connectionAction: '',
  status: '',
  hiddenReason: '',
};

EoiMessage.propTypes = {
  type: PropTypes.oneOf(['grid', 'list', 'profile', 'chat', 'premiumCarousel', 'dailyRecommendations']).isRequired,
  justNowText: PropTypes.string,
  justNowIcon: PropTypes.string,
  justNowClass: PropTypes.string,
  profilePageBucket: PropTypes.string,
  connectionAction: PropTypes.string,
  status: PropTypes.string,
  hiddenReason: PropTypes.string,
};

export default EoiMessage;
