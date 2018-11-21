import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../../../vendor/RcTooltip';
import '../../../vendor/RcTooltip/bootstrap.css';
import Spinner from '../Spinner';
import './tooltip.css';
import s from './styles';

const TooltipWrapper = props => {
  if (props.isQuestionMark || props.trigger === 'hover') {
    const overlay = props.overlay || (
      <TooltipOverlay
        trigger={props.trigger}
        tooltip={props.tooltip}
        onClose={props.onClose}
        isQuestionMark={props.isQuestionMark}
        isTooltipClosable={false}
      />
    );
    return (
      <Tooltip
        align={{ offset: props.offset }}
        overlayClassName={props.overlayClassName || 'rc-tooltip-dark'}
        placement={props.placement}
        overlay={overlay}
      >
        {props.isQuestionMark ? <s.QuestionIcon /> : props.children || <span />}
      </Tooltip>
    );
  }

  return (
    <Tooltip
      visible={props.isVisible}
      align={{ offset: props.offset }}
      overlayClassName={props.overlayClassName || 'connectTooltip'}
      isQuestionMark={false}
      placement={props.placement}
      overlay={
        props.overlay || (
          <TooltipOverlay
            trigger={props.trigger}
            tooltip={props.tooltip}
            onClose={props.onClose}
            isQuestionMark={props.isQuestionMark}
            isTooltipClosable={props.trigger !== 'hover'}
            isReadMore={props.isReadMore}
          />
        )
      }
    >
      {props.children || <span />}
    </Tooltip>
  );
};

const renderHybrid = text => {
  const finalHybrid = [];
  let finalMsg = [];
  text.split(' ').map(item => { //eslint-disable-line
    switch (item) {
      case '#Phone_No_Hidden#':
        if (finalMsg.length !== 0) {
          finalHybrid.push({ type: 'text', text: finalMsg.join(' ') });
        }
        finalHybrid.push({
          type: 'phone',
          text: 'Phone Number Visible on Accept',
          title: "This member's contact details will be visible after you Accept the Interest",
        });
        finalMsg = [];
        break;
      case '#Email_Hidden#':
        if (finalMsg.length !== 0) {
          finalHybrid.push({ type: 'text', text: finalMsg.join(' ') });
        }
        finalHybrid.push({
          type: 'email',
          text: 'Email Id Visible on Accept',
          title: "This member's contact details will be visible after you Accept the Interest",
        });
        finalMsg = [];
        break;
      default:
        finalMsg.push(item);
        break;
    }
  });
  if (finalMsg.length !== 0) {
    finalHybrid.push({ type: 'text', text: finalMsg.join(' ') });
  }
  return finalHybrid.map(item => {
    switch (item.type) {
      case 'email':
      case 'phone':
        return <s.TooltipSpanHText title={item.title}>{item.text}</s.TooltipSpanHText>;

      default:
        return <s.TooltipSpanText>{item.text}</s.TooltipSpanText>;
    }
  });
};

const TooltipOverlay = props => {
  if (props.isQuestionMark) {
    return <TooltipPara hasNoMargin items={props.tooltip.body} />;
  }
  return (
    <s.TooltipContent isReadMore={props.isReadMore}>
      {props.tooltip.title && props.isReadMore && <s.TooltipTitleP>{props.tooltip.title}</s.TooltipTitleP>}
      {props.tooltip.title && !props.isReadMore && <s.TooltipTitle>{props.tooltip.title}</s.TooltipTitle>}

      <TooltipPara items={props.tooltip.body} isReadMore={props.isReadMore} />
      <s.TooltipBtn isVisible={props.isTooltipClosable} onClick={props.onClose} />
      {props.tooltip.loading && (
        <span style={{ padding: 20 }}>
          <Spinner isVisible />
        </span>
      )}
    </s.TooltipContent>
  );
};

const TooltipPara = props => (
  <s.TooltipBody>
    {props.items.map(para => (
      <s.TooltipPara hasNoMargin={props.hasNoMargin} key={para.key}>
        {para.items.map(content => {
          if (content.type === 'link') {
            return (
              <s.TooltipSpanText key={content.key}>
                <s.TooltipSpanLink
                  key={content.key}
                  target={content.target || '_blank'}
                  isExternal
                  to={content.url}
                  className={content.className || ''}
                >
                  {content.text}&nbsp;
                </s.TooltipSpanLink>
                {content.text2 || ''}
              </s.TooltipSpanText>
            );
          }
          if (content.type === 'button') {
            return (
              <span key={content.key}>
                <s.TooltipSpanLink isExternal to={content.url}>
                  <s.TooltipSpanBtn>{content.text}&nbsp;</s.TooltipSpanBtn>
                </s.TooltipSpanLink>
              </span>
            );
          }

          if (content.type === 'spacer_8') {
            return <s.spacer8 key="spacer-8" />;
          }

          if (content.type === 'hybrid') {
            return renderHybrid(content.text);
          }
          if (content.type === 'image') {
            return (
              <s.TooltipSpanText key={content.key}>
                <img src={content.src} alt={content.alt} style={content.style} />
              </s.TooltipSpanText>
            );
          }
          return (
            <s.TooltipSpanText isRed={content.type === 'red'} className={content.className || ''} key={content.key}>
              {content.text}&nbsp;
            </s.TooltipSpanText>
          );
        })}
      </s.TooltipPara>
    ))}
  </s.TooltipBody>
);

TooltipWrapper.defaultProps = {
  isVisible: false,
  trigger: 'click',
  offset: [0, 0],
  placement: 'bottom',
  tooltip: null,
  overlay: null,
  isQuestionMark: false,
  overlayClassName: null,
  children: null,
  isReadMore: false,
  onClose: () => {},
};

TooltipPara.defaultProps = {
  hasNoMargin: false,
};

TooltipPara.propTypes = {
  hasNoMargin: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.shape(PropTypes.tooltipBody)).isRequired,
};

TooltipOverlay.defaultProps = {
  isReadMore: false,
};
TooltipOverlay.propTypes = {
  tooltip: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.arrayOf(PropTypes.shape(PropTypes.tooltipBody)).isRequired,
    loading: PropTypes.bool,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  isReadMore: PropTypes.bool,
  isQuestionMark: PropTypes.bool.isRequired,
  isTooltipClosable: PropTypes.bool.isRequired,
};

TooltipWrapper.propTypes = {
  trigger: PropTypes.oneOf(['hover', 'click']),
  overlay: PropTypes.element,
  children: PropTypes.element,
  isVisible: PropTypes.bool.isRequired,
  isReadMore: PropTypes.bool,
  tooltip: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.arrayOf(PropTypes.shape(PropTypes.tooltipBody)).isRequired,
    loading: PropTypes.bool,
  }),
  onClose: PropTypes.func,
  placement: PropTypes.string,
  overlayClassName: PropTypes.string,
  isQuestionMark: PropTypes.bool,
  offset: PropTypes.arrayOf(PropTypes.number),
};

export default TooltipWrapper;
