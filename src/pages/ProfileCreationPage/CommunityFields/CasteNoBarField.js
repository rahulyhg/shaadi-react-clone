import React from 'react';
import withContextConsumer from '../../../components/Common/withContextConsumer';
import CheckboxWithLabel from '../../../components/Common/FormElements/CheckboxWithLabel';
import ShowHide from '../../../components/HOC/ShowHide';
import s from '../styles';

const CasteNoBarField = props => (
  <s.casteNoBarWrap>
    <CheckboxWithLabel
      id="casteNoBar"
      name="casteNoBar"
      {...props}
      label={<s.casteNoBarLabel>Not particular about my Partner&#39;s Community (Caste No Bar)</s.casteNoBarLabel>}
    />
  </s.casteNoBarWrap>
);

const getContext = context => ({
  ...context.form.casteNoBar,
  isVisible: !context.user.isNRIPlusCountry() && !!context.form.caste.value && context.form.caste.isValid !== false,
});

export default withContextConsumer({ contextToFetch: getContext })(ShowHide(CasteNoBarField));
