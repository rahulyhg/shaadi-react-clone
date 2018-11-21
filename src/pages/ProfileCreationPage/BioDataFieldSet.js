import React, { Fragment } from 'react';
import EducationFields from './EducationFields';
import OccupationFields from './OccupationFields';

const BioDataFieldSet = props => (
  <Fragment>
    <EducationFields />
    <OccupationFields />
  </Fragment>
);

export default BioDataFieldSet;
