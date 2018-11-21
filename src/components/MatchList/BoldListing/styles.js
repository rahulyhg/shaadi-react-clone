import styled from 'styled-components';

const styles = {};

const colorTagMap = {
  Select: '#866ab9',
  PremiumPlus: '#ff5a60',
};
styles.PremiumBorder = styled.div`
  border-right: 3px solid ${props => (props.tag === 'vip' ? '#a20005' : colorTagMap[props.plan] || 'transparent')};
  border-radius: 5px;
  position: absolute;
  right: ${props => (props.source === 'inboxCard' ? '-4px' : '-3px')};
  width: 3px;
  height: 100%;
  top: 0;
  margin: 0 0 4px;
`;

export default styles;
