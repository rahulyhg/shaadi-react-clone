import React, { Fragment } from 'react';
import LocationFields from './LocationFields';
import ResidencyFields from './ResidencyFields';
import MaritalFields from './MaritalFields';
import CommunityFields from './CommunityFields';
import EthnicityField from './EthnicityField';
import RegionalSiteField from './RegionalSiteField';

const BasicsFieldSet = props => (
  <Fragment>
    <LocationFields />
    <ResidencyFields />
    <MaritalFields />
    <EthnicityField />
    <CommunityFields />
    <RegionalSiteField />
  </Fragment>
);

export default BasicsFieldSet;
