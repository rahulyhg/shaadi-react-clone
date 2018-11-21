import React from 'react';
import { mount } from 'enzyme';
import PhotoSetting from '../PhotoSetting';
// import PhotoSettingPreview from '../PhotoSettingPreview';
// import PhotoUnderScreening from '../PhotoSettingPreview/PhotoUnderScreening';
// import PhotoScreened from '../PhotoSettingPreview/PhotoScreened';
// import getMockedEvent from '../../__tests__/factory/utils/getMockedEvent';

const mockedOnSubmit = jest.fn();

const props = {
  profilePhotoUrl: '',
  photoStatus: 'add_photo',
  gender: 'male',
  photoDisplaySetting: 'Show All',
  onSubmit: mockedOnSubmit,
  photoSettingSaveSuccess: false,
};

// describe('Photo Settings Tab', () => {
//   describe('Visible to Profiles I like option default selected', () => {
//     const component = mount(<PhotoSetting {...props} />);
//     component.setProps({ photoDisplaySetting: 'Only When I Contact' });
//     it('more btn hidden', () => {
//       expect(component.find('#more-visible-text')).toHaveLength(0);
//     });
//     it('Visible to Profiles visible', () => {
//       expect(component.find('#only_when_i_contact').exists()).toBeTruthy();
//     });
//   });

//   describe('Visible to all Members default Selected', () => {
//     const component = mount(<PhotoSetting {...props} />);
//     component.setProps({ photoDisplaySetting: 'When I Contact' });
//     it('more btn visible', () => {
//       expect(component.find('#more-visible-text').exists()).toBeTruthy();
//     });
//     it('Visible to Profiles hidden', () => {
//       expect(component.find('#only_when_i_contact')).toHaveLength(0);
//     });
//   });

//   describe('submit button', () => {
//     const component = mount(<PhotoSetting {...props} />);
//     component.setProps({ photoDisplaySetting: 'Show All' });

//     it('visble', () => {
//       expect(
//         component
//           .find('#save-photo-display-setting')
//           .at(0)
//           .exists(),
//       ).toBeTruthy();
//     });

//     it('disabled', () => {
//       component.setProps({ photoDisplaySetting: 'Show All' });
//       component
//         .find('#when_i_contact')
//         .at(0)
//         .simulate('change', getMockedEvent({ value: 'Show All' }));
//       expect(component.state('isSubmitBtnDisabled')).toBeTruthy();
//     });

//     it('enabled', () => {
//       component.setProps({ photoDisplaySetting: 'When I Contact' });
//       component
//         .find('#when_i_contact')
//         .at(0)
//         .simulate('change', getMockedEvent({ value: 'Show All' }));
//       expect(component.state('isSubmitBtnDisabled')).toBeFalsy();
//     });
//   });

//   describe('photo setting save', () => {
//     let component = mount(<PhotoSetting {...props} />);
//     it('visible', () => {
//       const saveBtn = component.find('#save-photo-display-setting');
//       expect(saveBtn.exists()).toBeTruthy();
//     });

//     describe('click', () => {
//       it('has no photos', () => {
//         const spyOnSubmit = jest.spyOn(component.instance(), 'onSubmit');
//         component
//           .find('#save-photo-display-setting')
//           .get(0)
//           .simulate('click');
//         expect(spyOnSubmit).toHaveBeenCalled();
//       });

//       it('has photos', () => {
//         const items = [{}];
//         items[0].getUrlForAlbumPage = '';
//         component.setProps({
//           photoStatus: 'show_photo',
//           photoDisplaySetting: 'Show All',
//         });
//         component = mount(<PhotoSetting {...props} />);
//         component
//           .find('#when_i_contact')
//           .at(0)
//           .simulate('change', getMockedEvent({ value: 'When I Contact' }));
//         component
//           .find('#save-photo-display-setting')
//           .get(0)
//           .simulate('click');
//         const spyOnSubmit = jest.spyOn(component.instance(), 'onSubmit');
//         expect(spyOnSubmit).toHaveBeenCalled();
//       });
//     });

//     it('success message', () => {
//       component.setProps({
//         photoSettingSaveSuccess: true,
//         photoSettingSaveFail: false,
//         photoDisplaySetting: 'When I Contact',
//       });
//       expect(component.state('showMsgOnSubmit')).toBeTruthy();
//       // settimeout in component is not being called - need to R&D and debug
//       component.instance().fadeOutMsg();
//       const spyFadeOutMsg = jest.spyOn(component.instance(), 'fadeOutMsg');
//       expect(spyFadeOutMsg).toHaveBeenCalled();
//       /* jest.useFakeTimers();
//       setTimeout(() => { */
//       expect(component.state('showMsgOnSubmit')).toBeFalsy();
//       /* }, 2500);
//       jest.runAllTimers(); */
//     });

//     it('failure message', () => {
//       component.setProps({
//         photoSettingSaveSuccess: false,
//         photoSettingSaveFail: true,
//         photoDisplaySetting: 'Only When I Contact',
//       });
//       expect(component.state('showMsgOnSubmit')).toBeTruthy();
//       // settimeout in component is not being called - need to R&D and debug
//       component.instance().fadeOutMsg();
//       const spyFadeOutMsg = jest.spyOn(component.instance(), 'fadeOutMsg');
//       expect(spyFadeOutMsg).toHaveBeenCalled();
//       /* jest.useFakeTimers();
//       setTimeout(() => { */
//       expect(component.state('showMsgOnSubmit')).toBeFalsy();
//       /* }, 2500);
//       jest.runAllTimers(); */
//     });
//   });

//   describe('photo setting having all underscreening photo(s)', () => {
//     describe('male images preview on option selection', () => {
//       const component = mount(<PhotoSetting {...props} />);
//       it('show all option selected', () => {
//         component.setProps({ gender: 'male' });
//         component.setState({
//           isUnderScreening: true,
//           isPhotoScreened: false,
//           hasNoPhotos: false,
//           showLockIcon: false,
//         });
//         component
//           .find('#show_all')
//           .at(0)
//           .simulate('change', getMockedEvent({ value: 'Show All' }));
//         const PhotoSettingPreviewComponent = mount(<PhotoSettingPreview {...props} />);
//         expect(PhotoSettingPreviewComponent.html()).toEqual(null);
//       });

//       it('visible to profile i like and premium members option selected', () => {
//         component
//           .find('#show_all')
//           .at(0)
//           .simulate('change', getMockedEvent({ value: 'When I Contact' }));
//         const PhotoSettingPreviewComponent = mount(<PhotoSettingPreview {...props} />);
//         expect(PhotoSettingPreviewComponent.find(PhotoUnderScreening).exists()).toBeTruthy();
//         PhotoSettingPreviewComponent.find(PhotoUnderScreening).dive();
//       });

//       it('visible to profile i like option selected', () => {
//         component
//           .find('#show_all')
//           .at(0)
//           .simulate('change', getMockedEvent({ value: 'Only When I Contact' }));
//         const PhotoSettingPreviewComponent = mount(<PhotoSettingPreview {...props} />);
//         expect(PhotoSettingPreviewComponent.find(PhotoUnderScreening).exists()).toBeTruthy();
//         PhotoSettingPreviewComponent.find(PhotoUnderScreening).dive();
//       });
//     });

//     describe('female images preview on option selection', () => {
//       const component = mount(<PhotoSetting {...props} />);
//       it('show all option selected', () => {
//         component.setProps({ gender: 'female' });
//         component.setState({
//           isUnderScreening: true,
//           isPhotoScreened: false,
//           hasNoPhotos: false,
//         });
//         component
//           .find('#show_all')
//           .at(0)
//           .simulate('change', getMockedEvent({ value: 'Show All' }));
//         const PhotoSettingPreviewComponent = mount(<PhotoSettingPreview {...props} />);
//         expect(PhotoSettingPreviewComponent.html()).toEqual(null);
//       });

//       it('visible to profile i like and premium members option selected', () => {
//         component
//           .find('#show_all')
//           .at(0)
//           .simulate('change', getMockedEvent({ value: 'When I Contact' }));
//         const PhotoSettingPreviewComponent = mount(<PhotoSettingPreview {...props} />);
//         expect(PhotoSettingPreviewComponent.find(PhotoUnderScreening).exists()).toBeTruthy();
//         PhotoSettingPreviewComponent.find(PhotoUnderScreening).dive();
//       });

//       it('visible to profile i like option selected', () => {
//         component
//           .find('#show_all')
//           .at(0)
//           .simulate('change', getMockedEvent({ value: 'Only When I Contact' }));
//         const PhotoSettingPreviewComponent = mount(<PhotoSettingPreview {...props} />);
//         expect(PhotoSettingPreviewComponent.find(PhotoUnderScreening).exists()).toBeTruthy();
//         PhotoSettingPreviewComponent.find(PhotoUnderScreening).dive();
//       });
//     });
//   });

//   describe('photo setting having one or some screened photo(s)', () => {
//     describe('male images preview on option selection', () => {
//       const component = mount(<PhotoSetting {...props} />);
//       it('show all option selected', () => {
//         component.setProps({ gender: 'male' });
//         component.setState({
//           isUnderScreening: false,
//           isPhotoScreened: true,
//           hasNoPhotos: false,
//         });
//         component
//           .find('#show_all')
//           .at(0)
//           .simulate('change', getMockedEvent({ value: 'Show All' }));
//         const PhotoSettingPreviewComponent = mount(<PhotoSettingPreview {...props} />);
//         expect(PhotoSettingPreviewComponent.find(PhotoScreened).exists()).toBeTruthy();
//         PhotoSettingPreviewComponent.find(PhotoScreened).dive();
//       });

//       it('visible to profile i like and premium members option selected', () => {
//         component
//           .find('#show_all')
//           .at(0)
//           .simulate('change', getMockedEvent({ value: 'When I Contact' }));
//         const PhotoSettingPreviewComponent = mount(<PhotoSettingPreview {...props} />);
//         expect(PhotoSettingPreviewComponent.find(PhotoScreened).exists()).toBeTruthy();
//         PhotoSettingPreviewComponent.find(PhotoScreened).dive();
//       });

//       it('visible to profile i like option selected', () => {
//         component
//           .find('#show_all')
//           .at(0)
//           .simulate('change', getMockedEvent({ value: 'Only When I Contact' }));
//         const PhotoSettingPreviewComponent = mount(<PhotoSettingPreview {...props} />);
//         expect(PhotoSettingPreviewComponent.find(PhotoScreened).exists()).toBeTruthy();
//         PhotoSettingPreviewComponent.find(PhotoScreened).dive();
//       });
//     });

//     describe('female images preview on option selection', () => {
//       const component = mount(<PhotoSetting {...props} />);
//       it('show all option selected', () => {
//         component.setProps({ gender: 'female' });
//         component.setState({
//           isUnderScreening: false,
//           isPhotoScreened: true,
//           hasNoPhotos: false,
//         });
//         component
//           .find('#show_all')
//           .at(0)
//           .simulate('change', getMockedEvent({ value: 'Show All' }));
//         const PhotoSettingPreviewComponent = mount(<PhotoSettingPreview {...props} />);
//         expect(PhotoSettingPreviewComponent.find(PhotoScreened).exists()).toBeTruthy();
//         PhotoSettingPreviewComponent.find(PhotoScreened).dive();
//       });

//       it('visible to profile i like and premium members option selected', () => {
//         component
//           .find('#show_all')
//           .at(0)
//           .simulate('change', getMockedEvent({ value: 'When I Contact' }));
//         const PhotoSettingPreviewComponent = mount(<PhotoSettingPreview {...props} />);
//         expect(PhotoSettingPreviewComponent.find(PhotoScreened).exists()).toBeTruthy();
//         PhotoSettingPreviewComponent.find(PhotoScreened).dive();
//       });

//       it('visible to profile i like option selected', () => {
//         component
//           .find('#show_all')
//           .at(0)
//           .simulate('change', getMockedEvent({ value: 'Only When I Contact' }));
//         const PhotoSettingPreviewComponent = mount(<PhotoSettingPreview {...props} />);
//         expect(PhotoSettingPreviewComponent.find(PhotoScreened).exists()).toBeTruthy();
//         PhotoSettingPreviewComponent.find(PhotoScreened).dive();
//       });
//     });
//   });

//   it('photo setting having approved photo(s)', () => {
//     const component = mount(<PhotoSetting {...props} />);
//     component.setProps({ photoStatus: 'show_photo' });
//     expect(mount(<PhotoSettingPreview {...props} />)).toBeTruthy();
//   });

//   it('no photo setting image preview if no photo(s)', () => {
//     const component = mount(<PhotoSetting {...props} />);
//     component.setState({
//       hasNoPhotos: true,
//     });
//     expect(component.find(PhotoSettingPreview).exists()).toBeFalsy();
//   });

//   describe('more btn', () => {
//     it('visible only if Visible to Profiles I Like Option is not selected', () => {
//       const component = mount(<PhotoSetting {...props} />);
//       component.setProps({ photoDisplaySetting: 'When I Contact' });
//       expect(component.find('#more-visible-text').exists()).toBeTruthy();
//     });

//     describe('click', () => {
//       let component = mount(<PhotoSetting {...props} />);
//       beforeEach(() => {
//         component.setProps({ photoDisplaySetting: 'When I Contact' });
//         component = mount(<PhotoSetting {...props} />);
//         component
//           .find('#more-visible-text')
//           .get(0)
//           .simulate('click');
//       });

//       it('required function called', () => {
//         const spyMoreVisible = jest.spyOn(component.instance(), 'moreVisible');
//         expect(spyMoreVisible).toHaveBeenCalled();
//       });

//       it('isMoreVisible state is false', () => {
//         expect(component.state('isMoreVisible')).toBeFalsy();
//       });

//       it('hides itself', () => {
//         expect(component.find('#more-visible-text')).toHaveLength(0);
//       });

//       it('displays Visible to Profiles I Like option', () => {
//         expect(component.find('#only_when_i_contact').exists()).toBeTruthy();
//       });
//     });
//   });
// });

describe('Visible to Profiles I like and Premium Members default Selected', () => {
  const component = mount(<PhotoSetting {...props} />);
  component.setProps({ photoDisplaySetting: 'When I Contact' });
  it('more btn visible', () => {
    expect(component.find('#more-visible-text').exists()).toBeTruthy();
  });

  it('Visible to Profiles hidden', () => {
    expect(component.find('#only_when_i_contact')).toHaveLength(0);
  });
});

/* describe('has all 3 options', () => {
  const component = mount(<PhotoSetting {...props} />);
  console.error(component.find('input#only_when_i_contact'));
  it('has all show_all option', () => {
    expect(component.find('input#show_all').exists()).toBeTruthy();
  });
  it('has all when_i_contact option', () => {
    expect(component.find('input#when_i_contact').exists()).toBeTruthy();
  });
  it('has all only_when_i_contact option', () => {
    expect(component.find('input#only_when_i_contact').exists()).toBeTruthy();
  });
}); */
