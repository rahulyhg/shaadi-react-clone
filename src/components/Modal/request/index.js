import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';
import ss from '../styles';

class ProfileRequest extends React.PureComponent {
  RequestObject = {
    photo: {
      text: 'Photo Request',
      cta: 'Add Photo',
      link: '/my-shaadi/photo/advance?lnkref=MyProfileAddPhotoIcon',
    },
    contact: {
      text: 'Phone Verification Request',
      cta: 'Verify Now',
      link: '/my-shaadi/contact-details',
    },
  };
  render() {
    return (
      <s.InviteLimitWrapper>
        <ss.Header>
          <ss.Title>
            {`${this.props.data.items.length} Request${this.props.data.items.length > 1 ? 's' : ''} from ${this.props.data.name}`}
          </ss.Title>
          <ss.CloseModalBtn onClick={this.props.onModalClose} />
        </ss.Header>
        <ss.Content>
          <s.ProfileRequestSection>
            {this.props.data.items.map((item, index) => (
              <s.RequestSection key={this.RequestObject[item].text} borderBottom={index < this.props.data.items.length - 1 ? 1 : 0}>
                <s.RequestText>{this.RequestObject[item].text}</s.RequestText>
                <s.AcceptRequestButton href={`${this.props.wwwBaseUrl}${this.RequestObject[item].link}`} target="_blank">
                  {this.RequestObject[item].cta}
                </s.AcceptRequestButton>
              </s.RequestSection>
            ))}
          </s.ProfileRequestSection>
        </ss.Content>
      </s.InviteLimitWrapper>
    );
  }
}

ProfileRequest.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.string).isRequiredisRequired,
  }).isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
};

export default ProfileRequest;
