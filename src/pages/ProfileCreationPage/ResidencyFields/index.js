import React, { Fragment } from 'react';
import LivingSinceField from './LivingSinceField';
import GrewUpInField from './GrewUpInField';
import ResidencyStatusField from './ResidencyStatusField';

const ResidencyFields = props => (
  <Fragment>
    <LivingSinceField />
    <GrewUpInField />
    <ResidencyStatusField />
  </Fragment>
);

export default ResidencyFields;
