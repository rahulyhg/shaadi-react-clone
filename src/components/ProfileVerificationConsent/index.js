import React, { PureComponent, Fragment } from 'react';
import s from './styles';
import PropTypes from '../../PropTypes';
import ProfilePhotoWithShield from '../Common/ProfilePhotoWithShield';

class ProfileVerificationConsent extends PureComponent {
  constructor(props) {
    super(props);
    this.validateDocType = this.validateDocType.bind(this);
    this.toogleDocTypeHover = this.toogleDocTypeHover.bind(this);
    this.validate = this.validate.bind(this);
    this.hideValidationMessage = this.hideValidationMessage.bind(this);
    this.toogleTnC = this.toogleTnC.bind(this);
    const idProofs = {
      Aadhaar: {
        dataType: 'integer',
        type: 'text',
        maxLength: 12,
        minLength: 12,
        isRequired: true,
        noSpecialCharacs: true,
        errorMsg: 'Please enter valid 12 digits Aadhaar Number',
      },
      PAN: {
        dataType: 'text',
        type: 'text',
        pattern: '^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$',
        maxLength: 10,
        minLength: 10,
        isRequired: true,
        noSpecialCharacs: true,
        errorMsg: 'Please enter valid 10 characters PAN Number',
      },
      Passport: {
        dataType: 'text',
        type: 'text',
        pattern: '[a-zA-Z]{1}[0-9]{7}',
        maxLength: 8,
        minLength: 8,
        isRequired: true,
        noSpecialCharacs: true,
        errorMsg: 'Please enter valid 8 characters Passport Number',
      },
      'Driving License': {
        dataType: 'text',
        type: 'text',
        pattern: '^[A-Za-z]{2,2}[0-9]{2,2}[0-9]{4,4}[0-9]{7,7}$',
        maxLength: 15,
        minLength: 15,
        isRequired: true,
        noSpecialCharacs: true,
        errorMsg: 'Please enter valid 15 characters Driving License Number',
      },
    };
    this.state = {
      tooltip: false,
      isDocTypeHovered: false,
      form: {
        docType: {
          value: this.defaultDocType,
          type: 'radio',
          name: 'docType',
          isEmpty: true,
          isRequired: true,
          canShowError: false,
          hasErrors: false,
          isFocused: false,
          isValid: false,
          showErrorOnChange: false,
          errorMsg: 'Please select at least 1 Identity Card',
        },
        docNo: {
          value: '',
          isEmpty: true,
          hasErrors: false,
          isFocused: false,
          isValid: false,
          showErrorOnChange: true,
          minLength: idProofs[this.defaultDocType].minLength,
          maxLength: idProofs[this.defaultDocType].maxLength,
          isRequired: idProofs[this.defaultDocType].isRequired,
          type: idProofs[this.defaultDocType].type,
          dataType: idProofs[this.defaultDocType].dataType,
          noSpecialCharacs: idProofs[this.defaultDocType].noSpecialCharacs,
          pattern: idProofs[this.defaultDocType].pattern,
          errorMsg: idProofs[this.defaultDocType].errorMsg,
          canShowError: false,
          canShowErrorMap: {
            onChange: {
              forDataType: false,
              forNoSpecialCharacs: false,
            },
            onBlur: {
              forisRequired: true,
              forMinLength: true,
              forMaxLength: true,
              forNoSpecialCharacs: true,
              forDataType: true,
              forPattern: true,
            },
          },
        },
        tnc: {
          value: true,
          isRequired: true,
          canShowError: false,
          hasErrors: false,
          isChecked: true,
          isValid: true,
          errorMsg: 'Please check the box above to accept our Terms and condition',
          type: 'checkbox',
        },
        isValid: false,
      },
      docOpts: ['Aadhaar', 'PAN', 'Passport', 'Driving License'],
      idProofs,
    };
  }

  componentDidMount() {
    this.props.doProfileAction('Profile Verification Consent Stoppage', this.props.user.uid, 'getRegPhotoProfile');
  }

  tncPageAppUrl = '/registration/user/terms?regmode=app';
  tncPageWebUrl = '/shaadi-info/index/terms';
  defaultDocType = 'Aadhaar';
  counter = 0;

  validateDocType({ target: { value } = {} } = {}) {
    this.setState(state => {
      const idProof = this.state.idProofs[value];
      const canShowError = !idProof;
      const hasError = !idProof;
      const isEmpty = String(value).trim() === '';
      const isValid = !!idProof;
      return {
        form: {
          ...state.form,
          docType: {
            ...state.form.docType,
            value,
            canShowError,
            hasError,
            isEmpty,
            isValid,
          },
          docNo: {
            ...this.state.form.docNo,
            value: '',
            minLength: idProof && idProof.minLength,
            maxLength: idProof && idProof.maxLength,
            isRequired: idProof && idProof.isRequired,
            type: idProof && idProof.type,
            dataType: idProof && idProof.dataType,
            noSpecialCharacs: idProof && idProof.noSpecialCharacs,
            pattern: idProof && idProof.pattern,
            errorMsg: idProof && idProof.errorMsg,
            canShowError: false,
            isValid: false,
            isEmpty: true,
            isFocused: false,
          },
          isValid: false,
        },
      };
    });
  }

  toogleDocTypeHover({ type } = {}) {
    const isDocTypeHovered = type === 'mouseenter';
    this.setState(state => ({
      ...state,
      isDocTypeHovered,
    }));
  }

  validate({ target = {}, type } = {}, { inputName } = {}) {
    let value = String(target.value).trim();
    const valueLength = value.length;
    const onEvent = type && `on${type[0].toUpperCase()}${String(type).substr(1)}`;
    const isBlurEvent = type === 'blur';
    const noSpecialCharacsRegex = /^[a-zA-Z0-9- ]*$/; // eslint-disable-line no-useless-escape
    const { isRequired, dataType, noSpecialCharacs, pattern, maxLength, minLength, canShowErrorMap } = this.state.form[inputName] || {};
    let isValid = true;
    let canShowError = false;
    let errorFor = '';
    if (isRequired && !valueLength) {
      canShowError = canShowErrorMap[onEvent] ? canShowErrorMap[onEvent].forisRequired : isBlurEvent;
      isValid = false;
      errorFor += '|required';
    }
    if (valueLength) {
      if (minLength && valueLength < minLength) {
        canShowError = canShowErrorMap[onEvent] ? canShowErrorMap[onEvent].forMinLength : isBlurEvent;
        isValid = false;
        errorFor += '|minLength';
      }
      if (maxLength && valueLength > maxLength) {
        canShowError = canShowErrorMap[onEvent] ? canShowErrorMap[onEvent].forMaxLength : isBlurEvent;
        errorFor += '|maxLength';
        value = value.substring(0, maxLength);
      }
      if (noSpecialCharacs && !noSpecialCharacsRegex.test(value)) {
        canShowError = canShowErrorMap[onEvent] ? canShowErrorMap[onEvent].forNoSpecialCharacs : isBlurEvent;
        isValid = false;
        errorFor += '|noSpecialCharacs';
      }
      switch (dataType) {
        case 'integer': {
          if (value !== String(parseInt(value, 10))) {
            canShowError = canShowErrorMap[onEvent] ? canShowErrorMap[onEvent].forDataType : isBlurEvent;
            isValid = false;
            errorFor += '|integer';
          }
          break;
        }
        default:
          break;
      }
      if (pattern && value && !new RegExp(pattern).test(value)) {
        canShowError = canShowErrorMap[onEvent] ? canShowErrorMap[onEvent].forPattern : isBlurEvent;
        isValid = false;
        errorFor += '|pattern';
      }
    }

    this.setState(state => ({
      form: {
        ...state.form,
        [inputName]: {
          ...state.form[inputName],
          value,
          canShowError,
          hasError: !isValid,
          isValid,
          isEmpty: !value,
          isFocused: type === 'change',
          errorFor,
        },
        isValid: state.form.tnc.isChecked && isValid,
      },
    }));
  }

  hideValidationMessage(event, { inputName } = {}) {
    this.setState((state, props) => ({
      form: {
        ...state.form,
        [inputName]: {
          ...state.form[inputName],
          isFocused: true,
          canShowError: false,
        },
      },
    }));
  }

  toogleTnC() {
    const isChecked = !this.state.form.tnc.isChecked;
    this.setState({
      form: {
        ...this.state.form,
        tnc: {
          ...this.state.form.tnc,
          isChecked,
          canShowError: false,
        },
        isValid: this.state.form.docNo.isValid && isChecked,
      },
    });
  }

  sendConsent(event, action) {
    event.preventDefault();
    if (action === 'submit' && this.state.form.isValid) {
      const consent = 'Y';
      const data = { consent };
      data.id_type = this.state.form.docType.value
        .replace(' Card', '')
        .replace(' ', '_')
        .toUpperCase();
      data.id_details = this.state.form.docNo.value;
      this.props.doProfileAction('Profile Verification Consent Stoppage', this.props.user.uid, 'sendConsent', data);
    } else if (action === 'skip') {
      const data = {
        consent: this.state.form.tnc.isChecked ? 'Y' : 'N',
      };
      this.props.doProfileAction('Profile Verification Consent Stoppage', this.props.user.uid, 'sendConsent', data);
    } else {
      this.setState({
        form: {
          ...this.state.form,
          docNo: {
            ...this.state.form.docNo,
            canShowError: !this.state.form.docNo.isValid,
          },
          tnc: {
            ...this.state.form.tnc,
            canShowError: !this.state.form.tnc.isChecked,
          },
        },
      });
    }
  }

  renderDocOptsChips(value, key) {
    const docType = this.state.form.docType;
    const isChecked = docType.value === value;
    this.counter += 1;
    return (
      <s.radioChips isChecked={isChecked} key={this.counter} onMouseEnter={this.toogleDocTypeHover} onMouseLeave={this.toogleDocTypeHover}>
        <input
          name={docType.name}
          type={docType.type}
          onChange={this.validateDocType}
          data-required={docType.isRequired}
          value={value}
          defaultChecked={isChecked}
          style={{ display: 'none' }}
        />
        {value}
      </s.radioChips>
    );
  }
  renderDocFields() {
    return (
      <s.ProfileChoosIdWrap>
        <s.radioChipsWrap>{this.state.docOpts.map(this.renderDocOptsChips.bind(this))}</s.radioChipsWrap>
        <s.ErrorWrap isVisible={this.state.form.docType.canShowError}>{this.state.form.docType.errorMsg}</s.ErrorWrap>
        <s.ProfileChoosIdNumber>
          <s.IdNumberWrap
            value={this.state.form.docNo.value}
            onChange={event => this.validate(event, { inputName: 'docNo' })}
            onBlur={event => !this.state.isDocTypeHovered && this.validate(event, { inputName: 'docNo' })}
            onFocus={event => this.hideValidationMessage(event, { inputName: 'docNo' })}
            type={this.state.form.docNo.type}
          />
          <s.BottomUnderline isVisible={this.state.form.docNo.isFocused && !this.state.form.docNo.canShowError} />
          <s.ErrorUnderline isVisible={this.state.form.docNo.canShowError} />
          <s.ProfilelabelBar isEmpty={this.state.form.docNo.isEmpty}>{`Enter ${this.state.form.docType.value} Number`}</s.ProfilelabelBar>
        </s.ProfileChoosIdNumber>
        <s.ErrorWrap isVisible={this.state.form.docNo.canShowError}>{this.state.form.docNo.errorMsg}</s.ErrorWrap>
      </s.ProfileChoosIdWrap>
    );
  }

  renderBtns() {
    return (
      <s.ProfileBtnWrap>
        <s.Rememberbtn type="button" value="I don't remember" onClick={event => this.sendConsent(event, 'skip')} />
        <s.SubmitBtn type="button" value="Submit" onClick={event => this.sendConsent(event, 'submit')} />
      </s.ProfileBtnWrap>
    );
  }

  renderCheckbox() {
    return (
      <Fragment>
        <s.TncCheckboxWrap>
          <s.CheckBoxLabel>
            <s.TncCheckbox type={this.state.form.tnc.type} onChange={this.toogleTnC} defaultChecked={this.state.form.tnc.isChecked} />
            <s.CheckBoxText>
              By proceeding, I agree with{' '}
              <s.Link
                isExternal
                target="_blank"
                rel="noreferrer noopener"
                to={this.props.isNative ? this.tncPageAppUrl : this.tncPageWebUrl}
              >
                T&Cs
              </s.Link>{' '}
              & authorise Shaadi.com to verify my credit information from CIC on my behalf.
            </s.CheckBoxText>
          </s.CheckBoxLabel>
        </s.TncCheckboxWrap>
        <s.TncErrorWrap isVisible={this.state.form.tnc.canShowError}>{this.state.form.tnc.errorMsg}</s.TncErrorWrap>
      </Fragment>
    );
  }

  render() {
    return (
      <s.VerifyProfileMainWrap>
        <s.VerifiProfileSubMainWrap>
          <s.VerifyProfileWrap>
            <s.VerifyHeading>
              <s.Bold weight={500}>Verify & get 2 times better responses!</s.Bold>
            </s.VerifyHeading>
            <s.HelpHeading>
              <s.Bold weight={300}>Add this badge to your profile in </s.Bold>
              &nbsp;<s.Bold weight={500}>1 STEP</s.Bold>
            </s.HelpHeading>
            <s.ProfileFormMain>
              <s.ProfileFormWrap onSubmit={event => this.sendConsent(event, 'submit')}>
                <ProfilePhotoWithShield {...this.props} />
                {this.renderDocFields()}
                {this.renderBtns()}
                {this.renderCheckbox()}
              </s.ProfileFormWrap>
            </s.ProfileFormMain>
          </s.VerifyProfileWrap>
        </s.VerifiProfileSubMainWrap>
      </s.VerifyProfileMainWrap>
    );
  }
}

ProfileVerificationConsent.propTypes = {
  user: PropTypes.shape(PropTypes.shaadiUser).isRequired,
  doProfileAction: PropTypes.func.isRequired,
  isNative: PropTypes.bool.isRequired,
};

export default ProfileVerificationConsent;
