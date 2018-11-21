import React from 'react';
import PropTypes from 'prop-types';

import s from './styles';
import Wrapper from './Wrapper';

class MiniCarousel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.maxComponentsInFrame = props.maxComponentsInFrame ? props.maxComponentsInFrame : 4;
    this.totalSlides = props.slidesCnt ? props.slidesCnt : props.children.length;
    this.totalFrames = this.calculateFrames(props);
    this.slideWidth = props.width / this.maxComponentsInFrame;
    this.steps = props.steps;
    this.state = {
      activeSlide: this.maxComponentsInFrame,
      activeFrame: 1,
      left: 0,
      shouldHidePrev: true,
      shouldHideNext: this.totalSlides <= this.maxComponentsInFrame,
    };
    this.navSlide = this.navSlide.bind(this);
    this.initCarousel = this.initCarousel.bind(this);
  }

  componentDidMount() {
    this.initCarousel(this.props);
  }

  componentWillReceiveProps(props) {
    if (props.goto !== this.props.goto) {
      this.initCarousel(props);
    }
  }

  initCarousel(props) {
    const updateState = {};
    if (this.state.activeSlide < this.totalSlides) {
      if (props.goto > this.state.activeSlide) {
        const gotoCal = props.goto - this.state.activeSlide;
        const navWidth = this.slideWidth * gotoCal;
        const activeSlide = props.goto;
        updateState.activeSlide = activeSlide;
        updateState.left = this.state.left - navWidth;
        updateState.shouldHideNext = activeSlide >= this.totalSlides;
        updateState.shouldHidePrev = activeSlide <= this.maxComponentsInFrame;
      } else {
        const diff = this.state.activeSlide - this.maxComponentsInFrame;
        if (props.goto <= diff) {
          const gotoCal = diff - props.goto + this.maxComponentsInFrame;
          const navWidth = this.slideWidth * gotoCal;
          const activeSlide = this.state.activeSlide - gotoCal;
          updateState.activeSlide = activeSlide < this.maxComponentsInFrame ? this.maxComponentsInFrame : activeSlide;
          const left = this.state.left + navWidth;
          updateState.left = left > 0 ? 0 : left;
          updateState.shouldHideNext = updateState.activeSlide >= this.totalSlides;
          updateState.shouldHidePrev = updateState.activeSlide <= this.maxComponentsInFrame;
        }
      }
    }
    if (Object.keys(updateState).length) {
      this.setState(updateState);
    }
  }

  calculateFrames(props) {
    return this.totalSlides % this.maxComponentsInFrame === 0
      ? Math.floor(this.totalSlides / this.maxComponentsInFrame)
      : Math.ceil(this.totalSlides / this.maxComponentsInFrame);
  }

  navSlide(direction) {
    const updateState = {};
    const navWidth = this.slideWidth * this.steps;
    switch (direction) {
      case 'next': {
        if (this.state.activeSlide < this.totalSlides) {
          const activeSlide = this.state.activeSlide + this.steps;
          updateState.activeSlide = activeSlide;
          updateState.left = this.state.left - navWidth;
          updateState.shouldHideNext = activeSlide >= this.totalSlides;
          updateState.shouldHidePrev = activeSlide <= 0;
        }
        break;
      }
      case 'prev': {
        if (this.state.activeSlide > this.maxComponentsInFrame) {
          const activeSlide = this.state.activeSlide - this.steps;
          updateState.activeSlide = activeSlide;
          updateState.left = this.state.left + navWidth;
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

  render() {
    return (
      <s.Carousel>
        <s.DrQueuePrevWrap profilePageBucket={this.props.profilePageBucket}>
          <s.DrQueuePrev
            hide={this.state.shouldHidePrev}
            onClick={() => this.navSlide('prev')}
            direction="prev"
            profilePageBucket={this.props.profilePageBucket}
          />
        </s.DrQueuePrevWrap>
        <s.OuterContainer
          premiumCarousel={this.props.premiumCarousel}
          height={`${this.props.height}px`}
          width={`${this.props.width}px`}
          profilePageBucket={this.props.profilePageBucket}
        >
          <Wrapper left={`${this.state.left}px`}>{this.props.children}</Wrapper>
        </s.OuterContainer>

        <s.DrQueueNextWrap profilePageBucket={this.props.profilePageBucket}>
          <s.DrQueueNext
            hide={this.state.shouldHideNext}
            onClick={() => this.navSlide('next')}
            direction="next"
            profilePageBucket={this.props.profilePageBucket}
          />
        </s.DrQueueNextWrap>
      </s.Carousel>
    );
  }
}
MiniCarousel.defaultProps = {
  premiumCarousel: false,
  profilePageBucket: 'A',
};
MiniCarousel.propTypes = {
  children: PropTypes.node.isRequired,
  // onAction: PropTypes.func.isRequired,
  maxComponentsInFrame: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  slidesCnt: PropTypes.number.isRequired,
  steps: PropTypes.number.isRequired,
  premiumCarousel: PropTypes.bool,
  goto: PropTypes.number.isRequired,
  profilePageBucket: PropTypes.string,
};
export default MiniCarousel;
