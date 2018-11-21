import React, { Fragment } from 'react';
import GotraField from './GotraField';
import GotraOtherField from './GotraOtherField';
import NakshatraField from './NakshatraField';
import RashiField from './RashiField';
import SuddhaJadhagamField from './SuddhaJadhagamField';
import DoshamField from './DoshamField';
import DoshamTypesField from './DoshamTypesField';

const LocationFieldSet = props => (
  <Fragment>
    <GotraField />
    <GotraOtherField />
    <NakshatraField />
    <RashiField />
    <SuddhaJadhagamField />
    <DoshamField />
    <DoshamTypesField />
  </Fragment>
);

export default LocationFieldSet;
