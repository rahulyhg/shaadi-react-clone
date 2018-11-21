import React, { PureComponent } from 'react';
import PropTypes from '../../../PropTypes';
import s from './styles';

class HtmlInputText extends PureComponent {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  onChange(event) {
    if (this.props.validateOnChange) {
      return false;
    }
    this.props.onChange(event);
    return true;
  }

  onBlur(event) {
    if (this.props.validateOnBlur) {
      return true;
    }
    this.props.onBlur(event);
    return true;
  }

  onFocus(event) {
    if (this.props.invalidateOnFocus) {
      return true;
    }
    this.props.onFocus(event);
    return true;
  }

  render() {
    return (
      <s.InputFile type="text" hide={this.props.hide} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.invalidateOnFocus} />
    );
  }
}

HtmlInputText.defaultProps = {
  hide: true,
  onChange() {},
  onBlur() {},
  onFocus() {},
  validateOnChange: false,
  validateOnBlur: true,
  invalidateOnFocus: false,
};

HtmlInputText.propTypes = {
  hide: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  validateOnChange: PropTypes.bool,
  validateOnBlur: PropTypes.bool,
  invalidateOnFocus: PropTypes.bool,
};

export default HtmlInputText;
