import React from 'react';
import PropTypes from '../../PropTypes';
import HeaderTabs from './HeaderTabs';
import InfoItem from './InfoItem';
import GamifiedForm from './GamifiedForm';
import ContactCard from './ContactCard';
import s from './styles';
import { isNotMemberType, addBlankSpace } from '../../helpers/common';

class ProfileAdditionalInfo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFormDisplayed: false,
    };

    this.onMoreBtnClick = this.onMoreBtnClick.bind(this);
    this.onFormDisplay = this.onFormDisplay.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.profile.uid !== nextProps.profile.uid) {
      this.setState({ isFormDisplayed: false });
    }
  }

  onMoreBtnClick(key) {
    this.setState({ [key]: true });
  }

  onFormDisplay(isVisible) {
    this.setState({ isFormDisplayed: isVisible });
  }

  render() {
    const { detailed, flags, contactSummary } = this.props.profile;
    const { contact } = contactSummary;
    const profileContactCard = this.props.profileContactCard;
    const contactPrefix = contact.std_code ? `${`${contact.country_code} ${contact.std_code}`}` : `${contact.country_code}`;
    const connectionStatus = flags.connectionStatus ? flags.connectionStatus : '';
    const contactCardProps = {
      contactPrefix,
      contactNumber: addBlankSpace(contact.contact_number, 5),
      contactEmail: contact.email,
      isFreeMember: this.props.self.flags.isFree,
      isPremiumMember: this.props.self.flags.isPremium,
      onViewPhoneNoClick: () => this.props.onAction(this.props.profile.uid, 'contact'),
      connectionStatus,
      heShe: this.props.profile.heShe,
      himHer: this.props.profile.himHer,
      canCommunicate: this.props.profile.flags.canCommunicate,
    };

    const headerLinks = [
      {
        key: `${Math.random()}`,
        label: 'Horoscope Details',
        url: '#horoscope',
        isFree: true,
        isVisible: !!detailed.horoscope.items.length,
      },
      {
        key: `${Math.random()}`,
        label: 'Partner Preference',
        url: '#preferences',
        isFree: false,
        isVisible: true,
      },
    ];
    const printUrl = `${this.props.wwwBaseUrl}/profile/index/print-popup?profileid=${this.props.profile.uid}&pwd=&set=`;
    return (
      <s.ProfileAdditionalInfo profilePageBucket={this.props.profilePageBucket}>
        <HeaderTabs
          wwwBaseUrl={this.props.wwwBaseUrl}
          links={headerLinks.filter(item => item.isVisible === true)}
          userHandle={this.props.profile.userHandle}
          printUrl={printUrl}
          selfName={this.props.self.name}
          profilePageBucket={this.props.profilePageBucket}
          daTracking={this.props.daTracking}
        />
        <s.Info profilePageBucket={this.props.profilePageBucket}>
          <InfoItem
            title={['B', 'C'].includes(this.props.profilePageBucket) ? detailed.about.titleRevamp : detailed.about.title}
            icon={detailed.about.icon}
            profilePageBucket={this.props.profilePageBucket}
            section="about_profile"
            profile={this.props.profile}
          >
            <s.AboutBio profilePageBucket={this.props.profilePageBucket}>
              {detailed.about.desc.length > 1000 && !this.state.isAboutSectionOpen
                ? `${detailed.about.desc.replace(/\r\n|\r/g, '\r\n').substr(0, 999)}... `
                : detailed.about.desc.replace(/\r\n|\r/g, '\r\n')}
              {detailed.about.desc.length > 1000 && !this.state.isAboutSectionOpen ? (
                <s.MoreBtn onClick={() => this.onMoreBtnClick('isAboutSectionOpen')}>more</s.MoreBtn>
              ) : (
                ''
              )}
            </s.AboutBio>
          </InfoItem>
          {flags.membershipTags &&
            isNotMemberType(flags.membershipTags, 'vip') &&
            profileContactCard === 'B' && (
              <InfoItem
                title={['B', 'C'].includes(this.props.profilePageBucket) ? detailed.contact.titleRevamp : detailed.contact.title}
                icon={detailed.contact.icon}
                profilePageBucket={this.props.profilePageBucket}
              >
                <ContactCard {...contactCardProps} />
              </InfoItem>
            )}
          <InfoItem
            title={detailed.lifestyle.title}
            icon={detailed.lifestyle.icon}
            iconItems={detailed.lifestyle.items}
            profilePageBucket={this.props.profilePageBucket}
          />

          <InfoItem
            title={detailed.background.title}
            icon={detailed.background.icon}
            listItems={detailed.background.items}
            profilePageBucket={this.props.profilePageBucket}
          />
          {detailed.horoscope.items.length > 0 && (
            <InfoItem
              id="horoscope"
              isGamified={detailed.horoscope.isGamified}
              title={detailed.horoscope.title}
              icon={detailed.horoscope.icon}
              listItems={detailed.horoscope.items}
              horoscopeWidget={detailed.horoscope}
              horoscopeStatus={flags.horoscopeStatus}
              uid={this.props.profile.uid}
              isAstroStatusError={this.props.isAstroStatusError}
              isVisible={!detailed.horoscope.isGamified || (this.props.settings.canViewHoroscope && flags.isHoroscopeApplicable)}
              profilePageBucket={this.props.profilePageBucket}
            >
              {(detailed.horoscope.isGamified && (
                <GamifiedForm
                  kind="astro"
                  self={this.props.self}
                  isVisible={detailed.horoscope.isGamified}
                  onAction={this.props.onAction}
                  gamification={this.props.gamification}
                  uid={this.props.profile.uid}
                  profilePageBucket={this.props.profilePageBucket}
                />
              )) ||
                null}
            </InfoItem>
          )}
          {detailed.family.desc && (
            <InfoItem
              id="family"
              isGamified={this.props.settings.isFamilyGamified}
              title={detailed.family.title}
              icon={detailed.family.icon}
              isFormDisplayed={this.state.isFormDisplayed}
              profilePageBucket={this.props.profilePageBucket}
            >
              <div>
                <s.AboutBio>{detailed.family.desc}</s.AboutBio>
                <GamifiedForm
                  kind="family"
                  isVisible={this.props.settings.isFamilyGamified}
                  self={this.props.self}
                  onAction={this.props.onAction}
                  gamification={this.props.gamification}
                  onOpen={this.onFormDisplay}
                  uid={this.props.profile.uid}
                  profilePageBucket={this.props.profilePageBucket}
                />
              </div>
            </InfoItem>
          )}
          <InfoItem
            title={detailed.education.title}
            icon={detailed.education.icon}
            listItems={detailed.education.items}
            kind="education"
            profilePageBucket={this.props.profilePageBucket}
            isFreeMember={this.props.self.flags.isFree}
            profileContactCard={profileContactCard}
          >
            {!!detailed.education.hasCollegeOrEmployer && !this.props.settings.canViewCollegeAndEmployer ? (
              <s.ProfessionDetails>
                <s.UpgradeLink
                  target="_blank"
                  isExternal
                  to="/payment?profile_type=profile_accepted&loc=profile&source=visual_profile_edu_link"
                  isBold
                >
                  <span data-id="data_test_upgrade" data-test-selector="additional_info_wrapper_cta">
                    Upgrade Now
                  </span>
                </s.UpgradeLink>{' '}
                to view professional details
              </s.ProfessionDetails>
            ) : null}
          </InfoItem>
          {!!detailed.interests.items.length && (
            <InfoItem
              title={detailed.interests.title}
              icon={detailed.interests.icon}
              interestItems={detailed.interests.items}
              extra={detailed.interests.extra}
              onAction={this.props.onAction}
              profilePageBucket={this.props.profilePageBucket}
            />
          )}
          <InfoItem
            id="preferences"
            isVisible={detailed.preferences.items && detailed.preferences.items.length > 0}
            title={`What ${this.props.profile.heShe} is looking for`}
            icon="what"
            preferenceItems={detailed.preferences.items}
            matchCount={detailed.preferences.matchCount}
            profile={this.props.profile}
            self={this.props.self}
            profilePageBucket={this.props.profilePageBucket}
          />
        </s.Info>
      </s.ProfileAdditionalInfo>
    );
  }
}

const infoItemProptypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

const aboutProptypes = {
  ...infoItemProptypes,
  desc: PropTypes.string.isRequired,
};

const interestProptypes = {
  ...infoItemProptypes,
  items: InfoItem.propTypes.interestItems,
};

const listItemProptypes = {
  ...infoItemProptypes,
  items: InfoItem.propTypes.listItems,
};

const iconItemProptypes = {
  ...infoItemProptypes,
  items: InfoItem.propTypes.iconItems,
};

const preferenceProptypes = {
  ...infoItemProptypes,
  items: InfoItem.propTypes.preferenceItems,
};

ProfileAdditionalInfo.defaultProps = {
  daTracking: null,
  profilePageBucket: 'A',
};

ProfileAdditionalInfo.propTypes = {
  profile: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    heShe: PropTypes.heShe.isRequired,
    hisHer: PropTypes.hisHer.isRequired,
    himHer: PropTypes.himHer.isRequired,
    flags: PropTypes.shape({
      isHoroscopeApplicable: PropTypes.bool.isRequired,
      isHoroscopeAvailable: PropTypes.horoscopeStatus,
      canCommunicate: PropTypes.bool.isRequired,
    }),
    detailed: PropTypes.shape({
      about: PropTypes.shape(aboutProptypes).isRequired,
      family: PropTypes.shape(aboutProptypes).isRequired,
      lifestyle: PropTypes.shape(iconItemProptypes).isRequired,
      background: PropTypes.shape(listItemProptypes).isRequired,
      horoscope: PropTypes.shape(listItemProptypes).isRequired,
      education: PropTypes.shape(listItemProptypes).isRequired,
      interests: PropTypes.shape(interestProptypes).isRequired,
      preferences: PropTypes.shape(preferenceProptypes).isRequired,
    }).isRequired,
    contactSummary: PropTypes.shape({
      contact: PropTypes.shape({
        mobile_verified: PropTypes.string.isRequired,
        telephone_verified: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  settings: PropTypes.shape({
    isAstroGamified: PropTypes.bool.isRequired,
    isFamilyGamified: PropTypes.bool.isRequired,
    canViewHoroscope: PropTypes.bool.isRequired,
    canViewCollegeAndEmployer: PropTypes.bool.isRequired,
  }).isRequired,
  self: PropTypes.shape({
    photo: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    flags: PropTypes.shape({
      isFree: PropTypes.bool.isRequired,
      isPremium: PropTypes.bool.isRequired,
    }),
  }).isRequired,
  onAction: PropTypes.func.isRequired,
  daTracking: PropTypes.func,
  gamification: PropTypes.shape({
    flash: PropTypes.bool,
    loading: PropTypes.bool,
  }).isRequired,
  isAstroStatusError: PropTypes.bool.isRequired,
  profilePageBucket: PropTypes.string,
  profileContactCard: PropTypes.string.isRequired,
};

export default ProfileAdditionalInfo;
