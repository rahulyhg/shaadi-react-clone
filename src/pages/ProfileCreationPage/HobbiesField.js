import React from 'react';
import withContextConsumer from '../../components/Common/withContextConsumer';
import ProfileCreationRadioTabGroup from './partials/ProfileCreationRadioTabGroup';
import options from '../../constants/list/hobbies.json';
import ShowHide from '../../components/HOC/ShowHide';
import getMultiSelectedValuArr from '../../helpers/getMultiSelectedValuArr';

const getContext = ({ form: { updateInputValue, hobbies }, user }) => ({
  ...hobbies,
  label: `${user.getHisOrHerOrYour()} hobbies`,
  onChange: event => {
    const values = hobbies.value;
    const value = event.target.value;
    updateInputValue('hobbies')(getMultiSelectedValuArr(values, value));
  },
});

export default withContextConsumer({ contextToFetch: getContext })(
  ShowHide(props => <ProfileCreationRadioTabGroup id="hobbies" name="hobbies" options={options} type="checkbox" {...props} />),
);
