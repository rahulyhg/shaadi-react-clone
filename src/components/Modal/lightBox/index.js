import React from 'react';
import { GA } from '../../../actions/lib/utils';
import PropTypes from '../../../PropTypes';
import s from './styles';
import Banner from '../../Banner';
import Spinner from '../../Common/Spinner';
import { calculateAspectRatio } from '../../../utils';

class LightBox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      style: {
        opacity: 1,
      },
      showNav: true,
      showAlbumNumber: false,
      thumbNailNavStyle: {
        marginLeft: '0',
      },
      image: {
        width: 'auto',
        height: 'auto',
        canShow: false,
        isLoaded: false,
        canShowLoader: true,
      },
    };
    this.thumbnailSize = 60;
    this.viewedThumbnails = { from: 0, to: 0 };
    this.visibleTNCnt = 0;
    this.margin = 0;
  }

  componentWillMount() {
    this.preLoadImage();
    document.addEventListener('keydown', this.onKeyDown);
  }
  componentDidMount() {
    GA.trackAlbumClick();
    document.body.style.overflow = 'hidden';
    window.addEventListener('resize', this.navThumbnail);
    this.navThumbnail();
  }

  componentWillUpdate(props, state) {
    if (state.activeSlide !== this.state.activeSlide) {
      setTimeout(() => {
        this.setState({ style: { opacity: 1 } });
      }, 100);
    }
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('resize', this.navThumbnail);
    document.body.style.overflow = '';
  }

  onKeyDown = event => {
    const keyCode = event.keyCode;
    let navTo = this.state.activeSlide;
    switch (keyCode) {
      case 39: {
        navTo += 1;
        navTo < this.props.data.album.albumInfo.photosCount && this.navSlide(event, 'next', navTo);
        break;
      }
      case 37: {
        navTo -= 1;
        navTo >= 0 && this.navSlide(event, 'prev', navTo);
        break;
      }
      case 27: {
        this.closeAlbum();
        break;
      }
      // no default
    }
  };
  preLoadImage = () => {
    const profileImage = [];
    this.props.data.album.albumInfo.photos.largePhoto.forEach((value, i) => {
      profileImage[i] = new Image();
      profileImage[i].src = value;
    });
  };
  closeAlbum = () => {
    this.props.onModalClose();
  };

  mountStyle = navTo => {
    this.setState({
      activeSlide: navTo,
    });
  };

  adjustImage = ({ target: img }) => {
    const originalImageWidth = img.naturalWidth;
    const originalImageHeight = img.naturalHeight;
    const maxHeightAllowed = 0.81 * window.innerHeight;
    let newImageWidth = '';
    let newImageHeight = '';

    if (originalImageHeight > maxHeightAllowed) {
      newImageHeight = maxHeightAllowed;
      newImageWidth = newImageHeight * originalImageWidth / originalImageHeight;
    } else {
      newImageHeight = originalImageHeight;
      newImageWidth = originalImageWidth;
    }
    this.setState({
      image: {
        isLoaded: true,
        canShow: true,
        canShowLoader: false,
        width: `${newImageWidth}px`,
        height: `${newImageHeight}px`,
      },
      showAlbumNumber: true,
    });
  };

  navSlide = (e, navType, index) => {
    e.stopPropagation();
    if (index === this.state.activeSlide) {
      return false;
    }
    let navTo = index || 0;
    let allowNavigation = true;
    const { photosCount } = this.props.data.album.albumInfo;
    switch (navType) {
      case 'next': {
        navTo = this.state.activeSlide + 1;
        allowNavigation = navTo < photosCount;

        break;
      }
      case 'prev': {
        navTo = this.state.activeSlide - 1;
        allowNavigation = navTo >= 0;
        break;
      }

      // no default
    }

    if (navTo >= photosCount || navTo <= 0) {
      navTo = 0;
    }
    if (allowNavigation) {
      this.setState({ style: { opacity: 0 } }, () => {
        setTimeout(this.mountStyle, 500, navTo);
      });
      if (navTo >= this.viewedThumbnails.to || navTo <= this.viewedThumbnails.from) {
        if (navTo >= this.viewedThumbnails.to) {
          this.moveThumbnailSlider('next');
        } else if (navTo <= 0) {
          this.moveThumbnailSlider();
        } else {
          this.moveThumbnailSlider('prev');
        }
      }
    }
    return true;
  };
  moveThumbnailSlider = navDir => {
    let margin = 0;
    let itemToMoveCnt = this.visibleTNCnt;
    let remainingTnCnt = 0;
    const { photosCount } = this.props.data.album.albumInfo;
    let visibleWidth = 0;
    switch (navDir) {
      case 'prev': {
        // remainingTnCnt = photosCount - this.viewedThumbnails.to;
        if (this.viewedThumbnails.from < itemToMoveCnt) {
          itemToMoveCnt = this.viewedThumbnails.from;
        }
        visibleWidth = itemToMoveCnt * this.thumbnailSize;
        margin = visibleWidth - Math.abs(this.margin);
        this.viewedThumbnails.from = this.viewedThumbnails.from - itemToMoveCnt;
        this.viewedThumbnails.to = this.viewedThumbnails.to - itemToMoveCnt;
        break;
      }

      case 'next': {
        remainingTnCnt = photosCount - this.viewedThumbnails.to - 1;
        if (remainingTnCnt < itemToMoveCnt) {
          itemToMoveCnt = remainingTnCnt;
        }
        visibleWidth = itemToMoveCnt * this.thumbnailSize;

        margin = -(visibleWidth + Math.abs(this.margin));
        this.viewedThumbnails.from = this.viewedThumbnails.from + itemToMoveCnt;
        this.viewedThumbnails.to = this.viewedThumbnails.to + itemToMoveCnt;
        break;
      }
      default:
        margin = 0;
        this.viewedThumbnails.from = 0;
        this.viewedThumbnails.to = itemToMoveCnt - 1;
        break;
    }
    this.margin = margin;
    const updateState = { thumbNailNavStyle: { transform: `translate(${this.margin}px,0) ` } };
    if (this.viewedThumbnails.from === 0 && this.viewedThumbnails.to === photosCount - 1) {
      updateState.showNav = false;
    }
    this.setState(updateState);
  };

  navThumbnail = event => {
    const { photosCount } = this.props.data.album.albumInfo;
    const visibleTNCnt = Math.floor((this.thumbSlider.offsetWidth - 110) / this.thumbnailSize);

    if (typeof event !== 'undefined' && event.type === 'resize') {
      this.margin = 0;
      this.adjustImage({ target: this.viewAlbumImage });
    }
    this.viewedThumbnails = { from: 0, to: visibleTNCnt - 1 };

    this.visibleTNCnt = visibleTNCnt;

    if (this.viewedThumbnails.to >= photosCount - 1) {
      this.setState({ showNav: false, thumbNailNavStyle: { transform: 'translate(0,0)' } });
    } else {
      const updateState = { showNav: true };
      if (typeof event !== 'undefined' && event.type === 'resize') {
        updateState.thumbNailNavStyle = { transform: 'translate(0,0)' };
      }

      this.setState(updateState);
    }
  };

  render() {
    const { photosCount, photos } = this.props.data.album.albumInfo;
    const { fullName } = this.props.data.album.profileInfo;
    const { bannerPhoto } = this.props.data;
    let bannerDimension = {};
    if (bannerPhoto.img.src) {
      bannerDimension = calculateAspectRatio(bannerPhoto.img, 0.81 * window.innerHeight, 'height');
    }
    return (
      <s.ModalLayer>
        <s.AlbumModalClose onClick={this.closeAlbum} />

        <s.AlbumMain showBanner={!!bannerPhoto.img.src}>
          <s.AlbumSlidesContainer showBanner={!!bannerPhoto.img.src}>
            <s.AlbumContainer showBanner={!!bannerPhoto.img.src}>
              <s.AlbumTitle>Album of {fullName}</s.AlbumTitle>
              <s.AlbumNav
                id="navPrev"
                isVisible={photosCount > 1}
                isDisable={this.state.activeSlide <= 0}
                onClick={e => this.navSlide(e, 'prev')}
              />
              <s.AlbumPhotosWrapper isVisible>
                <s.AlbumPhotos>
                  <Spinner type="svg" isVisible={this.state.image.canShowLoader} />
                  <s.AlbumSlides
                    onLoad={this.adjustImage}
                    innerRef={input => {
                      this.viewAlbumImage = input;
                    }}
                    canShowImage={this.state.image.canShow}
                    width={this.state.image.width}
                    height={this.state.image.height}
                    style={this.state.style}
                    src={photos.largePhoto[this.state.activeSlide]}
                  />
                </s.AlbumPhotos>
              </s.AlbumPhotosWrapper>

              <s.AlbumNav
                id="navNext"
                isVisible={photosCount > 1}
                isDisable={this.state.activeSlide >= photosCount - 1}
                navNext
                onClick={e => this.navSlide(e, 'next')}
              />
            </s.AlbumContainer>
            <s.AlbumSlider
              innerRef={input => {
                this.thumbSlider = input;
              }}
            >
              <s.ThumbnailNav id="thumbNavPrev" isVisible={this.state.showNav} onClick={e => this.moveThumbnailSlider('prev')}>
                <s.NavSpan isDisabled={this.viewedThumbnails.from === 0} />
              </s.ThumbnailNav>
              <s.ThumbnailContainer>
                {photos.smallPhoto.map((imgPath, index) => (
                  <s.ThumbList key={imgPath} style={this.state.thumbNailNavStyle} onClick={e => this.navSlide(e, '', index)}>
                    <s.ThumbnailImg src={imgPath} isActive={index === this.state.activeSlide} />
                  </s.ThumbList>
                ))}
              </s.ThumbnailContainer>
              <s.ThumbnailNav id="thumbNavNext" isVisible={this.state.showNav} onClick={e => this.moveThumbnailSlider('next')}>
                <s.NavSpan navNext isDisabled={this.viewedThumbnails.to === photosCount - 1} />
              </s.ThumbnailNav>
            </s.AlbumSlider>
            <s.AlbumSlidesNumber id="slideNumber" isVisible={this.state.showAlbumNumber}>
              {this.state.activeSlide + 1}/{photosCount}
            </s.AlbumSlidesNumber>
          </s.AlbumSlidesContainer>

          {bannerPhoto.img.src !== '' && (
            <s.PromoBanner bannerDimension={bannerDimension}>
              {' '}
              <Banner bannerdetails={bannerPhoto} bannerDimension={bannerDimension} />
            </s.PromoBanner>
          )}
        </s.AlbumMain>
      </s.ModalLayer>
    );
  }
}
LightBox.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  data: PropTypes.shape({
    album: PropTypes.shape({
      source: PropTypes.string.isRequired,
      albumInfo: PropTypes.shape({
        photosCount: PropTypes.number.isRequired,
        photos: PropTypes.shape({
          largePhoto: PropTypes.arrayOf(PropTypes.string).isRequired,
          smallPhoto: PropTypes.arrayOf(PropTypes.string).isRequired,
        }).isRequired,
      }),
      profileInfo: PropTypes.shape({
        pid: PropTypes.string.isRequired,
        fullName: PropTypes.string.isRequired,
      }),
    }).isRequired,
    bannerPhoto: Banner.propTypes.isRequired,
  }).isRequired,
};
export default LightBox;
