import styled from 'styled-components';
import ListingCard from '../../theme/BoxShadow';

const styles = {};

styles.ProfileNameSectionWrapper = styled.div`
  margin: ${props => (props.isDR ? '47px 0 0' : props.isPaginationVisible ? '-4px 0 0' : '67px 0 0')};
`;

styles.ProfileNameSection = styled.div`
  position: relative;
  background: #fff;
  border-radius: 3px;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 2;
  box-shadow: ${ListingCard['box-shadow']};
  &:hover {
    box-shadow: ${ListingCard.hover_shadow};
  }
`;

styles.ProfilePhotoWrapper = styled.div`
  position: absolute;
  left: 0;
  top: ${props => (props.isDR ? '-50px' : '-43px')};
  padding: 0 0 0 16px;
  width: 300px;
`;

styles.Info = styled.div`
  display: flex;
  width: 489px;
  color: #72727d;
  justify-content: space-between;
  margin: 0 0 0 20px;
`;

styles.LeftSection = styled.div`
  flex: 1 0 auto;
  padding: 16px 1px 0 0;
  margin: 0;
  white-space: inherit;
  overflow: inherit;
  text-overflow: inherit;
`;

styles.NameInfoWrap = styled.div`
  width: 450px;
`;

styles.Name = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
`;

styles.NameSpan = styled.span`
  font: 400 18px/21px 'Roboto', sans-serif;
  max-width: 248px;
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: #51505d;
  display: inline-block;
`;

styles.Uid = styled.span`
  display: inline-block;
  font: normal 11px arial;
  padding: 0 1px 0 5px;
  margin: 0;
  color: #72727d;
  vertical-align: top;
`;

styles.PreferredTag = styled.div`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  position: relative;
  background: #89c965;
  border-radius: 20px;
  padding: 2px 8px 0 8px;
  margin-left: 12px;
  color: #fff;
  font: 400 11px/14px 'Roboto', sans-serif;
  vertical-align: top;
  margin: 1px 0 0 10px;
`;

styles.SubHeading = styled.div`
  display: inline-block;
  padding: 5px 0 16px;
  margin: 0;
  border-bottom: 1px solid #dfe0e3;
  width: 100%;
`;

styles.RightSection = styled.div`
  color: #b1b3b9;
  z-index: 1000;
  position: relative;
`;

styles.Content = styled.div`
  margin: 0 0 0 316px;
  height: 270px;
  display: flex;
`;

styles.ClickToChat = styled.button`
  padding: 0;
  outline: 0;
  background: transparent;
  border: 0;
  line-height: initial;
  display: inline-block;
  vertical-align: middle;

  &::after {
    content: '';
    background: url(/assets/chat.gif) no-repeat left top;
    width: 19px;
    height: 15px;
    display: inline-block;
    vertical-align: middle;
    margin: 0 0 0 5px;
  }
`;

styles.profileNameLock = styled.span`
  background: url(/assets/profile-revamp-sprite-ver5.png) no-repeat -47px -124px;
  width: 17px;
  height: 16px;
  margin: 0 0 0 7px;
  display: inline-block;
  vertical-align: top;

  &:hover {
    background-position: -43px -190px;
  }
`;

styles.ChatLink = styled.div`
  display: inline-block;
  color: #818181;
  width: 48%;
  background: transparent;
  padding: 0;
  border: 0;
  outline: 0;
  cursor: ${props => (props.isLinkActive ? 'pointer' : 'default')};
`;

styles.LastOnlineAt = styled.span`
  margin: 0 0 0 6px;
  display: inline-block;
  cursor: pointer;
  color: #95959d;
  font: 300 14px'Roboto', sans-serif;
`;

styles.ProfileConnectStatus = styled.div.attrs({ 'data-test-selector': props => `${props.type}Item_CTA ${props.isSkuFeature}` })`
  text-align: center;
  position: relative;
  font: 300 13px 'Roboto', sans-serif;
  width: 145px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

styles.ProfileDetails = styled.div`
  width: 465px;
  margin: 16px 0 0;
  > span:nth-child(1) {
    margin: 0 20px 0 0;
  }
  > span:nth-child(3) {
    margin: 0 20px 0 0;
  }
  > span:nth-child(5) {
    margin: 0 20px 0 0;
  }
  > span:nth-child(7) {
    margin: 0 20px 0 0;
  }
  > span:nth-child(9) {
    margin: 0 20px 0 0;
  }
`;

styles.DetailDesc = styled.span`
  display: inline-block;
  font: 300 14px/24px 'Roboto', sans-serif;
  color: #51505d;
  width: 212px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

styles.ProfileEoiContactTime = styled.div`
  color: #95959d;
  font: 300 14px 'Roboto', sans-serif;
  width: 467px;
  position: absolute;
  bottom: 20px;
`;

styles.YouAndMeWrapper = styled.span`
  display: inline-block;
  color: #95959d;
  font: 400 14px 'Roboto', sans-serif;
  width: 52%;
`;

styles.ProfileNameSectionBorderWrapper = styled.div`
  margin: 20px 0 20px 20px;
  border-left: 1px solid #dfe0e3;
`;

export default styles;
