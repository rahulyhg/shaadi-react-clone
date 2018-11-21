import React from 'react';
import PropTypes from '../../../../PropTypes';
import s from '../styles';
import ss from './styles';

class DailyRecommendations extends React.PureComponent {
  render() {
    if (this.props.justNow) {
      return (
        <div>
          <s.ProfileStatusIcon status={this.props.justNowIcon || 'ignored'} />
          <s.ProfileStatusText>{this.props.justNowText || 'removed from your recommendations'}&nbsp;</s.ProfileStatusText>
          <s.ContactLinkBG to={this.props.nextUrl}>Next recommendation</s.ContactLinkBG>
        </div>
      );
    }
    const justNow = this.props.justNow || !this.props.drAction;
    return (
      <div>
        <ss.ContactedTitle>
          <s.ProfileName>{this.props.name}</s.ProfileName>
          {`'s Profile has been Ignored`}
          <s.GotoLinkWrap>
            (Go to
            <s.ContactLink to={`${this.props.wwwBaseUrl}/profile/ignored-members`} target="_blank" isExternal>
              Ignored Members
            </s.ContactLink>
            )
          </s.GotoLinkWrap>
        </ss.ContactedTitle>
        {justNow && <s.ContactLinkBG to={this.props.nextUrl}>Next recommendation</s.ContactLinkBG>}
      </div>
    );
  }
}

DailyRecommendations.defaultProps = {
  justNowText: null,
  justNow: false,
  justNowIcon: null,
  drAction: '',
};

DailyRecommendations.propTypes = {
  name: PropTypes.string.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  nextUrl: PropTypes.string.isRequired,
  justNowIcon: PropTypes.string,
  justNow: PropTypes.bool,
  justNowText: PropTypes.string,
  drAction: PropTypes.string,
};

export default DailyRecommendations;
