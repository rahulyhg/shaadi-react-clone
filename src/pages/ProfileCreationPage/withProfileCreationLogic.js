import React from 'react';
import ProfileCreationLogic from './ProfileCreationLogic';

const withProfileCreationLogic = ComposedComponent => props => (
  <ProfileCreationLogic {...props}>
    {profileCreationHelper => <ComposedComponent {...profileCreationHelper} {...props} />}
  </ProfileCreationLogic>
);

export default withProfileCreationLogic;
