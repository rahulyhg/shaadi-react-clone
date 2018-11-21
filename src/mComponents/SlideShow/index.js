import React from 'react';
import Slider from 'react-slick';
import Animated from 'animated/lib/targets/react-dom';
import PropTypes from '../../PropTypes';
import HorizontalPan from '../HorizontalPan';
import { getDownloadAppLink } from '../utils';
import { PageContent, GamificationContentWrap, Icon, TopCopy, ActionLink, PointerTitle, PointerWrap, Pointer } from './styles';

const appLinkInfo = getDownloadAppLink();

class SlideShow extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      transformX: new Animated.Value(0),
    };

    this.settings = {
      arrows: false,
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
  }

  onSwipeCancel = () => {
    Animated.timing(this.state.transformX, { toValue: 0, duration: 500 }).start();
  };

  renderSingle = () => {
    const src = this.props.photos[0];
    return (
      <div className="slick-initialized slick-slider">
        <div className="slick-list" id="single-slick-slide">
          <Animated.div
            className="slick-track"
            style={{ width: '100%', transform: [{ translateX: this.state.transformX }] }}
            {...new HorizontalPan({ animX: this.state.transformX }, 'single-slick-slide', {
              onSwipeCancel: this.onSwipeCancel,
              onSwipeLeft: this.onSwipeCancel,
              onSwipeRight: this.onSwipeCancel,
              onTap: this.onSwipeCancel,
            }).getLocalListeners()}
          >
            <div key={src} style={{ zIndex: 20, height: '100%' }}>
              <div
                className="album-image"
                style={{
                  height: '100%',
                  maxWidth: '600px',
                  margin: 'auto',
                  backgroundSize: 'cover',
                  backgroundImage: `url(${src})`,
                }}
              />
            </div>
          </Animated.div>
        </div>
      </div>
    );
  };

  renderError = () => (
    <Slider {...this.settings}>
      <div key={'zero-slides'} style={{ zIndex: 20 }}>
        <div
          className="album-image"
          style={{
            height: '470px',
            maxWidth: '600px',
            margin: 'auto',
            textAlign: 'center',
            backgroundSize: 'cover',
          }}
        >
          No photos.
        </div>
      </div>
    </Slider>
  );

  renderGamification = () => (
    <Slider {...this.settings}>
      <div style={{ zIndex: 20 }}>
        <PageContent />
        <GamificationContentWrap>
          <Icon />
          <TopCopy>Photo Album available on app</TopCopy>
          <ActionLink to={appLinkInfo.link}>Get the app</ActionLink>
          <PointerTitle>Additional benefits</PointerTitle>
          <PointerWrap>
            <Pointer>3 times faster browsing experience</Pointer>
            <Pointer>40% lesser data consumption</Pointer>
            <Pointer>Real time Chat with Matches</Pointer>
          </PointerWrap>
        </GamificationContentWrap>
      </div>
    </Slider>
  );

  render() {
    if (this.props.photos.length === 0) return this.renderError();
    if (this.props.isPhotoGamified === true) return this.renderGamification();
    if (this.props.photos.length === 1) return this.renderSingle();
    return (
      <Slider {...this.settings}>
        {this.props.photos.map(src => (
          <div key={src} style={{ zIndex: 20 }}>
            <div
              className="album-image"
              style={{
                height: '470px',
                maxWidth: '600px',
                margin: 'auto',
                backgroundSize: 'cover',
                backgroundImage: `url(${src})`,
              }}
            />
          </div>
        ))}
      </Slider>
    );
  }
}

SlideShow.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string).isRequired,
  isPhotoGamified: PropTypes.bool,
};

SlideShow.defaultProps = {
  isPhotoGamified: false,
};

export default SlideShow;
