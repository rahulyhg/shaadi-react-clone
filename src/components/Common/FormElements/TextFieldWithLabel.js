import React from 'react';
import Wrapper from '../../../theme/Wrapper';
import AutoCompleteField from './AutoCompleteField';
import FormFieldLabel from './FormFieldLabel';

export default props => (
  <Wrapper {...props}>
    <AutoCompleteField {...props} label={<FormFieldLabel {...props} />} />
  </Wrapper>
);
