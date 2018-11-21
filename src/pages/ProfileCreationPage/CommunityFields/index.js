import React, { Fragment } from 'react';
import CasteField from './CasteField';
import SubCasteField from './SubCasteField';
import SubCasteOtherField from './SubCasteOtherField';
import CasteNoBarField from './CasteNoBarField';
import AstroFields from '../AstroFields';

const CommunityFields = props => (
  <Fragment>
    <CasteField />
    <SubCasteField />
    <SubCasteOtherField />
    <CasteNoBarField />
    <AstroFields />
  </Fragment>
);

export default CommunityFields;
