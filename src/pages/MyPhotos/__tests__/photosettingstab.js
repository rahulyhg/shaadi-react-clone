import React from 'react';
import { shallow } from 'enzyme';
import MyPhotosPage from '../desktop';
import factory from './utils/factory';
import PhotoSetting from '../../../components/PhotoSetting';

const emptyFunction = jest.fn();
const props = MyPhotosPage.mapStateToProps(factory.allData, { location: { hash: '#photos' } });
props.history = {
  push() {},
};
props.doProfileAction = emptyFunction;
props.doModalAction = emptyFunction;

let component = shallow(<MyPhotosPage.WrappedComponent {...props} />);
let componentInstance = component.instance();

describe('Photo Settings Tab', () => {
  describe('URL contains #settings on back button press', () => {
    beforeEach(() => {
      const newProps = {
        ...props,
        ...{
          location: factory.getLocation('#settings'),
          selfProfile: {
            ...props.selfProfile,
            ...{
              photos: {
                ...props.selfProfile.photos,
                ...{
                  isDefault: false,
                  status: 'add_photo',
                },
              },
              privacy: {
                ...props.selfProfile.privacy,
                ...{
                  photo: 'Show All',
                },
              },
            },
          },
        },
      };
      component = shallow(<MyPhotosPage.WrappedComponent {...newProps} />);
      componentInstance = component.instance();
    });

    it('photo settings is visible', () => {
      expect(component.state('isPhotoSettingsTabVisible')).toBeTruthy();
    });

    it('current active tab is photo settings', () => {
      expect(component.state('currentActiveTab')).toEqual('photo-settings-tab');
    });

    it('pofile privacy photo has a value', () => {
      expect(component.state('selfProfile').privacy.photo).not.toEqual('');
    });

    it('loader will hide after mounting', () => {
      componentInstance.componentWillMount(); // enzyme shallow needs such manual trigger
      expect(component.state('showLoader')).toBeFalsy();
    });
  });

  describe('while profile preference is yet to be fetched via API', () => {
    const spyGetPhotoDisplaySetting = jest.spyOn(MyPhotosPage.WrappedComponent.prototype, 'getPhotoDisplaySetting');
    component = shallow(<MyPhotosPage.WrappedComponent {...props} />);

    component.setProps({
      selfProfile: {
        ...props.selfProfile,
        uid: 'SH41165398',
        photos: {
          ...props.selfProfile.photos,
          status: 'add_photo',
        },
      },
      location: factory.getLocation('#settings'),
    });

    it('to get photo display setting', () => {
      expect(spyGetPhotoDisplaySetting).toHaveBeenCalled();
    });
  });

  describe('while profile preference fetched', () => {
    beforeAll(() => {
      const newProps = {
        ...props,
        ...{
          location: factory.getLocation('#settings'),
          selfProfile: {
            ...props.selfProfile,
            ...{
              photos: {
                ...props.selfProfile.photos,
                ...{
                  status: 'add_photo',
                },
              },
              privacy: {
                ...props.selfProfile.privacy,
                ...{
                  photo: 'Show All',
                },
              },
            },
          },
        },
      };
      component = shallow(<MyPhotosPage.WrappedComponent {...newProps} />);
      component.setProps(newProps);
    });

    it('Photo Settings Tab visible', () => {
      expect(component.state('isPhotoSettingsTabVisible')).toBeTruthy();
    });

    it('Photo Albums Tab hidden', () => {
      expect(component.state('isPhotoAlbumsTabVisible')).toBeFalsy();
    });

    it('hides loader', () => {
      expect(component.state('showLoader')).toBeFalsy();
    });
  });

  component = shallow(<MyPhotosPage.WrappedComponent {...props} />);

  component.setProps({
    ...props,
    ...{
      location: factory.getLocation('#settings'),
      selfProfile: {
        ...props.selfProfile,
        ...{
          photos: {
            ...props.selfProfile.photos,
            ...{
              status: 'show_photo',
            },
          },
          privacy: {
            ...props.selfProfile.privacy,
            ...{
              photo: 'Show All',
            },
          },
        },
      },
    },
  });

  it('has setting tab link setting', () => {
    component.setProps({
      ...props,
      ...{
        location: factory.getLocation('#settings'),
        selfProfile: {
          ...props.selfProfile,
          ...{
            photos: {
              ...props.selfProfile.photos,
              ...{
                status: 'show_photo',
              },
            },
            privacy: {
              ...props.selfProfile.privacy,
              ...{
                photo: 'Show All',
              },
            },
          },
        },
      },
    });
    expect(component.find(PhotoSetting).exists()).toBeTruthy();
  });

  describe('on photo settings tab', () => {
    component.setProps({
      ...props,
      ...{
        location: factory.getLocation('#settings'),
        selfProfile: {
          ...props.selfProfile,
          ...{
            photos: {
              ...props.selfProfile.photos,
              ...{
                status: 'show_photo',
              },
            },
            privacy: {
              ...props.selfProfile.privacy,
              ...{
                photo: 'Show All',
              },
            },
          },
        },
      },
    });
  });
});
