import React from 'react';
import PropTypes from 'prop-types';
import s from './styles';

const AlertMultiLine = props => (
  <s.AlertMultiLine size={props.alert.body.length}>
    {props.alert.title}
    {props.alert.body.map(para => (
      <span key={para.key}>
        {(para.body || para.items).map(content => {
          if (content.type === 'link') {
            return (
              <s.TooltipSpanLink key={content.key} to={content.url} isExternal={props.source === 'unified'}>
                {content.text}&nbsp;
              </s.TooltipSpanLink>
            );
          }
          if (content.type === 'button') {
            return (
              <div key="alert-content-btn">
                <s.TooltipSpanBtn key={content.key}>
                  <s.TooltipSpanLink key={content.key} to={content.url}>
                    {content.text}&nbsp;
                  </s.TooltipSpanLink>
                </s.TooltipSpanBtn>
              </div>
            );
          }
          return <s.TooltipSpanText key={content.key}>{content.text}&nbsp;</s.TooltipSpanText>;
        })}
      </span>
    ))}
  </s.AlertMultiLine>
);

const AlertContent = props => {
  if (props.type === 'toast' || props.type === 'flash') {
    return <AlertMultiLine alert={props.alert} source={props.source} />;
  }
  return <AlertMultiLine alert={props.alert} source={props.source} />;
};

const alertPropTypes = {
  key: PropTypes.string.isRequired,
  title: PropTypes.string,
  body: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
          text: PropTypes.string,
          url: PropTypes.string,
        }),
      ).isRequired,
    }),
  ).isRequired,
};

AlertContent.defaultProps = {
  source: '',
};
AlertMultiLine.defaultProps = {
  source: '',
};
AlertContent.propTypes = {
  type: PropTypes.oneOf(['toast', 'flash']).isRequired,
  alert: PropTypes.shape(alertPropTypes).isRequired,
  source: PropTypes.string,
};

AlertMultiLine.propTypes = {
  alert: PropTypes.shape(alertPropTypes).isRequired,
};

export default AlertContent;
