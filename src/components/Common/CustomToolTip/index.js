import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TooltipBox from '../TooltipBox';
import withDeviceInfo from '../../HOC/withDeviceInfo';
import TooltipQuestionMark from '../../../theme/TooltipQuestionMark';
import FlexWrap from '../../../theme/FlexWrap';
import s from './styles';

class CustomToolTip extends PureComponent {
  state = {
    canShowTooltip: this.props.canShowTooltip,
    tooltipTop: 0,
  };
  // @todo make tooltip content box position adjust as per viewport screen size
  /* getElementPos = element => {
    let node = element;
    let top = 0;
    let left = 0;
    let curTop = 0;
    let curLeft = 0;
    let curLeftscroll = 0;
    let curTopscroll = 0;
    if (node.offsetParent) {
      do {
        curTop += node.offsetTop;
        curLeft += node.offsetLeft;
        curTopscroll += node.offsetParent ? node.offsetParent.scrollTop : 0;
        curLeftscroll += node.offsetParent ? node.offsetParent.scrollLeft : 0;
      } while ((node = node.offsetParent)); // eslint-disable-line no-cond-assign
      top = curTop - curTopscroll;
      left = curLeft - curLeftscroll;
    }
    return { top, left };
  };
  componentDidMount = () => {
    this.tooltipBoxElement.offsetWidth
  } */
  componentWillUnmount = () => this.removeDocClickListner();
  getTop = () => (this.props.isMobile() ? '35px' : `-${this.state.tooltipTop}px`);
  getRight = () => (this.props.isMobile() ? `-18px` : '-238px');
  getArrowDirection = () => (this.props.isMobile() ? '' : '(-87deg)');
  getAfterTop = () => (this.props.isMobile() ? '-12px' : 'calc(50%)');
  getAfterRight = () => (this.props.isMobile() ? `calc(10%)` : '228px');
  getTooltipQuestionMarkProps = () => {
    if (this.props.isMobile()) {
      return {
        onClick: this.showTooltip,
      };
    }
    return {
      onMouseOver: this.showTooltip,
      onMouseOut: this.hideTooltip,
    };
  };
  setTooltipRef = element => (this.tooltipElement = element);
  setTooltipBoxRef = element => (this.tooltipBoxElement = element);
  toggleDocClickListner = action => document.body[`${action}EventListener`]('click', this.hideTooltip, false);
  addDocClickListner = () => this.toggleDocClickListner('add');
  removeDocClickListner = () => this.toggleDocClickListner('remove');
  hideTooltip = (event = {}) => {
    if (!this.state.canShowTooltip) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    const isTooltipClicked = this.tooltipElement.contains(event.target);
    const isTooltipBoxClicked = this.tooltipBoxElement && this.tooltipBoxElement.contains(event.target);
    if (((isTooltipClicked && !this.props.isMobile()) || isTooltipBoxClicked) && event.type === 'click') {
      return;
    }
    this.hideTooltipTimer = setTimeout(() => this.setState(state => ({ canShowTooltip: false })), 250);
  };
  afterShowingTooltip = () => {
    this.props.isMobile() && this.addDocClickListner();
    if (this.state.canShowTooltip) {
      this.setState({
        tooltipTop: (this.tooltipBoxElement.scrollHeight - this.tooltipElement.scrollHeight) / 2,
        tooltipLeft: (this.tooltipBoxElement.scrollWidth - this.tooltipElement.scrollWidth) / 2,
      });
    }
  };
  showTooltip = event => {
    console.error('showTooltip');
    event.stopPropagation();
    event.preventDefault();
    this.hideTooltipTimer && clearTimeout(this.hideTooltipTimer);
    console.error(this.state.canShowTooltip);
    if (this.state.canShowTooltip) {
      this.props.isMobile() && event.type === 'click' && this.hideTooltip();
      return;
    }
    this.setState({ canShowTooltip: true }, this.afterShowingTooltip);
  };
  render = () => (
    <FlexWrap alignItems="flex-end">
      <s.TooltipMainWrap>
        <TooltipQuestionMark
          {...this.getTooltipQuestionMarkProps()}
          isActive={this.state.canShowTooltip}
          innerRef={this.setTooltipRef}
          id={this.props.id}
        />
        {this.state.canShowTooltip && (
          <TooltipBox
            {...this.getTooltipQuestionMarkProps()}
            innerRef={this.setTooltipBoxRef}
            top={this.props.top || this.getTop()}
            right={this.props.right || this.getRight()}
            afterTop={this.props.afterTop || this.getAfterTop()}
            afterRight={this.props.afterRight || this.getAfterRight()}
            rotate={this.getArrowDirection()}
          >
            {this.props.children}
          </TooltipBox>
        )}
      </s.TooltipMainWrap>
    </FlexWrap>
  );
}

CustomToolTip.defaultProps = {
  canShowTooltip: false,
  children: '',
  id: '',
  isMobile() {},
  top: undefined,
  right: undefined,
  afterTop: undefined,
  afterRight: undefined,
};

CustomToolTip.propTypes = {
  isMobile: PropTypes.func,
  canShowTooltip: PropTypes.bool,
  id: PropTypes.string,
  top: PropTypes.string,
  right: PropTypes.string,
  afterTop: PropTypes.string,
  afterRight: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export default withDeviceInfo(CustomToolTip);
