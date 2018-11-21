/* eslint prefer-template: 0 */
import React, { Fragment } from 'react';
import PropTypes from '../../../PropTypes';
import SvgLoader from '../../Common/SvgLoader';
import ConnectSuccessMsg from './ConnectSuccessMsg';
import { getMembershipTagMsg, payLink, mobileVerificationLink } from './contactDetailsUtils';
import s from './styles';

class ContactDetails extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      prefix: (props.data.message || '').split(',')[0] + ': ',
      prefixWithMobile: (props.data.message || '').split(':')[0] + ': ',
      message: props.data.message || '',
      charactersLeft: 160 - props.data.message.length,
      includeMobileNo: true,
      toggleSmsDraft: false,
    };
    this.renderUpgradeSection = this.renderUpgradeSection.bind(this);
    this.renderFlash = this.renderFlash.bind(this);
    this.renderMessage = this.renderMessage.bind(this);

    this.onTextAreaChange = this.onTextAreaChange.bind(this);
    this.onSendConnect = this.onSendConnect.bind(this);
    this.onSendVerificationRequest = this.onSendVerificationRequest.bind(this);
    this.onSendSmsClick = () => {
      const { source } = this.props.data;
      const { charactersLeft, includeMobileNo, message } = this.state;
      this.props.doProfileAction(source || 'modal', this.props.data.uid, 'sendSms', { charactersLeft, includeMobileNo, message });
    };
  }

  componentWillReceiveProps(props) {
    if (['lockedMemberAccepted', 'locked', 'availableOnRequest'].includes(props.data.status) || props.data.flashType === 'success') {
      this.setState({ toggleSmsDraft: true });
    }
    if (!this.props.data || props.data.message !== this.props.data.message) {
      this.setState({
        message: props.data.message,
        charactersLeft: 160 - (props.data.message ? props.data.message.length : 0),
        prefix: (props.data.message || '').split(',')[0] + ': ',
        prefixWithMobile: (props.data.message || '').split(':')[0] + ': ',
      });
    }
  }

  onSendConnect() {
    this.props.doProfileAction('modal', this.props.data.uid, 'connect');
  }

  onSendVerificationRequest() {
    this.props.doProfileAction('modal', this.props.data.uid, 'sendVerificationRequest', {
      type: 'contact',
      from: this.props.data.self,
      to: this.props.data.uid,
    });
  }

  onTextAreaChange(val, includeMobileNo, e) {
    const prefix = includeMobileNo ? this.state.prefixWithMobile : this.state.prefix;
    const cursorAtPrefix = e ? prefix.length - e.target.selectionStart : 100;
    const value =
      cursorAtPrefix <= 2 && cursorAtPrefix >= 0
        ? prefix + val.slice(prefix.length)
        : prefix +
          val
            .split(': ')
            .slice(1)
            .join(':');
    const charactersLeft = 160 - value.length;
    if (charactersLeft >= 0 && val.length >= prefix.length - 2) {
      this.setState({
        charactersLeft,
        message: value,
      });
    } else if (charactersLeft >= 0) {
      // Blink and set the old message back
      const message = this.state.message;
      this.setState({ message: value });
      setTimeout(() => this.setState({ message }), 200);
    }
  }

  getfatalMsgHeader() {
    const flashmsg = this.props.data.flash || '';
    if (flashmsg.indexOf('exceeded') >= 0 && flashmsg.indexOf('daily') >= 0) {
      return 'Daily Limit Exceeded';
    } else if (flashmsg.indexOf('Membership') >= 0) {
      return 'Membership Contact View Limit Exceeded';
    }
    return '';
  }

  getSMS = () => {
    if (!this.props.data.isLoggerMobileVerified) {
      this.props.onModalClose();
    }
    this.props.doProfileAction('modal', this.props.data.uid, 'getSmsProfileContactDetail');
  };

  smsDraftToggle = () => {
    this.setState({ toggleSmsDraft: !this.state.toggleSmsDraft });
  };

  reportPhoneNo = () => {
    this.props.doProfileAction('modal', this.props.data.uid, 'contactReportPhoneNo');
  };

  renderUpgradeSection() {
    const photoPath = ['visibleOnAccept', 'visibleOnUpgrade'].includes(this.props.data.profileAlbumStatus)
      ? this.props.data.thumbnailBlur
      : this.props.data.thumbnail;

    return (
      <s.ContactDetails contactmodaltype={this.props.data.status}>
        <s.ContactHeader />
        <s.ContactInner>
          <s.ContactProfileWrp>
            <s.PhotoProfileWrp>
              <s.PhotoShadowBox src={photoPath} />
            </s.PhotoProfileWrp>
            <s.PhotoProfileInfo>
              <s.ContactProfileName>{this.props.data.name}</s.ContactProfileName>
              <s.ContactProfileCreated>Profile created by {this.props.data.profileCreatedBy}</s.ContactProfileCreated>
              <s.ProfileContent isVisible>
                You have exceeded your contact limit. To view {this.props.data.hisHer.toLowerCase()} contact details, become a Premium
                member.
                <s.UpgradeBtnWrp>
                  <s.UpgradeLink isExternal to={`/payment?loc=profile&profileid=${this.props.data.uid}&source=search_contact_icon`}>
                    Upgrade Now
                  </s.UpgradeLink>
                </s.UpgradeBtnWrp>
              </s.ProfileContent>
            </s.PhotoProfileInfo>
            <s.ContactCloseModalBtn onClick={this.props.onModalClose} />
          </s.ContactProfileWrp>
        </s.ContactInner>
      </s.ContactDetails>
    );
  }

  renderMemberDeclined() {
    const photoPath = ['visibleOnAccept', 'visibleOnUpgrade'].includes(this.props.data.profileAlbumStatus)
      ? this.props.data.thumbnailBlur
      : this.props.data.thumbnail;
    const hisHer = this.props.data.hisHer.toLowerCase();

    return (
      <s.ContactDetails contactmodaltype={this.props.data.status}>
        <s.ContactHeader />
        <s.ContactInner>
          <s.ContactProfileWrp>
            <s.PhotoProfileWrp>
              <s.PhotoShadowBox src={photoPath} />
            </s.PhotoProfileWrp>
            <s.PhotoProfileInfo>
              <s.ContactProfileName>{this.props.data.name}</s.ContactProfileName>
              <s.ContactProfileCreated>Profile created by {this.props.data.profileCreatedBy}</s.ContactProfileCreated>
              <s.ProfileContent isVisible isTick={this.props.data.flashType === 'success'}>
                <s.ContentLine>
                  {this.props.data.heShe} had made {hisHer} contact details <b>&quot;Visible on Accept&quot;</b>. Please Accept {hisHer}{' '}
                  Invitation to view {hisHer} contact details.
                </s.ContentLine>
              </s.ProfileContent>
            </s.PhotoProfileInfo>
            <s.ContactCloseModalBtn onClick={this.props.onModalClose} />
          </s.ContactProfileWrp>
        </s.ContactInner>
      </s.ContactDetails>
    );
  }

  renderMessage(paras) {
    const photoPath = ['visibleOnAccept', 'visibleOnUpgrade'].includes(this.props.data.profileAlbumStatus)
      ? this.props.data.thumbnailBlur
      : this.props.data.thumbnail;

    return (
      <s.ContactDetails contactmodaltype={this.props.data.status}>
        <s.ContactHeader />
        <s.ContactInner>
          <s.ContactProfileWrp>
            <s.PhotoProfileWrp>
              <s.PhotoShadowBox src={photoPath} />
            </s.PhotoProfileWrp>
            <s.PhotoProfileInfo>
              <s.ContactProfileName>{this.props.data.name}</s.ContactProfileName>
              <s.ContactProfileCreated>Profile created by {this.props.data.profileCreatedBy}</s.ContactProfileCreated>
              <s.ProfileContent isVisible>{paras.map(msg => <s.ContentLine key={msg.slice(0, 30)}>{msg}</s.ContentLine>)}</s.ProfileContent>
            </s.PhotoProfileInfo>
            <s.ContactCloseModalBtn onClick={this.props.onModalClose} />
          </s.ContactProfileWrp>
        </s.ContactInner>
      </s.ContactDetails>
    );
  }

  renderFiltered() {
    const heShe = this.props.data.heShe;
    const himHer = this.props.data.himHer.toLowerCase();
    const photoPath = ['visibleOnAccept', 'visibleOnUpgrade'].includes(this.props.data.profileAlbumStatus)
      ? this.props.data.thumbnailBlur
      : this.props.data.thumbnail;

    return (
      <s.ContactDetails contactmodaltype={this.props.data.status}>
        <s.ContactHeader />
        <s.ContactInner>
          <s.ContactProfileWrp>
            <s.PhotoProfileWrp>
              <s.PhotoShadowBox src={photoPath} />
            </s.PhotoProfileWrp>
            <s.PhotoProfileInfo>
              <s.ContactProfileName>{this.props.data.name}</s.ContactProfileName>
              <s.ContactProfileCreated>Profile created by {this.props.data.profileCreatedBy}</s.ContactProfileCreated>
              <s.ProfileContent isVisible>
                {heShe} has Filtered your Profile. You can express Interest in {himHer} and contact {himHer} once {heShe.toLowerCase()}{' '}
                Accepts your Invitation.
                <s.contactBtnWrapper>
                  <s.SendSMSBtn onClick={this.onSendConnect}>Connect</s.SendSMSBtn>
                </s.contactBtnWrapper>
              </s.ProfileContent>
            </s.PhotoProfileInfo>
            <s.ContactCloseModalBtn onClick={this.props.onModalClose} />
          </s.ContactProfileWrp>
        </s.ContactInner>
      </s.ContactDetails>
    );
  }

  renderVerificationRequest() {
    const heShe = this.props.data.heShe.toLowerCase();
    const hisHer = this.props.data.hisHer.toLowerCase();
    const himHer = this.props.data.himHer.toLowerCase();
    const photoPath = ['visibleOnAccept', 'visibleOnUpgrade'].includes(this.props.data.profileAlbumStatus)
      ? this.props.data.thumbnailBlur
      : this.props.data.thumbnail;
    return (
      <s.ContactDetails contactmodaltype={this.props.data.status}>
        <s.ContactHeader />
        <s.ContactInner>
          <s.ContactProfileWrp>
            <s.PhotoProfileWrp>
              <s.PhotoShadowBox src={photoPath} />
            </s.PhotoProfileWrp>
            <s.PhotoProfileInfo>
              <s.ContactProfileName>{this.props.data.name}</s.ContactProfileName>
              <s.ContactProfileCreated>Profile created by {this.props.data.profileCreatedBy}</s.ContactProfileCreated>
              <s.ProfileContent isVisible>
                {`${
                  this.props.data.heShe
                } has not verified ${hisHer} number. You can request ${himHer} to verify the number.We will notify you when ${heShe} completes ${hisHer} Phone Verification.`}
                <s.contactBtnWrapper>
                  <s.SendSMSBtn onClick={this.onSendVerificationRequest}>Request Verification</s.SendSMSBtn>
                </s.contactBtnWrapper>
              </s.ProfileContent>
            </s.PhotoProfileInfo>
            <s.ContactCloseModalBtn onClick={this.props.onModalClose} />
          </s.ContactProfileWrp>
        </s.ContactInner>
      </s.ContactDetails>
    );
  }

  renderFlash() {
    const FlashMessage = this.props.data.flash || '';

    const isContactDetailsExceeded =
      FlashMessage.indexOf('exceeded') >= 0 || FlashMessage.indexOf('daily') >= 0 || FlashMessage.indexOf('Membership') >= 0 || false;
    return (
      <s.ContactDetails>
        <s.ContactHeader />
        <s.ContactInner>
          <s.ProfileContentHeader isLimitExceed={isContactDetailsExceeded}>
            {this.props.data.loading && (
              <s.LoadingWrapper>
                <SvgLoader isVisible />
              </s.LoadingWrapper>
            )}
            {this.getfatalMsgHeader()}
            <s.ProfileContactText isLimitExceed={isContactDetailsExceeded}>{this.props.data.flash}</s.ProfileContactText>
          </s.ProfileContentHeader>
          <s.ContactCloseModalBtn onClick={this.props.onModalClose} />
        </s.ContactInner>
        {FlashMessage.indexOf('Membership') >= 0 && (
          <s.SmsBtnWrapper isPayment>
            {!this.props.data.loading && (
              <s.GoPayment href={payLink(this.props.wwwBaseUrl)} isContactExceeded={FlashMessage.indexOf('Membership') >= 0}>
                Renew Membership
              </s.GoPayment>
            )}
          </s.SmsBtnWrapper>
        )}
      </s.ContactDetails>
    );
  }

  renderLoggerContactVerification() {
    const { name } = this.props.data;
    return (
      <s.ContactDetails>
        <s.ContactHeader />
        <s.ContactInner>
          <s.ProfileContentHeader isLimitExceed>
            <s.ProfileContentText
              isLimitExceed
            >{`Your number is not verified. To receive ${name}'s contact details over SMS, kindly verify your number.`}</s.ProfileContentText>
          </s.ProfileContentHeader>
          <s.ContactCloseModalBtn onClick={this.props.onModalClose} />
        </s.ContactInner>
        <s.SmsBtnWrapper>
          <s.verifyBtn
            isExternal
            onClick={this.props.onModalClose}
            title={`Verify your Number`}
            href={mobileVerificationLink(this.props.wwwBaseUrl)}
            target="_blank"
          >
            Verify your Number
          </s.verifyBtn>
        </s.SmsBtnWrapper>
      </s.ContactDetails>
    );
  }

  render() {
    const heShe = this.props.data.heShe.toLowerCase();
    const hisHer = this.props.data.hisHer.toLowerCase();

    if ((this.props.data.loading && this.props.data.flashType !== 'success') || this.props.data.flashType === 'fatal') {
      return this.renderFlash();
    } else if (this.props.data.status === 'logger_mobile_unverified') {
      return this.renderLoggerContactVerification();
    } else if (this.props.data.status === 'sku_contact_exceeded') {
      return this.renderUpgradeSection();
    } else if (this.props.data.status === 'filtered') {
      return this.renderFiltered();
    } else if (this.props.data.status === 'member_blocked') {
      return this.renderMessage([`You cannot view contact detail of Blocked Members`]);
    } else if (this.props.data.status === 'profile_declined') {
      return this.renderMessage([
        `You cannot view ${hisHer} contact details as ${heShe} has Declined your Invitation.
        We will notify you if ${heShe} changes ${this.props.data.hisHer.toLowerCase()} mind.`,
      ]);
    } else if (this.props.data.status === 'member_declined') {
      return this.renderMemberDeclined();
    } else if (this.props.data.status === 'member_hidden') {
      return this.renderMessage(['Your Profile is currently hidden. To view contact detail of other Members, make your profile visible.']);
    } else if (this.props.data.status === 'filteredMemberContacted') {
      return this.renderMessage([
        `You cannot view ${hisHer} contact details as ${this.props.data.heShe.toLowerCase()} has Filtered you out.`,
      ]);
    } else if (this.props.data.status === 'profileCancelled') {
      return this.renderMessage([
        `You cannot view ${this.props.data.hisHer.toLowerCase()} contact details as ${heShe} has Cancelled ${this.props.data.hisHer.toLowerCase()} Invitation to you. We will notify you if ${heShe} changes ${this.props.data.hisHer.toLowerCase()} mind.`,
      ]);
    } else if (this.props.data.status === 'availableOnMemberVerification') {
      return this.renderMessage([
        `You can view ${this.props.data.hisHer.toLowerCase()} contact details after you Verify your own Phone number. Verifying your Phone number builds trust in your Profile and helps us send you important notifications regarding your Shaadi.com Profile.`,
      ]);
    } else if (this.props.data.status === 'availableOnVerification') {
      return this.renderVerificationRequest();
    } else if (this.props.data.verificationRequested) {
      return this.renderMessage(['Your request for verifying contact number has been sent to the member.']);
    }

    const photoPath = ['visibleOnAccept', 'visibleOnUpgrade'].includes(this.props.data.profileAlbumStatus)
      ? this.props.data.thumbnailBlur
      : this.props.data.thumbnail;
    const { disabledGetSms, getSMSSend, getSMSText, getSMSLoading, membershipTags, loggerMembership } = this.props.data;
    return (
      <s.ContactDetails>
        <s.ContactHeader />
        <s.ContactInner>
          <s.ContactProfileWrp>
            <s.PhotoProfileWrp>
              <s.PhotoShadowBox src={photoPath} />
            </s.PhotoProfileWrp>
            <s.PhotoProfileInfo>
              <s.ContactProfileName>{this.props.data.name}</s.ContactProfileName>
              <s.ContactProfileCreated>Profile created by {this.props.data.profileCreatedBy}</s.ContactProfileCreated>
              <ConnectSuccessMsg
                connectionStatus={this.props.connectionFlags.connectionStatus}
                contactStatus={this.props.connectionFlags.contactStatus}
                data={this.props.data}
              />
              <s.ConnectNumWrp
                addPadding={this.props.data.isMisuseReported}
                isVisible={!['lockedMemberAccepted', 'locked', 'availableOnRequest'].includes(this.props.data.status)}
              >
                <s.ConnectNumIcon />
                <s.ConnectNum>{this.props.data.mobile}</s.ConnectNum>
                <s.ConnectMailIcon />
                <s.ConnectMailId title={this.props.data.email}>
                  {this.props.data.email.length < 22 ? this.props.data.email : this.props.data.email.substr(0, 20) + '...'}
                </s.ConnectMailId>
              </s.ConnectNumWrp>
              {!this.props.data.isMisuseReported && (
                <s.ConnectSms
                  chngSentSmsPos={
                    !['lockedMemberAccepted', 'locked', 'availableOnRequest'].includes(this.props.data.status) ||
                    ['contacted', 'theyContacted', 'accepted', 'theyAccepted'].includes(this.props.connectionFlags.connectionStatus)
                  }
                  onClick={
                    !['availableOnRequest', 'locked', 'lockedMemberAccepted'].includes(this.props.data.status) && this.smsDraftToggle
                  }
                >
                  Send SMS<s.ConnectSmsUp
                    isVisible={!['availableOnRequest', 'locked', 'lockedMemberAccepted'].includes(this.props.data.status)}
                    updown={this.state.toggleSmsDraft}
                  />
                </s.ConnectSms>
              )}
            </s.PhotoProfileInfo>
            <Fragment>
              {disabledGetSms && getSMSSend && <s.getSmsTxt>{getSMSText}</s.getSmsTxt>}
              {getSMSLoading && (
                <s.GetSmsLoader>
                  <SvgLoader isVisible isPremiumCarousel />
                </s.GetSmsLoader>
              )}
              <s.GetSMSBtn
                isVisible={
                  !['lockedMemberAccepted', 'locked', 'availableOnRequest'].includes(this.props.data.status) &&
                  this.props.settings.mobileCountry === 'India' &&
                  !getSMSSend &&
                  !getSMSLoading
                }
                disabled={disabledGetSms}
                title={getSMSText}
                onClick={this.getSMS}
              />
            </Fragment>
            <s.ContactCloseModalBtn onClick={this.props.onModalClose} />
          </s.ContactProfileWrp>
        </s.ContactInner>
        {!this.props.data.isMisuseReported && (
          <s.TextAreaWrp
            chngTxtAreaPos={
              !['lockedMemberAccepted', 'locked', 'availableOnRequest'].includes(this.props.data.status) ||
              ['contacted', 'theyContacted', 'accepted', 'theyAccepted'].includes(this.props.connectionFlags.connectionStatus)
            }
            showToFreeAndPremium={this.props.data.disabled && this.props.data.status === 'showToFreeAndPremium'}
            toggleSmsDraft={this.state.toggleSmsDraft}
          >
            <s.SmsTextArea
              disabled={this.props.data.disabled}
              value={this.state.message}
              onChange={e => this.onTextAreaChange(e.target.value, this.state.includeMobileNo, e)}
              toggleSmsDraft={this.state.toggleSmsDraft}
            />

            <s.DraftBtnsWrapper toggleSmsDraft={this.state.toggleSmsDraft} isVisible={this.props.data.flashType !== 'success'}>
              <s.CharsRemaining>
                Characters remaining:
                <s.CharsCount>{this.state.charactersLeft}</s.CharsCount>
              </s.CharsRemaining>
              <s.SendSMSBtn onClick={this.onSendSmsClick}>Send SMS</s.SendSMSBtn>
            </s.DraftBtnsWrapper>

            <s.SuccessfullyText toggleSmsDraft={this.state.toggleSmsDraft} isVisible={this.props.data.flashType === 'success'}>
              {this.props.data.flash}
            </s.SuccessfullyText>
            <s.SmsBtnWrapper toggleSmsDraft={this.state.toggleSmsDraft}>
              {this.props.data.flashType === 'loading' && (
                <s.SmsLoader>
                  <SvgLoader isVisible />
                </s.SmsLoader>
              )}
            </s.SmsBtnWrapper>
          </s.TextAreaWrp>
        )}
        <s.ViewContactNote isVisible={this.props.data.status === 'showToFreeAndPremium'}>
          {getMembershipTagMsg(membershipTags, loggerMembership, hisHer, this.props.settings.isPaidUser)}
        </s.ViewContactNote>
        <s.ReportPhoneWrp isVisible={this.props.settings.isPaidUser}>
          {!this.props.data.isMisuseReported ? (
            <s.Note
              isVisible={!['lockedMemberAccepted', 'locked', 'availableOnRequest'].includes(this.props.data.status)}
              onClick={this.reportPhoneNo}
              changeFont={this.props.data.isMisuseReported}
            >
              <s.ReportPhoneSpan>Report Phone Number</s.ReportPhoneSpan>
            </s.Note>
          ) : (
            <s.Note
              isVisible={!['lockedMemberAccepted', 'locked', 'availableOnRequest'].includes(this.props.data.status)}
              changeFont={this.props.data.isMisuseReported}
            >
              You have already reported this number.
            </s.Note>
          )}
          <s.ContactsAvailableWrapper>
            <s.ContactsAvailableLabel>Contact Balance :</s.ContactsAvailableLabel>
            <s.ContactCount isContactExceeded={false}>{this.props.settings.contactsRemaining}</s.ContactCount>
          </s.ContactsAvailableWrapper>
        </s.ReportPhoneWrp>
      </s.ContactDetails>
    );
  }
}

ContactDetails.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    flashType: PropTypes.oneOf(['default', 'fatal', 'success', 'error', 'loading']).isRequired,
    flash: PropTypes.string,
    uid: PropTypes.string,
    self: PropTypes.string,
    name: PropTypes.string.isRequired,
    hisHer: PropTypes.hisHer.isRequired,
    heShe: PropTypes.heShe.isRequired,
    himHer: PropTypes.himHer.isRequired,
    message: PropTypes.string.isRequired,
    preferredName: PropTypes.string.isRequired,
    preferredTime: PropTypes.string.isRequired,
    landline: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    verificationRequested: PropTypes.bool,
    email: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    thumbnailBlur: PropTypes.string.isRequired,
    profileCreatedBy: PropTypes.string.isRequired,
    profileAlbumStatus: PropTypes.string.isRequired,
    isMisuseReported: PropTypes.bool.isRequired,
    isLoggerMobileVerified: PropTypes.bool.isRequired,
    getSMSLoading: PropTypes.bool,
    disabledGetSms: PropTypes.bool,
    getSMSSend: PropTypes.bool,
    getSMSText: PropTypes.string.isRequired,
    membershipTags: PropTypes.string.isRequired,
    loggerMembership: PropTypes.string.isRequired,
    status: PropTypes.oneOf([
      'free',
      'available',
      'availableOnVerification',
      'availableOnVerificationRequested',
      'availableOnRequest',
      'lockedMemberAccepted',
      'locked',
      'showFlash',
      'filtered',
      'profileCancelled',
      'member_declined',
      'profile_declined',
      'filteredMemberContacted',
      'member_blocked',
      'member_hidden',
      'availableOnMemberVerification',
      'logger_mobile_unverified',
      'showToFreeAndPremium',
      'sku_contact_exceeded',
    ]).isRequired,
    source: PropTypes.string,
  }).isRequired,
  connectionFlags: PropTypes.shape({
    connectionStatus: PropTypes.string,
    contactStatus: PropTypes.string,
  }).isRequired,
  settings: PropTypes.shape({
    contactsRemaining: PropTypes.number.isRequired,
    contactsTotal: PropTypes.number.isRequired,
    isMobileVerified: PropTypes.bool.isRequired,
    mobileCountry: PropTypes.string.isRequired,
    isPaidUser: PropTypes.bool.isRequired,
    wasPaidUser: PropTypes.bool.isRequired,
  }).isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
  doProfileAction: PropTypes.func.isRequired,
};

export default ContactDetails;
