import React from 'react';
import PropTypes from 'prop-types';

import s from './styles';
import Wrapper from './Wrapper';

class Carousel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.maxComponentsInFrame = props.maxComponentsInFrame ? props.maxComponentsInFrame : 3;
    this.totalSlides = props.slidesCnt ? props.slidesCnt : props.children.length;
    this.totalFrames = this.calculateFrames(props);
    this.slideWidth = props.stepsSize || props.width / this.maxComponentsInFrame;
    this.steps = props.steps;
    this.state = {
      activeSlide: this.maxComponentsInFrame,
      activeFrame: 1,
      left: 0,
      shouldHidePrev: true,
      shouldHideNext: this.totalSlides <= this.maxComponentsInFrame,
    };
    this.maxLeftMargin = -(this.totalSlides - this.maxComponentsInFrame) * this.slideWidth;
    this.navSlide = this.navSlide.bind(this);
  }

  calculateFrames(props) {
    return this.totalSlides % this.maxComponentsInFrame === 0
      ? Math.floor(this.totalSlides / this.maxComponentsInFrame)
      : Math.ceil(this.totalSlides / this.maxComponentsInFrame);
  }

  navSlide(direction) {
    const updateState = {};
    const navWidth = this.slideWidth * this.steps;
    this.props.onAction(null, 'closeAllTooltips');
    switch (direction) {
      case 'next': {
        if (this.state.activeSlide < this.totalSlides) {
          const activeSlide = parseFloat((this.state.activeSlide + this.steps).toFixed(2));
          updateState.activeSlide = activeSlide;
          const left = this.state.left - navWidth;
          updateState.left = left < this.maxLeftMargin ? this.maxLeftMargin : left;
          updateState.shouldHideNext = activeSlide >= this.totalSlides;
          updateState.shouldHidePrev = activeSlide <= 0;
          if (!this.props.isSuccessStory) {
            window.scroll(window.scrollX + 1, window.scrollY - 1);
            window.scroll(window.scrollX - 1, window.scrollY + 1);
          }
        }
        break;
      }
      case 'prev': {
        if (this.state.activeSlide > this.maxComponentsInFrame) {
          const activeSlide = parseFloat((this.state.activeSlide - this.steps).toFixed(2));
          updateState.activeSlide = activeSlide;
          const left = this.state.left + navWidth;
          updateState.left = left > 0 ? 0 : left;
          updateState.shouldHideNext = activeSlide >= this.totalSlides;
          updateState.shouldHidePrev = activeSlide <= this.maxComponentsInFrame;
        }
        break;
      }
      // no default
    }
    if (Object.keys(updateState).length) {
      this.setState(updateState);
    }
  }
  renderCarousalBtn = (source, direction) => {
    const shouldHide = direction === 'prev' ? this.state.shouldHidePrev : this.state.shouldHideNext;
    const props = {
      hide: shouldHide,
      direction,
      isSuccessStory: this.props.isSuccessStory,
      isSimilar: source === 'similarProfile',
      isHovered: this.props.isHovered,
    };
    props[`${direction === 'prev' ? 'data-prevdisplay' : 'data-nextdisplay'}`] = !shouldHide;
    switch (source) {
      case 'similarProfile': {
        return (
          <s.RoundNavInnerWrap {...props}>
            <s.RoundNavInner direction={direction} onClick={() => this.navSlide(direction)} />
          </s.RoundNavInnerWrap>
        );
      }
      case 'premiumCarousel': {
        return (
          <s.RoundNavInnerWrap {...props}>
            <s.RoundNavInner direction={direction} hide={shouldHide} onClick={() => this.navSlide(direction)} />
          </s.RoundNavInnerWrap>
        );
      }
      case 'inbox': {
        return <s.RoundNav {...props} onClick={() => this.navSlide(direction)} />;
      }
      default: {
        return <s.ButtonText {...props} onClick={() => this.navSlide(direction)} />;
      }
    }
  };

  render() {
    return (
      <s.Carousel>
        <s.CarouseButton height={`${this.props.height}px`} source={this.props.source} hide={this.state.shouldHidePrev}>
          {this.renderCarousalBtn(this.props.source, 'prev')}
        </s.CarouseButton>
        {<s.shadow navDirection="prev" isVisible={this.props.source === 'inbox'} />}
        <s.OuterContainer
          listBucket={this.props.listBucket}
          premiumCarousel={this.props.premiumCarousel}
          height={`${this.props.height}px`}
          width={`${this.props.width}px`}
          isSuccessStory={this.props.isSuccessStory}
          source={this.props.source}
        >
          <Wrapper source={this.props.source} left={`${this.state.left}px`}>
            {this.props.children}
          </Wrapper>
        </s.OuterContainer>
        {<s.shadow navDirection="next" isVisible={this.props.source === 'inbox'} />}
        <s.CarouseButton height={`${this.props.height}px`} source={this.props.source} hide={this.state.shouldHideNext}>
          {this.renderCarousalBtn(this.props.source, 'next')}
        </s.CarouseButton>
      </s.Carousel>
    );
  }
}
Carousel.defaultProps = {
  premiumCarousel: false,
  listBucket: 'A',
  isSuccessStory: false,
  source: 'default',
  stepsSize: 0,
  isHovered: false,
};
Carousel.propTypes = {
  children: PropTypes.node.isRequired,
  onAction: PropTypes.func.isRequired,
  maxComponentsInFrame: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  slidesCnt: PropTypes.number.isRequired,
  steps: PropTypes.number.isRequired,
  premiumCarousel: PropTypes.bool,
  listBucket: PropTypes.string,
  isSuccessStory: PropTypes.bool,
  source: PropTypes.string,
  stepsSize: PropTypes.number,
  isHovered: PropTypes.bool,
};
export default Carousel;
