import styled from 'styled-components';

const styles = {};

styles.SavedSearchBoxWrapper = styled.div`
  width: 570px;
`;
styles.SaveSearchBoxContentWrapper = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  padding: 20px 15px 20px 16px !important;
  background-color: #fff;
  font: normal 14px arial;
  margin: 0;
`;
styles.SaveSearchSectionWrapper = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
`;
styles.SavesearchLabel = styled.label`
  display: block;
  width: 197px;
  float: left;
  font-size: 14px;
  color: #b1b3b9;
  padding-top: 7px;
`;
styles.SaveSearchInputTextWrapper = styled.div`
  width: 305px;
  float: left;
  padding-bottom: 12px;
`;
styles.SaveSearchInputText = styled.input`
  width: 213px;
  font: 300 14px 'Roboto', sans-serif;
  color: #51505d;
  border: solid 1px ${props => (props.nameError ? '#d60000' : '#dfe0e3')};
  height: 27px;
  line-height: 27px;
  font-size: 12px;
  padding-left: 5px;
  border-radius: 3px;
`;
styles.Spacer = styled.div`
  padding: ${props => (props.padding ? `${props.padding}px` : 0)};
`;
styles.TextWrapper = styled.div`
  font-size: ${props => (props.fontSize ? `${props.fontSize}px` : '12px')};
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
`;
styles.Select = styled.select`
  width: ${props => (props.width ? props.width : 'auto')};
  border: solid 1px ${props => (props.nameError ? '#d60000' : '#dfe0e3')};
  height: 20px;
  font-size: 12px;
  padding-left: 2px;
  color: #72727d;
`;
styles.SaveSearchInputTextError = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  padding: 4px 0 0 0;
  color: #d60000;
  font-size: 11px;
`;
styles.Checkbox = styled.input`
  margin-right: 5px;
  padding: 0;
  vertical-align: middle;
`;
styles.SubmitBtn = styled.button`
  padding: 6px 14px;
  font-weight: bold;
  color: #fff !important;
  background: #00bcd5 !important;
  border: 1px solid #00bcd5 !important;
  border-radius: 3px !important;
  box-shadow: none !important;
  display: block;
  margin: 0 auto;
  &:hover {
    background: #1ba3b6 !important;
    border: 1px solid #1ba3b6 !important;
  }
`;

export default styles;
