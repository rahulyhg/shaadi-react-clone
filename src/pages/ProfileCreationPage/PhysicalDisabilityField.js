import React from 'react';
import withContextConsumer from '../../components/Common/withContextConsumer';
import CheckboxWithLabel from '../../components/Common/FormElements/CheckboxWithLabel';
import FormFieldWrapper from '../../components/Common/FormFieldWrapper';
import ShowHide from '../../components/HOC/ShowHide';
import s from './styles';

const PhysicalDisabilityField = props => (
  <FormFieldWrapper {...props}>
    <s.casteNoBarWrap>
      <CheckboxWithLabel id="disability" name="disability" label={<s.checkboxLabel>No physical disability</s.checkboxLabel>} {...props} />
    </s.casteNoBarWrap>
  </FormFieldWrapper>
);

export default withContextConsumer({ contextToFetch: context => context.form.disability })(ShowHide(PhysicalDisabilityField));
