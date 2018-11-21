import styled from 'styled-components';

const styles = {};

styles.HeaderTabs = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #00bcd5;
  height: 39px;
  background: #fff;
  border-radius: 3px 3px 0 0;
`;

styles.Left = styled.div`
  display: flex;
  align-items: center;
  flex: 1 0 562px;
`;

styles.DetailTab = styled.div`
  font: bold 14px/22px arial;
  color: #00bcd5;
  height: auto;
  background: #fff;
  overflow: hidden;
  text-align: center;
  padding: 8px 10px;
  text-transform: capitalize;
  border-radius: 3px 3px 0 0;
  border-bottom: 2px solid #00bcd5;
`;

styles.TabLink = styled.a`
  display: flex;
  align-items: center;
  text-transform: capitalize;
  font: bold 14px/22px arial;
  padding: 7px 10px;
  color: #72727d;
  position: relative;
  cursor: pointer;
  text-decoration: none;
  transition: 0.2s all;
  border-bottom: 2px solid transparent;

  &:hover {
    border-bottom-color: #00bcd5;
  }
`;

styles.arrowIcon = styled.div`
  height: 15px;
  width: 5px;
  background: url(/assets/pp-icon-sprite-v6.png) no-repeat left -184px;
  margin: 9px 0 0 5px !important;
`;

styles.isFreeIcon = styled.div`
  background: ${props => (props.isVisible ? 'url(/assets/label-new-v2.png) no-repeat left top' : '')};
  color: #fff;
  font: normal 11px arial;
  height: 20px;
  padding: 2px 0 0;
  position: absolute;
  text-align: center;
  width: 38px;
  top: -6px;
  right: 0;
`;

styles.Right = styled.div`
  display: flex;
  align-items: center;
  flex: 1 0 40px;
`;

styles.HeaderIconLink = styled.a`
  display: block;
  background: url(/assets/pp-icon-sprite-v6.png) no-repeat;
  background-position: left ${props => (props.isEmail ? '-200px' : props.isPrint ? '-224px' : '-197px')};
  height: 27px;
  flex: 1 0 38px;
  cursor: pointer;

  &:hover {
    background-position: left ${props => (props.isEmail ? '-654px' : props.isPrint ? '-686px' : '-651px')};
  }
`;

styles.HeaderIconBtn = styled.button`
  background: url(/assets/pp-icon-sprite-v6.png) no-repeat;
  background-position: left ${props => (props.isEmail ? '-197px' : props.isPrint ? '-227px' : '-197px')};
  height: 27px;
  flex: 0 0 29px;
  cursor: pointer;
  border: 0;
  padding: 0;
  outline: 0;
  margin: 0 8px 0 0;

  &:hover {
    background-position: left ${props => (props.isEmail ? '-651px' : props.isPrint ? '-689px' : '-651px')};
  }
`;

export default styles;
