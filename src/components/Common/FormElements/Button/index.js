import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import s from './styles';

const styles = theme => ({
  buttonProgress: {
    color: '#fff',
    position: 'absolute',
    top: '54%',
    left: '50%',
    marginLeft: -12,
  },
});

class Button extends PureComponent {
  render() {
    const { children, classes, defaultWrap: MuiButton, ignoreRoot, layerBtn, ...props } = this.props;
    const MuiBtn = (
      <MuiButton data-test-id={this.props.id} {...props} layerbtn={layerBtn} loading={String(this.props.loading)}>
        {children}
      </MuiButton>
    );
    return ignoreRoot ? (
      MuiBtn
    ) : (
      <s.InputWrapper>
        {MuiBtn}
        {this.props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </s.InputWrapper>
    );
  }
}

Button.defaultProps = {
  onClick() {},
  onMouseDown() {},
  padding: '0 47px',
  height: '44px',
  margin: '29px 0 0',
  layerBtn: '',
  defaultWrap: s.InputButton,
  loading: false,
  ignoreRoot: false,
  type: 'button',
  id: '',
  name: '',
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  defaultWrap: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.element]).isRequired,
  onClick: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  height: PropTypes.string.isRequired,
  padding: PropTypes.string.isRequired,
  layerBtn: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,   // eslint-disable-line
  loading: PropTypes.bool.isRequired,
  ignoreRoot: PropTypes.bool.isRequired,
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
};

export default withStyles(styles)(Button);
