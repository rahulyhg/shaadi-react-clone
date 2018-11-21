import React, { Fragment } from 'react';
import EducationLevelField from './EducationLevelField';
import EducationField from './EducationField';
import HighestCollegeField from './HighestCollegeField';
import AnotherCollegeField from './AnotherCollegeField';

const EducationFields = props => (
  <Fragment>
    <EducationLevelField />
    <EducationField />
    <HighestCollegeField />
    <AnotherCollegeField />
  </Fragment>
);

export default EducationFields;
