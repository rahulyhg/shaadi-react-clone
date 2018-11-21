import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import doHeaderAction from '../../../actions/doHeaderAction';
import PropTypes from '../../../PropTypes';
import s from './styles';

class ImportFromFbBtn extends PureComponent {
  static mapStateToProps(state) {
    return {};
  }

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick();
    } else {
      this.props.doHeaderAction(this.props.source, 'fbPhotoUpload');
    }
  }

  render() {
    return (
      <s.FbUploadBtn
        id="import-from-fb-btn"
        onClick={this.onClick}
        isFbBtn
        onHoverBakGndColor={this.props.onHoverBakGndColor}
        bakGndColor={this.props.bakGndColor}
        useBackground={this.props.useBackground}
        padding={this.props.padding}
        border={this.props.border}
        margin={this.props.margin}
      >
        <s.FbUploadBtnIcon showIcon={this.props.showIcon} fbBorder={this.props.fbBorder} />
        {this.props.text}
      </s.FbUploadBtn>
    );
  }
}

ImportFromFbBtn.defaultProps = {
  onHoverBakGndColor: '#1f4189',
  bakGndColor: '#3b5998',
  showIcon: true,
  fbBorder: true,
  useBackground: false,
  text: 'Facebook Upload',
  border: 'none',
  margin: '0 0 0 22px',
  padding: 'none',
  source: 'PhotoDocking',
};

ImportFromFbBtn.propTypes = {
  onClick: PropTypes.func, // eslint-disable-line react/require-default-props
  text: PropTypes.oneOf(['Import Photos', 'Facebook Upload']).isRequired,
  onHoverBakGndColor: PropTypes.string.isRequired,
  bakGndColor: PropTypes.string.isRequired,
  showIcon: PropTypes.bool.isRequired,
  doHeaderAction: PropTypes.func.isRequired,
  useBackground: PropTypes.bool.isRequired,
  border: PropTypes.string.isRequired,
  fbBorder: PropTypes.bool.isRequired,
  padding: PropTypes.string.isRequired,
  margin: PropTypes.string.isRequired,
  source: PropTypes.string,
};

const mapDispatchToProps = { doHeaderAction };

export default connect(ImportFromFbBtn.mapStateToProps, mapDispatchToProps)(ImportFromFbBtn);
