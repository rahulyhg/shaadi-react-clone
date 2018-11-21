import styled from 'styled-components';

const styles = {};

styles.LoadingWrapper = styled.div`
  position: relative;
  ${props =>
    props.isList || props.isProfile
      ? 'height: 208px'
      : props.isInbox ? { inbox: 'height:auto', featured: 'height:76px' }[props.type] : 'min-height: 30px'};
`;

export default styles;
