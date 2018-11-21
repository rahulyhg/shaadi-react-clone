import { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from '../../../PropTypes';
import withDeviceInfo from '../../../components/HOC/withDeviceInfo';
import withAPI from '../../../components/HOC/withAPI';
import constants from '../../../constants/constants';
import api from '../../../api';

class AboutMeFieldController extends PureComponent {
  state = {
    isDirty: false,
    value: this.props.value,
    isFocused: false,
    suggestedValue: '',
    showTemplateModal: false,
    refsLoaded: false,
  };
  componentDidMount = () => {
    !this.state.refsLoaded && this.setState({ refsLoaded: true });
    this.isEditDrawerActiveOpen() && this.descriptionInput.focus();
    document.addEventListener('click', this.onDocumentClick);
  };
  componentDidUpdate = prevProps => {
    if (this.state.mouseClickPosition && this.aboutMeDrawerWrap && this.state.isFocused) {
      this.aboutMeDrawerWrap.scrollTo(0, this.aboutMeDrawerWrap.scrollTop + this.state.mouseClickPosition - 20);
    }
  };
  componentWillUnmount = () => document.removeEventListener('click', this.onDocumentClick);
  onDocumentClick = event => this.setState({ mouseClickPosition: event.pageY });
  onFocus = event => this.setState({ isDirty: true, isFocused: true });
  onDrawerBlur = event => {
    this.setState({ isFocused: false });
  };
  onBlur = event => {
    this.onDrawerBlur();
    const value = event.target.value.trim();
    this.props.updateAboutMe({ value, canShowError: this.getCharacterCount(value) < 49 });
  };
  onChange = ({ target: { value } }) => value.length < this.props.maxLength + 1 && this.setState({ value, mouseClickPosition: false });
  onTemplateFetch = ({ data: suggestedValue }) =>
    this.setState({ suggestedValue }, () => {
      this.props.updateAboutMe({ suggestedValue });
      if (this.props.isMobile()) {
        this.props.history.push(`${this.props.history.location.search}${this.getAboutMeSuggestedDrawerHash()}`);
      } else {
        this.setState({ showTemplateModal: true });
      }
    });
  onModalClose = () => {
    this.setState({ showTemplateModal: false });
  };
  onDrawerCTA = () => {
    this.props.updateAboutMe({ value: this.state.value });
    this.props.history.replace(`${this.props.history.location.pathname}${this.props.history.location.search}`);
  };
  onMouseDown = event => {
    if (this.props.isMobile() && !this.isDrawerOpen()) {
      event.preventDefault();
      event.stopPropagation();
      this.openAboutMeEditDrawer();
    }
  };
  getPlaceHolderHeight = element => {
    this.placeholderRef = element;
  };
  getPlaceholder = () => (!this.state.isFocused && this.isEmpty() ? this.props.placeholder : '');
  getTemplate = () => {
    this.setState({ isDirty: false });
    api.get('/profile/:id/aboutmetemplate', { id: this.props.uid, params: { type: 'about_me' } }).then(this.onTemplateFetch);
  };
  getAboutMeSuggestedDrawerHash = () => `#drawer-aboutMe-copy${this.isEditDrawerOpen() ? '' : '-direct'}`;
  getErrorMsg = () => (this.isEmpty() ? this.props.reqdErrMsg : this.props.minLenErrMsg);
  getCharacterCount = (value = this.state.value) => value.length;

  setAboutMeDrawerWrap = element => {
    this.aboutMeDrawerWrap = element;
  };
  updateAboutMe = newState => this.setState(newState, () => this.props.updateAboutMe({ value: this.state.value, canShowError: false }));
  updateValue = value => this.setState({ value }, () => this.props.updateAboutMe({ value, canShowError: false }));
  openAboutMeEditDrawer = () =>
    !this.isDrawerOpen() && this.props.history.push(`${this.props.history.location.search}#drawer-aboutMe-edit`);
  openAboutMeSuggestedDrawer = () =>
    !this.isSuggestedDrawerOpen() && this.props.history.push(`${this.props.history.location.search}#drawer-aboutMe-copy`);
  isTooShort = () => this.getCharacterCount() < this.props.minLength;
  isEmpty = () => !this.getCharacterCount();
  isDrawerOpen = (hash = this.props.history.location.hash) => hash.includes('aboutMe');
  isDirectCopyMode = (hash = this.props.history.location.hash) => hash.includes('direct');
  isIndirectCopyMode = (hash = this.props.history.location.hash) => this.isSuggestedDrawerOpen(hash) && !this.isDirectCopyMode(hash);
  isSuggestedDrawerOpen = (hash = this.props.history.location.hash) => hash.includes('copy');
  inputRef = element => {
    this.descriptionInput = element;
    this.props.inputRef(element);
  };
  canShowError = () => this.isTooShort() && !this.state.isFocused && (this.state.isDirty || this.props.canShowError);
  closeDrawer = () => {
    this.setState({ isDirty: false });
    this.props.history.goBack();
  };
  focusAboutMe = () => (this.props.isMobile() ? this.openAboutMeEditDrawer() : this.descriptionInput.focus());
  isEditDrawerActiveOpen = () => this.props.history.location.hash.includes('edit');
  isEditDrawerOpen = () => this.isEditDrawerActiveOpen() || (this.isSuggestedDrawerOpen() && !this.isDirectCopyMode());
  goBackToForm = () => this.props.history.replace(`${this.props.history.location.pathname}${this.props.history.location.search}`);
  render = () =>
    this.props.children({
      ...this.state,
      updateValue: this.updateValue,
      canShowError: this.canShowError(),
      placeholder: this.getPlaceholder(),
      inputHeight:
        this.state.value || this.state.isFocused
          ? this.descriptionInput && this.descriptionInput.scrollHeigth
          : this.placeholderRef && this.placeholderRef.scrollHeight,
      getErrorMsg: this.getErrorMsg(),
      isEditDrawerOpen: this.isEditDrawerOpen(),
      isSuggestedDrawerOpen: this.isSuggestedDrawerOpen(),
      isDirectCopyMode: this.isDirectCopyMode(),
      isIndirectCopyMode: this.isIndirectCopyMode(),
      isEmpty: this.isEmpty(),
      onChange: this.onChange,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onDrawerBlur: this.onDrawerBlur,
      inputRef: this.inputRef,
      isTooShort: this.isTooShort,
      getPlaceHolderHeight: this.getPlaceHolderHeight,
      getCharacterCount: this.getCharacterCount,
      getTemplate: this.getTemplate,
      onModalClose: this.onModalClose,
      focusAboutMe: this.focusAboutMe,
      isDrawerOpen: this.isDrawerOpen,
      onDrawerCTA: this.onDrawerCTA,
      closeDrawer: this.closeDrawer,
      onMouseDown: this.onMouseDown,
      setAboutMeDrawerWrap: this.setAboutMeDrawerWrap,
      updateAboutMe: this.updateAboutMe,
      autoFocus: this.state.isFocused,
    });
}

AboutMeFieldController.defaultProps = {
  value: '',
  canShowError: false,
  minLength: 50,
  maxLength: 4000,
  reqdErrMsg: 'Oops! You seem to have missed this',
  minLenErrMsg: 'Please specify about the person looking to get married in minimum of 50 characters',
  placeholder: constants.descriptionPlaceholder,
  inputRef() {},
};

AboutMeFieldController.propTypes = {
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  canShowError: PropTypes.bool,
  value: PropTypes.string,
  uid: PropTypes.string.isRequired,
  reqdErrMsg: PropTypes.string,
  minLenErrMsg: PropTypes.string,
  placeholder: PropTypes.string,
  isMobile: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
  updateAboutMe: PropTypes.func.isRequired,
  inputRef: PropTypes.func,
  history: PropTypes.shape(PropTypes.history).isRequired,
};

export default withRouter(withAPI(withDeviceInfo(AboutMeFieldController)));
