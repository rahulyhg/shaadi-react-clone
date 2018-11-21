import React from 'react';
import PropTypes from '../../../PropTypes';
import s from './styles';
import { UploadFromComputerBtn, ImportFromFbBtn } from '../../Common/Photo';

class AccountDropdown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onToggleDropdown = this.onToggleDropdown.bind(this);
    this.renderPhotoUploadSection = this.renderPhotoUploadSection.bind(this);
  }
  onToggleDropdown() {
    this.props.onVisibilityChange('account');
  }

  renderPhotoUploadSection() {
    return (
      <s.PhotoUpload isVisible={!this.props.settings.hasUploadedPhoto}>
        <s.PhotoUploadPrompt>Photo Upload Pending</s.PhotoUploadPrompt>
        <s.PhotoUploadBtns>
          <UploadFromComputerBtn padding="8px 24px 10px 10px" />
          <s.PhotoUploadBtnsSpace />
          <ImportFromFbBtn />
        </s.PhotoUploadBtns>
        <s.PhotoPrivateMsg>You can keep your Photos private.</s.PhotoPrivateMsg>
      </s.PhotoUpload>
    );
  }

  render() {
    const { props } = this;
    return (
      <s.DropdownWrapper>
        <s.DropdownLink id="profileDropDown" isProfileDropddown isActive={this.props.isOpen} onClick={this.onToggleDropdown}>
          <s.Thumbnail
            id="profileImgSmall"
            {...props.thumbnail.img}
            onContextMenu={() => false}
            onDragStart={() => false}
            onDragEnter={() => false}
            onDragOver={() => false}
            onDrop={() => false}
          />
          <s.DropdownArrowIcon />
        </s.DropdownLink>
        <s.AccountDropdown isVisible={this.props.isOpen}>
          {!this.props.settings.hasUploadedPhoto && this.renderPhotoUploadSection()}
          <s.Links>
            <s.Link to="/my-shaadi/profile" isExternal target="_self">
              <s.LinkIcon icon={props.settings.gender === 'Male' ? 'my_profiles_male' : 'my_profiles_female'} />
              My Profile
            </s.Link>
            <s.Link to="/my-shaadi/profile/alert" isExternal target="_self" rightWpar>
              <s.LinkIcon icon="sms_alerts" />
              Email / SMS Alerts
            </s.Link>
            <s.Link to="/my-shaadi/my-account" isExternal target="_self">
              <s.LinkIcon icon="account_settings" />
              Account Settings
            </s.Link>
            <s.Link to="/my-shaadi/my-account/privacy-settings?lnkref=TopSettingsLink" isExternal target="_self" rightWpar>
              <s.LinkIcon icon="my_settings" />
              Privacy Options
            </s.Link>
            <s.Link to="/my-shaadi/partner-profile/contact-filter" isExternal target="_self">
              <s.LinkIcon icon="contact_filters" />
              Contact Filters
            </s.Link>
            <s.Link to="/registration/user/logout" isExternal target="_self" rightWpar>
              <s.LinkIcon icon="logout" />
              Logout
            </s.Link>
          </s.Links>
          <s.Upgrade>
            <div>
              <span>
                Account Type:
                {props.accountType === 'FREE' ? <span>{' Free'}</span> : <s.Value> {props.plan}</s.Value>}
              </span>
              <s.ExpiryDate isVisible={props.accountType !== 'FREE'}>
                |&nbsp;&nbsp; Expiry:
                <s.Value> {props.expiryDate}</s.Value>
              </s.ExpiryDate>
            </div>

            <s.UpgradeBtn to="/payment?source=top_navbar_profiledropdown_upgrade" isExternal target="_blank" rel="noopener noreferrer">
              {props.upgradeType === 'extend' ? 'Extend Membership' : props.upgradeType === 'renew' ? 'Renew Membership' : 'Upgrade Now'}
            </s.UpgradeBtn>
            <s.CompareLink to="/my-shaadi/membership/compare-plans" target="_blank" rel="noopener noreferrer" isExternal>
              Compare memberships
            </s.CompareLink>
          </s.Upgrade>
        </s.AccountDropdown>
      </s.DropdownWrapper>
    );
  }
}

AccountDropdown.defaultProps = {
  accountType: 'FREE',
  plan: 'FREE',
  expiryDate: '',
};

const imgPropTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  title: PropTypes.string,
};

AccountDropdown.propTypes = {
  accountType: PropTypes.string,
  plan: PropTypes.string,
  expiryDate: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onVisibilityChange: PropTypes.func.isRequired,
  thumbnail: PropTypes.shape({ img: PropTypes.shape(imgPropTypes) }).isRequired,
  onAction: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    hasUploadedPhoto: PropTypes.bool.isRequired,
  }).isRequired,
  upgradeType: PropTypes.string.isRequired,
};

export default AccountDropdown;
