import { MuiThemeProvider } from '@material-ui/core/styles';
import React, { Fragment } from 'react';
import { theme2 } from '../Common/FormElements/theme';
import s from './styles';
import RadioTabGroup from '../Common/FormElements/RadioTabGroup';
import Button from '../Common/FormElements/Button';
import ThankyouMsg from '../Common/Survey/ThankyouMsg';
import SvgLoader from '../Common/SvgLoader';
import PropTypes from '../../PropTypes';

class OnBoardingPhoneSetting extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: '',
      enableSubmit: true,
      formSubmit: false,
    };
  }

  componentDidMount() {
    this.props.doPrivacySettings('phoneSettingStoppage', this.props.user.uid, 'getPhoneSetting', { history: this.props.history.location });
  }

  componentWillReceiveProps(props) {
    if (!props.phoneSettings.memberShipPlan) {
      this.props.history.push('/my-shaadi');
    }
    const { phoneSettings } = props;
    const optionValueArr = phoneSettings.list && phoneSettings.list.length && phoneSettings.list.map(i => this.trimSpace(i.id));
    if (optionValueArr && optionValueArr.length && optionValueArr.includes(this.trimSpace(phoneSettings.preference))) {
      this.setState({ selectedOption: phoneSettings.preference, enableSubmit: true });
    } else {
      this.setState({ enableSubmit: false });
    }
  }

  onChoiceSelection = (event = {}, { value }) => {
    this.setState({ selectedOption: value, enableSubmit: true });
  };

  listOptions = list =>
    list &&
    list.length &&
    Object.keys(list).map(i => {
      const recommended = list[i].tooltip === 'RECOMMENDED' ? <s.recommendedText>{list[i].tooltip}</s.recommendedText> : '';
      return {
        value: list[i].id,
        label: (
          <React.Fragment>
            {recommended}
            {list[i].text}
          </React.Fragment>
        ),
      };
    });

  trimSpace = txt => txt.replace(/\s+/g, '');

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ formSubmit: true });
    this.props.doPrivacySettings('phoneSettingStoppage', this.props.user.uid, 'postPhoneSetting', {
      answer: this.state.selectedOption,
      history: this.props.history.location,
    });
  };

  callRadioTabGroup = props => (
    <s.RadioChoiceWrapper id={`phoneSetting`}>
      <RadioTabGroup {...props} />
    </s.RadioChoiceWrapper>
  );

  render() {
    const { phoneSettings, wwwBaseUrl } = this.props;
    const listOptions = this.listOptions(phoneSettings.list);
    const radioTabProps = {
      options: listOptions || [],
      onChange: this.onChoiceSelection,
      id: 'phoneSettingList',
      name: 'choice',
      value: [this.state.selectedOption],
      defaultWrap: s.radioTabWrapper,
      defaultBtnWrap: s.StyleButton,
    };
    return (
      <Fragment>
        <s.MainWrapper>
          <s.SubMainWrapper>
            <s.MainBgSurvey>
              {!this.state.formSubmit ? (
                (!this.props.phoneSettings.loading && (
                  <Fragment>
                    <s.onBoardingShape />
                    <s.VerifyHeading>WELCOME ONBOARD</s.VerifyHeading>
                    <s.VerifySubHeading>You are now a {this.props.phoneSettings.memberShipPlan}</s.VerifySubHeading>
                    <s.VerifyHeadingBorder />
                    <s.VerifyChooseHeading>Choose your Contact Preference</s.VerifyChooseHeading>
                    <form>
                      {this.callRadioTabGroup(radioTabProps)}
                      <MuiThemeProvider theme={theme2}>
                        <s.CtaBtnWrp addMargin={this.state.enableSubmit}>
                          <Button
                            onClick={this.handleSubmit}
                            defaultWrap={!this.state.enableSubmit ? s.DisabledInputButton : s.InputButton}
                            layerBtn={'phoneSettings'}
                            disabled={!this.state.enableSubmit}
                            id={`phoneSettingButton`}
                          >
                            Save & Continue
                          </Button>
                        </s.CtaBtnWrp>
                      </MuiThemeProvider>
                    </form>
                  </Fragment>
                )) || (
                  <s.LoaderWrp>
                    <SvgLoader isVisible isBigLoader />
                  </s.LoaderWrp>
                )
              ) : (
                <s.ThankyouWrapper>
                  <ThankyouMsg
                    isNative={phoneSettings.isNative}
                    wwwBaseUrl={wwwBaseUrl}
                    msg={['Thank you!', <br />, 'Your settings have been saved']}
                  />
                </s.ThankyouWrapper>
              )}
            </s.MainBgSurvey>
          </s.SubMainWrapper>
        </s.MainWrapper>
      </Fragment>
    );
  }
}
OnBoardingPhoneSetting.defaultProps = {
  isNative: false,
};
OnBoardingPhoneSetting.propTypes = {
  phoneSettings: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    memberShipPlan: PropTypes.string.isRequired,
    preference: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        tooltip: PropTypes.string,
      }),
    ).isRequired,
  }).isRequired,
  doPrivacySettings: PropTypes.func.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  history: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  user: PropTypes.shape(PropTypes.shaadiUser.uid).isRequired,
};
export default OnBoardingPhoneSetting;
