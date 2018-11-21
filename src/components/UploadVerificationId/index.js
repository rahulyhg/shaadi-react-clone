import React, { PureComponent, Fragment } from 'react';
import s from './styles';
import PropTypes from '../../PropTypes';
import capitalize from '../../helpers/capitalize';
import ProfilePhotoWithShield from '../Common/ProfilePhotoWithShield';
import RadioTabGroup from '../Common/FormElements/RadioTabGroup';
import HtmlInputField from '../Common/Html/HtmlInputField';

class UploadVerificationId extends PureComponent {
  state = {
    selectedDoc: 'PAN',
    isContinue: false,
    isAvailBadge: '',
    isDocScreening: '',
  };

  componentDidMount() {
    this.props.doProfileAction('Trust Badge', this.props.user.uid, 'getRegPhotoProfile');

    this.props
      .doTrustBadgeAction('Trust Badge', this.props.user.uid, 'getTrustBadgeData')
      .then(response => {
        const { count, status } = response.data.data[0].id_proof;
        const strCount = count > 1 ? `${count} Documents` : `${count} Document`;
        const strStatus = status === 'Uploaded' ? 'Submitted' : status;

        const strScreening = status === 'Uploaded' && `Your ${count > 1 ? `documents are` : `document is`} under screening`;

        count &&
          this.setState({
            isAvailBadge: `${strCount} ${strStatus}`,
            isDocScreening: strScreening,
          });
      })
      .catch(error => {});
  }

  componentDidUpdate() {
    Object.keys(this.props.documentUpload.attachments).map(doc => this.sendTrustBadgeData(doc));
  }

  docOptions = [
    { value: 'PAN', label: 'PAN' },
    { value: 'Passport', label: 'Passport' },
    { value: 'Driving License', label: 'Driving License' },
    { value: 'Voter ID', label: 'Voter ID' },
    { value: 'Other', label: 'Other' },
  ];

  sendTrustBadgeData = fileName => {
    const { isAttachmentUploaded, attachmentPath, trustBadgeStatus } = this.props.documentUpload.attachments[fileName];

    this.setState({
      isContinue: isAttachmentUploaded,
    });

    isAttachmentUploaded &&
      !trustBadgeStatus &&
      this.props.doTrustBadgeAction('Trust Badge', this.props.user.uid, 'addTrustBadgeData', {
        fileName,
        filePath: attachmentPath,
        docType: this.state.selectedDoc,
      });
  };

  documentChange = (event, params) => {
    this.setState({
      selectedDoc: params.value,
    });
  };

  doUploadFile = event => {
    this.setState({
      isContinue: false,
    });

    this.props.doHeaderAction('Trust Badge', 'documentUpload', null, event.target.files);
  };

  renderInnerContent = () => (
    <Fragment>
      {this.state.isAvailBadge && <DocumentStatus {...this.props} {...this.state} />}
      <s.VerifyProfileWrap>
        {!this.props.isNative && (
          <s.VerifyHeading>
            <s.Bold weight={500}>Verify & get 2 times better responses!</s.Bold>
          </s.VerifyHeading>
        )}
        <ProfilePhotoWithShield {...this.props} />
        {this.props.user.firstName && (
          <s.VerifyHeading isSmall>
            <s.Bold weight={500}>{`Upload ${capitalize(this.props.user.firstName)}'s ID`}</s.Bold>
          </s.VerifyHeading>
        )}
        <s.HelpHeading>
          <s.Bold weight={300}>
            This badge will be added to your profile{this.props.layout === 'desktop' ? ` after verification` : ``}
          </s.Bold>
        </s.HelpHeading>
        {this.props.layout === 'mobile' && (
          <s.HelpHeading>
            <s.Bold weight={300}>after verification</s.Bold>
          </s.HelpHeading>
        )}
        <s.Divider />
        <s.ProfileFormMain>
          <RadioTabGroup
            options={this.docOptions}
            onChange={this.documentChange}
            name="type_of_id_proof"
            value={this.state.selectedDoc}
            defaultWrap={s.tabwrapper}
            defaultBtnWrap={s.StyleButton}
          />
          <s.OfflineIdUploadWrap>
            {Object.keys(this.props.documentUpload.attachments).map(doc => <UploadedFiles key={doc} {...this.props} fileName={doc} />)}
            <s.UploadFileLabel>
              <HtmlInputField
                type="input"
                subType="file"
                allowMultiple={false}
                onChange={this.doUploadFile}
                isInputVisible={false}
                accept={null}
              />
              <s.IdUploadBtnWrap isUploadedDoc={Object.keys(this.props.documentUpload.attachments).length}>
                <s.IdUploadBtn />
                <s.IdUploadText>Choose a file...</s.IdUploadText>
              </s.IdUploadBtnWrap>
            </s.UploadFileLabel>
          </s.OfflineIdUploadWrap>
          <s.SubmitBtn
            isMobile={this.props.layout === 'mobile'}
            onClick={() => {
              window.location = this.props.nextUrl;
            }}
            disabled={!this.state.isContinue}
          >
            Continue
          </s.SubmitBtn>
        </s.ProfileFormMain>
      </s.VerifyProfileWrap>
    </Fragment>
  );

  renderContent = () =>
    this.props.isNative ? this.renderInnerContent() : <s.VerifiProfileSubMainWrap>{this.renderInnerContent()}</s.VerifiProfileSubMainWrap>;

  render() {
    return <s.VerifyProfileMainWrap isNative={this.props.isNative}>{this.renderContent()}</s.VerifyProfileMainWrap>;
  }
}

export const DocumentStatus = props => (
  <s.DocumentStatusWrap isNative={props.isNative}>
    <s.DocumentStatusText>
      <s.DocumentStatusTick />
      {props.isAvailBadge}
    </s.DocumentStatusText>
    {props.isDocScreening && <s.DocumentScreeningText>{props.isDocScreening}</s.DocumentScreeningText>}
  </s.DocumentStatusWrap>
);

export const UploadedFiles = props => {
  const { showProgress } = props.documentUpload.attachments[props.fileName] || false;
  return (
    <s.UploadedFileWrap isProgress={showProgress}>
      <s.FileIcon />
      <s.FileText isProgress={showProgress}>
        {props.fileName}
        <s.ProgressText isVisible={showProgress}>Uploading...</s.ProgressText>
      </s.FileText>
    </s.UploadedFileWrap>
  );
};

UploadVerificationId.propTypes = {
  user: PropTypes.shape(PropTypes.shaadiUser).isRequired,
  doProfileAction: PropTypes.func.isRequired,
  doTrustBadgeAction: PropTypes.func.isRequired,
  doHeaderAction: PropTypes.func.isRequired,
  isNative: PropTypes.bool.isRequired,
  layout: PropTypes.string.isRequired,
  nextUrl: PropTypes.string.isRequired,
  documentUpload: PropTypes.shape({
    attachments: PropTypes.shape({
      fileName: PropTypes.string,
      attachmentPath: PropTypes.string,
      trustBadgeStatus: PropTypes.string,
      showProgress: PropTypes.bool,
      isAttachmentUploaded: PropTypes.bool,
    }),
  }).isRequired,
};

DocumentStatus.defaultProps = {
  isAvailBadge: '',
  isDocScreening: '',
};

DocumentStatus.propTypes = {
  isNative: PropTypes.bool.isRequired,
  isAvailBadge: PropTypes.string,
  isDocScreening: PropTypes.string,
};

UploadedFiles.defaultProps = {
  fileName: '',
};

UploadedFiles.propTypes = {
  fileName: PropTypes.string,
  documentUpload: PropTypes.shape({
    attachments: PropTypes.shape({
      attachmentPath: PropTypes.string,
      trustBadgeStatus: PropTypes.string,
      showProgress: PropTypes.bool,
      isAttachmentUploaded: PropTypes.bool,
    }),
  }).isRequired,
};

export default UploadVerificationId;
