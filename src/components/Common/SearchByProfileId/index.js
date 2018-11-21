import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from '../../../PropTypes';
import s from './styles';

class SearchByProfileId extends PureComponent {
  state = { profileId: '' };
  saveProfileId = event => this.setState({ profileId: event.target.value });
  submitSearchById = event => {
    event.preventDefault();
    this.state.profileId && this.props.history.push(`/profile?txtprofileid=${this.state.profileId}`);
  };
  render = () => (
    <s.SrcById>
      <form onSubmit={this.submitSearchById}>
        <s.SrcByIdText>Profile ID Search</s.SrcByIdText>
        <s.EditProfileInput id="profile-id-input" placeholder="Enter Profile ID" onChange={this.saveProfileId} />
        <s.EditGoBtn id="search-by-profile-id" type="submit" onClick={this.submitSearchById}>
          Go
        </s.EditGoBtn>
      </form>
    </s.SrcById>
  );
}

SearchByProfileId.propTypes = {
  history: PropTypes.shape(PropTypes.history).isRequired,
};

export default withRouter(SearchByProfileId);
