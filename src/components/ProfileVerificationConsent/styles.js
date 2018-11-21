import styled from 'styled-components';
import Link from '../Common/Link';

const s = {};

s.VerifyProfileMainWrap = styled.div`
  margin: -108px 0 0;
  @media (max-width: 768px) {
    margin: -123px 0 0;
  }
`;

s.VerifiProfileSubMainWrap = styled.div`
  width: 650px;
  margin: 18px auto;
  @media (max-width: 768px) {
    width: 93%;
  }
`;

s.VerifyProfileWrap = styled.div`
  width: 100%;
  box-shadow: 0 1px 2px rgba(43, 59, 93, 0.29);
  border-radius: 3px;
  background: #fff;
  padding: 16px 0;
  font: 300 26px 'Roboto', sans-serif;
`;

s.VerifyHeading = styled.h1`
  color: #51505d;
  text-align: center;
  margin: 0 0 2px;
  font-size: 26px;
  @media (max-width: 768px) {
    font-size: 17px;
  }
`;

s.HelpHeading = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #51505d;
  font-size: 20px;
  @media (max-width: 768px) {
    font: 300 14px 'Roboto', sans-serif;
  }
`;

s.Bold = styled.span`
  font-weight: ${props => props.weight || 'normal'};
`;

s.ProfileFormMain = styled.div`
  width: 329px;
  margin: 24px auto;
  @media (max-width: 500px) {
    width: 87%;
  }
`;

s.ProfileFormWrap = styled.form``;

s.ProfileFormInner = styled.div`
  width: 330px;
  display: flex;
  align-items: center;
  margin: 0 0 7px;
  justify-content: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

s.ProfileBtnWrap = s.ProfileFormInner.extend`
  margin:25px auto 0;
  width:328px;
`;

s.Profilelabel = styled.label`
  color: #95959d;
  font: 300 14px 'Roboto', sans-serif;
  width: 160px;
  position: relative;
  &:after {
    content: ':';
    color: #51505d;
    position: absolute;
    left: 155px;
  }
`;

s.ProfileInfo = styled.span`
  color: #51505d;
  font: 300 16px 'Roboto', sans-serif;
  width: 168px;
`;

s.ProfileChoosIdWrap = styled.div``;

s.ProfileChoosIdNumber = styled.div`
  display: flex;
  position: relative;
  margin: 25px 0 0;
  padding: 0;
  &::before {
    content: '';
    background: transparent;
  }
`;

s.IdNumberWrap = styled.input`
  width: 100%;
  padding: 0 0 7px;
  border: none;
  border-radius: 0;
  color: #51505d;
  border-bottom: 1px solid #dfe0e3;
  font: normal 16px 'Roboto', sans-serif;
  transition: 0.3s ease;
  outline: none;
  &::-ms-clear {
    display: none;
  }
  &:focus {
    outline: none;
  }
`;

s.BottomUnderline = styled.p`
  z-index: 1;
  position: absolute;
  left: 50%;
  content: '';
  height: ${props => (props.isVisible ? '2px' : 0)};
  width: ${props => (props.isVisible ? '100%' : 0)};
  margin: 0;
  margin-left: ${props => (props.isVisible ? '-50%' : 0)};
  transition: all 0.5s linear;
  background-color: #00bcd5;
  bottom: 0px;
`;

s.ErrorUnderline = s.BottomUnderline.extend`
  background-color: #e53a41;
`;

s.ProfilelabelBar = styled.label`
  display: ${props => (props.isEmpty ? 'block' : 'none')};
  position: absolute;
  left: 0;
  pointer-events: none;
  outline-offset: 0;
  font-family: 'Roboto', sans-serif;
  color: #51505d;
  bottom: 8px;
  font-size: 16px;
  color: #95959d;
`;

s.SubmitBtn = styled.input`
  font: 400 16px/18px 'Roboto', sans-serif;
  box-shadow: 0 3px 5px 1px rgba(0, 0, 0, 0.24);
  background-color: #00bcd5;
  color: #fff;
  width: 160px;
  height: 44px;
  border-radius: 3px;
  border: 0;
  padding: 0;
  margin: 0;
  outline: none;
  transition: all 300ms ease;
  &:hover {
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
    background-color: #1ba3b6;
  }
  @media (max-width: 768px) {
    width: 45%;
  }
`;

s.Rememberbtn = s.SubmitBtn.extend`
  color: #72727d;
  display: block;
  background-color: #f1f1f2;
  font-weight: 400;
  &:hover {
    background: #dfe0e3;
    color: #72727d;
  }
  @media (max-width: 768px) {
    width: 52%;
  }
`;

s.TncCheckboxWrap = styled.div`
  display: flex;
  font: 300 12px/16px 'Roboto', sans-serif;
  color: #51505d;
  margin: 22px auto 0;
  -webkit-tap-highlight-color: transparent;
  width: 329px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

s.CheckBoxLabel = styled.label`
  cursor: pointer;
  display: inline-block;
  vertical-align: top;
`;

s.TncCheckbox = styled.input`
  appearance: none;
  position: relative;
  top: 2px;
  height: 18px;
  vertical-align: top;
  width: 18px;
  transition: all 0.15s ease-out 0s;
  border: 1px solid #72727d;
  color: #72727d;
  cursor: pointer;
  margin: -4px 8px 0 0;
  outline: none;
  border-radius: 2px;
  -webkit-tap-highlight-color: transparent;
  &:checked {
    border: 1px solid #72727d;
    background: transparent;
  }
  &:checked::before {
    position: absolute;
    content: '';
    background: url(/assets/verify-img-sprite.png) no-repeat left -190px;
    background-size: 115px;
    width: 12px;
    height: 9px;
    left: 2px;
    top: 4px;
  }
`;

s.CheckBoxText = styled.div`
  display: inline-block;
  width: 303px;
  @media (max-width: 768px) {
    width: 88%;
  }
`;

s.MenuActiveWrap = styled.div`
  background: #fff;
  overflow: hidden;
  margin: ;
  border-radius: 3px;
  position: absolute;
  z-index: 5;
  top: 26px;
  width: 100%;
  margin: ${props => (props.isVisible ? '5px 0px' : 0)};
  max-width: ${props => (props.isVisible ? '359px' : 0)};
  max-height: ${props => (props.isVisible ? '500px' : 0)};
  box-shadow: 0px 2px 2px rgba(43, 59, 93, 0.29);
  border: ${props => (props.isVisible ? '1px solid #e7e7e7' : 'none')};
  /*transition: max-height 0.5s ease, max-width 0.5s ease;*/
  @media (max-width: 768px) {
    max-width: ${props => (props.isVisible ? '100%' : 0)};
  }
`;

s.MenuActiveWrapB = s.MenuActiveWrap.extend`
  width:328px;
`;

s.MenuActiveUl = styled.ul`
  margin: 0;
  padding: 9px 0;
`;

s.MenuActiveLi = styled.li`
  list-style: none;
  padding: 6px 15px;
  font: normal 16px 'Roboto', sans-serif;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  background: ${({ isSelected, isActive }) => {
    if (isSelected) {
      return '#d5d5d5';
    } else if (isActive) {
      return '#d5d5d5';
    }
    return 'none';
  }};
  &:hover {
    background: ${props => (props.isActive ? '#d5d5d5' : '#f1f1f2')};
  }
`;

s.Link = styled(Link)`
  color: #00bcd5;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

s.ErrorWrap = styled.div`
  max-height: ${props => (props.isVisible ? 'initial' : 0)};
  margin: ${props => (props.isVisible ? '4px 0 0' : 0)};
  font: normal 14px 'Roboto', sans-serif;
  color: #e53a41;
  overflow: hidden;
  transition: max-height 0.5s ease, margin-top 0.5s ease;
`;

s.TncErrorWrap = s.ErrorWrap.extend`
    margin: ${props => (props.isVisible ? '12px 0 0 27px' : 0)};
    @media (max-width: 768px) {
    margin: ${props => (props.isVisible ? '12px 0 0 29px' : 0)};
  }
`;

s.div = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
`;

s.ProfileProvideWrap = styled.label`
  display: ${props => (props.isVisible ? 'flex' : 'none')};
  margin: 28px 0;
  -webkit-tap-highlight-color: transparent;
  margin-top: ${props => (props.marginTop ? '50px' : '28px')};
  font: 300 16px 'Roboto', sans-serif;
  color: #51505d;
  position: relative;
  align-items: flex-end;
`;

s.ProfileRadioInput = styled.input`
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0;
  &:checked ~ span:after {
    content: '';
    width: 10px;
    height: 10px;
    position: absolute;
    background: #00bcd5;
    left: 5px;
    top: 6px;
    border-radius: 100%;
  }
`;

s.CheckmarksCircle = styled.span`
  position: relative;
  padding-left: 10px;
  width: 20px;
  height: 20px;
  &:before {
    content: '';
    width: 20px;
    height: 20px;
    border: 1px solid #00bcd5;
    position: absolute;
    left: 0;
    top: 1px;
    border-radius: 100%;
    box-sizing: border-box;
  }
`;

s.radioChips = styled.label`
  margin-top: 25px;
  border-radius: 12px;
  border: 1px solid ${props => (props.isChecked ? '#00bcd5' : 'transparent')};
  color: ${props => (props.isChecked ? '#5c5b66' : '#72727d')};
  line-height: 44px;
  height: 14px;
  font: 300 14px 'Roboto', sans-serif;
  text-transform: capitalize;
  text-align: center;
  padding: 3px 7px;
  cursor: pointer;
  display: inline-table;
  font-weight: ${props => (props.isChecked ? 400 : 300)};
  @media (max-width: 360px) {
    &:last-child {
      margin-top: 7px;
    }
  }
  &:hover {
    color: ${props => (props.isChecked ? '#5c5b66' : '#51505d')};
    border: 1px solid ${props => (props.isChecked ? '#00bcd5' : '#72727d')};
  }
`;

s.radioChipsWrap = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

export default s;
