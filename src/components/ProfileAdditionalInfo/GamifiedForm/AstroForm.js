import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../../Common/Tooltip';
import s from './styles';

const minuteArr = [];
for (let minute = 0; minute < 60; minute++) { //eslint-disable-line
  minute = minute < 10 ? `0${minute}` : `${minute}`;
  minuteArr.push(minute);
}
const hourArr = [];
for (let hour = 1; hour < 12; hour++) { //eslint-disable-line
  hour = hour < 10 ? `0${hour}` : `${hour}`;
  hourArr.push(hour);
}

class AstroForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormVisible: false,
      showHoroscopeForm: false,
      formValues: {
        country_of_birth: '',
        city_of_birth: '',
        timeofbirth_hour: '',
        timeofbirth_min: '',
        timeofbirth_ampm: '',
        time_quality: '',
        prefer_horoscope_matching: false,
      },
      errors: {},
    };
    this.toggleFormVisibility = this.toggleFormVisibility.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const newState = {
      isFormVisible: false,
      showHoroscopeForm: false,
      formValues: {
        country_of_birth: '',
        city_of_birth: '',
        timeofbirth_hour: '',
        timeofbirth_min: '',
        timeofbirth_ampm: '',
        time_quality: '',
        prefer_horoscope_matching: false,
      },
      errors: {},
    };
    if (this.props.uid !== nextProps.uid) {
      this.setState({ ...newState });
    }
  }

  onChangeValue(field, value) {
    const { formValues } = this.state;
    formValues[field] = value;
    this.setState({ formValues });
  }

  onFormSubmit(e) {
    e.preventDefault();
    const { formValues } = this.state;
    let { errors } = this.state;
    errors = {
      country_of_birth: !formValues.country_of_birth,
      timeofbirth: !formValues.timeofbirth_hour || !formValues.timeofbirth_min,
    };
    this.setState({ errors });
    if (Object.keys(errors).every(k => !errors[k])) {
      formValues.time_of_birth = `${formValues.timeofbirth_hour}:${formValues.timeofbirth_min}`;
      formValues.prefer_horoscope_matching = formValues.prefer_horoscope_matching === 'on' ? 1 : 0;
      this.props.onAction(this.props.self.uid, 'onAstroGamificationSubmit', this.state.formValues);
    }
  }

  toggleFormVisibility() {
    const isFormVisible = !this.state.isFormVisible;
    this.setState({ isFormVisible });
  }

  render() {
    const { props } = this;
    const minuteOptions = minuteArr.map(minute => <option value={minute} key={minute}>{minute}</option>); //eslint-disable-line
    const hourOptions = hourArr.map(hour => <option value={hour} key={hour}>{hour}</option>); //eslint-disable-line
    return (
      <s.AstroForm profilePageBucket={props.profilePageBucket}>
        <s.FormPrompt isVisible={!this.state.isFormVisible}>
          <s.PeelIcon />
          <s.Content profilePageBucket={props.profilePageBucket}>
            <s.LockIcon />
            <s.Message profilePageBucket={props.profilePageBucket} data-test-selector="message">
              For the common interest of members,
              <br />
              quickly enter your Astro details & unhide his info.<br />
              <s.FormToggleAstroBtn
                profilePageBucket={props.profilePageBucket}
                to={`/my-shaadi/astro/add?mode=add`}
                isExternal
                target={'_blank'}
              >
                Add My Details&nbsp;
                <s.DownArrowIcon />
              </s.FormToggleAstroBtn>
            </s.Message>
          </s.Content>
        </s.FormPrompt>
        <s.Header isVisible={this.state.isFormVisible}>
          <s.PeelIcon />
          <s.Heading>
            Add
            <s.Strong> your </s.Strong>
            details to unhide his Astro info
            <s.CloseBtn onClick={this.toggleFormVisibility} />
          </s.Heading>
        </s.Header>
        <s.Form isVisible={this.state.isFormVisible && !this.state.showHoroscopeForm} onSubmit={e => this.onFormSubmit(e)}>
          <s.FormContent>
            <s.Fieldset>
              <s.Label>Country of Birth</s.Label>
              <s.Field>
                <s.CountrySelect
                  onBlur={props.onValidate}
                  onChange={e => this.onChangeValue('country_of_birth', e.target.value)}
                  value={this.state.formValues.country_of_birth}
                >
                  <option value="" defaultValue>
                    Select
                  </option>
                  <option value="Australia">Australia</option>
                  <option value="India">India</option>
                </s.CountrySelect>
                <s.Error isVisible={this.state.errors.country_of_birth}>Please specify your Country of Birth.</s.Error>
              </s.Field>
            </s.Fieldset>
            <s.Fieldset>
              <s.Label>City of Birth</s.Label>
              <s.Field>
                <s.Input
                  value={this.state.formValues.city_of_birth}
                  onChange={e => this.onChangeValue('city_of_birth', e.target.value)}
                  disabled={!this.state.formValues.country_of_birth}
                />
              </s.Field>
            </s.Fieldset>
            <s.Fieldset>
              <s.Label>Time of Birth</s.Label>
              <s.Field isSiblingsField>
                <s.SiblingsField>
                  <s.TinySelect
                    onChange={e => this.onChangeValue('timeofbirth_hour', e.target.value)}
                    value={this.state.formValues.timeofbirth_hour}
                  >
                    <option defaultValue>Hours</option>
                    {hourOptions}
                  </s.TinySelect>
                  <s.TinySelect
                    onChange={e => this.onChangeValue('timeofbirth_min', e.target.value)}
                    value={this.state.formValues.timeofbirth_min}
                  >
                    <option value="" defaultValue>
                      Mins
                    </option>
                    {minuteOptions}
                  </s.TinySelect>
                  <s.TinySelect
                    onChange={e => this.onChangeValue('timeofbirth_ampm', e.target.value)}
                    value={this.state.formValues.timeofbirth_ampm}
                  >
                    <option defaultValue value="AM">
                      AM
                    </option>
                    <option value="PM">PM</option>
                  </s.TinySelect>
                  <s.TinySelect
                    style={{ width: '97px' }}
                    onChange={e => this.onChangeValue('time_quality', e.target.value)}
                    value={this.state.formValues.time_quality}
                  >
                    <option value="approx">Approximate</option>
                    <option value="accurate">Exact</option>
                  </s.TinySelect>
                </s.SiblingsField>
                <s.Error isVisible={this.state.errors.timeofbirth}>Please specify your Time of Birth.</s.Error>
              </s.Field>
            </s.Fieldset>
            <s.CheckboxWrap>
              <s.Checkbox
                type="checkbox"
                onChange={e => this.onChangeValue('prefer_horoscope_matching', e.target.value)}
                value={this.state.prefer_horoscope_matching}
              />
              <s.CheckBoxLabel>
                I believe in Horoscope matching before connecting with members.
                <Tooltip
                  isVisible
                  isQuestionMark
                  placement="top"
                  offset={[0, -5]}
                  tooltip={{
                    body: [
                      { key: 'para-1', items: [{ type: 'text', key: 'sentence-1', text: 'Horoscope compatibility score may be used for matchmaking purpose' }] }, //eslint-disable-line
                    ],
                  }}
                />
              </s.CheckBoxLabel>
            </s.CheckboxWrap>
            <s.SiblingError isVisible={this.props.gamification.flash}>{this.props.gamification.flash}</s.SiblingError>
            <s.SubmitBtn type="submit">Submit</s.SubmitBtn>
            <s.Note>Note: Your Horoscope will be automatically generated</s.Note>
            <s.HoroscopeBtn onClick={() => this.setState({ showHoroscopeForm: true })} type="none">
              I {"don't"} know my birth details
            </s.HoroscopeBtn>
          </s.FormContent>
        </s.Form>
        <s.Form isVisible={this.state.isFormVisible && this.state.showHoroscopeForm}>
          <s.FormContent>
            <s.Fieldset>
              <s.Label>Manglik/ Chevvai dosham</s.Label>
              <s.Field>
                <s.SiblingsField>
                  <s.SubField>
                    <s.RadioInput type="radio" value="Yes" />
                    <s.RadioLabel>Yes</s.RadioLabel>
                  </s.SubField>
                  <s.SubField>
                    <s.RadioInput type="radio" value="No" />
                    <s.RadioLabel>No</s.RadioLabel>
                  </s.SubField>
                  <s.SubField>
                    <s.RadioInput type="radio" value="Don't Know" />
                    <s.RadioLabel>{"Don't"} Know</s.RadioLabel>
                  </s.SubField>
                </s.SiblingsField>
                <s.Error isVisible={props.formValues.father.hasError}>Please specify your dosham</s.Error>
              </s.Field>
            </s.Fieldset>
            <s.Fieldset>
              <s.Label>Nakshatra</s.Label>
              <s.Field>
                <s.Select>
                  <option>Select</option>
                </s.Select>
                <s.Error isVisible={props.formValues.mother.hasError}>Please specify your Nakshatra.</s.Error>
              </s.Field>
            </s.Fieldset>
            <s.SubmitBtn type="submit">Submit</s.SubmitBtn>
          </s.FormContent>
        </s.Form>
      </s.AstroForm>
    );
  }
}

AstroForm.defaultProps = {
  formValues: {
    father: {},
    mother: {},
    sibling: {},
  },
};

AstroForm.propTypes = {
  onAction: PropTypes.func.isRequired,
  self: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  gamification: PropTypes.shape({
    flash: PropTypes.string,
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  uid: PropTypes.string.isRequired,
};

export default AstroForm;
