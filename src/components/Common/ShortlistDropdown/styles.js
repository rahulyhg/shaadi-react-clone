import styled, { keyframes } from 'styled-components';
import Link from '../Link';
import Button from '../Button';

const styles = {};

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

styles.ShortlistDropdown = styled.div`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  position: absolute;
  top: 37px;
  left: ${props => (props.type === 'grid' ? '-144px' : 0)};
  font: normal 12px arial;
  color: #72727d;
  background: #fff;
  width: 211px;
  text-align: left;
  max-width: 256px;
  box-shadow: 0 6px 12px rgba(43, 59, 93, 0.35);
  z-index: 5;
`;

styles.Body = styled.div``;

styles.ViewListLink = styled(Link)`
  visibility: hidden;
  padding: 0;
  text-decoration: none;
  font: normal 11px arial;
  color: #00bcd5;
  margin-right: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

styles.Title = styled.strong`
  color: #72727d;
  font-weight: bold;
  height: 30px;
  line-height: 30px;
  padding: 0 0 0 9px;
`;

styles.Shortlists = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  padding-bottom: 8px;
  width: 100%;
`;

styles.Shortlist = styled.li`
  display: flex;
  align-items: center;
  height: 22px;
  line-height: 22px;
  padding: 0 0 0 9px;
  overflow: hidden;
  width: auto;

  &:hover {
    background: #f1f1f2;
    a {
      visibility: visible;
    }
  }
`;

styles.Spinner = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  margin: 0 5px 0 0;
  background-image: url(/assets/loading.gif);
  background-repeat: no-repeat;
`;

styles.Checkbox = styled.input`
  margin: 0 5px 0 0;
  padding: 0;
`;

styles.Label = styled.label`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

styles.AddBtn = styled(Button)`
  display: inline-block;
  font: bold 12px arial;
  padding: 4px 11px;
  margin: 0 0 9px 10px;
  color: ${props => (props.isActive ? '#fff' : '#95959d')};
  background: ${props => (props.isActive ? '#83e1ed' : '#f1f1f2')};
  border: 1px solid ${props => (props.isActive ? '#83e1ed' : '#f1f1f2')};
  border-radius: 3px;
  box-shadow: none;
  outline: 0;

  &:hover {
    background: ${props => (props.isActive ? '#83e1ed' : '#dfe0e3')};
    border: 1px solid ${props => (props.isActive ? '#83e1ed' : '#dfe0e3')};
    vertical-align: top;
  }
`;

styles.Footer = styled.div`
  overflow: hidden;
  background: #f1f1f2;
`;

styles.CreateLink = styled.button`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  background: transparent;
  padding: 0;
  margin: 12px 9px;
  border: 0;
  outline: 0;
  font: normal 12px arial;
  color: #00bcd5;
  &:hover {
    text-decoration: underline;
  }
`;

styles.ShorlistForm = styled.div`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  margin: 12px 9px;
`;

styles.ShorlistInput = styled.input`
  width: 123px;
  color: #999;
  resize: none;
  outline: none;
  font-family: arial;
  font: normal 12px arial;
  border-radius: 3px;
  border: 1px solid #dfe0e3;
`;

styles.CreateBtn = styled.button`
  display: inline-block;
  background: linear-gradient(to bottom, #fefefe 1%, #eeeeee 100%);
  border: 1px solid #c5c5c5;
  font: bold 12px arial;
  color: #333;
  padding: 3px 7px;
  border-radius: 3px;
  margin-left: 10px;
  cursor: pointer;
  outline: 0;
  text-decoration: none;
  &:hover {
    background: linear-gradient(to bottom, #fcfcfc 1%, #f1f1f1 100%);
    border: 1px solid #999;
  }
`;

styles.RoundIconBtn = styled.button`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  width: 24px;
  height: 24px;
  margin: 6px 5px 0 0;
  vertical-align: top;
  transition: all 0.5s ease;
  background: url(/assets/grid-maybe-v2.png) no-repeat left top;
  border: 0;
  outline: 0;
  padding: 0;

  &:hover {
    background: url(/assets/grid-maybe-hover-v2.png) no-repeat left top;
  }
`;

styles.MaybeIcon = styled.span``;

/* eslint no-nested-ternary: 0 */
styles.InvitationBtn = styled.button`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  flex: ${props => (props.isShortlisted ? '1 !important' : '')};
  position: relative;
  text-align: center;
  width: 66px;
  margin: 3px 3px 3px 0;
  padding: ${props => (props.isLargeBtn ? '7px 30px' : '7px 0')};
  font-size: ${props => (props.isLargeBtn ? '18px' : '12px')};
  font-weight: ${props => (props.isLargeBtn ? 'normal' : 'bold')};
  color: ${props => (props.isCancelBtn ? '#95959d' : '#fff')};
  background: ${props => (props.isCancelBtn ? '#f1f1f2' : props.isMayBeBtn ? '#83e1ed' : '#00bcd5')};
  border: 1px solid ${props => (props.isCancelBtn ? '#f1f1f2' : props.isMayBeBtn ? '#83e1ed' : '#00bcd5')};
  border-radius: 3px;
  cursor: pointer;
  outline: 0;
  text-decoration: none;
  box-sizing: border-box;

  &:hover {
    background: ${props => (props.isCancelBtn ? '#dfe0e3' : '#1ba3b6')};
    border: 1px solid ${props => (props.isCancelBtn ? '#dfe0e3' : '#1ba3b6')};
  }
`;

styles.ShortlistBtn = styled.button`
  display: ${props => (props.isVisible ? 'flex' : 'none')};
  position: relative;
  align-items: center;
  border: ${props => (props.isDropdownVisible ? '1px' : 0)} solid #333;
  outline: 0;
  margin-bottom: 14px;
  background: transparent;
  padding-left: 0;
  border-radius: 0;
`;

styles.ShortlistIcon = styled.i`
  display: block;
  width: 18px;
  height: 17px;
  background: ${props => (props.isMatchItemHovered ? 'url(/assets/shortlist-ic-v1.gif)' : 'url(/assets/shortlist-ic-v1-gray.gif)')}
    no-repeat 0px -18px;
  margin: -2px 5px 0px 0px;
  vertical-align: middle;
`;

styles.ShortlistText = styled.span`
  color: #00bcd5;

  &:hover {
    text-decoration: underline;
  }
`;

styles.Container = styled.span`
  display: inline-block;
  position: relative;
`;

styles.ShortlistLink = styled.button`
  position: relative;
  padding: 0;
  background: transparent;
  outline: 0;
  border: 0;
  cursor: pointer;
  margin-left: 2px;
  color: #00bcd5;
  text-decoration: none;
`;

styles.ShortlistLinkIcon = styled.span`
  display: inline-block;
  vertical-align: middle;
  background: url(/assets/shaadi-sprite-2-v5.gif) no-repeat left -15px;
  height: 9px;
  width: 8px;
  margin-left: 4px;
`;

styles.MaybeBtn = styled.span`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  position: relative;
  text-align: center;
  width: auto;
  padding: 0;
  font: normal 18px arial;
  color: #fff;
  border-radius: 3px;
  border: 0;
  background: transparent;
  outline: 0;
  text-decoration: none;
  margin-right: 9px;
  top: -1px;
`;

styles.MaybeBtnText = styled.span`
  display: inline-block;
  vertical-align: middle;
  background: #83e1ed;
  width: 79px;
  text-align: center;
  line-height: 35px;
  border: 1px solid #83e1ed;
  cursor: pointer;
  border-radius: 3px 0 0 3px;

  &:hover {
    background: #1ba3b6;
    border: 1px solid #1ba3b6;
  }
`;

styles.MaybeArrowIcon = styled.span`
  display: inline-block;
  vertical-align: middle;
  background: #83e1ed url(/assets/shortlist-white-down.png) no-repeat center center;
  box-shadow: none;
  border: 1px solid #83e1ed;
  border-radius: 0 3px 3px 0;
  cursor: pointer;
  font: 18px arial;
  height: 17px;
  padding: 9px 8px;
  width: 2px;

  &:hover {
    background: #1ba3b6 url(/assets/shortlist-white-down.png) no-repeat center center;
  }
`;

styles.Error = styled.div`
  display: flex;
  border: solid 1px #d90009;
  background: #ffffbf;
  margin: 9px 8px 0px 0px;
  padding: 5px 2px 5px 5px;
  font: normal 11px arial;
  color: #000;
  animation: ${fadeOut} 3s linear;
  animation-fill-mode: forwards;
  animation-delay: 2s;
`;

styles.ErrorIcon = styled.div`
  margin-right: 6px;
  width: 14px;
  height: 14px;
  box-sizing: border-box;
  background: url(/assets/error-sm-ic.gif) no-repeat center center;
`;

styles.ErrorMsg = styled.div``;

export default styles;
