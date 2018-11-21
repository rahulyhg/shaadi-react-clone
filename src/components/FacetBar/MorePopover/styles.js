import styled from 'styled-components';

const styles = {};

styles.MorePopover = styled.div`
  display: flex;
  font: bold 12px/20px arial !important;
  padding: 0 0 0 8px;
  margin-top: -10px;
  background: #fff;
  color: #72727d;
  position: relative;
  justify-content: flex-end;
`;

styles.MoreBtn = styled.button`
  position: relative;
  z-index: 1;
  color: #00bcd5;
  text-decoration: none;
  font-weight: normal;
  outline: 0;
  border: 0;
  cursor: pointer;
  padding: 6px;
  background: #fff;
  margin-right: ${props => (props.isPopoverVisible ? '-1px' : 0)};
  border-top: solid 1px ${props => (props.isPopoverVisible ? '#bdbdbd' : 'transparent')};
  border-bottom: solid 1px ${props => (props.isPopoverVisible ? '#bdbdbd' : 'transparent')};
  border-left: solid 1px ${props => (props.isPopoverVisible ? '#bdbdbd' : 'transparent')};

  &:hover {
    text-decoration: underline;
  }
`;

styles.MoreModal = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  position: absolute;
  bottom: 0;
  left: 100%;
  background: #fff;
  border: 1px solid #bdbdbd;
  width: 495px;
  text-align: left;
  background: #fff;
  border-color: #bdbdbd;
  border-width: 2px 2px 2px 1px;
`;

styles.Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font: 12px arial;
  color: #72727d;
  background: #fff;
  padding: 5px 7px 9px;
  border-bottom: solid 1px #c6c6c6;
  border-top: 0;
`;

styles.CloseBtn = styled.button`
  display: inline-block;
  text-align: center;
  width: 22px;
  height: 22px;
  background: url(/assets/close.gif) no-repeat;
  vertical-align: baseline;
  color: #00bcd5;
  text-decoration: none;
  font-weight: normal;
  outline: 0;
  border: 0;
  cursor: pointer;
`;

styles.Footer = styled.div`
  text-align: right;
  padding: 7px;
  border-top: solid 1px #c1c8d4;
`;

styles.DoneBtn = styled.button`
  color: #fff;
  background: #00bcd5;
  border: 1px solid #00bcd5;
  border-radius: 3px;
  box-shadow: none;
  padding: 2px 13px;
  outline: 0;

  &:hover {
    background: #0194a8;
    border: 1px solid #0194a8;
  }
`;

styles.Content = styled.div`
  display: flex;
  width: 470px;
  background: #fff;
  padding: 15px 0 10px 19px;
`;

styles.OptionsWrapper = styled.div`
  width: 205px;
  font: 13px arial;
  color: #72727d;
  margin-right: 35px;
`;

styles.SubHeading = styled.span`
  display: flex;
  justify-content: space-between;
  margin: 0 0 5px;
  font: 12px arial;
  color: #a1a1a1;
  margin-bottom: 3px;
  width: 214px;
`;

styles.SubHeadingText = styled.div`
  flex: 1 1 auto;
`;

styles.HeaderText = styled.div`
  flex: 1 1 auto;
`;

styles.OptionsList = styled.ul`
  width: 208px;
  height: 245px;
  padding: 3px;
  border: solid 1px #dfe0e3;
  overflow-x: hidden;
  overflow-y: scroll;
  background: #f7f7f7;
  margin: 0;
  list-style-type: none;
`;

styles.Option = styled.li`
  font: 11px arial;
  margin-bottom: 2px;
`;

styles.Checkbox = styled.input`
  display: inline-block;
  vertical-align: top;
  margin: 0 6px 0 4px;
`;

styles.Heading = styled.span`
  background: #ededed;
  white-space: nowrap;
  margin-top: 7px;
  margin-bottom: 5px;
  width: 100%;
  font: normal 12px/15px arial;
  color: #434343;
  vertical-align: middle;
  display: inline-block;
`;

styles.Label = styled.span`
  padding-right: 8px;
  width: 160px;
  font: normal 12px/15px arial;
  color: #434343;
  vertical-align: middle;
  display: inline-block;
`;

styles.Count = styled.span`
  display: ${props => (props.isVisible ? 'inline' : 'none')};
`;

styles.CheckIconImg = styled.img`
  margin: 0 4px;
  vertical-align: top;
`;

styles.ClearBtn = styled.button`
  padding: 0;
  background: transparent;
  border: 0;
  color: #00bcd5;
  text-decoration: none;
  font-weight: normal;
  outline: 0;
`;

export default styles;
