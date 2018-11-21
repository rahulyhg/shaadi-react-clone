/* global window */
import PropTypes from 'prop-types';
import React from 'react';

import s from './styles';

class SliderNav extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onSlideNavClick = this.onSlideNavClick.bind(this);
  }

  onSlideNavClick(e, direction) {
    e.stopPropagation();
    this.props.onSlideNavClick(direction);
  }

  render() {
    if (this.props.type === 'grid') {
      return (
        <s.SlideGridNav isVisible>
          <s.SlideGridNavIcon
            icon="prev"
            premiumCarousel={this.props.premiumCarousel}
            onClick={e => this.onSlideNavClick(e, 'prev')}
            isOverlay={this.props.isOverlay}
          />
          <s.SlideGridNavIcon
            icon="next"
            premiumCarousel={this.props.premiumCarousel}
            onClick={e => this.onSlideNavClick(e, 'next')}
            isOverlay={this.props.isOverlay}
          />
        </s.SlideGridNav>
      );
    }

    return (
      <s.SlideNav isVisible type={this.props.type}>
        <s.SlideNavIcon icon="prev" onClick={e => this.onSlideNavClick(e, 'prev')} />
        <s.SlideCount>
          {this.props.activePhotoIndex + 1} of {this.props.albumLength}
        </s.SlideCount>
        <s.SlideNavIcon icon="next" onClick={e => this.onSlideNavClick(e, 'next')} />
      </s.SlideNav>
    );
  }
}
SliderNav.defaultProps = {
  premiumCarousel: false,
};

SliderNav.propTypes = {
  type: PropTypes.oneOf(['grid', 'list', 'profile']).isRequired,
  activePhotoIndex: PropTypes.number.isRequired,
  albumLength: PropTypes.number.isRequired,
  onSlideNavClick: PropTypes.func.isRequired,
  premiumCarousel: PropTypes.bool,
  isOverlay: PropTypes.bool.isRequired,
};

export default SliderNav;
