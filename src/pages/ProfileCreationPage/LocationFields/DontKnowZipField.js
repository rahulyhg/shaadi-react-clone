import React from 'react';
import withContextConsumer from '../../../components/Common/withContextConsumer';
import CheckboxWithLabel from '../../../components/Common/FormElements/CheckboxWithLabel';
import ShowHide from '../../../components/HOC/ShowHide';
import s from '../styles';

const DontKnowZipField = props => (
  <s.casteNoBarWrap>
    <CheckboxWithLabel
      id="zipStatus"
      name="zipStatus"
      label={<s.checkboxLabel>I don&#39;t know / couldn&#39;t find the zip code</s.checkboxLabel>}
      {...props}
    />
  </s.casteNoBarWrap>
);

const getContext = context => ({
  ...context.form.zipStatus,
  isVisible: context.user.isZipCountry(),
});

export default withContextConsumer({ contextToFetch: getContext })(ShowHide(DontKnowZipField));
