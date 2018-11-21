import React from 'react';
import TextFieldWithLabel from '../../../components/Common/FormElements/TextFieldWithLabel';
import withContextConsumer from '../../../components/Common/withContextConsumer';
import ShowHide from '../../../components/HOC/ShowHide';

const GotraOtherField = props => (
  <TextFieldWithLabel
    id="gotraOther"
    name="gotraOther"
    placeholder="Type here"
    label="Other Gothra / Gothram"
    regex="[^a-zA-Z0-9 ]"
    hideArrow
    hideNoResultFound
    {...props}
  />
);

const getContext = context => {
  const { gotraOther, gotra: { value: gotra } } = context.form;
  const isVisible = gotra === 'Others';
  !isVisible && context.form.gotraOther.value && context.form.updateInputValue('gotraOther')('');
  return {
    ...gotraOther,
    isVisible,
  };
};

export default withContextConsumer({ contextToFetch: getContext })(ShowHide(GotraOtherField));
