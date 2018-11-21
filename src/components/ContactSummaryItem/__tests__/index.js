import React from 'react';
import { mount } from 'enzyme';
import ContactSummaryItem from '../index';
import factory from './utils/factory';

jest.mock('../../Common/Link');

describe('Contact Summary (call/sms) of Inbox', () => {
  describe('Profile Title', () => {
    it('Should render profile call/sms title when sms is blank', () => {
      const propsArr = { ...factory.props };
      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: { ...propsArr.profileData.contactSummary, sms: '' },
        },
      };
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      expect(profileProps.profileData.contactSummary.sms.length).toBe(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(`Call initiated with`);
    });

    it('Should render title when sms is not blank and conatct status is not available && check view sms link', () => {
      const propsArr = { ...factory.props };
      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: {
            ...propsArr.profileData.contactSummary,
            contactDetailsStatusString: 'numberHiddenByMember',
          },
        },
      };
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      expect(profileProps.profileData.contactSummary.sms.length).toBeGreaterThan(0);
      expect(profileProps.profileData.contactSummary.contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(`SMS sent to`);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(`View SMS`);
    });

    it('Should render title when sms is not blank and conatct status is available && check view sms link', () => {
      const profileProps = { ...factory.props };
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      expect(profileProps.profileData.contactSummary.sms.length).toBeGreaterThan(0);
      expect(profileProps.profileData.contactSummary.contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(`Viewed Phone No. and SMS sent to`);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(`View SMS`);
    });

    it('Should render profile name', () => {
      const profileProps = { ...factory.props };
      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      expect(callSmsWrapper.find(divIdAttr).exists()).toBe(true);
      expect(profileProps.profileData.name.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(profileProps.profileData.name);
    });
  });
  describe('Profile contact/sms status', () => {
    it('Should render call/sms status message when status is available and mobile and mobile_isd not null', () => {
      const profileProps = { ...factory.props };
      const { profileData } = profileProps;
      const { contactSummary } = profileData;
      const { contact, contactDetailsStatusString } = contactSummary;
      const { mobile, mob_isd, mobile_verified } = contact;

      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      expect(callSmsWrapper.find(divIdAttr).exists()).toBe(true);
      expect(contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(contactDetailsStatusString).toEqual('available');
      expect(mobile.length).toBeGreaterThan(0);
      expect(mob_isd.length).toBeGreaterThan(0);
      expect(mobile_verified).toEqual('Y');
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(`This Member can be contacted on ${mob_isd}-${mobile}`);
    });

    it('Should render call/sms status message when status is available and contact person name , relation, mobile, telephone, and convenient time available', () => {
      const propsArr = { ...factory.props };
      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: {
            ...propsArr.profileData.contactSummary,
            contact: {
              ...propsArr.profileData.contactSummary.contact,
              from_time_hours: '13',
              name: 'Vaishali',
              relation: 'Sister',
              telephone: '22456789',
              telephone_verified: 'Y',
              to_time_hours: '20',
            },
          },
        },
      };
      const { profileData } = profileProps;
      const { contactSummary } = profileData;
      const { contact, contactDetailsStatusString } = contactSummary;
      const { mobile, mob_isd, mobile_verified, from_time_hours, name, relation, telephone, telephone_verified, to_time_hours } = contact;
      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      expect(callSmsWrapper.find(divIdAttr).exists()).toBe(true);
      expect(contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(contactDetailsStatusString).toEqual('available');
      expect(mobile.length).toBeGreaterThan(0);
      expect(mob_isd.length).toBeGreaterThan(0);
      expect(from_time_hours.length).toBeGreaterThan(0);
      expect(mobile_verified.length).toBeGreaterThan(0);
      expect(name.length).toBeGreaterThan(0);
      expect(relation.length).toBeGreaterThan(0);
      expect(telephone.length).toBeGreaterThan(0);
      expect(telephone_verified.length).toBeGreaterThan(0);
      expect(to_time_hours.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(
        `Vaishali (Sister) can be contacted on +968-93175558 and 22456789 from 1:00 PM - 8:00 PM`,
      );
    });

    it('Should render call/sms status message when status is available and contact person name , relation, mobile, telephone available', () => {
      const propsArr = { ...factory.props };
      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: {
            ...propsArr.profileData.contactSummary,
            contact: {
              ...propsArr.profileData.contactSummary.contact,
              name: 'Vaishali',
              relation: 'Sister',
              telephone: '22456789',
              telephone_verified: 'Y',
            },
          },
        },
      };
      const { profileData } = profileProps;
      const { contactSummary } = profileData;
      const { contact, contactDetailsStatusString } = contactSummary;
      const { mobile, mob_isd, mobile_verified, name, relation, telephone, telephone_verified } = contact;

      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      expect(callSmsWrapper.find(divIdAttr).exists()).toBe(true);
      expect(contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(contactDetailsStatusString).toEqual('available');
      expect(mobile.length).toBeGreaterThan(0);
      expect(mob_isd.length).toBeGreaterThan(0);
      expect(mobile_verified.length).toBeGreaterThan(0);
      expect(name.length).toBeGreaterThan(0);
      expect(relation.length).toBeGreaterThan(0);
      expect(telephone.length).toBeGreaterThan(0);
      expect(telephone_verified.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(`Vaishali (Sister) can be contacted on +968-93175558 and 22456789`);
    });

    it('Should render call/sms status message when status is available and contact person name , mobile, telephone available', () => {
      const propsArr = { ...factory.props };
      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: {
            ...propsArr.profileData.contactSummary,
            contact: {
              ...propsArr.profileData.contactSummary.contact,
              name: 'Vaishali',
              telephone: '22456789',
              telephone_verified: 'Y',
            },
          },
        },
      };
      const { profileData } = profileProps;
      const { contactSummary } = profileData;
      const { contact, contactDetailsStatusString } = contactSummary;
      const { mobile, mob_isd, mobile_verified, name, telephone, telephone_verified } = contact;

      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      expect(callSmsWrapper.find(divIdAttr).exists()).toBe(true);
      expect(contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(contactDetailsStatusString).toEqual('available');
      expect(mobile.length).toBeGreaterThan(0);
      expect(mob_isd.length).toBeGreaterThan(0);
      expect(mobile_verified.length).toBeGreaterThan(0);
      expect(name.length).toBeGreaterThan(0);
      expect(telephone.length).toBeGreaterThan(0);
      expect(telephone_verified.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(`Vaishali can be contacted on +968-93175558 and 22456789`);
    });

    it('Should render call/sms status message when status is available and contact person relation, mobile, telephone available', () => {
      const propsArr = { ...factory.props };
      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: {
            ...propsArr.profileData.contactSummary,
            contact: {
              ...propsArr.profileData.contactSummary.contact,
              relation: 'Sister',
              telephone: '22456789',
              telephone_verified: 'Y',
            },
          },
        },
      };
      const { profileData } = profileProps;
      const { contactSummary } = profileData;
      const { contact, contactDetailsStatusString } = contactSummary;
      const { mobile, mob_isd, mobile_verified, relation, telephone, telephone_verified } = contact;

      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      expect(callSmsWrapper.find(divIdAttr).exists()).toBe(true);
      expect(contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(contactDetailsStatusString).toEqual('available');
      expect(mobile.length).toBeGreaterThan(0);
      expect(mob_isd.length).toBeGreaterThan(0);
      expect(mobile_verified.length).toBeGreaterThan(0);
      expect(relation.length).toBeGreaterThan(0);
      expect(telephone.length).toBeGreaterThan(0);
      expect(telephone_verified.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(`This Member (Sister) can be contacted on +968-93175558 and 22456789`);
    });

    it('Should render call/sms status message when status = sameGender', () => {
      const propsArr = { ...factory.props };

      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: {
            ...propsArr.profileData.contactSummary,
            contactDetailsStatusString: 'sameGender',
          },
        },
      };
      const { profileData } = profileProps;
      const { contactSummary } = profileData;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      expect(contactSummary.contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(
        `You cannot view phone numbers of Members who belong to the same gender as you`,
      );
    });

    it('Should render call/sms status message when status = currentlyUnderScreening', () => {
      const propsArr = { ...factory.props };
      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: {
            ...propsArr.profileData.contactSummary,
            contactDetailsStatusString: 'currentlyUnderScreening',
          },
        },
      };
      const { profileData } = profileProps;
      const { contactSummary } = profileData;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      expect(contactSummary.contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(`Your profile is currently under screening.`);
    });
    it('Should render call/sms status message when status = hidden', () => {
      const propsArr = { ...factory.props };
      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: {
            ...propsArr.profileData.contactSummary,
            contactDetailsStatusString: 'hidden',
          },
        },
      };
      const { profileData } = profileProps;
      const { contactSummary } = profileData;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      expect(contactSummary.sms.length).toBeGreaterThan(0);
      expect(contactSummary.contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(`Your profile is currently hidden.`);
    });
    it('Should render call/sms status message when status = theyCancelled', () => {
      const propsArr = { ...factory.props };
      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: {
            ...propsArr.profileData.contactSummary,
            contactDetailsStatusString: 'theyCancelled',
          },
        },
      };
      const { profileData } = profileProps;
      const { contactSummary } = profileData;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      expect(contactSummary.contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(
        `Phone No. not available as ${profileData.heShe.toLowerCase()} has Cancelled ${profileData.hisHer.toLowerCase()} invitation.`,
      );
    });
    it('Should render call/sms status message when status = theyDeclined', () => {
      const propsArr = { ...factory.props };
      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: {
            ...propsArr.profileData.contactSummary,
            contactDetailsStatusString: 'theyDeclined',
          },
        },
      };
      const { profileData } = profileProps;
      const { contactSummary } = profileData;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      expect(contactSummary.contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(
        `Phone No. not available as ${profileData.heShe.toLowerCase()} has Declined your invitation.`,
      );
    });
    it('Should render call/sms status message when status = theyFiltered', () => {
      const propsArr = { ...factory.props };
      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: {
            ...propsArr.profileData.contactSummary,
            contactDetailsStatusString: 'theyFiltered',
          },
        },
      };
      const { profileData } = profileProps;
      const { contactSummary } = profileData;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      expect(contactSummary.contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(
        `Phone No. not available as ${profileData.heShe.toLowerCase()} has Filtered you out.`,
      );
    });
    it('Should render call/sms status message when status = notVerified', () => {
      const propsArr = { ...factory.props };
      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: {
            ...propsArr.profileData.contactSummary,
            contactDetailsStatusString: 'notVerified',
          },
        },
      };
      const { profileData } = profileProps;
      const { contactSummary } = profileData;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      expect(contactSummary.contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(`Your Phone No. not verified.`);
    });
    it('Should render call/sms status message when status = availableOnRequest', () => {
      const propsArr = { ...factory.props };
      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: {
            ...propsArr.profileData.contactSummary,
            contactDetailsStatusString: 'availableOnRequest',
          },
        },
      };
      const { profileData } = profileProps;
      const { contactSummary } = profileData;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      expect(contactSummary.sms.length).toBeGreaterThan(0);
      expect(contactSummary.contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(`Phone No. Visible on Accept.`);
    });
    it('Should render call/sms status message when status = numberHiddenByMember', () => {
      const propsArr = { ...factory.props };
      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: {
            ...propsArr.profileData.contactSummary,
            contactDetailsStatusString: 'numberHiddenByMember',
          },
        },
      };
      const { profileData } = profileProps;
      const { contactSummary } = profileData;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      expect(contactSummary.sms.length).toBeGreaterThan(0);
      expect(contactSummary.contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(`Phone No. Hidden by member`);
    });
    it('Should render call/sms status message when status = contactDetailNotVerifiedRequested', () => {
      const propsArr = { ...factory.props };
      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: {
            ...propsArr.profileData.contactSummary,
            contactDetailsStatusString: 'contactDetailNotVerifiedRequested',
          },
        },
      };
      const { profileData } = profileProps;
      const { contactSummary } = profileData;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      expect(contactSummary.sms.length).toBeGreaterThan(0);
      expect(contactSummary.contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(`Your request for verifying contact number has been sent to the member.`);
    });
    it('Should render call/sms status message when status = contactDetailNotVerifiedRequest', () => {
      const propsArr = { ...factory.props };
      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: {
            ...propsArr.profileData.contactSummary,
            contactDetailsStatusString: 'contactDetailNotVerifiedRequest',
          },
        },
      };
      const { profileData } = profileProps;
      const { contactSummary } = profileData;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      expect(contactSummary.contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(`${profileData.heShe} has not Verified Phone No..`);
    });

    it('Should render call/sms status message when status = none', () => {
      const propsArr = { ...factory.props };
      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: {
            ...propsArr.profileData.contactSummary,
            contactDetailsStatusString: 'none',
          },
        },
      };
      const { profileData } = profileProps;
      const { contactSummary } = profileData;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      expect(contactSummary.contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(
        `${profileData.name} has chosen not to display ${profileData.hisHer.toLowerCase()} Phone No. to other Members.`,
      );
    });
    it('Should render call/sms status message when status = membershipContactLimitExceeded', () => {
      const propsArr = { ...factory.props };
      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: {
            ...propsArr.profileData.contactSummary,
            contactDetailsStatusString: 'membershipContactLimitExceeded',
          },
        },
      };
      const { profileData } = profileProps;
      const { contactSummary } = profileData;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      expect(contactSummary.contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(`You have exceeded the maximum limit of phone numbers .`);
    });
    it('Should render call/sms status message when status = maxContactLimitExceeded', () => {
      const propsArr = { ...factory.props };
      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: {
            ...propsArr.profileData.contactSummary,
            contactDetailsStatusString: 'maxContactLimitExceeded',
          },
        },
      };
      const { profileData } = profileProps;
      const { contactSummary } = profileData;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      expect(contactSummary.contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(`You have exceeded your daily limit.`);
    });
    it('Should render call/sms status message when status = theyCurrentlyUnderScreening', () => {
      const propsArr = { ...factory.props };
      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: {
            ...propsArr.profileData.contactSummary,
            contactDetailsStatusString: 'theyCurrentlyUnderScreening',
          },
        },
      };
      const { profileData } = profileProps;
      const { contactSummary } = profileData;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      expect(contactSummary.contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(`profile is currently under screening.`);
    });
    it('Should render call/sms status message when status = blocked', () => {
      const propsArr = { ...factory.props };
      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: {
            ...propsArr.profileData.contactSummary,
            contactDetailsStatusString: 'blocked',
          },
        },
      };
      const { profileData } = profileProps;
      const { contactSummary } = profileData;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      expect(contactSummary.sms.length).toBeGreaterThan(0);
      expect(contactSummary.contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(`You have Blocked this member.`);
    });
    it('Should render call/sms status message when status = cancelled', () => {
      const propsArr = { ...factory.props };
      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: {
            ...propsArr.profileData.contactSummary,
            contactDetailsStatusString: 'cancelled',
          },
        },
      };
      const { profileData } = profileProps;
      const { contactSummary } = profileData;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      expect(contactSummary.contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(`You Cancelled your Invitation.`);
    });
    it('Should render call/sms status message when status = declined', () => {
      const propsArr = { ...factory.props };
      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: {
            ...propsArr.profileData.contactSummary,
            contactDetailsStatusString: 'declined',
          },
        },
      };
      const { profileData } = profileProps;
      const { contactSummary } = profileData;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      expect(contactSummary.contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(`You Declined ${profileData.hisHer.toLowerCase()} Invitation.`);
    });

    it('Should render call/sms title ,status message when status = disabled', () => {
      const propsArr = { ...factory.props };
      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: {
            ...propsArr.profileData.contactSummary,
            contactDetailsStatusString: 'disabled',
          },
        },
      };
      const { profileData } = profileProps;
      const { contactSummary } = profileData;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      expect(contactSummary.contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(callSmsWrapper.text()).toContain(`Profile has been deactivated due to inactivity.`);
      expect(callSmsWrapper.text()).toContain(`Viewed Phone No Of`);
    });
    it('Should render call/sms status message when status = theyBlocked', () => {
      const propsArr = { ...factory.props };
      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: {
            ...propsArr.profileData.contactSummary,
            contactDetailsStatusString: 'theyBlocked',
            hiddenReason: 'selfHidden',
          },
        },
      };
      const { profileData } = profileProps;
      const { contactSummary } = profileData;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      expect(contactSummary.sms.length).toBeGreaterThan(0);
      expect(contactSummary.contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(contactSummary.hiddenReason.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(
        `Member has decided to keep his profile hidden. Please check again after a few days.`,
      );
    });
    it('Should render call/sms status message when status = theyBlocked', () => {
      const propsArr = { ...factory.props };
      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: {
            ...propsArr.profileData.contactSummary,
            contactDetailsStatusString: 'theyBlocked',
            hiddenReason: 'systemHidden',
          },
        },
      };
      const { profileData } = profileProps;
      const { contactSummary } = profileData;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      expect(contactSummary.sms.length).toBeGreaterThan(0);
      expect(contactSummary.contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(contactSummary.hiddenReason.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(
        `Profile is temporarily hidden because of possible Terms of Use violation. Please check again after a few days.`,
      );
    });
    it('Should render call/sms status message when status = theyBlocked', () => {
      const propsArr = { ...factory.props };
      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: {
            ...propsArr.profileData.contactSummary,
            contactDetailsStatusString: 'theyBlocked',
            hiddenReason: 'selfDeleted',
          },
        },
      };
      const { profileData } = profileProps;
      const { contactSummary } = profileData;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      expect(contactSummary.sms.length).toBeGreaterThan(0);
      expect(contactSummary.contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(contactSummary.hiddenReason.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(`Member has deleted his profile.`);
    });
    it('Should render call/sms status message when status = theyBlocked', () => {
      const propsArr = { ...factory.props };
      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: {
            ...propsArr.profileData.contactSummary,
            contactDetailsStatusString: 'theyBlocked',
            hiddenReason: 'systemDeleted',
          },
        },
      };
      const { profileData } = profileProps;
      const { contactSummary } = profileData;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      expect(contactSummary.sms.length).toBeGreaterThan(0);
      expect(contactSummary.contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(contactSummary.hiddenReason.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(`Profile has been deleted due to the  Terms of Use violation.`);
    });
    it('Should render call/sms status message when status = theyBlocked', () => {
      const propsArr = { ...factory.props };
      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: {
            ...propsArr.profileData.contactSummary,
            contactDetailsStatusString: 'theyBlocked',
            hiddenReason: 'defaultDeleted',
          },
        },
      };
      const { profileData } = profileProps;
      const { contactSummary } = profileData;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      expect(contactSummary.sms.length).toBeGreaterThan(0);
      expect(contactSummary.contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(contactSummary.hiddenReason.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(`Sorry, this Member has chosen to hide his Profile recently.`);
    });
    it('Should render call/sms status message when status = theyHidden', () => {
      const propsArr = { ...factory.props };
      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: {
            ...propsArr.profileData.contactSummary,
            contactDetailsStatusString: 'theyHidden',
            contactDetailsTitleStatusString: 'selfHidden',
            hidden: 'Y',
            hiddenReason: 'selfHidden',
          },
        },
      };
      const { profileData } = profileProps;
      const { contactSummary } = profileData;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      expect(contactSummary.sms.length).toBeGreaterThan(0);
      expect(contactSummary.contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(contactSummary.contactDetailsTitleStatusString.length).toBeGreaterThan(0);
      expect(contactSummary.hidden).toEqual('Y');
      expect(contactSummary.hiddenReason.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(
        `Member has decided to keep his profile hidden. Please check again after a few days.`,
      );
    });
    it('Should render call/sms status message when status = theyHidden', () => {
      const propsArr = { ...factory.props };
      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: {
            ...propsArr.profileData.contactSummary,
            contactDetailsStatusString: 'theyHidden',
            contactDetailsTitleStatusString: 'systemHidden',
            hidden: 'Y',
            hiddenReason: 'systemHidden',
          },
        },
      };
      const { profileData } = profileProps;
      const { contactSummary } = profileData;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      expect(contactSummary.sms.length).toBeGreaterThan(0);
      expect(contactSummary.contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(contactSummary.contactDetailsTitleStatusString.length).toBeGreaterThan(0);
      expect(contactSummary.hidden).toEqual('Y');
      expect(contactSummary.hiddenReason.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(
        `Profile is temporarily hidden because of possible Terms of Use violation. Please check again after a few days.`,
      );
    });
    it('Should render call/sms status message when status = theyHidden', () => {
      const propsArr = { ...factory.props };
      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: {
            ...propsArr.profileData.contactSummary,
            contactDetailsStatusString: 'theyHidden',
            contactDetailsTitleStatusString: 'selfDeleted',
            hidden: 'Y',
            hiddenReason: 'selfDeleted',
          },
        },
      };
      const { profileData } = profileProps;
      const { contactSummary } = profileData;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      expect(contactSummary.sms.length).toBeGreaterThan(0);
      expect(contactSummary.contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(contactSummary.hidden).toEqual('Y');
      expect(contactSummary.hiddenReason.length).toBeGreaterThan(0);
      expect(contactSummary.contactDetailsTitleStatusString.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(`Member has deleted his profile.`);
    });
    it('Should render call/sms status message when status = theyHidden', () => {
      const propsArr = { ...factory.props };
      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: {
            ...propsArr.profileData.contactSummary,
            contactDetailsStatusString: 'theyHidden',
            contactDetailsTitleStatusString: 'systemDeleted',
            hidden: 'Y',
            hiddenReason: 'systemDeleted',
          },
        },
      };
      const { profileData } = profileProps;
      const { contactSummary } = profileData;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      expect(contactSummary.sms.length).toBeGreaterThan(0);
      expect(contactSummary.contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(contactSummary.hidden).toEqual('Y');
      expect(contactSummary.hiddenReason.length).toBeGreaterThan(0);
      expect(contactSummary.contactDetailsTitleStatusString.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(`Profile has been deleted due to the  Terms of Use violation.`);
    });
    it('Should render call/sms status message when status = theyHidden', () => {
      const propsArr = { ...factory.props };
      const profileProps = {
        ...propsArr,
        profileData: {
          ...propsArr.profileData,
          contactSummary: {
            ...propsArr.profileData.contactSummary,
            contactDetailsStatusString: 'theyHidden',
            contactDetailsTitleStatusString: 'defaultDeleted',
            hidden: 'Y',
            hiddenReason: 'defaultDeleted',
          },
        },
      };
      const { profileData } = profileProps;
      const { contactSummary } = profileData;
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      const divIdAttr = `div[id="${profileProps.profileData.uid}"]`;
      expect(contactSummary.sms.length).toBeGreaterThan(0);
      expect(contactSummary.contactDetailsStatusString.length).toBeGreaterThan(0);
      expect(contactSummary.hidden).toEqual('Y');
      expect(contactSummary.hiddenReason.length).toBeGreaterThan(0);
      expect(contactSummary.contactDetailsTitleStatusString.length).toBeGreaterThan(0);
      expect(callSmsWrapper.find(divIdAttr).text()).toContain(`Sorry, this Member has chosen to hide his Profile recently.`);
    });
  });
  describe('Profile photo', () => {
    it('Should render photo image', () => {
      const profileProps = { ...factory.props };
      const callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      const divIdAttr = 'div[type="contactSummaryCard"]';
      expect(
        callSmsWrapper
          .find(divIdAttr)
          .first()
          .html(),
      ).toContain(`src="http`);
    });
  });
  describe('Profile View Msg Click', () => {
    it('Should click view sms link', () => {
      let profileProps = { ...factory.props };
      let callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      callSmsWrapper
        .find('[id="msgId"]')
        .at(0)
        .simulate('click');
      const propsArr = { ...factory.props };
      const { viewSmsShowStatus: changeStatus } = propsArr;
      profileProps = {
        ...propsArr,
        viewSmsShowStatus: !changeStatus,
      };
      callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      expect(callSmsWrapper.find('[id="viewSms"]').exists()).toBe(true);
      expect(
        callSmsWrapper
          .find('[id="viewSms"]')
          .at(0)
          .text().length,
      ).toBeGreaterThan(0);
    });
    it('Should click view sms show arrow', () => {
      let profileProps = { ...factory.props };
      let callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      callSmsWrapper
        .find('[id="showIcon"]')
        .at(0)
        .simulate('click');
      const propsArr = { ...factory.props };
      const { viewSmsShowStatus: changeStatus } = propsArr;
      profileProps = {
        ...propsArr,
        viewSmsShowStatus: !changeStatus,
      };
      callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      expect(callSmsWrapper.find('[id="viewSms"]').exists()).toBe(true);
      expect(
        callSmsWrapper
          .find('[id="viewSms"]')
          .at(0)
          .text().length,
      ).toBeGreaterThan(0);
    });
    it('Should click view sms hide arrow', () => {
      let profileProps = { ...factory.props };
      let callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      callSmsWrapper
        .find('[id="hideIcon"]')
        .at(0)
        .simulate('click');
      const propsArr = { ...factory.props };
      const { viewSmsShowStatus: changeStatus } = propsArr;
      profileProps = {
        ...propsArr,
        viewSmsShowStatus: !changeStatus,
      };
      callSmsWrapper = mount(<ContactSummaryItem {...profileProps} />);
      expect(callSmsWrapper.find('[id="viewSms"]').exists()).toBe(true);
      expect(
        callSmsWrapper
          .find('[id="viewSms"]')
          .at(0)
          .text().length,
      ).toBeGreaterThan(0);
    });
  });
});
