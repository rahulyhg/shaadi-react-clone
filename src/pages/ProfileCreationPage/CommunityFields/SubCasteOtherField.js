import React from 'react';
import TextFieldWithLabel from '../../../components/Common/FormElements/TextFieldWithLabel';
import withContextConsumer from '../../../components/Common/withContextConsumer';
import ShowHide from '../../../components/HOC/ShowHide';

const SubCasteOtherField = props => (
  <TextFieldWithLabel
    id="subCasteOther"
    name="subCasteOther"
    placeholder="Type here"
    regex="[^a-zA-Z0-9 ]"
    hideArrow
    hideNoResultFound
    {...props}
  />
);

const getContext = context => {
  const { subCasteOther, subCaste: { value: subCaste } } = context.form;
  const isVisible = subCaste === 'Others';
  !isVisible && context.form.subCasteOther.value && context.form.updateInputValue('subCasteOther')('');
  return {
    ...subCasteOther,
    label: `${context.user.getHisOrHerOrYour()} other sub-community`,
    isVisible,
  };
};

export default withContextConsumer({ contextToFetch: getContext })(ShowHide(SubCasteOtherField));
