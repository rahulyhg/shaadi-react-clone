import styled from 'styled-components';

import buttonStyle from '../../components/Common/FormElements/Button/styles';

const styles = {};

styles.InputButton = buttonStyle.InputButton.extend`
  && {
    width: 130px !important;
    padding: 0 !important;
    margin: 25px 0 15px !important;
    height: 36px !important;
    box-shadow: 0 0 4px rgba(161, 161, 161, 0.4) !important;
    border-radius: 24px !important;
    background-color: #ffffff !important;
    color: #51505d !important;
    font-size: 13px !important;
    font-weight: 300 !important;
    text-transform: none !important;
    &:hover {
      color: #51505d !important;
    }
 }
`;

styles.CtaBtnMargin = styled.div`
  margin: -22px 0;
`;

export default styles;
