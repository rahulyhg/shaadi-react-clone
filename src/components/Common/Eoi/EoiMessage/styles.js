import styled from 'styled-components';

const styles = {};

const iconOffset = icon => {
  switch (icon) {
    case 'report_misuse':
      return -196;
    default:
      return -100;
  }
};

styles.FlashIcon = styled.span`
  display: inline-block;
  height: 20px;
  width: 20px;
  margin: 2px 10px 0 0;
  background: url(/assets/profile-icon-sprite-v3.png) no-repeat left ${props => iconOffset(props.icon)}px;
`;

styles.Flash = styled.span`
  font-size: 24px;
`;

styles.Message = styled.div`
  padding-top: 25px;
`;

styles.BlockLimitExceededSection = styled.div`
  display: flex;
  flex-flow: column wrap;
`;

styles.MessageHeading = styled.p`
  flex: 0 0 auto;
  padding: 0 0 10px;
  box-sizing: border-box;
  font: 20px/22px arial;
  color: #72727d;
  margin: 0;
`;

styles.MessageSubHeading = styled.p`
  flex: 0 0 auto;
  box-sizing: border-box;
  font: 12px arial;
  color: #b1b3b9;
  width: 425px;
  margin: 0;
`;

export default styles;
