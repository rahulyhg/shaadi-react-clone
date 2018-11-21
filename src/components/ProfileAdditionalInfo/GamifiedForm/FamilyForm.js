import React from 'react';
import PropTypes from 'prop-types';
import s from './styles';

const professionMap = {
  father: ['Employed', 'Business', 'Retired', 'Not Employed', 'Passed Away'],
  mother: ['Homemaker', 'Employed', 'Business', 'Retired', 'Passed Away'],
};

class FamilyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormVisible: false,
      formPlaceholders: {
        brother_unmarried: 0,
        brothers_married: 0,
        sister_unmarried: 0,
        sisters_married: 0,
      },
      formValues: {
        father_profession: '',
        father_employer: '',
        father_designation: '',
        mother_profession: '',
        mother_employer: '',
        mother_designation: '',
        located: '',
        brother_unmarried: '',
        brothers_married: '',
        sister_unmarried: '',
        sisters_married: '',
      },
      jobDetails: {
        father: [],
        mother: [],
      },
      errors: {},
    };
    this.toggleFormVisibility = this.toggleFormVisibility.bind(this);
    this.toggleParentStatus = this.toggleParentStatus.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.renderProfileField = this.renderParentField.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const newState = {
      isFormVisible: false,
      formValues: {
        father_profession: '',
        father_employer: '',
        father_designation: '',
        mother_profession: '',
        mother_employer: '',
        mother_designation: '',
        located: '',
        brother_unmarried: '',
        brothers_married: '',
        sister_unmarried: '',
        sisters_married: '',
      },
      jobDetails: {
        father: [],
        mother: [],
      },
      errors: {},
    };
    if (this.props.uid !== nextProps.uid) {
      this.setState({ ...newState });
    }
  }

  onFormSubmit(e) {
    e.preventDefault();
    const { formValues } = this.state;
    let { errors } = this.state;
    errors = {
      father_profession: !formValues.father_profession,
      mother_profession: !formValues.mother_profession,
    };
    this.setState({ errors });
    if (Object.keys(errors).every(k => !errors[k])) {
      const submitValues = {};
      const keys = [
        'father_profession',
        'father_employer',
        'father_designation',
        'mother_profession',
        'mother_employer',
        'mother_designation',
        'located',
      ];
      keys.forEach(k => {
        submitValues[k] = formValues[k];
      });

      const brothersMarried = formValues.brothers_married.length === 0 ? 0 : parseInt(formValues.brothers_married, 10);
      const sistersMarried = formValues.sisters_married.length === 0 ? 0 : parseInt(formValues.sisters_married, 10);
      const brotherUnmarried = formValues.brother_unmarried.length === 0 ? 0 : parseInt(formValues.brother_unmarried, 10);
      const sisterUnmarried = formValues.sister_unmarried.length === 0 ? 0 : parseInt(formValues.sister_unmarried, 10);

      submitValues.brothers_married = brothersMarried;
      submitValues.sisters_married = sistersMarried;
      submitValues.brothers = brotherUnmarried + brothersMarried;
      submitValues.sisters = sisterUnmarried + sistersMarried;
      this.props.onAction(this.props.self.uid, 'onFamilyGamificationSubmit', submitValues);
    }
  }

  onChangeValue(field, value) {
    if (
      ['sisters_married', 'sister_unmarried', 'brothers_married', 'brother_unmarried'].includes(field) &&
      !/^\d{1,2}$/.test(value) &&
      value !== ''
    ) {
      return;
    }
    this.setState({ formValues: { ...this.state.formValues, [field]: value } });
  }

  controlPlaceholder = event => {
    const { type, target: { name: fieldName } = {} } = event || {};
    const isFocused = type === 'focus';
    const isFocusedOut = type === 'blur';
    if (this.state.formPlaceholders[fieldName] && (isFocused || isFocusedOut)) {
      this.stateState(state => ({
        formPlaceholders: {
          ...this.state.formPlaceholders,
          [fieldName]: isFocused ? '' : this.state.orgFormPlaceholders[fieldName],
        },
        orgFormPlaceholders: {
          ...this.state.orgFormPlaceholders,
          [fieldName]: this.state.formPlaceholders[fieldName],
        },
      }));
    }
  };

  toggleFormVisibility() {
    const isFormVisible = !this.state.isFormVisible;
    this.props.onOpen(isFormVisible);
    this.setState({ isFormVisible });
    this.setState({
      formValues: {
        father_profession: '',
        father_employer: '',
        father_designation: '',
        mother_profession: '',
        mother_employer: '',
        mother_designation: '',
        located: '',
        brother_unmarried: '',
        brothers_married: '',
        sister_unmarried: '',
        sisters_married: '',
      },
      jobDetails: {
        father: [],
        mother: [],
      },
    });
  }

  toggleParentStatus(parentType, event) {
    const val = event.target.value;
    const { jobDetails, formValues } = this.state;

    jobDetails[parentType] = jobDetails[parentType] || [];
    formValues[`${parentType}_profession`] = val;

    if (parentType === 'father') {
      formValues.father_designation = '';
      formValues.father_employer = '';
    } else if (parentType === 'mother') {
      formValues.mother_designation = '';
      formValues.mother_employer = '';
    }

    switch (val) {
      case 'Employed':
        jobDetails[parentType] = [['With', 'Company Name', 'employer'], ['As', 'Designation', 'designation']];
        break;
      case 'Retired':
        jobDetails[parentType] = [['From', 'Company Name', 'employer'], ['As', 'Designation', 'designation']];
        break;
      case 'Business':
        jobDetails[parentType] = [['Nature of Business', 'Example "Home Decor"', 'employer']];
        break;
      default:
        jobDetails[parentType] = [];
        break;
    }

    this.setState({ jobDetails, formValues });
  }

  renderJobFields(fields, parentType) {
    const fieldArr = [];
    fields.map(field =>
      fieldArr.push(
        <s.Fieldset key={`${parentType}_${field[2]}`}>
          <s.Label>{field[0]}</s.Label>
          <s.Field>
            <s.SubTextInput
              value={this.state.formValues[`${parentType}_${field[2]}`]}
              onChange={e => this.onChangeValue(`${parentType}_${field[2]}`, e.target.value)}
              placeholder={field[1]}
              maxLength={100}
            />
          </s.Field>
        </s.Fieldset>,
      ),
    );
    return fieldArr;
  }

  renderParentField(parentType, value, props, hasError) {
    return (
      <s.Fieldset>
        <s.Label>{`${parentType}'s`} Status</s.Label>
        <s.Field>
          <s.Select value={value} onBlur={props.onValidate} onChange={e => this.toggleParentStatus(parentType, e)}>
            <option value="" defaultValue>
              Select
            </option>
            {professionMap[parentType].map(item => (
              <option value={item} key={Math.random()}>
                {item}
              </option>
            ))}
          </s.Select>
          <s.Error isVisible={hasError}>Please specify your {`${parentType}'s`} status.</s.Error>
        </s.Field>
      </s.Fieldset>
    );
  }

  render() {
    const { props } = this;

    const onEventsControlPlaceholder = {
      onFocus: this.controlPlaceholder,
      onBlur: this.controlPlaceholder,
    };

    return (
      <s.FamilyForm profilePageBucket={props.profilePageBucket}>
        <s.FormPrompt isVisible={!this.state.isFormVisible}>
          <s.PeelIcon />
          <s.Content profilePageBucket={props.profilePageBucket}>
            <s.LockIcon />
            <s.Message profilePageBucket={props.profilePageBucket} data-test-selector="message">
              For the common interest of members,
              <br />
              quickly enter your Family details & unhide his info.
              <s.FormToggleBtn profilePageBucket={props.profilePageBucket} onClick={this.toggleFormVisibility}>
                Add My Details
                <s.DownArrowIcon />
              </s.FormToggleBtn>
            </s.Message>
          </s.Content>
        </s.FormPrompt>
        <s.Header isVisible={this.state.isFormVisible}>
          <s.PeelIcon />
          <s.Heading>
            Add
            <s.Strong> your </s.Strong>
            details to unhide his Family info instantly
            <s.CloseBtn onClick={this.toggleFormVisibility} />
          </s.Heading>
        </s.Header>
        <s.Form onSubmit={this.onFormSubmit} isVisible={this.state.isFormVisible}>
          <s.FormContent>
            {this.renderParentField('father', this.state.formValues.father_profession, this.props, this.state.errors.father_profession)}
            {this.renderJobFields(this.state.jobDetails.father, 'father')}
            {this.renderParentField('mother', this.state.formValues.mother_profession, this.props, this.state.errors.mother_profession)}
            {this.renderJobFields(this.state.jobDetails.mother, 'mother')}
            <s.Fieldset>
              <s.Label>Family Location</s.Label>
              <s.Field>
                <s.SubTextInput
                  value={this.state.formValues.is_family_location_same ? this.props.self.location : this.state.formValues.located}
                  onChange={e => this.onChangeValue('located', e.target.value)}
                  placeholder={'Example: Mumbai, India'}
                  maxLength={100}
                />
                <s.CheckboxWrap>
                  <s.Checkbox
                    type="checkbox"
                    onChange={e => this.onChangeValue('is_family_location_same', e.target.checked)}
                    value={this.state.formValues.is_family_location_same}
                  />
                  <span>Same as {props.self.summary.createdBy === 'Self' ? 'me' : props.self.himHer.toLowerCase()}</span>
                </s.CheckboxWrap>
              </s.Field>
            </s.Fieldset>
            <s.Fieldset>
              <s.Label>No of Siblings</s.Label>
              <s.Field isSiblingsField>
                <s.SiblingsField>
                  <s.SubField>
                    <s.SubInput
                      {...onEventsControlPlaceholder}
                      name="brother_unmarried"
                      placeholder={this.state.formPlaceholders.brother_unmarried}
                      onChange={e => this.onChangeValue('brother_unmarried', e.target.value)}
                      value={this.state.formValues.brother_unmarried}
                    />
                    <s.SubLabel>Not married</s.SubLabel>
                  </s.SubField>
                  <s.SiblingIcon gender="male" />
                  <s.SubField>
                    <s.SubInput
                      {...onEventsControlPlaceholder}
                      name="brothers_married"
                      placeholder={this.state.formPlaceholders.brothers_married}
                      onChange={e => this.onChangeValue('brothers_married', e.target.value)}
                      value={this.state.formValues.brothers_married}
                    />
                    <s.SubLabel>Married</s.SubLabel>
                  </s.SubField>
                  <s.SubField>
                    <s.SubInput
                      {...onEventsControlPlaceholder}
                      name="sister_unmarried"
                      placeholder={this.state.formPlaceholders.sister_unmarried}
                      onChange={e => this.onChangeValue('sister_unmarried', e.target.value)}
                      value={this.state.formValues.sister_unmarried}
                    />
                    <s.SubLabel>Not married</s.SubLabel>
                  </s.SubField>
                  <s.SiblingIcon gender="female" />
                  <s.SubField>
                    <s.SubInput
                      {...onEventsControlPlaceholder}
                      name="sisters_married"
                      placeholder={this.state.formPlaceholders.sisters_married}
                      onChange={e => this.onChangeValue('sisters_married', e.target.value)}
                      value={this.state.formValues.sisters_married}
                    />
                    <s.SubLabel>Married</s.SubLabel>
                  </s.SubField>
                </s.SiblingsField>
              </s.Field>
            </s.Fieldset>
            <s.SiblingError isVisible={this.state.errors.siblings}>Please specify no. of siblings.</s.SiblingError>
            <s.SiblingError isVisible={this.props.gamification.flash}>{this.props.gamification.flash}</s.SiblingError>
            <s.SubmitBtn type="submit">Submit</s.SubmitBtn>
          </s.FormContent>
        </s.Form>
      </s.FamilyForm>
    );
  }
}

FamilyForm.defaultProps = {
  formValues: {
    father: {},
    mother: {},
    sibling: {},
  },
};

FamilyForm.propTypes = {
  self: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
  onAction: PropTypes.func.isRequired,
  gamification: PropTypes.shape({
    flash: PropTypes.bool,
    loading: PropTypes.bool,
  }).isRequired,
  onOpen: PropTypes.func.isRequired,
  uid: PropTypes.string.isRequired,
};

export default FamilyForm;
