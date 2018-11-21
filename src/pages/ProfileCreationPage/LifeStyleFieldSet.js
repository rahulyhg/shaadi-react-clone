import React, { Fragment } from 'react';
import DietField from './DietField';
import AppearanceFields from './AppearanceFields';
import HabbitFields from './HabbitFields';

const BioDataFieldSet = props => (
  <Fragment>
    <DietField />
    <AppearanceFields />
    <HabbitFields />
  </Fragment>
);

export default BioDataFieldSet;
