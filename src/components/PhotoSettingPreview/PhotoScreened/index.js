import React, { PureComponent } from 'react';
import PropTypes from '../../../PropTypes';
import s from '../styles';

class PhotoScreened extends PureComponent {
  static getFilter() {
    return (
      <filter id="svgBlur">
        <feGaussianBlur stdDeviation="3.5" />
      </filter>
    );
  }

  getVisiblePhoto(doNotShowLockIcon = false) {
    const showLockIcon = this.props.showLockIcon && !doNotShowLockIcon;
    let caption = '';
    let heading = '';
    if (showLockIcon) {
      caption = this.props.isVisibleToPremium ? 'Visible to\n Premium Members' : 'Visible on Accept';
      if (this.props.isVisibleToPremium) {
        heading = 'Free Member view';
      }
    }
    if (this.props.isVisibleToPremium && !heading) {
      heading = 'Premium Member view';
    }

    return (
      <s.PrivacyPhotoVisible showTopMargin={this.props.isVisibleToPremium}>
        {heading}
        <s.PrivacyPhoto>
          <s.blurPhotoWrap>
            <svg width="150" height="200">
              {showLockIcon && this.constructor.getFilter()}
              <image xlinkHref={this.props.profilePhotoUrl} width="150" height="200" filter={showLockIcon ? 'url(#svgBlur)' : null} />
            </svg>
          </s.blurPhotoWrap>
          <s.PhotoScreenedLock isVisible={showLockIcon} />
          <s.PrivacyVisibleText>{caption}</s.PrivacyVisibleText>
        </s.PrivacyPhoto>
      </s.PrivacyPhotoVisible>
    );
  }

  render() {
    const showVisiblePhoto = !this.props.showLockIcon || this.props.isVisibleToPremium;
    return (
      <div>
        <s.PhotoScreened>
          <s.PrivacyPhotoTitle>This is how your Photos will look to other Members</s.PrivacyPhotoTitle>
          <s.PhotoScreeningArrow isVisible={!this.props.isVisibleToPremium} />
          <s.PrivacyPhotoWrap>
            {showVisiblePhoto && this.getVisiblePhoto(true)}
            {this.props.showLockIcon && this.getVisiblePhoto()}
          </s.PrivacyPhotoWrap>
        </s.PhotoScreened>
      </div>
    );
  }
}

PhotoScreened.propTypes = {
  isVisibleToPremium: PropTypes.bool.isRequired,
  showLockIcon: PropTypes.bool.isRequired,
  profilePhotoUrl: PropTypes.string.isRequired,
};

export default PhotoScreened;
