import React from 'react';
import Typography from '@material-ui/core/Typography';
import { FlashLink, FlashContainer, FlashMessage } from './styles';
import PropTypes from '../../PropTypes';
import { NoMatches } from '../../mComponents/Common/NoResult';

class ProfileFlash extends React.PureComponent {
  render() {
    if (!this.props.flash) {
      return null;
    }
    let message = this.props.flash;
    if (message.includes('Terms of Use')) {
      const [p1, p2] = message.split('Terms of Use');
      message = (
        <Typography>
          {p1}
          <FlashLink to={`${this.props.wwwBaseUrl}/shaadi-info/index/terms`} isExternal>
            Terms of Use
          </FlashLink>
          {p2}
        </Typography>
      );
    }
    if (message.toLowerCase() === 'blocked') {
      message = '';
    }
    if (`${message}`.toLowerCase().includes('service') || `${message}`.toLowerCase().includes('unknown')) {
      message = <span title={this.props.flash}>Something went wrong. Please refresh and try again.</span>;
    }
    if (this.props.flashType === 'hidden_profile')
      return (
        <FlashContainer>
          <NoMatches
            heading="Hidden / Deleted Profile"
            message={`This Member may have temporarily hidden \n or deleted his Profile.`}
            buttonText={null}
            onAction={null}
            isButtonVisible={false}
          />
        </FlashContainer>
      );
    return (
      <FlashContainer>
        <Typography color="error" gutterBottom>
          <FlashMessage>{message}</FlashMessage>
        </Typography>
        <Typography>
          (Go to{' '}
          <FlashLink to={`${this.props.wwwBaseUrl}/search`} isExternal>
            Partner Search
          </FlashLink>)
        </Typography>
      </FlashContainer>
    );
  }
}

ProfileFlash.defaultProps = {
  flashType: undefined,
};

ProfileFlash.propTypes = {
  flash: PropTypes.shape(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
    }),
  ).isRequired,
  flashType: PropTypes.string,
  wwwBaseUrl: PropTypes.string.isRequired,
};

export default ProfileFlash;
