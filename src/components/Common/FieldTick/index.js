import React from 'react';
import s from './styles';

const FieldTick = props => (
  <s.CheckmarkCircle>
    <s.CheckmarkBackground />
    <s.CheckmarkDraw />
  </s.CheckmarkCircle>
);

export default FieldTick;
