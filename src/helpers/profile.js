import upperFirst from 'lodash/upperFirst';
// import get from 'lodash/get';

const zipCountries = ['Australia', 'New Zealand', 'United Kingdom', 'USA'];

class ShaadiUser {
  constructor(shaadiUserData = {}) {
    Object.keys(shaadiUserData).forEach(propName => {
      this[propName] = shaadiUserData[propName];
    });
  }
  get accountStatus() {
    return this.account.status;
  }
  get lastLoginDate() {
    return this.account.last_login_date;
  }
  get profileCreatedOn() {
    return this.account.profile_created;
  }
  get profileActivatedOn() {
    return this.account.profile_activated;
  }
  get postedBy() {
    return this.account.posted_by;
  }
  get accountMemberShip() {
    return this.account.membership;
  }
  get hideAccountTill() {
    return this.account.hide_till;
  }
  get isAccountScreened() {
    return this.account.screened;
  }
  get isAccountHidden() {
    return this.account.hidden;
  }
  get astroProfile() {
    return this.account.astro_profile;
  }
  get memberlogin() {
    return this.account.memberlogin;
  }
  get username() {
    return this.basic.username;
  }
  get displayName() {
    return this.basic.display_name;
  }
  get firstName() {
    return this.basic.first_name;
  }
  get lastName() {
    return this.basic.last_name;
  }
  get gender() {
    return this.basic.gender;
  }
  get age() {
    return this.basic.age;
  }
  get maritalStatus() {
    return this.basic.marital_status;
  }
  get dateOfBirth() {
    return parseInt(this.basic.date_of_birth, 10);
  }
  get religion() {
    return this.doctrine.religion;
  }
  get caste() {
    return this.doctrine.caste;
  }
  get subCaste() {
    return this.doctrine.sub_caste;
  }
  get motherTongue() {
    return this.doctrine.mother_tongue;
  }
  get gotra() {
    return this.doctrine.gotra;
  }
  get casteNoBar() {
    return this.doctrine.caste_no_bar;
  }
  get amritdhari() {
    return this.doctrine.amritdhari;
  }
  get dastar() {
    return this.doctrine.dastar;
  }
  get fasting() {
    return this.doctrine.fasting;
  }
  get keshdhari() {
    return this.doctrine.keshdhari;
  }
  get muslimFromBirth() {
    return this.doctrine.muslim_from_birth;
  }
  get namaaz() {
    return this.doctrine.namaaz;
  }
  get religiousValues() {
    return this.doctrine.religious_values;
  }
  get zakaat() {
    return this.doctrine.zakaat;
  }
  get personalValue() {
    return this.trait.personal_values;
  }
  get description() {
    return this.trait.about_me;
  }
  get hobbies() {
    return this.trait.personality;
  }
  get specialCased() {
    return this.health_info.special_cases;
  }
  get bloodGroup() {
    return this.health_info.blood_group;
  }
  get ailments() {
    return this.health_info.ailments;
  }
  get diet() {
    return this.lifestyle.diet;
  }
  get interests() {
    return this.interests_and_more.interests;
  }
  get drinkHabbit() {
    return this.lifestyle.drink;
  }
  get smokeHabbit() {
    return this.lifestyle.smoke;
  }
  get complexion() {
    return this.appearance.complexion;
  }
  get built() {
    return this.appearance.built;
  }
  get height() {
    return this.appearance.height ? parseInt(this.appearance.height, 10) : '';
  }
  get weight() {
    return this.appearance.weight;
  }
  get colleges() {
    return this.education.college_1.split('|');
  }
  get highestQualification() {
    return this.education.education;
  }
  get educationStream() {
    return this.education.education_stream;
  }
  get mastersCollege() {
    return this.colleges.length > 1 ? this.colleges[0] : '';
  }
  get graduationCollege() {
    return this.colleges.length > 1 ? this.colleges[1] : this.colleges[0];
  }
  get workingWith() {
    return this.profession.working_with;
  }
  get currentIncome() {
    return this.profession.income;
  }
  get currentEmployer() {
    return this.profession.employer;
  }
  get occupation() {
    return this.profession.occupation;
  }
  get industry() {
    return this.profession.industry;
  }
  get country() {
    return this.location.country;
  }
  get state() {
    return this.location.state;
  }
  get city() {
    return this.location.city;
  }
  get googleCityId() {
    return this.location.google_city_id;
  }
  get zipCode() {
    return this.location.zip_code;
  }
  get zipStatus() {
    return this.location.zip_status;
  }
  get livingSince() {
    return this.location.living_since;
  }
  get residencyStatus() {
    return this.location.residency_status;
  }
  get district() {
    return this.location.district;
  }
  get grewUpIn() {
    return this.origin.grewup_in.join(',');
  }
  get nativePlace() {
    return this.origin.native_place;
  }
  get ethnicity() {
    return this.origin.ethnicity;
  }
  get suddhaJadhagam() {
    return this['astro-details'].suddha_jadhagam;
  }
  get dosham() {
    return this['astro-details'].manglik;
  }
  get doshamTypes() {
    return this['astro-details'].other_dosham.replace('|', ',');
  }
  get nakshatra() {
    return this['astro-details'].birth_star_nakshatra;
  }
  get rashi() {
    return this['astro-details'].moon_sign;
  }
  get mobileCountry() {
    return this['contact-details'].mobile_country;
  }
  get mobileIsd() {
    return this['contact-details'].mobile_isd;
  }
  get mobileStd() {
    return this['contact-details'].mobile_std;
  }
  get mobileNumber() {
    return this['contact-details'].mobile;
  }
  get telStd() {
    return this['contact-details'].tel_std;
  }
  get telephone() {
    return this['contact-details'].telephone;
  }
  get contactSettings() {
    return this['contact-details'].contact_settings;
  }
  get haveChildren() {
    return this.family.children;
  }
  get culturalValues() {
    return this.family.cultural_values;
  }
  get aboutFamily() {
    return this.family.about;
  }
  get fatherProfession() {
    return this.family.father_profession;
  }
  get fatherEmployer() {
    return this.family.father_employer;
  }
  get fatherDesignation() {
    return this.family.father_designation;
  }
  get motherProfession() {
    return this.family.mother_profession;
  }
  get brothers() {
    return this.family.brothers;
  }
  get brothersMarried() {
    return this.family.brothers_married;
  }
  get sisters() {
    return this.family.sisters;
  }
  get sistersMarried() {
    return this.family.sisters_married;
  }
  get familyAffluence() {
    return this.family.affluence;
  }
  get noOfKids() {
    return this.family.no_of_kids;
  }
  get familyType() {
    return this.family.type;
  }
  get familyLocated() {
    return this.family.located;
  }
  get aboutFather() {
    return this.family.about_father;
  }
  get motherEmployer() {
    return this.family.mother_employer;
  }
  get motherDesignation() {
    return this.family.mother_designation;
  }
  get aboutMother() {
    return this.family.about_mother;
  }
  get familyIncome() {
    return this.family.family_income;
  }
  get domain() {
    return this.metadata.domain;
  }
  get birthYear() {
    return parseInt((this.dateOfBirth / 10000).toFixed(0), 10);
  }
  get birthMonth() {
    return parseInt(((this.dateOfBirth % 10000) / 100).toFixed(0), 10);
  }
  get birthDate() {
    return this.dateOfBirth % 100;
  }
  get fullName() {
    return `${this.firstName} ${this.lasstName}`;
  }
  get addressUserByActive() {
    return this.isPostedBySelf() ? 'yourself' : upperFirst(this.firstName);
  }
  get addressUserByPassive() {
    return this.isPostedBySelf() ? 'your' : `${upperFirst(this.firstName)}'s`;
  }
  isPostedBy = (relation = this.postedBy) => this.postedBy === relation;
  isPostedBySelf = () => this.isPostedBy('Self');
  isPostedByParent = () => this.isPostedBy('Parent / Guardian');
  isPostedByRelative = () => this.isPostedBy('Relative');
  isPostedByFriend = () => this.isPostedBy('Friend');
  isZipDisabled = () => this.zipStatus === 'N';
  isCasteNoBar = () => this.casteNoBar === 'Y';
  isZipCountry = () => zipCountries.includes(this.country);
  isGender = gender => this.gender === gender;
  isMale() {
    return this.isGender('Male');
  }
  isFemale() {
    return this.isGender('Female');
  }
  isCountry = country => country === this.country;
  isIndian = () => this.isCountry('India');
  isPakistani = () => this.isCountry('Pakistan');
  getPronoun = ({ pronounForMale, pronounForFemale, pronounForSelf }) => {
    const pronounSet = {
      male: pronounForMale,
      female: pronounForFemale,
      self: pronounForSelf,
    };
    return pronounSet[pronounForSelf ? 'self' : this.gender.toLowerCase()] || '';
  };
  getHeOrShe = ({ pronounForSelf } = {}) => this.getPronoun({ pronounForMale: 'He', pronounForFemale: 'She', pronounForSelf });
  getHimOrHer = ({ pronounForSelf } = {}) => this.getPronoun({ pronounForMale: 'Him', pronounForFemale: 'Her', pronounForSelf });
  getHisOrHer = ({ pronounForSelf } = {}) => this.getPronoun({ pronounForMale: 'His', pronounForFemale: 'Her', pronounForSelf });
  getMrOrMs = ({ pronounForSelf } = {}) => this.getPronoun({ pronounForMale: 'Mr.', pronounForFemale: 'Ms.', pronounForSelf });
  getHeOrSheOrYou = () => this.getHeOrShe({ pronounForSelf: this.isPostedBySelf() ? 'You' : undefined });
  getHimOrHerOrYou = () => this.getHimOrHer({ pronounForSelf: this.isPostedBySelf() ? 'You' : undefined });
  getHisOrHerOrYou = () => this.getHisOrHer({ pronounForSelf: this.isPostedBySelf() ? 'You' : undefined });
  getMrOrMsOrYou = () => this.getMrOrMs({ pronounForSelf: this.isPostedBySelf() ? 'You' : undefined });
  getHeOrSheOrYour = () => this.getHeOrShe({ pronounForSelf: this.isPostedBySelf() ? 'Your' : undefined });
  getHimOrHerOrYour = () => this.getHimOrHer({ pronounForSelf: this.isPostedBySelf() ? 'Your' : undefined });
  getHisOrHerOrYour = () => this.getHisOrHer({ pronounForSelf: this.isPostedBySelf() ? 'Your' : undefined });
  getMrOrMsOrYour = () => this.getMrOrMs({ pronounForSelf: this.isPostedBySelf() ? 'Your' : undefined });
  zipCountries = ['Australia', 'New Zealand', 'United Kingdom', 'USA'];
  nriPlusCountries = [...this.zipCountries, 'Canada'];
  saarcCountries = ['India', 'Afghanistan', 'Bangladesh', 'Bhutan', 'Maldives', 'Nepal', 'Pakistan', 'Sri Lanka'];
  religiousMotherTongue = ['Telugu', 'Tamil', 'Kannada', 'Malayalam'];
  isManglik = () => this.dosham === 'Yes';
  isReligion = (religion = this.religion) => this.religion === religion;
  isHindu = () => this.isReligion('Hindu');
  isMotherTongue = (motherTongue = this.motherTongue) => this.motherTongue === motherTongue;
  isMallu = () => this.isMotherTongue('Malayalam');
  hasValidGender = () => ['Male', 'Female'].includes(this.gender);
  hasChildren = () => this.haveChildren === 'Yes';
  isMaritalStatus = maritalStatus => this.maritalStatus === maritalStatus;
  isNeverMarried = () => this.maritalStatus === 'Never Married';
  isMarried = () => this.maritalStatus === 'Married';
  isDivorced = () => this.maritalStatus === 'Divorced';
  isAnnulled = () => this.maritalStatus === 'Annulled';
  isAwaitingDivorce = () => this.maritalStatus === 'Awaiting Divorce';
  isWidowed = () => this.maritalStatus === 'Widowed';
  isNRIPlusCountry = (country = this.country) => this.nriPlusCountries.includes(country);
  isSAARCCountry = (country = this.country) => this.saarcCountries.includes(country);
  isNRI = () => !this.isSAARCCountry();
  isIndianHinduMallu = () => this.isIndian() && this.isHindu() && this.isMallu();
  isAccountStatus = status => status === this.accountStatus;
  isIncompleteUser = () => this.isAccountStatus('Incomplete');
  isZipDisabled = () => this.zipStatus === 'N';
  isReligiousSouthIndian = () => this.isIndian() && this.isHindu() && this.religiousMotherTongue.includes(this.motherTongue);
  getRelationWithProfileCreator = (postedBy = this.postedBy, gender = this.gender) => {
    switch (postedBy) {
      case 'Friend': {
        return 'friend';
      }
      case 'Self': {
        return 'yourself';
      }
      case 'Parent / Guardian':
      case 'Other':
      case 'Relative': {
        if (!['Male', 'Female'].includes(gender)) {
          return 'child';
        }
        return gender === 'Male' ? 'son' : 'daughter';
      }
      case 'Sibling': {
        if (!['Male', 'Female'].includes(gender)) {
          return 'sibling';
        }
        return gender === 'Male' ? 'brother' : 'sister';
      }
      default: {
        return '';
      }
    }
  };
  doOrDoes = () => (this.isPostedBySelf() ? 'Do' : 'Does');
}

export default shaadiUserData => new ShaadiUser(shaadiUserData);
