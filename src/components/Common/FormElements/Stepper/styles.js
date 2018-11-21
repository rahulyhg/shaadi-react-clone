import styled from 'styled-components';
import Link from '../../Link';

const styles = {};

styles.stepperWrap = styled.div`
  width: 244px;
  margin: 0 auto;
  position: relative;
`;

styles.stepperUl = styled.ul`
  display: flex;
  justify-content: center;
  justify-content: space-between;
  padding: 0;
  position: relative;
  margin: 10px 0 -7px;
  align-items: center;
  z-index: 1;
`;

styles.stepperLi = styled.li`
  list-style: none;
  outline: none;
  border-radius: 50%;
  align-items: center;
  cursor: ${props => (props.status === 'isDisabled' ? 'not-allowed' : 'pointer')};
  position: relative;
  width: ${props => (props.isActive ? '22px' : props.isDisabled ? '14px' : '16px')};
  height: ${props => (props.isActive ? '22px' : props.isDisabled ? '14px' : '16px')};
  background: ${props =>
    ({
      isActive: '#fff',
      isDisabled: '#dfe0e3',
      isCurrentActive: 'linear-gradient(to top,#42bbb9 0%,#73c47c 100%)',
    }[props.status])};
  border: ${props => (props.isActive ? '2px solid #42bbb9' : props.isDisabled ? '2px solid #dfe0e3' : 'none')};
`;

styles.stepperLine = styled.span`
  width: 57px;
  background: ${props => (props.isDisabled ? '#dfe0e3' : 'linear-gradient(to bottom, #66c08b 1%,#4ebdaa 100%)')};
  height: 2px;
  display: block;
`;

styles.link = styled(Link)`
  align-items: center;
  width: 16px;
  height: 16px;
  background: ;
  display: block;
  outline: none;
  pointer-events: ${props => (props.status === 'isDisabled' ? 'none' : '')};
  background: ${props =>
    ({
      isActive: 'none',
      isDisabled: 'none',
      isCurrentActive: 'url(/assets/tick.svg) no-repeat 4px 5px',
    }[props.status])};
`;

export default styles;
