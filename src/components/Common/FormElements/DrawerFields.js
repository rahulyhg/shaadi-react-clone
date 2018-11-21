import React, { PureComponent } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import PropTypes from '../../../PropTypes';
import OptionsListing from './OptionsListing';
import ControlledInput from './ControlledInput';
import TextField from './DrawerTextField';
import DrawerLoader from '../Drawer/DrawerLoader';
import DrawerClose from '../Drawer/DrawerClose';
import DrawerTitle from '../Drawer/DrawerTitle';
import Wrapper from '../../../theme/Wrapper';
import Label from '../../../theme/Label';
import KeepAs from '../../../theme/Option';
import withDeviceInfo from '../../HOC/withDeviceInfo';
import Button from './Button';

import { drawerFieldTheme } from './theme';

const withDrawerFieldsController = ComposedComponent => {
  class withDrawerFieldsControllerComponent extends PureComponent {
    componentDidMount = () => this.setOptionFixedHeight();
    componentDidUpdate = () => this.setOptionFixedHeight();
    getKeepAsHeight = () => (this.keepAsRef ? this.keepAsRef.offsetHeight : 0);
    setOptionFixedHeight = () =>
      this.setState({
        optionFixedHeight: this.props.deviceInfo.height - this.drawerTitleRef.offsetHeight - this.getKeepAsHeight(),
      });
    setDrawerTitleRef = element => {
      this.drawerTitleRef = element;
    };
    setKeepAsRef = element => {
      this.keepAsRef = element;
    };
    canShowKeepAs = () => !!(this.props.canShowKeepAs && this.props.controlledInputProps.value.trim());
    keepAsRef = {
      offsetHeight: 0,
    };
    render = () => (
      <ComposedComponent
        {...this.props}
        {...this.state}
        setDrawerTitleRef={this.setDrawerTitleRef}
        setKeepAsRef={this.setKeepAsRef}
        showKeepAs={this.canShowKeepAs()}
      />
    );
  }
  withDrawerFieldsControllerComponent.defaultProps = {
    canShowKeepAs: false,
    drawerValue: undefined,
  };
  withDrawerFieldsControllerComponent.propTypes = {
    closeDrawer: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    canShowKeepAs: PropTypes.bool,
    drawerValue: PropTypes.string,
    deviceInfo: PropTypes.shape({
      height: PropTypes.number.isRequired,
    }).isRequired,
    controlledInputProps: PropTypes.shape({
      value: PropTypes.string.isRequired,
    }).isRequired,
  };
  return withDrawerFieldsControllerComponent;
};

const withControlledInput = ComposedComponent => {
  const withControlledInputComponent = props => (
    <ControlledInput {...props} isUncontrolled>
      {controlledInputProps => <ComposedComponent controlledInputProps={controlledInputProps} {...props} />}
    </ControlledInput>
  );
  return withControlledInputComponent;
};

const DrawerFields = props => {
  const {
    setDrawerTitleRef,
    setKeepAsRef,
    drawerTitleHeight,
    drawerTitle,
    isMulti,
    isLoading,
    isReadOnly,
    closeDrawer,
    isAutoComplete,
    value,
    drawerValue,
    canHideInput,
    ...inputProps
  } = props;
  return (
    <Wrapper position="relative" overflow="hidden" height={`${props.deviceInfo.height}px`}>
      <DrawerTitle innerRef={setDrawerTitleRef}>
        <DrawerClose closeDrawer={closeDrawer} />
        <Wrapper flex="3" minWidth={0} data-title>
          <Label display="flex">
            <Wrapper display="flex" minWidth="100%" minHeight="54px" alignItems="center">
              {isReadOnly ? (
                <Wrapper boldness={500} color="#51505d">
                  {props.label}
                </Wrapper>
              ) : (
                <MuiThemeProvider theme={drawerFieldTheme}>
                  <TextField
                    {...{ ...inputProps, ...props.controlledInputProps }}
                    values={drawerValue}
                    autoFocus={isAutoComplete}
                    noMargin
                  />
                </MuiThemeProvider>
              )}
            </Wrapper>
          </Label>
        </Wrapper>
      </DrawerTitle>
      {props.showKeepAs && (
        <Wrapper margin="12px 0 0 0" innerRef={setKeepAsRef}>
          <KeepAs isOptionGroup fontSize="18px" fontWeight="500" onClick={props.onDone(props.controlledInputProps.value)} id="keep-as">
            Keep as “{props.controlledInputProps.value}”
          </KeepAs>
        </Wrapper>
      )}
      {isLoading ? (
        <DrawerLoader id="drawer-loader" />
      ) : (
        <OptionsListing {...props} {...props.controlledInputProps} isMulti={isMulti} values={drawerValue} alwaysShowOptions />
      )}
      {isMulti &&
        drawerValue && (
          <Wrapper position="absolute" bottom="2vh" width="100%" zIndex={1}>
            <Button id="drawer-done" className="btn btn-action" padding="0" onClick={props.onDone(drawerValue)}>
              Done
            </Button>
          </Wrapper>
        )}
    </Wrapper>
  );
};

DrawerFields.defaultProps = {
  isMulti: false,
  isAutoComplete: false,
  isLoading: false,
  isReadOnly: false,
  value: undefined,
  drawerValue: undefined,
  closeDrawer: undefined,
  canHideInput: undefined,
  setDrawerTitleRef: undefined,
  setKeepAsRef: undefined,
  drawerTitle: undefined,
  optionFixedHeight: undefined,
  drawerTitleHeight: 54,
  onDone() {},
};

DrawerFields.propTypes = {
  isMulti: PropTypes.bool.isRequired,
  canHideInput: PropTypes.bool,
  isAutoComplete: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isReadOnly: PropTypes.bool.isRequired,
  value: PropTypes.string,
  drawerValue: PropTypes.string,
  label: PropTypes.string.isRequired,
  showKeepAs: PropTypes.bool.isRequired,
  setDrawerTitleRef: PropTypes.func,
  setKeepAsRef: PropTypes.func,
  onDone: PropTypes.func,
  closeDrawer: PropTypes.func.isRequired,
  drawerTitleHeight: PropTypes.number,
  optionFixedHeight: PropTypes.number,
  drawerTitle: PropTypes.node,
  deviceInfo: PropTypes.shape({ height: PropTypes.number.isRequired }).isRequired,
  controlledInputProps: PropTypes.shape({ value: PropTypes.string.isRequired }).isRequired,
};

export default withDeviceInfo(withControlledInput(withDrawerFieldsController(DrawerFields)));
export { DrawerClose };
