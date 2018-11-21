import React from 'react';
import DrinkingHabbitField from './DrinkingHabbitField';
import SmokingHabbitField from './SmokingHabbitField';
import FlexWrap from '../../../theme/FlexWrap';
import s from '../styles';

const HabbitFields = props => (
  <FlexWrap flexWrap="wrap">
    <s.habbitFieldsWrap>
      <SmokingHabbitField />
    </s.habbitFieldsWrap>
    <s.habbitFieldsWrap noMargin>
      <DrinkingHabbitField />
    </s.habbitFieldsWrap>
  </FlexWrap>
);

export default HabbitFields;
