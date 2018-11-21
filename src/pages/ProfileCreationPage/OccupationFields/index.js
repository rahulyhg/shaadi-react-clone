import React, { Fragment } from 'react';
import WorkingWithField from './WorkingWithField';
import WorkingAsField from './WorkingAsField';
import EmployerField from './EmployerField';
import AnnualIncomeField from './AnnualIncomeField';

const OccupationFields = props => (
  <Fragment>
    <WorkingWithField />
    <WorkingAsField />
    <EmployerField />
    <AnnualIncomeField />
  </Fragment>
);

export default OccupationFields;
