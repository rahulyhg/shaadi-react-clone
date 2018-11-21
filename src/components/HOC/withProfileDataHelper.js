import React from 'react';
import ProfileDataHelper from '../Common/ProfileDataHelper';

const withProfileDataHelper = ComposedComponent => props => (
  <ProfileDataHelper {...props}>{user => <ComposedComponent {...user} {...props} />}</ProfileDataHelper>
);

export default withProfileDataHelper;
