import React from 'react';
import PropTypes from '../../../PropTypes';
import s from './styles';

class CallConsultant extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      contactno: props.callConsultant.contactno || '',
      name: props.callConsultant.name || '',
      memberName: props.selfData.fullName || '',
      profileName: props.profileData.firstName || '',
      gender: props.profileData.gender || '',
      phoneNo: props.settings.mobileNumber || '',
      isFormVisible: props.callConsultant.type === 'callConsultantInvited',
      isGetConsultation: props.callConsultant.type !== 'callConsultantInvited',
      hisHer: props.profileData.hisHer || '',
      mrMs: props.profileData.mrMs || '',
      nameVisibility: props.profileData.name !== props.profileData.userHandle,
      isThankYou: false,
      errorName: '',
      errorPhoneNo: '',
      errorMsg: '',
      memberEnquired: false,
      getInvited: props.callConsultant.type === 'callConsultantInvited',
    };
    this.sendConsultation = this.sendConsultation.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onPhoneChange = this.onPhoneChange.bind(this);
    this.onOpenForm = this.onOpenForm.bind(this);
    this.profileid = props.profileData.fullName ? props.profileData.fullName : '';
    this.trackGetFreeConsultation = () =>
      props.doProfileAction('callConsultantModal', props.callConsultant.uid, 'trackGetFreeConsultation');
  }

  componentWillReceiveProps(props) {
    if (props.callConsultant) {
      if (props.callConsultant.contactno && props.callConsultant.name) {
        this.setState({ contactno: this.props.callConsultant.contactno, name: this.props.callConsultant.name });
      }

      if (props.callConsultant.submitted) {
        this.setState({ isFormVisible: false, isThankYou: true, isGetConsultation: false });
      }
      if (props.callConsultant.memberEnquiryCount !== 0) {
        this.setState({
          memberEnquired: true,
          isFormVisible: false,
          isThankYou: true,
          isGetConsultation: false,
        });
      }

      if (props.callConsultant.memberEnquiryCount === 0 && !props.callConsultant.submitted) {
        this.setState({
          memberEnquired: false,
          isThankYou: false,
        });
      }
      if (props.callConsultant.errors && (props.callConsultant.errors.firstname || props.callConsultant.errors.phoneNo)) {
        const errorNameVal = props.callConsultant.errors.firstname ? props.callConsultant.errors.firstname : '';
        const errorPhoneNoVal = props.callConsultant.errors.phoneNo ? props.callConsultant.errors.phoneNo : '';
        this.setState({ errorName: errorNameVal, errorPhoneNo: errorPhoneNoVal });
      } else if (!props.callConsultant.errors) {
        this.setState({ errorMsg: '' });
      }

      if (props.callConsultant.errors && props.callConsultant.errors.message) {
        this.setState({ errorMsg: props.callConsultant.errors.message });
      }
    }
  }
  onNameChange(value) {
    if (value.length < 51) {
      this.setState({
        memberName: value,
      });
    }
  }

  onPhoneChange(value) {
    if (value.length < 16) {
      this.setState({
        phoneNo: value,
      });
    }
  }

  onOpenForm() {
    if (!this.state.isFormVisible) {
      this.setState({ isGetConsultation: false, isFormVisible: true });
      this.trackGetFreeConsultation();
    }
  }

  sendConsultation() {
    const action = 'send_consultation';
    this.props.doProfileAction('callConsultantModal', this.props.callConsultant.uid, action, this.state.memberName, this.state.phoneNo);
  }

  render() {
    return (
      <s.CallConsultant>
        {this.props.callConsultant.errors &&
          this.props.callConsultant.errors.message && (
            <s.VipContainer isVisible>
              <s.VipHeader>
                <s.VipCloseModalBtn onClick={this.props.onModalClose} />
              </s.VipHeader>

              <s.VipContainerError isVisible>{this.props.callConsultant.errors.message}</s.VipContainerError>
            </s.VipContainer>
          )}

        {!this.state.errorMsg && (
          <s.VipContainer isVisible>
            {this.props.callConsultant.loading === true && (
              <s.ModalLoader isVisible>
                <s.SvgLoader vipConsultant>
                  <s.SvgPath viewBox="25 25 50 50">
                    <s.SvgCircle cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
                  </s.SvgPath>
                </s.SvgLoader>
              </s.ModalLoader>
            )}
            {this.props.callConsultant.loading !== true && (
              <s.VipContainer isVisible>
                <s.VipHeader>
                  <s.Title />
                  <s.VipCloseModalBtn onClick={this.props.onModalClose} />
                </s.VipHeader>
                <s.VipContent>
                  <s.VipContainer isVisible={this.state.getInvited}>
                    <s.VipLogo isVisible={this.state.getInvited} />
                    <s.SpacerThree />
                    Matchmaking by invitation only
                  </s.VipContainer>

                  <s.MobileNoWrapper isVisible={!this.state.getInvited}>
                    {`You can contact ${
                      this.state.nameVisibility === true
                        ? `${this.state.mrMs +
                            this.state.profileName.charAt(0).toUpperCase() +
                            this.state.profileName.slice(1).toLowerCase()}'s`
                        : this.state.hisHer.toLowerCase()
                    } VIP Consultant `}
                    <s.VIPConsultant>{`${this.props.callConsultant.name} `}</s.VIPConsultant>
                    at
                    <s.VipMobile>{this.props.callConsultant.contactno}</s.VipMobile>
                  </s.MobileNoWrapper>

                  <s.VipContainer isVisible={this.props.settings.membershipTags !== 'vip'}>
                    <s.SepVip isVisible={this.state.getInvited}>
                      <s.VipSeparatorOrange />
                    </s.SepVip>
                    <s.SepVip isVisible={!this.state.getInvited}>
                      <s.VipSeparatorGrey />
                    </s.SepVip>
                    <s.ConsultantWrapper isVisible={this.state.isGetConsultation}>
                      <s.VipManageProfile>Would you like a VIP Consultant to manage your Profile?</s.VipManageProfile>
                      <s.vipLink onClick={this.onOpenForm}>Get a free consultation</s.vipLink>
                    </s.ConsultantWrapper>
                    <s.ConsultantWrapper isVisible={this.state.isFormVisible}>
                      Enter your contact details for us to call you back
                      <s.VipFormInner>
                        <s.VipLabelName>Name</s.VipLabelName>
                        <s.VipInput value={this.state.memberName} onChange={e => this.onNameChange(e.target.value)} />
                        <s.VipError isVisible={this.state.errorName}>{this.state.errorName}</s.VipError>

                        <s.VipLabelName>Contact Number</s.VipLabelName>
                        <s.VipInput value={this.state.phoneNo} onChange={e => this.onPhoneChange(e.target.value)} />
                        <s.VipError isVisible={this.state.errorPhoneNo}>{this.state.errorPhoneNo}</s.VipError>
                      </s.VipFormInner>
                      <s.SpacerEight />
                      <s.VipSubmitBtn onClick={this.sendConsultation}>Submit</s.VipSubmitBtn>
                    </s.ConsultantWrapper>
                    <s.VipThankuWrapper isVisible={this.state.isThankYou}>
                      <s.VipGreenTick />
                      <s.VipThankuHeading>Thank you!</s.VipThankuHeading>
                      {this.state.memberEnquired && (
                        <s.VipContainer isVisible>
                          We have received your request already.<br />
                          <br />
                        </s.VipContainer>
                      )}
                      A VIP consultant will contact you shortly.
                    </s.VipThankuWrapper>
                  </s.VipContainer>
                </s.VipContent>
              </s.VipContainer>
            )}
          </s.VipContainer>
        )}
      </s.CallConsultant>
    );
  }
}
CallConsultant.defaultProps = {
  profileData: {
    firstName: '',
    gender: '',
    hisHer: '',
    name: '',
    userHandle: '',
    mrMs: '',
    fullName: '',
  },
};
CallConsultant.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  callConsultant: PropTypes.shape({
    type: PropTypes.string,
    name: PropTypes.string,
    uid: PropTypes.string,
    contactno: PropTypes.string,
    memberEnquired: PropTypes.bool,
    memberEnquiryCount: PropTypes.number,
    submitted: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    errors: PropTypes.shape({
      firstname: PropTypes.string,
      phoneNo: PropTypes.string,
      message: PropTypes.string,
    }),
  }).isRequired,
  selfData: PropTypes.shape({
    fullName: PropTypes.string,
  }).isRequired,
  profileData: PropTypes.shape({
    firstName: PropTypes.string,
    gender: PropTypes.string,
    hisHer: PropTypes.string,
    name: PropTypes.string,
    userHandle: PropTypes.string,
    mrMs: PropTypes.string,
    fullName: PropTypes.string,
  }),
  settings: PropTypes.shape({
    mobileNumber: PropTypes.string,
    membershipTags: PropTypes.string,
  }).isRequired,
  doProfileAction: PropTypes.func.isRequired,
};

export default CallConsultant;
