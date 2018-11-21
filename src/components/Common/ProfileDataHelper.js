/* eslint-disable react/sort-comp */
import React from 'react';
import PropTypes from '../../PropTypes';
import profile from '../../helpers/profile';

class ProfileDataHelper extends React.PureComponent {
  get uid() {
    return Object.keys(this.props.draftProfileData)[0];
  }
  state = {
    uid: this.uid,
    ...this.props.draftProfileData[this.uid],
  };
  setUserData = (newState, afterStateUpdate) => this.setState(newState, afterStateUpdate);
  render = () => this.props.children({ user: profile(this.state), setUserData: this.setUserData });
}

ProfileDataHelper.propTypes = {
  draftProfileData: PropTypes.shape({}).isRequired,
  children: PropTypes.func.isRequired,
};

export default ProfileDataHelper;
