import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core/styles';
import withContextConsumer from '../../../components/Common/withContextConsumer';
import { tabCapsuleTheme } from '../../../components/Common/FormElements/theme';
import nriPlusCountries from '../../../constants/list/nriPlusCountries.json';
import complexions from '../../../constants/list/complexions.json';
import s from '../styles';
import ShowHide from '../../../components/HOC/ShowHide';

const SkinToneField = props => (
  <MuiThemeProvider theme={tabCapsuleTheme}>
    <s.skinToneMain>Skin Tone</s.skinToneMain>
    <s.communityInput>
      {complexions.map(complexion => (
        <s.skinToneWrap
          name="complexion"
          key={complexion.value}
          ischecked={(props.value === complexion.value).toString()}
          onClick={() => props.onChange({ target: { value: complexion.value } })}
        >
          <s.skinToneLabel>
            <s.complexion skinTone={complexion.value} />
            {complexion.label}
            <s.input type="radio" name="complexion" id={`complexion-${complexion.value}`} value={complexion.value} />
          </s.skinToneLabel>
        </s.skinToneWrap>
      ))}
    </s.communityInput>
  </MuiThemeProvider>
);

SkinToneField.propTypes = {
  value: PropTypes.string.isRequired,
};

const getContext = context => ({
  ...context.form.skinTone,
  isVisible: !nriPlusCountries.includes(context.user.country.toLowerCase()),
});

export default withContextConsumer({ contextToFetch: getContext })(ShowHide(SkinToneField));
