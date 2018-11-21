import React from 'react';
import HtmlInputFile from './HtmlInputFile';

const HtmlInput = props => {
  let html;
  switch (props.type) {
    case 'file':
      html = <HtmlInputFile type={props.subType} allowMultiple={props.allowMultiple} onChange={props.onChange} />;
      break;
    case 'text':
      html = <HtmlInputFile type={props.subType} onChange={props.onChange} />;
      break;
    default:
      html = null;
      break;
  }
  return html;
};

export default HtmlInput;
