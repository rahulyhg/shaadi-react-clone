import React from 'react';
import { shallow } from 'enzyme';
import InboxItem from '../../InboxItem';
import factory from './utils/factory';

describe('<InboxItem />', () => {
  const onAction = jest.fn();
  it('should render <ProfilePhoto /> components', () => {
    const props = {
      ...factory.props,
      onAction,
      onChatNow: onAction,
      onMouseEnter: onAction,
      onMouseLeave: onAction,
      onShowContactDetails: onAction,
      onShowWatermarkInfo: onAction,
      onEoiTooltipClose: onAction,
      onPhotoTooltipClose: onAction,
      onRequestPhoto: onAction,
      onCallConsultantInvited: onAction,
    };
    const wrapper = shallow(<InboxItem {...props} />);
    expect(wrapper.find('ProfilePhoto')).toHaveLength(1);
  });

  it('should render <Eoi /> components', () => {
    const props = {
      ...factory.props,
      onAction,
      onChatNow: onAction,
      onMouseEnter: onAction,
      onMouseLeave: onAction,
      onShowContactDetails: onAction,
      onShowWatermarkInfo: onAction,
      onEoiTooltipClose: onAction,
      onPhotoTooltipClose: onAction,
      onRequestPhoto: onAction,
      onCallConsultantInvited: onAction,
    };
    const wrapper = shallow(<InboxItem {...props} />);
    expect(wrapper.find('Eoi')).toHaveLength(1);
  });

  it('should render premium banner component for free user', () => {
    const props = {
      ...factory.props,
      item: {
        ...factory.props.item,
        source: 'inbox',
        justNow: true,
        eoiReqType: 'accept',
        toggleCard: true,
      },
      settings: {
        ...factory.props.settings,
        experiments: {
          accept_success: {
            bucket: 'B',
          },
        },
        isPaidUser: false,
      },
      onAction,
      onChatNow: onAction,
      onMouseEnter: onAction,
      onMouseLeave: onAction,
      onShowContactDetails: onAction,
      onShowWatermarkInfo: onAction,
      onEoiTooltipClose: onAction,
      onPhotoTooltipClose: onAction,
      onRequestPhoto: onAction,
      onCallConsultantInvited: onAction,
    };
    const inboxItem = shallow(<InboxItem {...props} />);
    expect(inboxItem.find('InterestListBanner')).toHaveLength(1);
  });

  it('should not render premium banner component for paid user', () => {
    const props = {
      ...factory.props,
      item: {
        ...factory.props.item,
        justNow: true,
        eoiReqType: 'accept',
      },
      settings: {
        ...factory.props.settings,
        isPaidUser: true,
      },
      onAction,
      onChatNow: onAction,
      onMouseEnter: onAction,
      onMouseLeave: onAction,
      onShowContactDetails: onAction,
      onShowWatermarkInfo: onAction,
      onEoiTooltipClose: onAction,
      onPhotoTooltipClose: onAction,
      onRequestPhoto: onAction,
      onCallConsultantInvited: onAction,
    };
    const inboxItem = shallow(<InboxItem {...props} />);
    expect(inboxItem.find('InterestListBanner')).toHaveLength(0);
  });

  it('should render <BoldListing /> component', () => {
    const propsArr = { ...factory.props };

    const props = {
      ...propsArr,
      profile: {
        ...propsArr.profile,
        flags: {
          ...propsArr.profile.flags,
          isBoldListing: true,
        },
      },
      onAction,
      onChatNow: onAction,
      onMouseEnter: onAction,
      onMouseLeave: onAction,
      onShowContactDetails: onAction,
      onShowWatermarkInfo: onAction,
      onEoiTooltipClose: onAction,
      onPhotoTooltipClose: onAction,
      onRequestPhoto: onAction,
      onCallConsultantInvited: onAction,
    };
    const wrapper = shallow(<InboxItem {...props} />);
    expect(wrapper.find('BoldListing')).toHaveLength(1);
  });

  it('should not render <BoldListing /> component', () => {
    const propsArr = { ...factory.props };

    const props = {
      ...propsArr,
      profile: {
        ...propsArr.profile,
        flags: {
          ...propsArr.profile.flags,
          isBoldListing: false,
        },
      },
      onAction,
      onChatNow: onAction,
      onMouseEnter: onAction,
      onMouseLeave: onAction,
      onShowContactDetails: onAction,
      onShowWatermarkInfo: onAction,
      onEoiTooltipClose: onAction,
      onPhotoTooltipClose: onAction,
      onRequestPhoto: onAction,
      onCallConsultantInvited: onAction,
    };
    const wrapper = shallow(<InboxItem {...props} />);
    expect(wrapper.find('BoldListing')).toHaveLength(0);
  });
  describe('Profile Online Status', () => {
    it('should not show chat icon and Online status if profile is hidden/deleted', () => {
      const propsArr = { ...factory.props };

      const props = {
        ...propsArr,
        profile: {
          ...propsArr.profile,
          flags: {
            ...propsArr.profile.flags,
            isHidden: true,
          },
        },
        onAction,
        onChatNow: onAction,
        onMouseEnter: onAction,
        onMouseLeave: onAction,
        onShowContactDetails: onAction,
        onShowWatermarkInfo: onAction,
        onEoiTooltipClose: onAction,
        onPhotoTooltipClose: onAction,
        onRequestPhoto: onAction,
        onCallConsultantInvited: onAction,
      };
      const wrapper = shallow(<InboxItem {...props} />);
      expect(wrapper.find('ChatIcon')).toHaveLength(0);
    });

    it('should show chat icon and Online status if profile is hidden/deleted', () => {
      const propsArr = { ...factory.props };

      const props = {
        ...propsArr,
        profile: {
          ...propsArr.profile,
          flags: {
            ...propsArr.profile.flags,
            isHidden: false,
          },
        },
        onAction,
        onChatNow: onAction,
        onMouseEnter: onAction,
        onMouseLeave: onAction,
        onShowContactDetails: onAction,
        onShowWatermarkInfo: onAction,
        onEoiTooltipClose: onAction,
        onPhotoTooltipClose: onAction,
        onRequestPhoto: onAction,
        onCallConsultantInvited: onAction,
      };
      const wrapper = shallow(<InboxItem {...props} />);
      expect(wrapper.find('ChatIcon')).toHaveLength(1);
    });

    it('should not mask/gamify the received message for BothPartyPayUser B case User', () => {
      const propsArr = { ...factory.props };

      const props = {
        ...propsArr,
        profile: {
          ...propsArr.profile,
          flags: {
            ...propsArr.profile.flags,
            isHidden: false,
          },
        },
        onAction,
        onChatNow: onAction,
        onMouseEnter: onAction,
        onMouseLeave: onAction,
        onShowContactDetails: onAction,
        onShowWatermarkInfo: onAction,
        onEoiTooltipClose: onAction,
        onPhotoTooltipClose: onAction,
        onRequestPhoto: onAction,
        onCallConsultantInvited: onAction,
      };
      const wrapper = shallow(<InboxItem {...props} />);
      expect(wrapper.debug()).toContain('Hi, We have liked your profile and believe it to be a good Match. If you like our ..., Riya R');
    });

    it('should mask/gamify the received message for BothPartyPayUser B case User', () => {
      const propsArr = { ...factory.props };

      const props = {
        ...propsArr,
        item: {
          ...propsArr.item,
          requests: {
            ...propsArr.item.requests,
            connect_accepted: {
              type: 'connect',
              action: 'accepted',
              from: 'from',
              to: 'to',
              isNew: false,
              actionDate: '07 Jan',
              requestKey: 'request_key',
              message_id: 'connect-ISH79311668-kSH85654205-3657-6515-1539672595',
              message: 'In the Interest of our Premium Members, we allow only Premium or Verified users to read messages',
              hide_message: true,
              viewed_date: '07 Jan 2018',
              direction: 'out',
            },
          },
        },
        onAction,
        onChatNow: onAction,
        onMouseEnter: onAction,
        onMouseLeave: onAction,
        onShowContactDetails: onAction,
        onShowWatermarkInfo: onAction,
        onEoiTooltipClose: onAction,
        onPhotoTooltipClose: onAction,
        onRequestPhoto: onAction,
        onCallConsultantInvited: onAction,
      };
      const wrapper = shallow(<InboxItem {...props} />);
      expect(wrapper.debug()).toContain('In the Interest of our Premium Members, we allow only Premium or Verified users to read messages');
    });
  });
});
