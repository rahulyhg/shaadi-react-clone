import React from 'react';
import withContextConsumer from '../../../components/Common/withContextConsumer';
import bodyOpts from '../../../constants/list/bodyOpts.json';
import ProfileCreationRadioTabGroup from '../partials/ProfileCreationRadioTabGroup';
import s from '../styles';
import ShowHide from '../../../components/HOC/ShowHide';

const options = ({ gender, value }) =>
  bodyOpts.map(item => ({
    ...item,
    lableImage: <s.bodytypeImages bodytype={item.value} gender={gender} />,
    selectedLableImage: <s.bodytypeImages bodytype={item.value} isSelected={value === item.value} gender={gender} />,
  }));

const BodyTypeField = props => (
  <s.communityInput>
    <ProfileCreationRadioTabGroup name="bodyType" id="bodyType" label="Body type" options={options(props)} {...props} />
  </s.communityInput>
);

const getContext = context => ({
  ...context.form.bodyType,
  gender: context.user.gender,
});

export default withContextConsumer({ contextToFetch: getContext })(ShowHide(BodyTypeField));
