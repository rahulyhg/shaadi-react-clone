import React, { Fragment } from 'react';
import DescriptionField from './DescriptionField';
import PhysicalDisabilityField from './PhysicalDisabilityField';
import MobileNumberFields from './MobileNumberFields';

const DetailsFieldSet = props => (
  <Fragment>
    <DescriptionField />
    <PhysicalDisabilityField />
    <MobileNumberFields />
  </Fragment>
);

export default DetailsFieldSet;
