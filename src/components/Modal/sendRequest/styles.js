import styled from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

styles.RequestFlash = styled.div`
  padding-left: 18px;
  font-size: 12px;
  border-right: 1px solid #eee;
  padding-right: 5px;
  margin-right: 5px;
  background: ${props =>
    ['error', 'fail'].includes(props.icon)
      ? 'url(/assets/fail.png) no-repeat 0px 0px'
      : ['loading'].includes(props.icon)
        ? 'url(/assets/spinner.gif) no-repeat 0px 0px'
        : ['success'].includes(props.icon) ? 'url(/assets/success.png) no-repeat 0px 0px' : 'transparent'};
`;
styles.DraftBtn = styled.button`
  padding: 0;
  background: transparent;
  border: 0;
  outline: 0;
  color: ${props => (props.isActive ? '#00bcd5' : '#b1b3b9')};
  font-size: 12px;
  text-decoration: none;
  padding-right: 5px;
  margin-right: 5px;
  ${props => (props.isPremium ? 'font-weight: 300' : '')};
  ${props => (props.isPremium ? 'letter-spacing: 0.1px' : '')};
`;
styles.DraftBtnDivider = styled.span`
  border-left: 1px solid #e5e6e9;
  font-size: ${props => (props.isPremium ? '13px' : '10px')};
  position: ${props => (props.isPremium ? 'relative' : 'absolute')};
  left: ${props => (props.isPremium ? '-5px' : '143px')};
  width: 1px;
  height: 10px;
  top: ${props => (props.isPremium ? '0' : '6px')};
  ${props => (props.isPremium ? 'margin: 0 5px' : '')};
`;
styles.SendPhotoPassword = styled.div`
  margin-top: 10px;
  text-align: center;
`;
styles.Checkbox = styled.input`
  margin-right: 5px;
  padding: 0;
  vertical-align: middle;
`;
styles.PreviewWrapper = styled.div``;
styles.PreviewTitle = styled.div`
  padding: 10px 0 5px 7px;
  font: normal 12px arial;
  color: #72727d;
  text-align: left;
`;
styles.PreviewLink = styled.button`
  background: transparent;
  padding: 0;
  border: 0;
  outline: 0;
  color: #00bcd5;
  padding: 0 15px 0 0;
  background: url(/assets/pinterest-sprite-ver3.png) no-repeat 71px -131px;
  &:hover {
    text-decoration: underline;
  }
`;
styles.PreviewCard = styled.div`
  display: flex;
  position: relative;
  transition: 0.2s all;
  border: 1px solid #eee;
  border-top: 6px solid #f1f8e7;
  border-bottom: 0;
  margin: 5px 0 0;
  min-height: 160px;
  padding: 12px 10px 12px 12px;
  background: #fff;
  &::after {
    content: '';
    background: url(/assets/pinterest-sprite-ver3.png) no-repeat left -90px;
    width: 40px;
    height: 40px;
    position: absolute;
    top: -6px;
    right: 0;
  }
  &:hover {
    box-shadow: 0 1px 2px rgba(43, 59, 93, 0.29), 0 0 10px rgba(43, 59, 93, 0.29);
  }
`;
styles.PreviewPhoto = styled.img`
  border-radius: 50%;
  box-shadow: none;
  background: #fff;
  width: 60px;
  height: 60px;
  border: 1px solid #d6d6d6;
  display: inline-block;
  position: relative;
  margin: 0 14px 0 0;
`;
styles.PreviewDetails = styled.div`
  flex: 1;
`;
styles.PreviewName = styled.div`
  font: bold 11px/20px arial;
  color: #00bcd5;
`;
styles.PreviewList = styled.ul`
  color: #72727d;
  font: bold 10px/14px arial;
  list-style: none outside none;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;
styles.PreviewListItem = styled.li`
  display: inline-block;
  width: 245px;
`;
styles.PreviewLabel = styled.div`
  display: inline-block;
  vertical-align: middle;
  color: #b1b3b9;
  width: 108px;
`;
styles.PreviewValue = styled.div`
  display: inline-block;
  vertical-align: middle;
  color: #72727d;
  max-width: 248px;
  overflow: hidden;
  padding: 0 0 0 4px;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 94px;
  margin: 0 35px 0 0;
`;
styles.PreviewMessage = styled.p`
  font: bold 10px/14px arial;
  padding: 5px 0 10px;
  color: #72727d;
  margin: 8px 0 0;
  border-top: 1px solid #d7dcc9;
`;
styles.PreviewBtns = styled.div``;
styles.PreviewBtn = styled.div`
  display: inline-block;
  font: bold 12px arial;
  cursor: default;
  padding: ${props => (props.isPrimary ? '4px 10px' : 0)};
  margin-right: 5px;
  color: ${props => (props.isPrimary ? '#fff' : '#95959d')};
  background: ${props => (props.isPrimary ? '#00bcd5' : '#f1f1f2')};
  border: 1px solid ${props => (props.isPrimary ? '#00bcd5' : '#f1f1f2')};
  border-radius: 3px;
  &:hover {
    background: ${props => (props.isPrimary ? '#0194a8' : '#dfe0e3')};
    border: 1px solid ${props => (props.isPrimary ? '#0194a8' : '#dfe0e3')};
  }
`;
styles.PreviewText = styled.span`
  display: inline-block;
  vertical-align: middle;
  padding: 4px 10px;
`;
styles.PreviewIcon = styled.span`
  display: inline-block;
  vertical-align: middle;
  background: url(/assets/grey-dwn-arrow.png) no-repeat 6px 10px;
  width: 18px;
  height: 23px;
  border-left: 1px solid #dfe0e3;
`;
styles.RespondPremiumTitle = styled.div`
  font: 500 14px 'Roboto', sans-serif;
  padding: 0 0 6px 10px;
  color: #51505d;
  display: flex;
`;
styles.RespondPremiumText = styled.span`
  display: flex;
  flex: 1 0 auto;
`;
styles.RespondPremiumDate = styled.span`
  font: 400 10px 'Roboto', sans-serif;
  margin: 4px 10px 0 0;
  color: #95959d;
  text-align: right;
`;
styles.RespondPremiumMsgFrom = styled.div`
  background: #f8f8f8;
  padding: 9px 11px;
  margin: 0 0 18px;
  position: relative;
  border-radius: 3px;
`;
styles.RespondingPremiumDraftText = styled.div`
  font: 400 14px/18px 'Roboto', sans-serif;
  color: #95959d;
  display: ${props => (props.isVisible ? 'block' : 'none')};
`;
styles.RespondPremiumLink = styled.span`
  color: #00bcd5;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
styles.RespondingPremiumDraftText2 = styled.div`
  font: 400 14px/18px 'Roboto', sans-serif;
  color: #95959d;
  display: ${props => (props.isVisible ? 'block' : 'none')};
`;
styles.SendRequest = styled.div`
  color: #72727d;
  font-size: 14px;
  position: relative;
  width: 664px;
  text-align: left;
  box-shadow: 0 0 39px rgba(70, 70, 70, 0.25);
  border: none;
  border-radius: 3px;
  background: #fff;
  h5 {
    font: 500 18px 'Roboto', sans-serif;
  }
`;
styles.UnifiedAlert = styled.div`
  padding: 8px 5px 7px;
  background: #fff8dc;
  border: 1px solid #f5e4a3;
  border-radius: 3px;
`;
styles.UnifiedAlertMessage = styled.div`
  font: 300 14px 'Roboto', sans-serif;
  color: #51505d;
  padding: 0 0 0 3px;
`;
styles.Spacer5 = styled.div`
  padding: 5px;
`;
styles.LabelWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
`;
styles.Label = styled.strong`
  font: 500 14px 'Roboto', sans-serif;
  padding: 0 0 6px 10px;
  color: #51505d;
`;
styles.UseDraftBtn = styled.button`
  position: relative;
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  color: #00bcd5;
  padding: 0 24px 0 0;
  font-size: 12px;
  border: 0;
  outline: 0;
  height: 14px;
  background: url(/assets/pinterest-sprite-ver4.png) no-repeat 56px -302px;
  &:hover {
    text-decoration: underline;
  }
`;
styles.DraftReadLink = styled(Link)`
  color: #00bcd5;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
styles.ChooseDraftBtn = styled.button`
  background: #f1f1f2;
  border: 1px solid #f1f1f2;
  vertical-align: middle;
  color: #95959d;
  text-decoration: none;
  margin-right: 2px;
  border-radius: 3px;
  cursor: pointer;
  padding: 4px 8px;
  &:hover {
    background: #dfe0e3;
    border: 1px solid #dfe0e3;
    color: #95959d;
  }
`;
styles.CharactersRemaining = styled.span``;
styles.CharactersCount = styled.span`
  width: 44px;
  display: inline-block;
  font: 400 14px 'Roboto', sans-serif;
  color: #95959d;
  border-radius: 3px;
  margin: 0 0 0 2px;
  text-align: center;
  border: 0;
  padding: 2px 0;
`;
styles.DividerBorder = styled.div`
  border-top: 1px solid #dfe0e3;
  margin: 10px 0 18px;
`;
styles.ConnectBtn = styled.button`
  display: block;
  margin: 9px auto 0;
  font: 400 16px 'Roboto', sans-serif;
  padding: 7px 18px;
  transition: all 300ms ease;
  border: none;
  margin-top: 9px;
  border-radius: 3px;
  color: #fff;
  background: #00bcd5;
  outline: 0;
  &:hover {
    background: #0194a8;
  }
`;
styles.SendRequestBtn = styled.span`
  display: inline-block;
  width: 6px;
  height: 13px;
  margin: 6px 0 0 4px;
  font-size: 0;
  vertical-align: text-top;
  background: url(/assets/shaadi-sprite-2-v5.gif) no-repeat left -46px;
`;

export default styles;
