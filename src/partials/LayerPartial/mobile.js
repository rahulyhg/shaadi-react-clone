/* eslint react/require-default-props: 0 */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Slide from '@material-ui/core/Slide';

import Dialog from '../../mComponents/Common/Mui/Dialog';

import PropTypes from '../../PropTypes';
import ModalMobile from '../../mComponents/ModalMobile';
import doModalAction from '../../actions/doModalAction/mobile';
import doProfileAction from '../../actions/doProfileAction/mobile';
import filterSelected from '../../actions/doInboxAction/filterSelected';
import constants from '../../constants/constants';
import withReducer from '../../withReducer';
import modalReducer from '../../reducers/modal';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class LayerMobilePartial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.template !== 'none',
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ open: props.template !== 'none' });
  }

  handleClose = () => {
    const uid = (this.props[this.props.template] || {}).uid || null;
    this.props.doModalAction(`modal/${this.props.template}`, uid, 'close', { global: true });
  };

  render() {
    const { open } = this.state;
    const { template, fullScreen, settings,location, ...data } = this.props; //eslint-disable-line
    return (
      <Dialog
        transition={Transition}
        fullScreen={fullScreen}
        open={open}
        onClose={this.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <ModalMobile
          data={data}
          settings={settings}
          template={template}
          location={location}
          doProfileAction={this.props.doProfileAction}
          doModalAction={this.props.doModalAction}
          doInboxAction={this.props.filterSelected}
        />
      </Dialog>
    );
  }
}

LayerMobilePartial.defaultProps = {
  template: 'none',
  fullScreen: false,
};

LayerMobilePartial.propTypes = {
  template: PropTypes.mobileModalTemplate.isRequired,
  doModalAction: PropTypes.func.isRequired,
  doProfileAction: PropTypes.func.isRequired,
  filterSelected: PropTypes.func.isRequired,
};

const selector = (state, { location }) => {
  const {
    fullScreen,
    template,
    premiumProposition,
    facetBar,
    commonInterests,
    viewContactConfirm,
    blockProfile,
    reportMisuse,
    sendRequest,
    contactDetails,
    album,
    reportMisuseConfirm,
    filter,
  } = state.modal;
  const { searchType } = state.otherSearch;

  return {
    template,
    fullScreen,
    searchType,
    upgradeModal: premiumProposition,
    commonInterests,
    viewContactConfirm,
    blockProfile,
    facetBar,
    album,
    reportMisuse,
    contactDetails,
    sendRequest,
    wwwBaseUrl: state.config.app.wwwBaseUrl,
    settings: state.session.settings,
    reportMisuseConfirm,
    filter,
    location,
    isLiteApp: state.config.app.platform === constants.LITE_APP_PLATFORM,
  };
};

const LayerPartial = withMobileDialog()(LayerMobilePartial);

export { LayerPartial };

export default withReducer('modal', modalReducer)(
  withRouter(
    connect(selector, {
      doModalAction,
      doProfileAction,
      filterSelected,
    })(withMobileDialog()(LayerMobilePartial)),
  ),
);
