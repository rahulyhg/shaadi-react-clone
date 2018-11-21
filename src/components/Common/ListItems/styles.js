import styled from 'styled-components';

const styles = {};

const fontFamily = 'Roboto, sans-serif';
const primaryColor = 'color: #51505d';

styles.Detail = styled.li`
  ${props => props.isSeperate && 'border-bottom: 1px solid #dfe0e3;'};
  padding: 11px 0;
  ${props =>
    !props.isSeperate &&
    'background: url(https://img2.shaadi.com/assests/2018/payment/thanku-bullet.png) no-repeat left 5px;padding: 0 5px 11px 0;'};

  ${props => props.notesCount > 1 && !props.isSeperate && 'width: 344px;'};
  margin: 0;
  display: flex;
  &:last-child {
    border-bottom: none;
  }
`;

styles.List = styled.ul`
  margin: 0;
  padding: 0 20px;
  ${props => !props.isSeperate && 'padding: 0;'};
`;

styles.Content = styled.div`
  padding: 0 17px 0 0;
  font: ${props => (props.label ? '500' : '400')} 14px ${fontFamily};
  ${props => props.isSeperate && 'text-align: right;width: 464px;'};
  ${primaryColor};
  ${props => !props.isSeperate && props.notesCount > 1 && 'width: 332px;'};
`;

export default styles;
