import React from 'react';
import PropTypes from '../../../../PropTypes';
import s from './styles';

class PremiumCarousel extends React.PureComponent {
  render() {
    return (
      <s.premiumCarouselStyle>
        <s.InvitationBtnContainer isVisible>
          <s.InvitationGridWrap>
            <s.CarouselConnectBtn isVisible title="Tell this Member that you wish to Connect!" onClick={this.props.connectPremiumCarousel}>
              Connect
            </s.CarouselConnectBtn>
          </s.InvitationGridWrap>
        </s.InvitationBtnContainer>
      </s.premiumCarouselStyle>
    );
  }
}

PremiumCarousel.propTypes = {
  connectPremiumCarousel: PropTypes.func.isRequired,
};

export default PremiumCarousel;
