import React, { Fragment } from 'react';
import HeightField from './HeightField';
import SkinToneField from './SkinToneField';
import BodyTypeField from './BodyTypeField';

const LocationFieldSet = props => (
  <Fragment>
    <HeightField />
    <BodyTypeField />
    <SkinToneField />
  </Fragment>
);

export default LocationFieldSet;
