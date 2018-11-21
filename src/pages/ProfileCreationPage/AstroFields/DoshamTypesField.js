import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withContextConsumer from '../../../components/Common/withContextConsumer';
import Checkbox from '../../../components/Common/FormElements/CheckboxFields';
import FormFieldWrapper from '../../../components/Common/FormFieldWrapper';
import ShowHide from '../../../components/HOC/ShowHide';
import api from '../../../api';
import s from '../styles';

class DoshamTypesField extends PureComponent {
  state = {
    options: [],
  };
  componentDidMount = () =>
    api
      .get('/lookup/dosham-types', { params: { religion: this.props.religion, motherTongue: this.props.motherTongue } })
      .then(response => this.setState({ options: response.data }));
  onDoshamTypesChange = event => {
    let value = this.props.value;
    const valueArr = value ? value.split(',') : [];
    const selectedVal = event.target.value;
    if (!valueArr.includes(selectedVal)) {
      valueArr.push(selectedVal);
    } else {
      valueArr.splice(valueArr.indexOf(selectedVal), 1);
    }
    value = valueArr.join(',');
    this.props.updateInputState('doshamTypes')({ value, canShowError: !value });
  };
  render = () => (
    <FormFieldWrapper {...this.props}>
      <s.doshamTypesContainer>
        {this.state.options.map(doshamType => (
          <s.doshamTypesWrap key={doshamType.id}>
            <s.label>
              <s.communityCheckbox>
                <Checkbox
                  id="doshamTypes"
                  name="doshamTypes"
                  checked={this.props.value.includes(doshamType.id)}
                  value={doshamType.id}
                  onChange={this.onDoshamTypesChange}
                />
                {doshamType.text}
              </s.communityCheckbox>
            </s.label>
          </s.doshamTypesWrap>
        ))}
      </s.doshamTypesContainer>
    </FormFieldWrapper>
  );
}

DoshamTypesField.propTypes = {
  value: PropTypes.string.isRequired,
  religion: PropTypes.string.isRequired,
  motherTongue: PropTypes.string.isRequired,
  updateInputState: PropTypes.func.isRequired,
};

const getContext = context => {
  const {
    user: { motherTongue, religion },
    form: { dosham: { value: dosham }, doshamTypes, updateInputState, updateInputValue },
  } = context;
  const isVisible = dosham === 'Yes';
  !isVisible && doshamTypes.value && updateInputValue('doshamTypes')('');
  return {
    ...doshamTypes,
    isVisible,
    updateInputState,
    motherTongue,
    religion,
    isRequired: true,
  };
};

export default withContextConsumer({ contextToFetch: getContext })(ShowHide(DoshamTypesField));
