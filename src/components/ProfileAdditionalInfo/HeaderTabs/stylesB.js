import styled from 'styled-components';

const styles = {};

styles.HeaderTabs = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #dfe0e3;
  height: 51px;
  background: #fff;
  border-radius: 3px 3px 0 0;
`;

styles.Left = styled.div`
  display: flex;
  align-items: center;
  flex: 1 0 544px;
`;

styles.DetailTab = styled.div`
  font: 400 16px/22px 'Roboto', sans-serif;
  color: #ff5a60;
  height: auto;
  background: #fff;
  overflow: hidden;
  text-align: center;
  padding: 14px 17px;
  text-transform: capitalize;
  border-radius: 3px 3px 0 0;
  border-bottom: 2px solid #ff5a60;
`;

styles.TabLink = styled.a`
  display: flex;
  align-items: center;
  text-transform: capitalize;
  font: 300 16px/22px 'Roboto', sans-serif;
  padding: 14px 17px;
  color: #72727d;
  position: relative;
  cursor: pointer;
  text-decoration: none;
  transition: 0.2s all;
  border-bottom: 2px solid transparent;

  &:hover {
    border-bottom-color: #ff5a60;
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
  font: 500 11px/15px 'Roboto', sans-serif;
  background: #e8383c;
  border-radius: 3px;
  height: 15px;
  padding: 2px 0 0;
  position: absolute;
  text-align: center;
  width: 38px;
  top: -5px;
  right: 0;
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid #e8383c;
    top: 16px;
    left: 7px;
  }
`;

styles.Right = styled.div`
  display: flex;
  align-items: center;
  flex: 1 0 40px;
`;

styles.HeaderIconLink = styled.a`
  display: block;
  background: url(/assets/share.svg) no-repeat;
  width: 20px;
  height: 19px;
  flex: 1 0 38px;
  cursor: pointer;

  &:hover {
    background: url(/assets/share-hover.svg) no-repeat;
  }
`;

styles.HeaderIconBtn = styled.button`
  background: url(/assets/print.svg) no-repeat;
  width: 20px;
  height: 18px;
  flex: 0 0 29px;
  cursor: pointer;
  border: 0;
  padding: 0;
  outline: 0;
  margin: 0 8px 0 0;

  &:hover {
    background: url(/assets/print-hover.svg) no-repeat;
  }
`;

export default styles;
