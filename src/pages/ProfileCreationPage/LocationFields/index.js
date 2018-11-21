import React, { Fragment } from 'react';
import ZipField from './ZipField';
import DontKnowZipField from './DontKnowZipField';
import StateField from './StateField';
import CityField from './CityField';
import DistrictField from './DistrictField';

const LocationFieldSet = props => (
  <Fragment>
    <ZipField />
    <DontKnowZipField />
    <StateField />
    <CityField />
    <DistrictField />
  </Fragment>
);

export default LocationFieldSet;
