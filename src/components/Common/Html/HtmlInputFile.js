import React, { PureComponent } from 'react';
import PropTypes from '../../../PropTypes';
import s from './styles';

class HtmlInputFile extends PureComponent {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event);
    }
  }

  render() {
    return (
      <s.InputFile
        type="file"
        accept={this.props.accept}
        multiple={this.props.allowMultiple}
        onChange={this.onChange}
        hide={this.props.hide}
      />
    );
  }
}

HtmlInputFile.defaultProps = {
  hide: true,
  accept: 'image/*',
  allowMultiple: true,
};

HtmlInputFile.propTypes = {
  hide: PropTypes.bool.isRequired,
  allowMultiple: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  accept: PropTypes.string.isRequired,
};

export default HtmlInputFile;
