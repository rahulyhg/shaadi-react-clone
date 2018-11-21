import styled, { keyframes } from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

styles.premiumBannerWrapper = styled.div.attrs({ 'data-test-selector': 'match_list_cta', 'data-banner': props => `${props.bannerType}` })`
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  border: solid 0 transparent;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  border-radius: 3px;
  margin-bottom: 10px;
  width: ${props => (props.type === 'list' && props.source === 'inboxBanner' ? 732 : props.type === 'list' ? 734 : 700)}px;
  margin-left: ${props => (props.source === 'inboxBanner' ? 2 : 10)}px;
  margin-top: 10px;
  cursor: pointer;
  ${props => props.source === 'inboxBanner' && `animation: ${fadeIn} 1s;`};
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 10px 30px, rgba(0, 0, 0, 0.16) 0px 6px 10px;
  }
`;
styles.premiumBannerContainer = styled.div`
  display: flex;
  align-items: flex-start;
  -ms-flex-align: start;
  background: #fff;
  padding: ${props => (props.source === 'inboxBanner' ? '21px 21px 17px 21px' : '20px 16px')};
  border-radius: 3px;
`;

styles.premiumBannerGradient = styled.div`
  background: #60c48b;
  background: linear-gradient(
    to bottom,
    #60c48b 0%,
    #7cc86f 0%,
    #7bc870 2%,
    #65c683 22%,
    #1cbfbe 72%,
    #0dbdca 86%,
    #08bccf 100%,
    #7bdbe5 100%
  );
  height: 96px;
  border-radius: 3px 3px 0 0;
`;

styles.premiumBannerGradientBig = styled.div`
  background: #60c48b;
  background: linear-gradient(
    to bottom,
    #60c48b 0%,
    #7cc86f 0%,
    #7bc870 2%,
    #65c683 22%,
    #1cbfbe 72%,
    #0dbdca 86%,
    #08bccf 100%,
    #7bdbe5 100%
  );
  height: 200px;
  border-radius: 3px 3px 0 0;
`;

styles.premiumBannerInner = styled.div`
  font: 300 16px${props => props.source === 'inboxBanner' && '/25px'} 'Roboto', sans-serif;
  color: #72727d;
  align-self: center;
  flex: 1;
  text-align: center;
  ${props => props.source === 'inboxBanner' && 'width: 524px'};
`;

styles.premiumBannerHeading = styled.div`
  font: 300 18px 'Roboto', sans-serif;
  padding: 10px 0 25px;
  color: #51505d;
`;

styles.premiumBannerContent = styled.div`
  padding: 0 0 10px;
`;
styles.premiumBannerTel = styled.span`
  font: 400 22px 'Roboto', sans-serif;
  color: #51505d;
`;

styles.premiumBannerName = styled.div`
  font: 400 16px 'Roboto', sans-serif;
  padding: 8px 0 0;
  text-align: center;
  color: #72727d;
  max-width: 156px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

styles.ProfileName = styles.premiumBannerName.extend`
  padding: 0;
`;

styles.ProfileNameWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

styles.premiumBannerSave = styled.div`
  padding: 12px 0 0;
`;

styles.premiumPhotoWrapper = styled.div`
  display: block;
`;

styles.premiumHankyWrapper = styled.div`
  padding: ${props => (props.source === 'inboxBanner' ? '0' : '0 15px')};
  align-self: center;
`;

styles.premiumHanky = styled.div`
  width: 223px;
  height: 133px;
  background: url(/assets/premium-hanky-dory.png) no-repeat left top;
`;

styles.premiumBannerPhoto = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 3px solid #1fbcd3;
  overflow: hidden;
`;

styles.premiumBannerBtn = styled(Link)`
  color: #fff;
  background: #00bcd5;
  border: none;
  display: inline-block;
  border-radius: 3px;
  cursor: pointer;
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  line-height: 38px;
  height: 38px;
  width: 158px;
  text-align: center;
  vertical-align: middle;
  text-decoration: none;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  transition: all 300ms ease;
  ${props => props.source === 'inboxBanner' && 'margin: 18px 0 6px'};
  &:hover {
    background-color: #1ba3b6;
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
  }
`;

styles.ButtonCrown = styled.span`
  display: inline-block;
  background: url(/assets/white-crown-shadow.svg) no-repeat;
  background-size: 16px 16px;
  width: 16px;
  height: 16px;
  margin: -5px 6px 0 0;
  vertical-align: middle;
`;

styles.premiumBannerGoldenBtn = styled(Link).attrs({
  'data-test-selector': 'match_list_cta',
})`
  padding: 13px 0 0;
  box-shadow: 0 3px 6px rgba(77, 64, 64, 0.2);
  color: #fff;
  font: 500 14px/17px 'Roboto', sans-serif;
  background: linear-gradient(
    to right,
    rgba(199, 147, 36, 1) 0%,
    rgba(237, 203, 124, 1) 31%,
    rgba(237, 203, 124, 1) 70%,
    rgba(199, 147, 36, 1) 100%
  );
  height: 28px;
  width: 210px;
  border-radius: 50px;
  text-transform: uppercase;
  margin-top: 10px;
  display: inline-block;
  text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2);
  &:hover {
    text-decoration: none;
    background: linear-gradient(to right, rgba(199, 147, 36, 1) 0%, rgba(237, 203, 124, 1) 73%, rgba(237, 203, 124, 1) 100%);
  }

  &:active {
    box-shadow: none !important;
  }
`;

styles.premiumGreen = styled.span`
  color: #89c965;
  font-weight: 400;
`;

export default styles;
