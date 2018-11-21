import styled from 'styled-components';
import Button from '@material-ui/core/Button';

const styles = {};

styles.input = styled.input`
  display: none;
  &:checked ~ Button {
    border: 1px solid #00bcd5;
  }
`;

styles.tabwrapper = styled.div`
  display: flex;
  align-items: left;
  justify-content: left;
  flex-wrap: wrap;
`;

styles.BodyTypeLabel = styled.label`
  cursor: pointer;
  padding: 5px 12px;
  display: flex;
  align-items: center;
  }
`;

styles.StyleButton = styled(Button)`
  && {
    background: #fff !important;
    box-shadow: none;
    border: 1px solid ${props => (props.isselected === 'true' ? '#00bcd5' : '#dfe0e3')};
    border-radius: 15px;
    font: 300 14px 'Roboto', sans-serif;
    color: ${props => (props.isselected === 'true' ? '#00bcd5' : '#51505d')};
    cursor: pointer;
    min-width: auto;
    min-height: auto;
    width: auto;
    height: auto;
    text-transform: capitalize;
    margin: 0 6px 0 0;
    text-align: center;
    cursor: pointer;
    padding: 0;
    @media (min-width: 769px) {
      &:hover {
        background: none;
        border: 1px solid ${props => (props.isselected === 'true' ? '#00bcd5' : '#72727d')};
      }
    }
    @media (max-width: 768px) {
      border-radius: 20px;
      margin: 15px 8px 0 0;
    }
  }
`;

export default styles;
