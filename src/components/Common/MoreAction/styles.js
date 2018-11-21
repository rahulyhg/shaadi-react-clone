import styled from 'styled-components';

const styles = {};

const ListDropdownWrapDefault = styled.div`
  display: inline-block;
  position: relative;
`;

styles.ListDropdownWrap = ListDropdownWrapDefault.extend``;
styles.ListDropdownWrapProfilePage = ListDropdownWrapDefault.extend`
  right: -11px;
`;

const ListDropdownArrowDefault = styled.button`
  background: url(/assets/profile-name-arrow.png) no-repeat center center;
  width: 30px;
  height: 30px;
  display: inline-block;
  border-radius: 50%;
  padding: 10px;
  transition: all 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  border: 0;
  outline: 0;
  &:hover {
    background-color: #ebebeb;
  }
`;

styles.ListDropdownArrow = ListDropdownArrowDefault.extend`
  margin: 11px -9px 0 5px;
`;

styles.ListDropdownArrowProfilePage = ListDropdownArrowDefault.extend`
  margin: 0px -9px 0 5px;
`;
styles.ListDropdown = styled.div`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  position: absolute;
  left: -152px;
  top: 5px;
  z-index: 1;
  width: 200px;
  background: #fff;
  box-shadow: 0 4px 27px 2px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  padding: 12px 0;
`;

styles.ListDropdownProfilePage = styles.ListDropdown.extend`
  top: -10px;
`;

styles.ListDropdownBtnWrap = styled.div`
  height: 33px;
  line-height: 33px;
  position: relative;
`;

styles.ListDropdownBtn = styled.button`
  display: block;
  font: 300 14px 'Roboto', sans-serif;
  padding: 8px 21px;
  color: ${props => (props.isMuted ? '#cdced1' : '#51505d')};
  text-decoration: none;
  transition: all 0.7s cubic-bezier(0.25, 0.8, 0.25, 1);
  width: 100%;
  text-align: left;
  border: 0;
  outline: 0;
  background: #fff;
  position: relative;

  &:hover {
    background: #f1f1f2;
    ${props => props.isMuted && 'color: #b1b3b9;'};
  }
`;

styles.CheckmarkWrap = styled.span`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')};
  width: 12px;
  height: 12px;
  position: relative;
  margin: 0 8px 0 0;
`;

export default styles;
