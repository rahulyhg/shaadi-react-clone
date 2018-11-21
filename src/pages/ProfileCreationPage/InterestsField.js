import React from 'react';
import withContextConsumer from '../../components/Common/withContextConsumer';
import ProfileCreationRadioTabGroup from './partials/ProfileCreationRadioTabGroup';
import options from '../../constants/list/interests.json';
import ShowHide from '../../components/HOC/ShowHide';
import getMultiSelectedValuArr from '../../helpers/getMultiSelectedValuArr';

const getContext = ({ form: { updateInputValue, interests }, user }) => ({
  ...interests,
  label: `${user.getHisOrHerOrYour()} interests`,
  onChange: event => {
    const values = interests.value;
    const value = event.target.value;
    updateInputValue('interests')(getMultiSelectedValuArr(values, value));
  },
});

export default withContextConsumer({ contextToFetch: getContext })(
  ShowHide(props => <ProfileCreationRadioTabGroup id="interests" name="interests" options={options} type="checkbox" {...props} />),
);
