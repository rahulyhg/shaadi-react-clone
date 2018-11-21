import React from 'react';
import PropTypes from '../../../PropTypes';
import HtmlSelect from './HtmlSelect';
import HtmlInput from './HtmlInput';

const HtmlInputField = props => {
  let html;
  switch (props.type) {
    case 'input':
      html = <HtmlInput type={props.subType} allowMultiple={props.allowMultiple} onChange={props.onChange} />;
      break;
    case 'select':
      html = <HtmlSelect allowMultiple={props.allowMultiple} />;
      break;
    default:
      html = null;
      break;
  }
  return html;
};

HtmlInputField.defaultProps = {
  type: 'input',
  subType: 'text',
  multiple: true,
};

HtmlInputField.propTypes = {
  type: PropTypes.string.isRequired,
  subType: PropTypes.string.isRequired,
  multiple: PropTypes.bool.isRequired,
};

export default HtmlInputField;
