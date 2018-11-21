/* eslint-disable react/sort-comp */
import React from 'react';
import startCase from 'lodash/startCase';
import toLower from 'lodash/toLower';
import isEmpty from 'lodash/isEmpty';
import { stringify } from 'qs';
import cookie from 'cookie';
import redirectExternal from '../../helpers/redirectExternal';
import types from '../../action_types';
import profileCreationPropsValidation from './utils/profileCreationPropsValidation';
import getDomain from '../../helpers/getDomain';
import constants from '../../constants/constants';
import pageHeadingTexts from './pageHeadingTexts';
import getPageSubHeadings from './getPageSubHeadings';
import guard from '../../actions/lib/guard';
import localConstants from './constants';
import api from '../../api';
import { GA } from '../../actions/lib/utils';
import getHeight from './utils/getHeight';
import getStep1FormData from './utils/getStep1FormData';
import getStep2FormData from './utils/getStep2FormData';
import getStep3FormData from './utils/getStep3FormData';
import getStep4FormData from './utils/getStep4FormData';
import getProfileCreationData from './utils/getProfileCreationData';

const camelCaseToDash = myStr => myStr.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
const eventTypeMap = {
  focus: 'Focus IN',
  blur: 'Focus OUT',
};

class ProfileCreationLogic extends React.PureComponent {
  static getDerivedStateFromProps = (nextProps, prevState) => ({
    stepNumber: parseInt(nextProps.match.params.stepNumber, 10),
  });
  form = {};
  formInputRef = {};
  setComponentRef = fieldName => element => {
    this.form[fieldName] = element;
  };
  setInputRef = fieldName => element => {
    this.formInputRef[fieldName] = element;
  };
  canShowResidencyStatus = () => !this.props.user.isIndian() && !this.props.user.isPakistani();
  onCheckboxChange = fieldName => event => this.changeFieldState(fieldName, { checked: event.target.checked });
  onRadioChange = fieldName => ({ target: { value } }) => this.changeFieldState(fieldName, { value, canShowError: false });
  getField = fieldName => this.state.form[fieldName];
  onOptionSelection = fieldName => (option, controlledInput) => {
    controlledInput.setInputState({ errorsFor: [] });
    delete option.label;
    this.changeFieldState(fieldName, { ...option, canShowError: false });
  };
  onDone = fieldName => value => this.changeFieldState(fieldName, { value });
  updateInputValue = fieldName => value => this.updateInputState(fieldName)({ value });
  updateInputState = fieldName => (newState, afterStateUpdate) => this.changeFieldState(fieldName, newState, afterStateUpdate);
  afterOptFieldBlur = fieldName => controlledInput => {
    const { value, option = {}, setInputState, isRequired, hasValueChanged } = controlledInput;
    const hasOption = !isEmpty(option);
    hasValueChanged && setInputState({ errorsFor: hasOption ? [] : ['option'] });
    delete option.label;
    const canShowError = isEmpty(value) ? isRequired : hasValueChanged ? !hasOption : this.getField(fieldName).canShowError;
    const newState = { value, ...option, canShowError };
    this.changeFieldState(fieldName, newState);
  };
  afterTextBlur = fieldName => ({ value, isInvalid }) =>
    this.changeFieldState(fieldName, { value, isValid: !isInvalid(), canShowError: isInvalid() });
  getInitialCompletedStepNumber = () => {
    let completedStepNumber = 0;
    if (this.props.user.maritalStatus) {
      completedStepNumber = 1;
    }
    if (this.props.user.currentIncome) {
      completedStepNumber = 2;
    }
    if (this.props.user.height) {
      completedStepNumber = 3;
    }
    if (this.props.user.description) {
      completedStepNumber = 4;
    }
    return completedStepNumber;
  };
  state = {
    formSubmitFailed: false,
    isFormSubmitting: false,
    stepNumber: parseInt(this.props.match.params.stepNumber, 10),
    isUserExiting: false,
    exitIntentLayerProfiles: [],
    completedStepNumber: this.getInitialCompletedStepNumber(),
    form: {
      updateInputValue: this.updateInputValue,
      updateInputState: this.updateInputState,
      onOptionSelection: this.onOptionSelection,
      afterBlur: this.afterOptFieldBlur,
      afterTextBlur: this.afterTextBlur,
      zip: {
        forwardedRef: this.setComponentRef('zip'),
        wrapRef: this.setInputRef('zip'),
        code: this.props.user.zipCode,
        value: this.props.user.zipCode,
        googleCityId: this.props.user.googleCityId,
      },
      zipStatus: {
        forwardedRef: this.setComponentRef('zipStatus'),
        wrapRef: this.setInputRef('zipStatus'),
        checked: this.props.user.isZipDisabled(),
        onChange: this.onCheckboxChange('zipStatus'),
      },
      state: {
        forwardedRef: this.setComponentRef('state'),
        wrapRef: this.setInputRef('state'),
        value: this.props.user.state,
        updateInputValue: this.updateInputValue('state'),
        showDependencyErrMsg: false,
        requiredErrorMsg: 'Oops! You seem to have missed this',
        dependencyErroMsg: 'Please fill this first',
        afterBlur: this.afterOptFieldBlur('state'),
        onOptionSelection: this.onOptionSelection('state'),
        getErrorMsg: () =>
          this.getField('state').showDependencyErrMsg ? this.getField('state').dependencyErroMsg : this.getField('state').requiredErrorMsg,
      },
      city: {
        forwardedRef: this.setComponentRef('city'),
        wrapRef: this.setInputRef('city'),
        value: this.props.user.city,
        afterBlur: this.afterOptFieldBlur('city'),
        onOptionSelection: this.onOptionSelection('city'),
        updateInputValue: this.updateInputValue('city'),
      },
      district: {
        forwardedRef: this.setComponentRef('district'),
        wrapRef: this.setInputRef('district'),
        value: this.props.user.district,
        afterBlur: this.afterOptFieldBlur('district'),
        onOptionSelection: this.onOptionSelection('district'),
        updateInputValue: this.updateInputValue('district'),
      },
      livingSince: {
        forwardedRef: this.setComponentRef('livingSince'),
        wrapRef: this.setInputRef('livingSince'),
        onOptionSelection: this.onOptionSelection('livingSince'),
        value: this.props.user.livingSince,
      },
      grewUpIn: {
        forwardedRef: this.setComponentRef('grewUpIn'),
        wrapRef: this.setInputRef('grewUpIn'),
        values: this.props.user.grewUpIn,
        value: '',
        default: false,
      },
      residencyStatus: {
        forwardedRef: this.setComponentRef('residencyStatus'),
        wrapRef: this.setInputRef('residencyStatus'),
        value: this.props.user.residencyStatus,
        onOptionSelection: this.onOptionSelection('residencyStatus'),
        updateInputValue: this.updateInputValue('residencyStatus'),
      },
      maritalStatus: {
        forwardedRef: this.setComponentRef('maritalStatus'),
        wrapRef: this.setInputRef('maritalStatus'),
        value: this.props.user.maritalStatus,
        onOptionSelection: this.onOptionSelection('maritalStatus'),
      },
      haveChildren: {
        onChange: this.onRadioChange('haveChildren'),
        forwardedRef: this.setComponentRef('haveChildren'),
        wrapRef: this.setInputRef('haveChildren'),
        value: this.props.user.haveChildren,
      },
      noOfChildren: {
        onChange: this.onRadioChange('noOfChildren'),
        forwardedRef: this.setComponentRef('noOfChildren'),
        wrapRef: this.setInputRef('noOfChildren'),
        value: this.props.user.noOfKids,
      },
      caste: {
        forwardedRef: this.setComponentRef('caste'),
        wrapRef: this.setInputRef('caste'),
        afterBlur: this.afterOptFieldBlur('caste'),
        onOptionSelection: this.onOptionSelection('caste'),
        value: this.props.user.caste,
        religion: this.props.user.religion,
        updateInputValue: this.updateInputValue('caste'),
      },
      subCaste: {
        forwardedRef: this.setComponentRef('subCaste'),
        wrapRef: this.setInputRef('subCaste'),
        onOptionSelection: this.onOptionSelection('subCaste'),
        value: this.props.user.subCaste,
      },
      subCasteOther: {
        forwardedRef: this.setComponentRef('subCasteOther'),
        wrapRef: this.setInputRef('subCasteOther'),
        afterBlur: this.afterTextBlur('subCasteOther'),
        value: this.props.user.subCaste === 'Others' ? '' : this.props.user.subCaste,
      },
      casteNoBar: {
        forwardedRef: this.setComponentRef('casteNoBar'),
        wrapRef: this.setInputRef('casteNoBar'),
        checked: this.props.user.isCasteNoBar(),
        onChange: this.onCheckboxChange('casteNoBar'),
      },
      gotra: {
        forwardedRef: this.setComponentRef('gotra'),
        wrapRef: this.setInputRef('gotra'),
        afterBlur: this.afterOptFieldBlur('gotra'),
        onOptionSelection: this.onOptionSelection('gotra'),
        value: this.props.user.gotra,
      },
      gotraOther: {
        forwardedRef: this.setComponentRef('gotraOther'),
        wrapRef: this.setInputRef('gotraOther'),
        afterBlur: this.afterTextBlur('gotraOther'),
        value: this.props.user.gotra === 'Others' ? '' : this.props.user.gotra,
      },
      nakshatra: {
        forwardedRef: this.setComponentRef('nakshatra'),
        wrapRef: this.setInputRef('nakshatra'),
        afterBlur: this.afterOptFieldBlur('nakshatra'),
        onOptionSelection: this.onOptionSelection('nakshatra'),
        value: this.props.user.nakshatra,
        actualValue: this.props.user.nakshatra,
      },
      rashi: {
        forwardedRef: this.setComponentRef('rashi'),
        wrapRef: this.setInputRef('rashi'),
        onOptionSelection: this.onOptionSelection('rashi'),
        value: this.props.user.rashi,
        actualValue: this.props.user.rashi,
      },
      suddhaJadhagam: {
        forwardedRef: this.setComponentRef('suddhaJadhagam'),
        wrapRef: this.setInputRef('suddhaJadhagam'),
        onChange: this.onRadioChange('suddhaJadhagam'),
        value: this.props.user.suddhaJadhagam,
      },
      dosham: {
        forwardedRef: this.setComponentRef('dosham'),
        wrapRef: this.setInputRef('dosham'),
        value: this.props.user.dosham,
        onChange: this.onRadioChange('dosham'),
      },
      doshamTypes: {
        forwardedRef: this.setComponentRef('doshamTypes'),
        wrapRef: this.setInputRef('doshamTypes'),
        value: this.props.user.doshamTypes,
      },
      ethnicity: {
        forwardedRef: this.setComponentRef('ethnicity'),
        wrapRef: this.setInputRef('ethnicity'),
        value: this.props.user.ethnicity,
        afterBlur: this.afterOptFieldBlur('ethnicity'),
        onOptionSelection: this.onOptionSelection('ethnicity'),
      },
      regionalSite: {
        forwardedRef: this.setComponentRef('regionalSite'),
        wrapRef: this.setInputRef('regionalSite'),
        onOptionSelection: this.onOptionSelection('regionalSite'),
        afterBlur: this.afterOptFieldBlur('regionalSite'),
        value:
          (this.props.session.user.litem !== 'true' &&
            `${startCase(toLower(this.props.user.domain.replace(/www|com/g, '').replace(/shaadi/g, ' Shaadi'))).replace(' ', '')}.com`) ||
          'Shaadi.com',
        url: (this.props.session.user.litem !== 'true' && this.props.user.domain) || 'www.shaadi.com',
      },
      educationLevel: {
        forwardedRef: this.setComponentRef('educationLevel'),
        wrapRef: this.setInputRef('educationLevel'),
        onOptionSelection: this.onOptionSelection('educationLevel'),
        label: `${this.props.user.getHisOrHerOrYour()} education level`,
        value: this.props.user.highestQualification,
        isRequired: true,
      },
      educationField: {
        forwardedRef: this.setComponentRef('educationField'),
        wrapRef: this.setInputRef('educationField'),
        afterBlur: this.afterOptFieldBlur('educationField'),
        onOptionSelection: this.onOptionSelection('educationField'),
        label: `${this.props.user.getHisOrHerOrYour()} education field`,
        value: this.props.user.educationStream,
        isRequired: true,
      },
      college1: {
        forwardedRef: this.setComponentRef('college1'),
        wrapRef: this.setInputRef('college1'),
        afterBlur: this.afterTextBlur('college1'),
        onOptionSelection: this.onOptionSelection('college1'),
        updateInputValue: this.updateInputValue('college1'),
        onDone: this.onDone('college1'),
        value: this.props.user.graduationCollege,
      },
      college2: {
        forwardedRef: this.setComponentRef('college2'),
        wrapRef: this.setInputRef('college2'),
        afterBlur: this.afterTextBlur('college2'),
        onOptionSelection: this.onOptionSelection('college2'),
        updateInputValue: this.updateInputValue('college2'),
        onDone: this.onDone('college2'),
        value: this.props.user.mastersCollege,
        label: `Another college ${this.props.user.getHeOrSheOrYou().toLowerCase()} attended`,
      },
      workingWith: {
        forwardedRef: this.setComponentRef('workingWith'),
        wrapRef: this.setInputRef('workingWith'),
        onOptionSelection: this.onOptionSelection('workingWith'),
        value: this.props.user.workingWith === 'Non Working' ? 'Not Working' : this.props.user.workingWith,
        label: `${this.props.user.getHeOrSheOrYou()} work${this.props.user.isPostedBySelf ? '' : 's'} with`,
      },
      workingAs: {
        forwardedRef: this.setComponentRef('workingAs'),
        wrapRef: this.setInputRef('workingAs'),
        afterBlur: this.afterOptFieldBlur('workingAs'),
        onOptionSelection: this.onOptionSelection('workingAs'),
        value: this.props.user.occupation,
        industry: this.props.user.industry,
        updateInputValue: this.updateInputValue('workingAs'),
      },
      employer: {
        forwardedRef: this.setComponentRef('employer'),
        wrapRef: this.setInputRef('employer'),
        afterBlur: this.afterTextBlur('employer'),
        onOptionSelection: this.onOptionSelection('employer'),
        updateInputValue: this.updateInputValue('employer'),
        onDone: this.onDone('employer'),
        value: this.props.user.currentEmployer,
      },
      income: {
        forwardedRef: this.setComponentRef('income'),
        wrapRef: this.setInputRef('income'),
        onOptionSelection: this.onOptionSelection('income'),
        updateInputValue: this.updateInputValue('income'),
        value: this.props.user.currentIncome,
        isRequired: true,
      },
      diet: {
        forwardedRef: this.setComponentRef('diet'),
        wrapRef: this.setInputRef('diet'),
        onOptionSelection: this.onOptionSelection('diet'),
        value: this.props.user.diet,
        label: `${this.props.user.getHisOrHerOrYour()} diet`,
      },
      height: {
        forwardedRef: this.setComponentRef('height'),
        wrapRef: this.setInputRef('height'),
        onOptionSelection: this.onOptionSelection('height'),
        label: `${this.props.user.getHisOrHerOrYour()} height`,
        value: this.props.user.height && getHeight(this.props.user.height),
        inches: this.props.user.height,
        isRequired: true,
      },
      skinTone: {
        forwardedRef: this.setComponentRef('skinTone'),
        wrapRef: this.setInputRef('skinTone'),
        value: this.props.user.complexion,
        onChange: this.onRadioChange('skinTone'),
      },
      bodyType: {
        forwardedRef: this.setComponentRef('bodyType'),
        wrapRef: this.setInputRef('bodyType'),
        value: this.props.user.built,
        gender: this.props.user.gender,
        onChange: this.onRadioChange('bodyType'),
      },
      smokeHabbit: {
        forwardedRef: this.setComponentRef('smokeHabbit'),
        wrapRef: this.setInputRef('smokeHabbit'),
        value: this.props.user.smokeHabbit,
        label: `${this.props.user.doOrDoes()} ${this.props.user.getHeOrSheOrYou().toLowerCase()} smoke?`,
        onChange: this.onRadioChange('smokeHabbit'),
        isRequired: true,
      },
      drinkHabbit: {
        forwardedRef: this.setComponentRef('drinkHabbit'),
        wrapRef: this.setInputRef('drinkHabbit'),
        value: this.props.user.drinkHabbit,
        label: `${this.props.user.doOrDoes()} ${this.props.user.getHeOrSheOrYou().toLowerCase()} drink?`,
        isRequired: true,
        onChange: this.onRadioChange('drinkHabbit'),
      },
      description: {
        forwardedRef: this.setComponentRef('description'),
        wrapRef: this.setInputRef('description'),
        value: this.props.user.description,
        about: this.props.user.addressUserByActive,
        onAboutMeEngagingModalClose: () => this.changeFieldState('description', { showAboutMeEngagingModal: false }),
        uid: this.props.user.uid,
        suggestedValue: '',
        showAboutMeEngagingModal: false,
        isRequired: true,
      },
      countryCode: {
        forwardedRef: this.setComponentRef('countryCode'),
        wrapRef: this.setInputRef('countryCode'),
        afterBlur: this.afterOptFieldBlur('countryCode'),
        onOptionSelection: this.onOptionSelection('countryCode'),
        updateInputState: this.updateInputState('countryCode'),
        value: this.props.user.mobileIsd,
        country: this.props.user.mobileCountry,
        isd: this.props.user.mobileIsd,
      },
      mobileNumber: {
        forwardedRef: this.setComponentRef('mobileNumber'),
        wrapRef: this.setInputRef('mobileNumber'),
        afterBlur: this.afterTextBlur('mobileNumber'),
        value: this.props.user.mobileNumber,
      },
      disability: { checked: true, onChange: this.onCheckboxChange('disability') },
    },
  };
  componentDidMount = () => {
    document.title = 'Matrimonial link India - Free matrimonials for hindu muslim sikh christian -';
    this.state.stepNumber > this.getInitialCompletedStepNumber() + 1 && this.goto(this.getInitialCompletedStepNumber() + 1);
    this.canAccessPage();
    !this.props.isMobile() &&
      this.props
        .getRegExitIntentLayer()
        .then(this.onExitIntentLayerProfilesFetch)
        .catch(this.onExitIntentLayerProfilesFetchFail);
    this.props.location.hash.includes('drawer') &&
      this.props.history.replace(`${this.props.location.pathname}${this.props.history.location.search}`);
    this.props.dispatch({ type: types.UPDATE_INVERSE_LOGO, payload: { domain: this.state.form.regionalSite.url } });
    this.formData = this.state.form;
    const cookies = cookie.parse(document.cookie);
    GA.setSessionVar(cookies);
  };
  componentDidUpdate = (prevProps, prevState) => {
    this.scrollTop(prevState);
    this.canAccessPage();
    if (prevState.stepNumber !== this.state.stepNumber) {
      this.formData = this.state.form;
    }
  };
  onFormFieldsLoad = () => this.setState({ isFormLoaded: true });
  hasOptions = fieldName => this.getField(fieldName).options.length;
  onError = data => {
    const { form } = data;
    const errors = [];
    Object.keys(form).forEach(f => {
      if (form[f] && form[f].canShowError === true) {
        errors.push({
          key: (f && camelCaseToDash(f)) || '',
          error: form[f].getErrorMsg,
          value: form[f].value,
          user: this.props.session.errusr,
        });
      }
    });
    if (Object.keys(errors).length > 0) {
      const formTrackData = {
        errors,
      };
      api.post('/profile/:id/track', formTrackData, { id: this.props.user.uid, params: formTrackData });
    }
  };
  onExitIntentLayerProfilesFetch = response => {
    const exitIntentLayerProfiles = [];
    Object.keys(response.data).forEach(requestedLayer => {
      const layer = response.data[requestedLayer];
      Object.keys(layer.layer).forEach(profileKey => {
        const profileValue = layer.layer[profileKey].profile_details || {};
        const profileImage = layer.layer[profileKey].photo_details || {};
        profileValue.image_path =
          (profileImage.photos && profileImage.photos[0] && `${profileImage.photos[0].domain_name}${profileImage.photos[0].medium}`) || '';
        exitIntentLayerProfiles.push(profileValue);
      });
      this.setState({ exitIntentLayerProfiles });
    });
  };
  onExitIntentLayerProfilesFetchFailt = error => this.setState({ exitIntentLayerProfilesFetchError: error });
  isFormValid = () => {
    let isFormValid = true;
    let formLoaded = false;
    // step1FormFieldNamesValidate
    // step2FormFieldNamesValidate
    // step3FormFieldNamesValidate
    // step4FormFieldNamesValidate
    localConstants[`step${this.state.stepNumber}FormFieldNamesValidate`].forEach(fieldName => {
      const formFieldRef = this.form[fieldName];
      if (!formFieldRef) {
        return;
      }
      formLoaded = true;
      const { isVisible, isDisabled, isValid, canShowError, value, isRequired } = formFieldRef.props;
      const isHidden = isVisible === false;
      let isInvalid = !isHidden && !isDisabled && isEmpty(value) && isRequired;
      if (isValid === true) {
        isInvalid = false;
      }
      if (canShowError || isValid === false) {
        isInvalid = true;
      }
      if (isInvalid) {
        const ref = this.formInputRef[fieldName];
        isFormValid && ref && ref.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        isFormValid = false;
        this.changeFieldState(fieldName, { canShowError: true });
      }
    });
    this.state.stepNumber === 4 && this.changeFieldState('description', { showAboutMeEngagingModal: !this.state.form.description.value });
    return formLoaded && isFormValid;
  };
  getFormData = () => {
    const getFormDataMap = {
      1: getStep1FormData,
      2: getStep2FormData,
      3: getStep3FormData,
      4: getStep4FormData,
    };
    return getFormDataMap[this.state.stepNumber](this.state.form);
  };
  onFormSubmit = event => {
    event.preventDefault();
    if (this.isFormValid()) {
      const completedStepNumber =
        this.state.stepNumber > this.state.completedStepNumber ? this.state.stepNumber : this.state.completedStepNumber;
      this.setState({ isFormSubmitting: true, formSubmitFailed: false, completedStepNumber });
      this.updateDraftProfile(this.props.user.uid, this.getFormData(this.state.form));
    }
  };
  updateDraftProfile = (id, data) => {
    api
      .put('/profile/:id/draft', { id, data })
      .then(this.afterDraftProfileUpdate)
      .catch(this.afterDraftProfileUpdateFailure);
  };
  afterDraftProfileUpdate = response => {
    this.props.dispatch({ type: types.UPDATE_INVERSE_LOGO, payload: { domain: this.getField('regionalSite').url } });
    GA.createProfile(this.state.stepNumber);
    if (this.state.stepNumber < 4) {
      this.setState({ isFormSubmitting: false, formSubmitFailed: false });
      this.goto(this.state.stepNumber + 1);
    } else {
      this.createProfile(getProfileCreationData(this.state.form, this.props.user));
    }
  };
  afterDraftProfileUpdateFailure = error => {
    this.setState({ isFormSubmitting: false, formSubmitFailed: true });
  };
  createProfile = data =>
    api
      .post('/profile/:id/create', data)
      .then(this.afterProfileCreation)
      .catch(this.afterProfileCreationFailure);
  afterProfileCreation = response => {
    const {
      data: {
        data: {
          profile: {
            rog_status: { is_rog: isRog, status: rogStatus, next_page: rogNextPage } = {},
            stop_page: { improve_family_details: canShowFamilyPage } = {},
            data: { metadata: { domain } = {} },
          } = {},
        } = {},
      } = {},
    } = response;
    const cookieExpiryBy = canShowFamilyPage ? 30 : -1;
    const currentDate = new Date();
    const expires = new Date();
    expires.setMinutes(currentDate.getMinutes() + cookieExpiryBy);
    document.cookie = cookie.serialize('fmpage', 'true', { expires });
    const queryStr = stringify({
      memberlogin: this.props.user.uid,
      matrimony_domain: domain,
      gtrk: this.props.session.queryParams.gtrk,
      rog_status: rogStatus,
      rog_next_page: rogNextPage,
      is_rog: isRog,
      ...this.props.session.queryParams,
    });
    redirectExternal(`${window.location.protocol}//${getDomain()}/registration/profile/react-profile-create?${queryStr}`);
  };
  afterProfileCreationFailure = error => this.setState({ createProfileError: error, isFormSubmitting: false, formSubmitFailed: true });
  getFormName = () => localConstants.FormNames[this.state.stepNumber];
  getPageHeading = () =>
    this.props.isSuspendedUser
      ? pageHeadingTexts('suspendedUser')
      : this.props.isReturningUser ? pageHeadingTexts('returningUser') : pageHeadingTexts(this.state.stepNumber);
  getPageSubHeading = () => getPageSubHeadings(this.state.stepNumber, { user: this.props.user });
  afterExitIntentLayerOpens = () => guard.markShown(this.exitIntentLayerCookieName, this.props.user.uid, 3600 * 6);
  showExitIntentLayer = () => this.canShowExitIntentLayer && this.toggleExitIntentLayerModal(true, this.afterExitIntentLayerOpens);
  isExitIntentLayerOpen = () => this.state.isUserExiting;
  get canShowExitIntentLayer() {
    return !!(
      !this.props.isMobile() &&
      this.state.exitIntentLayerProfiles.length &&
      guard.canShow(this.exitIntentLayerCookieName, this.props.user.uid)
    );
  }
  closeExitIntentLayerModal = () => this.toggleExitIntentLayerModal(false);
  toggleExitIntentLayerModal = (isUserExiting, afterStateUpdate) => this.setState({ isUserExiting }, afterStateUpdate);
  controlInput = (event, fieldParams = {}) => {
    const { name: fieldName } = fieldParams || {};
    const { value, isFocused, isFocusedOut, canShowError, getErrorMsg, isChangeEvent } = this.state.form[fieldName] || {};
    const formTrackData = {
      fieldName: (fieldName && camelCaseToDash(fieldName)) || '',
      eventName: (event.type && eventTypeMap[event.type]) || '',
      fieldValue: value,
      sessionId: this.props.session.sessionId,
      ptnr: this.props.session.ptnr,
    };
    formTrackData.fieldValue = value;
    if ((isFocused || isFocusedOut) && !isChangeEvent) {
      const errors = [];
      if (canShowError && isFocusedOut) {
        errors.push({
          user: this.props.session.errusr,
          key: (fieldName && camelCaseToDash(fieldName)) || '',
          value,
          error: getErrorMsg,
        });
      }
      formTrackData.errors = errors;
      api.post('/profile/:id/track', formTrackData, { id: this.props.user.uid, params: formTrackData });
    }
  };
  exitIntentLayerCookieName = 'regexitintentlayer';
  scrollTop = prevState => prevState.stepNumber !== this.state.stepNumber && setTimeout(() => window.scrollTo(0, 0), 10);
  canAccessPage = () =>
    !this.props.user.isIncompleteUser() && redirectExternal(`${this.props.config.app.wwwBaseUrl}${constants.URI.myShaadi}`);
  changeFieldState = (fieldName, newFieldState, afterStateUpdate) =>
    this.setState(
      state => ({
        form: {
          ...state.form,
          [fieldName]: {
            ...state.form[fieldName],
            ...newFieldState,
          },
        },
      }),
      afterStateUpdate,
    );
  requiredErrorMsg = 'Oops! You seem to have missed this';
  profileCreationLink = '/profile-creation/step/';
  getButtonWidth = () => (this.state.stepNumber === 4 ? 192 : 158);
  getButtonText = () => (this.state.stepNumber === 4 ? 'Create Profile' : 'Continue');
  getCompletedStepNumber = () => this.state.completedStepNumber;
  canShowStepper = () => this.state.completedStepNumber > 1;
  goto = stepNumber => this.props.history.push(`${this.profileCreationLink}${stepNumber}${this.props.history.location.search}`);
  navigateTo = stepNumber => event => {
    event.stopPropagation();
    event.preventDefault();
    if (stepNumber === this.state.stepNumber) {
      return;
    }
    this.goto(stepNumber);
    this.formData && this.setState({ form: this.formData });
  };
  render = () => this.props.children({ ...this, ...this.state, canShowExitIntentLayer: this.canShowExitIntentLayer });
}

ProfileCreationLogic.defaultProps = {
  isSuspendedUser: false,
  isReturningUser: false,
};

ProfileCreationLogic.propTypes = profileCreationPropsValidation;

export default ProfileCreationLogic;
