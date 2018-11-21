import React from 'react';
import PropTypes from '../../PropTypes';
import UpgradeModal from './UpgradeModal';
import CommonInterestsModal from './CommonInterestsModal';
import ViewContactConfirmModal from './ViewContactConfirmModal';
import BlockProfileModal from './BlockProfileModal';
import ViewContactModal from './ViewContactModal';
import AlbumModal from './AlbumModal';
import ReportMisuseModal from './ReportMisuseModal';
import FacetBarModal from './FacetBarModal';
import SendRequestModal from './SendRequestModal';
import ReportMisuseConfirmModal from './ReportMisuseConfirmModal';
import Filters from './Filters';

class ModalMobile extends React.Component {
  constructor(props) {
    super(props);
    this.onModalClose = this.modalAction('close');
    this.onMostMatchesTourInit = this.modalAction('mostMatchesTourInit');
    this.onAction = this.onAction.bind(this);
  }

  onAction(type, ...args) {
    this.props.doProfileAction(`modal/${this.props.template}`, (this.props.data[this.props.template] || {}).uid, type, ...args);
  }

  onListAction = source => {
    switch (source) {
      case 'inbox':
        return (type, ...args) => {
          this.props.doInboxAction(type, ...args);
          this.onModalClose();
        };

      default: {
        return null;
      }
    }
  };
  modalAction(...args) {
    return () => this.props.doModalAction(`modal/${this.props.template}`, (this.props.data[this.props.template] || {}).uid, ...args);
  }

  render() {
    const { template, settings, data } = this.props;
    switch (template) {
      case 'upgrade':
      case 'premiumProposition':
        return (
          <UpgradeModal {...data.upgradeModal} wwwBaseUrl={data.wwwBaseUrl} onAction={this.onAction} onModalClose={this.onModalClose} />
        );
      case 'commonInterests':
        return <CommonInterestsModal {...data.commonInterests} onAction={this.onAction} />;
      case 'viewContactConfirm':
        return <ViewContactConfirmModal {...data.viewContactConfirm} onAction={this.onAction} onModalClose={this.onModalClose} />;
      case 'blockProfile':
        return <BlockProfileModal {...data.blockProfile} onAction={this.onAction} onModalClose={this.onModalClose} />;
      case 'contactDetails':
        return (
          <ViewContactModal
            wwwBaseUrl={data.wwwBaseUrl}
            {...data.contactDetails}
            settings={settings}
            onAction={this.onAction}
            onModalClose={this.onModalClose}
          />
        );
      case 'reportMisuse':
        return <ReportMisuseModal {...data.reportMisuse} onAction={this.onAction} onModalClose={this.onModalClose} />;
      case 'album':
        return <AlbumModal {...data.album} onAction={this.onAction} onModalClose={this.onModalClose} isLiteApp={data.isLiteApp} />;
      case 'sendRequest':
        return <SendRequestModal {...data.sendRequest} onAction={this.onAction} settings={settings} onModalClose={this.onModalClose} />;
      case 'facetBar':
        return <FacetBarModal {...data.facetBar} onAction={this.onAction} onModalClose={this.onModalClose} />;
      case 'reportMisuseConfirm':
        return <ReportMisuseConfirmModal {...data.reportMisuseConfirm} onAction={this.onAction} onModalClose={this.onModalClose} />;
      case 'filters': {
        return <Filters {...data.filter} onAction={this.onListAction('inbox')} />;
      }
      default: {
        return null;
      }
    }
  }
}

ModalMobile.defaultProps = {
  saveSearchBox: {},
  searchType: {},
};

ModalMobile.propTypes = {
  template: PropTypes.mobileModalTemplate.isRequired,
  doModalAction: PropTypes.func.isRequired,
  doProfileAction: PropTypes.func.isRequired,
  doInboxAction: PropTypes.func.isRequired,
  data: PropTypes.shape({}).isRequired,
  settings: PropTypes.shape({}).isRequired,
};

export default ModalMobile;
