import styled from 'styled-components';

const styles = {};

const fontFamily = 'Roboto, sans-serif';
const primaryColor = 'color: #51505d';
const textCenter = 'text-align: center';
const BorderRadius = ' border-radius: 3px;';

styles.MainWrapper = styled.div`
  ${BorderRadius};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 6px, rgba(0, 0, 0, 0.1) 0px 1px 4px;
  background: #fff;
  width: 708px;
  margin: 15px auto;
  padding: 15px 116px;
  min-height: 400px;
`;
styles.Wrapper = styled.div`
  width: ${props => (props.notesCount === 2 ? '349px' : '698px')};
`;

styles.Container = styled.div`
  width: 698px;
  display: flex;
  padding: 0 0 0 10px;
`;

styles.TopNote = styled.div`
  padding: 0 0 20px;
  ${primaryColor};
  font: 400 16px ${fontFamily};
  ${textCenter};
`;

styles.Box = styled.div`
  ${BorderRadius};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 6px, rgba(0, 0, 0, 0.1) 0px 1px 4px;
  background: #fff;
  margin: 0 0 30px;
`;

styles.Heading = styled.div`
  background: #f1f1f2;
  padding: 9px 30px;
  ${primaryColor};
  font: 500 18px ${fontFamily};
`;

styles.Divider = styled.div`
  width: 270px;
  background: #6fc380;
  margin: 5px auto 0;
  height: 1px;
  line-height: 1px;
`;

styles.ContinueMessage = styled.div`
  font: 400 16px ${fontFamily};
  color: #72727d;
  ${textCenter};
  padding: 23px 0 19px;
`;

styles.Button = styled.button.attrs({ type: 'button' })`
  display: block;
  position: relative;
  ${textCenter};
  width: 160px;
  height: 44px;
  font: 400 18px ${fontFamily};
  color: #fff;
  background: #00bcd5;
  border: 1px solid #00bcd5;
  ${BorderRadius};
  cursor: pointer;
  outline: 0;
  margin: 0 auto;
  text-decoration: none;
  box-sizing: border-box;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  transition: all 300ms ease;
  line-height: 42px;
  padding: 0;
  &:hover {
    background: #0194a8;
    border: 1px solid #0194a8;
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
  }
`;

styles.HelpText = styled.div`
  color: #72727d;
  font: 400 14px ${fontFamily};
  ${textCenter};
  padding: 13px 0 0;
`;

styles.ContactNo = styled.span`
  font: 400 18px ${fontFamily};
  ${primaryColor};
`;

styles.Detail = styled.li`
  padding: 11px 0;
  background: url(https://img2.shaadi.com/assests/2018/payment/thanku-bullet.png) no-repeat left 6px;
  padding: 0 5px 11px 15px;
  ${props => props.notesCount > 1 && 'width: 329px;'};
  margin: 0;
  list-style-type: none;
  &:last-child {
    border-bottom: none;
  }
`;

styles.NoteTitle = styled.div`
  font: 500 18px ${fontFamily};
  padding: 0 0 10px;
  ${primaryColor};
`;

styles.List = styled.ul`
  margin: 0;
  padding: 0;
`;
styles.Label = styled.div`
  padding: 0 3px 0 0;
  font: 400 14px ${fontFamily};
  white-space: nowrap;
  ${primaryColor};
  display: inline;
`;

styles.Content = styled.div`
  padding: 0 17px 0 0;
  font: ${props => (props.label ? '500' : '400')} 14px ${fontFamily};
  ${primaryColor};
  ${props => props.notesCount > 1 && 'width: 332px;'};
  display: inline;
`;

styles.DisplayFlex = styled.div``;

export default styles;
