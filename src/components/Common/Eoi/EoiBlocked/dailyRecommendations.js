import React from 'react';
import PropTypes from '../../../../PropTypes';
import s from '../styles';

class DailyRecommendations extends React.PureComponent {
  renderBlocked() {
    const justNow = !this.props.drAction || this.props.drAction === '';
    return (
      <div>
        <s.ProfileStatusIcon status="declined" />
        <s.ProfileStatusText>
          <s.ProfileName>{this.props.profileName}</s.ProfileName>
          {`'s Profile has been Blocked`}
        </s.ProfileStatusText>

        {justNow && <s.ContactLinkBG to={this.props.nextUrl}>{<br />}Next recommendation</s.ContactLinkBG>}
      </div>
    );
  }

  render() {
    switch (this.props.status) {
      case 'blocked':
        return this.renderBlocked();
      default:
        return null;
    }
  }
}

DailyRecommendations.defaultProps = {
  drAction: '',
  nextUrl: '',
};

DailyRecommendations.propTypes = {
  profileName: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  drAction: PropTypes.string,
  nextUrl: PropTypes.string,
};

export default DailyRecommendations;
