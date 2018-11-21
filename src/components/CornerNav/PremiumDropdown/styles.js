import styled from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

styles.DropdownWrapper = styled.div`
  position: relative;
  display: flex;
  &:after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    height: 28px;
    margin: 14px 0 14px -1px;
    border-right: 1px solid #ff7b80;
  }
`;

styles.PremiumDropdown = styled.div.attrs({
  'data-test-selector': 'premium_dropdown_cta',
})`
  display: ${props => (props.isVisible ? 'flex' : 'none')};
  background: #fff;
  color: #95959d;
  border-radius: 4px;
  box-shadow: 0 8px 12px rgba(43, 59, 93, 0.35);
  font-size: 12px;
  position: absolute;
  right: 0;
  top: 56px;
  width: 239px;
  padding: 10px 0;
  margin: 0;
  cursor: default;
  line-height: normal;
  flex-direction: column;
`;

styles.DropdownLink = styled.div`
  position: relative;
  display: flex;
  padding: 14px 10px;
  transition: color 0.2s ease;
  text-decoration: none;
  color: #72727d;
  cursor: pointer;
  line-height: ${props => (props.profile ? '12px' : '28px')};
  color: #fff;
  font-size: 16px;
  background-color: ${props => (props.isActive ? '#f14d53' : 'transparent')};

  &:hover {
    background-color: #f14d53;
    border-bottom-color: transparent;
  }

  &:hover > div {
    display: flex;
  }
`;

styles.DropdownArrowIcon = styled.span`
  display: inline-block;
  width: 10px;
  height: 6px;
  margin: 12px 0 0 7px;
  background-image: url(/assets/top-navabc-pro-help-icn.png);
`;

styles.PremiumIcon = styled.span`
  display: inline-block;
  background: url(/assets/pinterest-sprite-ver3.png) no-repeat left -257px;
  width: 16px;
  height: 14px;
  margin: 0 6px 0 0;
`;

styles.Details = styled.div`
  display: ${props => (props.isVisible ? 'inline-block' : 'none')}
  font: 0.75rem arial;
  margin: 0 14px;
  border-bottom: 1px solid #f1f1f2;
  padding: 10px 0;
  overflow: hidden;

  &::last-child {
    border-bottom: 0;
  }
`;

styles.PlanTitle = styled.strong`
  font: bold 14px/20px arial;
  color: #ff5a60;
`;

styles.Title = styled.strong`
  font-weight: bold;
  color: #72727d;
`;

styles.Desc = styled.p`
  margin: 0;
  color: #888;
  margin-top: 4px;
`;

styles.Value = styled.span`
  color: #ff5a60;
`;

styles.ExtendLink = styled(Link)`
  font-family: inherit;
  text-decoration: none;
  font-size: 14px;
  padding: 4px 20px 5px;
  color: #fff;
  background: #00bcd5;
  border: 1px solid #00bcd5;
  border-radius: 3px;
  font-weight: bold;
  margin: 10px auto 0 auto;
  text-transform: capitalize;
  width: 175px;
  /* Structure */
  display: inline-block;
  zoom: 1;
  line-height: normal;
  white-space: nowrap;
  vertical-align: middle;
  text-align: center;
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
  &:hover {
    text-decoration: none;
    background: #0194a8;
    border: 1px solid #0194a8;
  }
  &:active {
    box-shadow: none;
  }
  /* Firefox: Get rid of the inner focus border */
  &::-moz-focus-inner {
    padding: 0;
    border: 0;
  }
`;

styles.ExtendBrownLink = styled(Link)`
  padding: 13px 0 0 !important;
  box-shadow: 0 3px 6px rgba(77, 64, 64, 0.2);
  color: #fff !important;
  font: 500 14px/17px 'Roboto', sans-serif !important;
  background: linear-gradient(
    to right,
    rgba(199, 147, 36, 1) 0%,
    rgba(237, 203, 124, 1) 31%,
    rgba(237, 203, 124, 1) 70%,
    rgba(199, 147, 36, 1) 100%
  );
  height: 28px !important;
  width: 190px !important;
  border-radius: 50px !important;
  text-transform: uppercase;
  text-align: center;
  text-decoration: none;
  margin: 10px auto 5px;
  text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2);
  &:hover {
    text-decoration: none;
    background: linear-gradient(to right, rgba(199, 147, 36, 1) 0%, rgba(237, 203, 124, 1) 73%, rgba(237, 203, 124, 1) 100%);
  }

  &:active {
    box-shadow: none !important;
  }
`;

styles.ButtonCrown = styled.span`
  display: inline-block;
  background: url(/assets/white-crown-shadow.svg) no-repeat;
  width: 16px;
  height: 16px;
  margin: -4px 6px 0 0;
  background-size: 16px 16px;
  vertical-align: middle;
`;

export default styles;
