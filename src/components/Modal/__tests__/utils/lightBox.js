const albumProps = {
  data: {
    album: {
      source: 'inbox',
      albumInfo: {
        profileId: 'ms_pretty_1979',
        photosCount: 11,
        photos: {
          largePhoto: [
            'https://img1.shaadi.com/2012/01/02/ms_pretty_1979-61a9a7.jpg',
            'https://img1.shaadi.com/2012/03/23/ms_pretty_1979-a927a1.jpg',
            'https://img1.shaadi.com/2012/06/18/ms_pretty_1979-4a4691.jpg',
            'https://img1.shaadi.com/2013/03/11/ms_pretty_1979-3ad697.jpg',
            'https://img1.shaadi.com/2014/12/02/ms_pretty_1979-0715c6.jpg',
            'https://img1.shaadi.com/2015/03/21/ms_pretty_1979-8598a2.jpg',
            'https://img1.shaadi.com/2017/11/25/ms_pretty_1979-50b7a1-female.webp',
            'https://img1.shaadi.com/2017/11/25/ms_pretty_1979-8f3e3e-female.webp',
            'https://img1.shaadi.com/2017/11/25/ms_pretty_1979-8b8788-female.webp',
            'https://img1.shaadi.com/2017/11/25/ms_pretty_1979-b86eac-female.webp',
            'https://img1.shaadi.com/2017/11/25/ms_pretty_1979-a64386-female.webp',
          ],
          smallPhoto: [
            'https://img1.shaadi.com/2012/01/02/ms_pretty_1979-2e2dfa.jpg',
            'https://img1.shaadi.com/2012/03/23/ms_pretty_1979-c09bc6.jpg',
            'https://img1.shaadi.com/2012/06/18/ms_pretty_1979-0e969e.jpg',
            'https://img1.shaadi.com/2013/03/11/ms_pretty_1979-f81025.jpg',
            'https://img1.shaadi.com/2014/12/02/ms_pretty_1979-3ade10.jpg',
            'https://img1.shaadi.com/2015/03/21/ms_pretty_1979-ef17e7.jpg',
            'https://img1.shaadi.com/2017/11/25/ms_pretty_1979-a3b0d1-female.webp',
            'https://img1.shaadi.com/2017/11/25/ms_pretty_1979-e9ced8-female.webp',
            'https://img1.shaadi.com/2017/11/25/ms_pretty_1979-a2e57a-female.webp',
            'https://img1.shaadi.com/2017/11/25/ms_pretty_1979-a9b83b-female.webp',
            'https://img1.shaadi.com/2017/11/25/ms_pretty_1979-64314f-female.webp',
          ],
        },
      },
      profileInfo: {
        pid: 'ms_pretty_1979',
        fullName: 'Tasneem K',
        settings: {
          isPaidUser: true,
          hasUploadedPhoto: true,
        },
      },
    },
    bannerPhoto: {
      img: {
        src: 'https://img.shaadi.com/imgs/header-badges/photoimg_20180327141659.jpg',
        alt: '',
        height: 501,
        width: 100,
      },
      url:
        'https://www.vipshaadi.in/vipshaadi?mlogin=SH86164623&amp;enc=3b32d78eb6dcf81385e76b8a09856a60&amp;source=VIP_Banner_AkshayaTritiya',
      target: '_blank',
      isExternal: true,
      isVisible: true,
      layerId: 'profilePageOverlayBanner',
    },
  },
  onModalClose() {},
};
const factory = { albumProps };

it('should export album props', () => {
  expect(factory.albumProps).not.toBeFalsy();
});

export default factory;
