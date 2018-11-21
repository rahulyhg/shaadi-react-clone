import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from '../../../PropTypes';
import doHeaderAction from '../../../actions/doHeaderAction';
import s from './styles';
import HtmlInputField from '../Html/HtmlInputField';

class UploadFromComputerBtn extends PureComponent {
  static mapStateToProps(state) {
    return {};
  }

  constructor(props) {
    super(props);
    this.state = {
      hasFileUploadActionDispatched: false,
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange();
    } else if (event && event.target && event.target.files) {
      // reset input file value by rerendering the component, see keyname used in render
      this.setState({ hasFileUploadActionDispatched: true });
      this.props.doHeaderAction(this.props.source, 'profilePhotoUpload', null, event.target.files);
    }
  }

  render() {
    const keyName = `key-name-${new Date()}`;
    return (
      <div>
        <s.PhotoUploadInputBtn showIcon={this.props.showIcon} width={this.props.width} padding={this.props.padding}>
          <HtmlInputField
            key={keyName}
            type="input"
            subType="file"
            allowMultiple
            onChange={this.onChange}
            isInputVisible={this.props.isInputVisible}
            accept={this.props.accept}
          />
          {this.props.text}
        </s.PhotoUploadInputBtn>
      </div>
    );
  }
}

UploadFromComputerBtn.defaultProps = {
  showIcon: true,
  text: 'Upload Photo',
  accept: 'image/*',
  width: 'auto',
  padding: '',
  isInputVisible: false,
  source: 'PhotoDocking',
};

UploadFromComputerBtn.propTypes = {
  text: PropTypes.oneOf(['Upload Photo', 'Browse Photo']).isRequired,
  accept: PropTypes.string.isRequired,
  showIcon: PropTypes.bool.isRequired,
  onChange: PropTypes.func, // eslint-disable-line react/require-default-props
  width: PropTypes.string.isRequired,
  doHeaderAction: PropTypes.func.isRequired,
  padding: PropTypes.string,
  isInputVisible: PropTypes.bool.isRequired,
  source: PropTypes.string,
};

const mapDispatchToProps = { doHeaderAction };

export default connect(UploadFromComputerBtn.mapStateToProps, mapDispatchToProps)(UploadFromComputerBtn);
