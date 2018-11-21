import React, { Fragment } from 'react';
import MaritalStatusField from './MaritalStatusField';
import NoOfChildrenField from './NoOfChildrenField';
import HaveChildrenField from './HaveChildrenField';

const MaritalFields = props => (
  <Fragment>
    <MaritalStatusField />
    <HaveChildrenField />
    <NoOfChildrenField />
  </Fragment>
);

export default MaritalFields;
