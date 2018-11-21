import styled from 'styled-components';

const styles = {};

styles.ProfileNameSection = styled.div`
  position: relative;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(43, 59, 93, 0.29);
  margin-top: ${props => (props.isDR ? 0 : '20px')};
`;

styles.ProfilePhotoWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  padding: ${props => (props.isDR ? '31px 17px 0 15px' : '12px 17px 0 15px')};
  width: 275px;
`;

styles.Info = styled.div`
  display: ${props => (props.isDR ? 'inline-block' : 'flex')};
  width: ${props => (props.isDR ? 205 : 659)}px;
  color: #72727d;
  justify-content: space-between;
`;

styles.LeftSection = styled.div`
  flex: 1 0 auto;
  padding: 11px 1px 0 0;
  margin: 0 0 26px;
  color: #333;
  white-space: inherit;
  overflow: inherit;
  text-overflow: inherit;
`;

styles.Name = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
`;

styles.NameSpan = styled.span`
  font: normal 20px/24px arial;
  max-width: 248px;
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: #72727d;
  display: inline-block;
`;

styles.Uid = styled.span`
  display: inline-block;
  font: normal 11px arial;
  padding: 0 1px 0 5px;
  margin: 1px 0 0;
  color: #72727d;
`;

styles.PreferredTag = styled.div`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  position: relative;
  background: #ffad46;
  padding: 0 5px 0 2px;
  margin-left: 12px;
  color: #fff;
  font: normal 11px/16px arial;

  &:before {
    content: '';
    position: absolute;
    left: -8px;
    border-right: 8px solid #ffad46;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
  }
`;

styles.TwoWayTag = styled.span`
  position: relative;
  margin: -2px 0 0 12px;
  background: #ffad46;
  padding: 0 5px 0 2px;
  color: #fff;
  font: normal 11px/16px arial;
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};

  &:before {
    content: '';
    position: absolute;
    right: 100%;
    top: 0;
    display: inline-block;
    background: url(/assets/src-flag-notch-v2.png) no-repeat top left;
    width: 8px;
    height: 16px;
  }
`;

styles.SubHeading = styled.p`
  display: inline-block;
  font: normal 11px/22px arial;
  color: #72727d !important;
  font-style: italic;
  padding: 1px 0 0;
  margin: 0;
  border-bottom: 1px solid #e8e8e8;
`;

styles.RightSection = styled.div`
  color: #b1b3b9;
`;

styles.Content = styled.div`
  margin: ${props => (props.isDR ? '0 0 0 296px' : '0 0 0 299px')};
  min-height: ${props => (props.isDR ? '125px' : '140px')};
  padding: ${props => (props.isDR ? '37px 0 0 0' : '0 0 20px')};
  display: ${props => (props.isDR ? 'flex' : 'block')};
  ${props => (props.isDR ? 'flex-direction:row-reverse' : '')};
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
  margin: -2px 0 0 7px;
  display: inline-block;

  &:hover {
    background-position: -43px -190px;
  }
`;

export default styles;
