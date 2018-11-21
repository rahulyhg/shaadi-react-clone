import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import LoadComponentIfCalled from '../../LoadComponentIfCalled';
import Relative from '../../../theme/Relative';
import Wrapper from '../../../theme/Wrapper';
import withDeviceInfo from '../../HOC/withDeviceInfo';
import ShowHide from '../../HOC/ShowHide';
import TextField from './TextField';
import Arrow from './Arrow';
import { drawerTextField, drawerTheme } from './theme';
import TextFieldWithLabel from './TextFieldWithLabel';
import FormFieldLabel from './FormFieldLabel';

const Drawer = LoadComponentIfCalled(() => import(/* webpackChunkName: "Drawer" */ './Drawer').then(module => module.default));

const DrawerFields = LoadComponentIfCalled(() =>
  import(/* webpackChunkName: "DrawerFields" */ './DrawerFields').then(module => module.default),
);

class ResponsiveFormFieldWithOptions extends PureComponent {
  state = {
    isDrawerOpen: false,
  };
  onDone = value => event => {
    this.onDrawerClose(() => this.props.onDone(value));
  };
  onOptionSelection = (...params) => {
    // time out for showing ripple on options
    setTimeout(() => {
      if (this.props.isMulti) {
        this.props.onOptionSelection(...params);
      } else {
        this.onDrawerClose(() => this.props.onOptionSelection(...params));
      }
    }, 100);
  };
  onDrawerClose = (afterDrawerClose = () => false) =>
    this.state.isDrawerOpen &&
    this.setState({ isDrawerOpen: false }, () => {
      afterDrawerClose();
    });
  openDrawer = event => {
    event.preventDefault();
    event.stopPropagation();
    !this.props.isDisabled && this.setState({ isDrawerOpen: true });
  };
  hasDrawerHash = (props = this.props) => props.history.location.hash.includes('drawer');
  closeDrawer = event => {
    event.preventDefault();
    event.stopPropagation();
    this.onDrawerClose();
  };
  renderDrawerInputField = () => (
    <Fragment>
      <MuiThemeProvider theme={drawerTextField}>
        <Relative onClick={this.openDrawer}>
          <Wrapper>
            <Wrapper {...this.props}>
              <TextField
                {...this.props}
                label={<FormFieldLabel {...this.props} />}
                isReadOnly
                helperText={this.props.canShowError ? this.props.getErrorMsg() : undefined}
                extraElement={<Arrow direction={'right'} canShowError={this.props.canShowError} />}
              />
            </Wrapper>
          </Wrapper>
        </Relative>
      </MuiThemeProvider>
      <MuiThemeProvider theme={{ ...drawerTheme, ...this.props.drawerTheme }}>
        <Drawer
          id="drawer"
          open={this.state.isDrawerOpen}
          onClose={() => this.onDrawerClose()}
          ModalProps={{
            disableRestoreFocus: true,
            BackdropProps: {
              className: 'drawer-overlay',
            },
          }}
        >
          {this.state.isDrawerOpen && (
            <Wrapper position="relative" overflow="hidden" bgColor="#f1f1f2" height="100vh" width="80vw" minHeight="100%" withBoxShadow>
              <DrawerFields
                {...this.props}
                {...this.props.drawerProps}
                onOptionSelection={this.onOptionSelection}
                onDone={this.onDone}
                closeDrawer={this.closeDrawer}
                autoSelectOnBlur={false}
                afterBlur={undefined}
                autoComplete="off"
                maxLength={50}
              />
            </Wrapper>
          )}
        </Drawer>
      </MuiThemeProvider>
    </Fragment>
  );
  render = () => (this.props.isMobile() ? this.renderDrawerInputField() : <TextFieldWithLabel {...this.props} />);
}

ResponsiveFormFieldWithOptions.defaultProps = {
  isMulti: false,
  isDisabled: false,
  canShowError: undefined,
  drawerTheme: undefined,
  drawerProps: undefined,
  getErrorMsg: () => 'Oops! You seem to have missed this',
  onDone() {},
};
ResponsiveFormFieldWithOptions.propTypes = {
  isMobile: PropTypes.func.isRequired,
  onOptionSelection: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  getErrorMsg: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  isMulti: PropTypes.bool.isRequired,
  canShowError: PropTypes.bool,
  isDisabled: PropTypes.bool,
  history: PropTypes.shape(PropTypes.history).isRequired,
  drawerTheme: PropTypes.shape({}),
  drawerProps: PropTypes.shape({}),
};

export default withRouter(withDeviceInfo(ShowHide(ResponsiveFormFieldWithOptions)));
