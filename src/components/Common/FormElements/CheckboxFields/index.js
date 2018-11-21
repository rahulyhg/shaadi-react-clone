import React, { PureComponent } from 'react';
import isBoolean from 'lodash/isBoolean';
import MuiCheckbox from '@material-ui/core/Checkbox';
import PropTypes from '../../../../PropTypes';

class Checkbox extends PureComponent {
  static getDerivedStateFromProps = (nextProps, prevState) => ({
    checked: isBoolean(nextProps.checked) ? nextProps.checked : prevState.checked,
  });
  state = { checked: !!this.props.checked };
  onChange = event => this.setState({ checked: !this.state.checked });
  render = () => <MuiCheckbox onChange={this.onChange} color="primary" checked={this.state.checked} {...this.props} />;
}

Checkbox.defaultProps = {
  onChange() {},
  checked: undefined,
};

Checkbox.propTypes = {
  onChange: PropTypes.func,
  checked: PropTypes.bool,
};

export default Checkbox;
