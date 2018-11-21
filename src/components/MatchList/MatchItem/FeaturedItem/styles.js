import styled, { keyframes } from 'styled-components';
import Link from '../../../Common/Link';

const styles = {};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

styles.MatchItemWrap = styled.div`
  background: #fff;
  border: solid 1px ${props => (props.membershipTags === 'vip' ? '#aa1e3c' : 'transparent')};
  border-radius: 3px;
  margin: 0 10px 0 2px;
  position: relative;
  width: 303px;
  height: 218px;
  padding: 19px 15px 10px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px;
  z-index: ${props => (props.membershipTags === 'vip' ? 12 : 9)};
  position: relative;
`;

styles.PremiumBadgeWrap = styled.span`
  display: inline-block;
  position: relative;
  min-width: 30px;
  height: 10px;
  vertical-align: middle;
  margin-left: 10px;
`;

styles.ProfileDetailsWrap = styled.div`
  margin-top: 5px;
  width: 163px;
  ${props => props.justNow && `animation: ${fadeIn} 1s;`};
`;

styles.ProfileInfoActionWarp = styled.div`
  display: flex;
`;

styles.ProNameWrap = styled.div``;

styles.ProNameInnerWrap = styled.div`
  display: flex;
  height: 26px;
  width: 170px;
`;

styles.ProNameLink = styled(Link)`
  font: 400 18px/22px 'Roboto', sans-serif;
  color: #51505d;
  text-decoration: none;
  vertical-align: middle;
  max-width: ${props => (props.membershipTags === 'free' ? '170px' : '74px')};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  &:hover {
    text-decoration: underline;
  }
`;

styles.ProfileTopInnerWrap = styled.div`
  display: none;
  font: 300 14px 'Roboto', sans-serif;
  color: #95959d;
  padding: 0 0 10px;
`;

styles.AvailabilityText = styled.p`
  font-size: 11px;
  color: #95959d;
  display: block;
  margin: 5px 0 0;
`;

styles.BoldText = styled.span`
  font-weight: 500;
`;

styles.BoldTextLink = styled.button`
  color: #00bcd5;
  border: 0;
  outline: 0;
  background: transparent;
`;

styles.ProfileDetails = styled.div``;

styles.CtaWrap = styled.div`
  display: flex;
  margin: 20px 0 0;
  justify-content: center;
  border-top: 1px solid #dfe0e3;
  text-align: center;
  height: 77px;
  align-items: center;
  ${props => props.justNow && `animation: ${fadeIn} 1s;`};
`;

styles.DetailDesc = styled.span`
  display: block;
  font: 300 14px/22px 'Roboto', sans-serif;
  overflow: hidden;
  white-space: nowrap;
  max-width: 210px;
  text-overflow: ellipsis;
  color: #51505d;
`;
styles.ProfileImgWrap = styled.div`
  margin: 0 15px 0 0;
  ${props => props.justNow && `animation: ${fadeIn} 1s;`};
`;

styles.FeaturedAcceptCard = styled.div`
  background: #fff;
  font-family: 'Roboto', sans-serif;
  color: #95959d;
`;
styles.CardHeader = styled.div`
  font-size: 13px;
  padding: 10px 0;
  border-bottom: 1px solid #e9e9eb;
  text-align: center;
`;
styles.ContactDetails = styled.div`
  color: #51505d;
  padding: 10px 0 0;
  line-height: 21px;
  animation: ${fadeIn} 1s;
  ${props => props.showPointer && `cursor: pointer;`};
`;
styles.ContactMsg = styled.div`
  font-size: 14px;
  font-weight: 300;
`;
styles.MaskedNumber = styled.div`
  font-size: 16px;
  font-weight: 500;
`;
styles.OfferDetails = styled.div`
  display: flex;
  font: 300 14px 'Roboto', sans-serif;
  color: #72727d;
  align-items: center;
  animation: ${fadeIn} 1s;
  > div:nth-child(1) {
    margin: 0 16px 0 0;
    padding: 0;
  }
  ${props => props.showPointer && `cursor: pointer;`};
`;
styles.BannerBtn = styled.span`
  color: #fff;
  background: #00bcd5;
  display: inline-block;
  border-radius: 3px;
  cursor: pointer;
  font: 500 14px/30px 'Roboto', sans-serif;
  height: 30px;
  width: 106px;
  text-align: center;
  text-decoration: none;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  transition: all 300ms ease;
  &:hover {
    background-color: #1ba3b6;
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
  }
`;

export default styles;
