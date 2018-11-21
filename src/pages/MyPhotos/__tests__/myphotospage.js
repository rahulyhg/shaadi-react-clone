import React from 'react';
import { shallow } from 'enzyme';
import LeftSideNavigation from '../../../components/Common/LeftSideNavigation';
import LinksBox from '../../../components/Common/LinksBox';
import OtherLinks from '../../../components/Common/OtherLinks';
import SearchByProfileId from '../../../components/Common/SearchByProfileId';
import MyPhotosPage from '../desktop';
import factory from './utils/factory';

const emptyFunction = jest.fn();
const props = MyPhotosPage.mapStateToProps(factory.allData, { location: { hash: '#photos' } });
props.history = {
  push() {},
};
props.doProfileAction = emptyFunction;
props.doModalAction = emptyFunction;

describe('My Photos Page', () => {
  const spyMakeProfilePhoto = jest.spyOn(MyPhotosPage.WrappedComponent.prototype, 'makeProfilePhoto');
  const spyDeletePhotoConfirmation = jest.spyOn(MyPhotosPage.WrappedComponent.prototype, 'deletePhotoConfirmation');
  const component = shallow(<MyPhotosPage.WrappedComponent {...props} />);
  const componentInstance = component.instance();

  describe('Album Photos Tab', () => {
    it('it must render LeftSideNavigation', () => {
      const LeftSideNavigationComponent = component.find(LeftSideNavigation).dive();
      LeftSideNavigationComponent.find(LinksBox).dive();
      LeftSideNavigationComponent.find(OtherLinks).dive();
      LeftSideNavigationComponent.find(SearchByProfileId).dive({
        context: {
          store: {
            subscribe: emptyFunction,
            doProfileAction: emptyFunction,

            getState: emptyFunction,
            dispatch: emptyFunction,
          },
        },
      });
      expect(component.find(LeftSideNavigation)).toHaveLength(1);
    });

    describe('when with chat box is closed and top space is not required', () => {
      component.setProps({
        isChatOpen: false,
        topSpace: 0,
      });
      it('LeftSideNavigation is visible', () => {
        expect(component.find(LeftSideNavigation)).toHaveLength(1);
      });
    });

    describe('has profile photos', () => {
      const selfProfile = factory.profileWithPhotos.selfProfile;
      component.setProps({
        selfProfile,
      });
      /* componentInstance.componentDidUpdate();
      componentInstance.render(); */

      it('render with unknown gender', () => {
        selfProfile.gender = null;
        component.setProps({
          ...component.props(),
          ...{
            selfProfile,
          },
        });
        expect(component.find(LeftSideNavigation)).toHaveLength(1);
      });

      it('of female gender', () => {
        selfProfile.gender = 'male';
        component.setProps({ selfProfile });
        expect(component.find(LeftSideNavigation)).toHaveLength(1);
      });

      it('female profile photos', () => {
        selfProfile.gender = 'male';
        component.setProps({ selfProfile });
        expect(component.find(LeftSideNavigation)).toHaveLength(1);
      });

      it('open profile photo options for profile photo', () => {
        expect(component.find('.photo-options').at(0)).toHaveLength(1);
        component
          .find('.photo-options')
          .at(0)
          .simulate('click');
        component
          .find('.photo-options')
          .at(1)
          .simulate('click');
      });

      it('open profile photo options for album photo 1', () => {
        expect(component.find('.photo-options').at(1)).toHaveLength(1);
        component
          .find('.photo-options')
          .at(1)
          .simulate('click');
      });

      describe('make album photo 1 profile photo', () => {
        it('has make profile photo options', () => {
          expect(component.find('.make-profile-photo-btn').at(1)).toHaveLength(1);
        });
        component
          .find('.photo-options')
          .at(1)
          .simulate('click');
        component
          .find('.make-profile-photo-btn')
          .at(1)
          .simulate('click');
      });

      it('make album photo 2 profile photo which is a group photo', () => {
        expect(component.find('.make-profile-photo-btn').at(2)).toHaveLength(1);
        component
          .find('.photo-options')
          .at(1)
          .simulate('click');
        component
          .find('.make-profile-photo-btn')
          .at(1)
          .simulate('click');
      });

      describe('making approved album photo 2 which is a group photo as profile photo', () => {
        const makeProfilePhotoBtnAlbumPhoto2 = component.find('.make-profile-photo-btn').at(2);
        it('has make profile btn on album photo 2', () => {
          expect(makeProfilePhotoBtnAlbumPhoto2).toHaveLength(1);
        });
        if (makeProfilePhotoBtnAlbumPhoto2.length) {
          makeProfilePhotoBtnAlbumPhoto2.simulate('click');
          it('make profile photo function is called', () => {
            expect(spyMakeProfilePhoto).toHaveBeenCalled();
          });
          it('shows message modal by calling doModalAction', () => {
            expect(component.instance().props.doModalAction).toHaveBeenCalled();
          });
        }
      });

      describe('deleting profile photo whilst other approved solo album photo present', () => {
        const deletePhotoBtnAlbumPhoto0 = component.find('.delete-photo-btn').at(0);
        it('has make profile btn on album photo 2', () => {
          expect(deletePhotoBtnAlbumPhoto0).toHaveLength(1);
        });
        if (deletePhotoBtnAlbumPhoto0.length) {
          deletePhotoBtnAlbumPhoto0.simulate('click');
          it('delete photo confirmation function is called', () => {
            expect(spyDeletePhotoConfirmation).toHaveBeenCalled();
          });
          it('shows message modal by calling doModalAction', () => {
            expect(component.instance().props.doModalAction).toHaveBeenCalled();
          });
        }
      });

      describe('confirm profile photo delete', () => {
        it('has delete photo option', () => {
          expect(component.find('.delete-photo-btn').at(0)).toHaveLength(1);
        });
        component
          .find('.photo-options')
          .at(1)
          .simulate('click');
        component
          .find('.delete-photo-btn')
          .at(2)
          .simulate('click');
        it('on photo delete', () => {
          const items = component.instance().props.selfProfile.photos.items;
          items.splice(0, 1);
          component.setProps({
            ...component.instance().props,
            selfProfile: {
              ...component.instance().props.selfProfile,
              ...{
                photos: {
                  ...component.instance().props,
                  items,
                },
              },
            },
          });
          expect(component.state('lastPhotoOptOpenedKey')).toEqual('');
        });
      });

      it('delete album photo 2', () => {
        expect(component.find('.delete-photo-btn').at(2)).toHaveLength(1);
        componentInstance.deletPhoto({ photo_order: 2 }, 2, {});
      });

      it('after successful delete of album photo 2', () => {
        const items = selfProfile.photos.items;
        items.splice(1, 1);
        component.setProps({
          selfProfile: {
            ...selfProfile,
            ...{
              photos: {
                ...selfProfile.photos,
                ...{
                  items,
                },
              },
            },
          },
        });
      });

      it('open photo guidelines from link at note', () => {
        expect(component.find('#open-photo-guideline-note-link').at(0)).toHaveLength(1);
        component
          .find('#open-photo-guideline-note-link')
          .at(0)
          .simulate('click');
      });

      it('open photo guidelines from link at bottom', () => {
        expect(component.find('#open-photo-guideline-btm-link').at(0)).toHaveLength(1);
        component
          .find('#open-photo-guideline-btm-link')
          .at(0)
          .simulate('click');
      });

      it('total 20', () => {
        selfProfile.photos.canAddPhotos = false;
        component.setProps({ selfProfile });
        expect(component.find(LeftSideNavigation)).toHaveLength(1);
      });
    });

    it('no loader in case of profile photos availabe on back button press', () => {
      props.selfProfile.photos.isDefault = false;
      const localComponent = shallow(<MyPhotosPage.WrappedComponent {...props} />);
      expect(localComponent.find(LeftSideNavigation)).toHaveLength(1);
    });

    it('log out case', () => {
      const isLoggedOut = true;
      component.setProps({
        isLoggedOut,
      });
      expect(component.find(LeftSideNavigation)).toHaveLength(0);
    });
  });
});

describe('album photos is not an array', () => {
  const newProps = {
    ...props,
    selfProfile: {
      ...props.selfProfile,
      photos: {
        ...props.selfProfile,
        items: null,
      },
    },
  };
  shallow(<MyPhotosPage.WrappedComponent {...newProps} />);
  it('album photo section is not visible', () => {
    const spyShowUserPhotos = jest.spyOn(MyPhotosPage.WrappedComponent.prototype, 'showUserPhotos');
    expect(spyShowUserPhotos).not.toHaveBeenCalled();
  });
});

describe('on photo alubm and photos yet to be fetched', () => {
  const newProps = {
    ...props,
    ...{
      selfProfile: {
        ...props.selfProfile,
        ...{
          uid: 'SH41165398',
          photos: {
            ...props.selfProfile.photos,
            ...{
              isDefault: true,
            },
          },
        },
      },
    },
  };
  const spyGetPhotoAlbums = jest.spyOn(MyPhotosPage.WrappedComponent.prototype, 'getPhotoAlbums');
  const spyTimeoutLoader = jest.spyOn(MyPhotosPage.WrappedComponent.prototype, 'timeoutLoader');
  /* const spyComponentDidMount = jest.spyOn(MyPhotosPage.WrappedComponent.prototype, 'componentDidMount');
  const spyComponentWillUnmount = jest.spyOn(MyPhotosPage.WrappedComponent.prototype, 'componentWillUnmount'); */
  const MyPhotosPageLocalComponent = shallow(<MyPhotosPage.WrappedComponent {...newProps} />);
  /* const MyPhotosPageLocalComponentInstance = MyPhotosPageLocalComponent.instance(); */

  /* it('when component mounts component did mount is called', () => {
    MyPhotosPageLocalComponentInstance.componentDidMount(); // hack for time-being
    expect(spyComponentDidMount).toHaveBeenCalled();
  }); */

  MyPhotosPageLocalComponent.setProps(newProps);

  it('shows loader', () => {
    expect(MyPhotosPageLocalComponent.state('showLoader')).toEqual(true);
  });

  it('get photos request sent', () => {
    expect(MyPhotosPageLocalComponent.state('profilePhotosRequestSent')).toEqual(true);
  });

  it('to get photo display setting', () => {
    expect(spyGetPhotoAlbums).toHaveBeenCalled();
  });

  it('function to remove loader must be called after 10 seconds', done => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10001; // eslint-disable-line no-undef
    setTimeout(() => {
      done();
      expect(spyTimeoutLoader).toHaveBeenCalled();
    }, 10000);
  });

  /* it('on unmount component will unmount function must be called', () => {
    MyPhotosPageLocalComponent.unmount();
    expect(spyComponentWillUnmount).toHaveBeenCalled();
  }); */
});

it('album photos is fetched but rejected photos is not', () => {
  const spyGetRejectedAlbumPhotos = jest.spyOn(MyPhotosPage.WrappedComponent.prototype, 'getRejectedAlbumPhotos');
  const MyPhotosPageLocalComponent = shallow(<MyPhotosPage.WrappedComponent {...props} />);
  const newProps = {
    ...props,
    selfProfile: {
      ...props.selfProfile,
      ...{
        uid: 'NSH2849190',
        photos: {
          ...props.selfProfile,
          isRejectedPhotosFetched: false,
          isDefault: false,
        },
      },
    },
  };
  MyPhotosPageLocalComponent.setProps(newProps);
  MyPhotosPageLocalComponent.setProps(newProps);
  expect(spyGetRejectedAlbumPhotos).toHaveBeenCalled();
});
