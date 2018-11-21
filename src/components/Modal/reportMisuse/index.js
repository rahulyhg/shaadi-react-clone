import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';
import ss from '../styles';

class ReportMisuse extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      listOpen: '',
      misuseUploadInfo: '',
      showError: false,
      misuseReasons: this.getDefaultMisuseReasons(),
    };

    this.renderReportMisuseReasons = this.renderReportMisuseReasons.bind(this);
    this.renderMisuseUpload = this.renderMisuseUpload.bind(this);
    this.renderThanksMessage = this.renderThanksMessage.bind(this);
    this.renderLoader = this.renderLoader.bind(this);

    this.onUploadAttachment = this.onUploadAttachment.bind(this);
    this.onMisuseReasonSubmit = this.onMisuseReasonSubmit.bind(this);
    this.onMisuseUploadSubmit = this.onMisuseUploadSubmit.bind(this);
    this.onMisuseUploadReset = this.onMisuseUploadReset.bind(this);
    this.onReasonChecked = this.onReasonChecked.bind(this);
    this.toggleList = this.toggleList.bind(this);
  }

  componentWillReceiveProps(props) {
    if (this.props.data.isModalClosed !== props.data.isModalClosed && props.data.isModalClosed) {
      this.props.onAction('reportMisuse_close', { data: this.props.data });
    }
  }

  onMisuseReasonSubmit() {
    let category = '';
    const reasons = [];
    const misuseReasons = [...this.state.misuseReasons];
    misuseReasons.map(misuseReason => {
      misuseReason.subcategories.map(subcategory => {
        if (subcategory.selected === true) {
          category = misuseReason.name;
          reasons.push(subcategory.reason);
        }
        return null;
      });
      return null;
    });

    if (category === '') {
      this.setState({ showError: true });
      return false;
    }

    this.props.onAction('reportMisuse_confirm', category, reasons.join('|'), { data: this.props.data });
    return false;
  }

  onUploadAttachment(event) {
    this.props.onAction('reportMisuse_uploadAttachment', event.target.files[0], { data: this.props.data });
  }

  onMisuseUploadSubmit() {
    this.props.onAction('reportMisuse_upload', this.props.data.attachmentURL, this.state.misuseUploadInfo, { data: this.props.data });
  }

  onMisuseUploadReset() {
    this.props.data.onUploadCancel();
    this.props.onAction('reportMisuse_uploadReset', { data: this.props.data });
  }

  onReasonChecked(category, reason) {
    const misuseReasons = [...this.state.misuseReasons];
    misuseReasons.map(misuseReason => {
      if (misuseReason.category === category) {
        misuseReason.subcategories.map(subcategory => {
          if (subcategory.reason === reason) {
            subcategory.selected = subcategory.selected !== true;
          }
          return null;
        });
      }
      return null;
    });

    this.setState({ misuseReasons });
    return false;
  }

  getDefaultMisuseReasons = () => [
    {
      category: 'cat1',
      name: 'Fake/Misleading Profile',
      subcategories: [
        {
          id: '10',
          reason: 'Incorrect Profile information',
          selected: false,
        },
        {
          id: '11',
          reason: 'Phone number is incorrect/unreachable',
          selected: false,
        },
        {
          id: '12',
          reason: 'More than one Profile on Shaadi.com',
          selected: false,
        },
        {
          id: '13',
          reason: 'Photo belongs to someone else',
          selected: false,
        },
      ],
    },
    {
      category: 'cat2',
      name: 'Inappropriate/Unacceptable behaviour',
      subcategories: [
        {
          id: '20',
          reason: 'Member uses abusive/indecent language',
          selected: false,
        },
        {
          id: '21',
          reason: 'Member calls/texts me repeatedly',
          selected: false,
        },
        {
          id: '22',
          reason: 'Looking for dating/casual relationship',
          selected: false,
        },
        {
          id: '23',
          reason: 'Asking for money/Scammer',
          selected: false,
        },
      ],
    },
    {
      category: 'cat3',
      name: 'Member is already married/engaged',
      subcategories: [
        {
          id: '30',
          reason: 'I know this person',
          selected: false,
        },
        {
          id: '31',
          reason: 'Told by Member over chat/phone',
          selected: false,
        },
        {
          id: '32',
          reason: 'Found through social media/acquaintance',
          selected: false,
        },
      ],
    },
    {
      category: 'cat4',
      name: 'Photo related',
      subcategories: [
        {
          id: '40',
          reason: 'Irrelevant Photo',
          selected: false,
        },
        {
          id: '41',
          reason: 'Inappropriate/Indecent Photo',
          selected: false,
        },
        {
          id: '42',
          reason: 'Photo belongs to someone else',
          selected: false,
        },
      ],
    },
  ];

  toggleList(listName) {
    const misuseReasons = this.getDefaultMisuseReasons();

    if (this.state.listOpen === listName) {
      this.setState({ listOpen: '', showError: false, misuseReasons });
    } else {
      this.setState({ listOpen: listName, showError: false, misuseReasons });
    }
  }

  renderReportMisuseReasons() {
    return (
      <s.ReportMisuseReasonsWrap isVisible={this.props.data.isReasonVisible}>
        <ss.Header isReportMisuse>
          <s.ReportMisuseTitle>Report {this.props.data.name} to our Security Team</s.ReportMisuseTitle>
          <s.ReportMisuseCloseBtn onClick={this.props.onModalClose} />
        </ss.Header>
        {this.state.misuseReasons.map(misuseReason => (
          <s.ReportMisuseMainWrap
            key={misuseReason.category}
            onClick={() => this.toggleList(misuseReason.category)}
            isOpen={this.state.listOpen === misuseReason.category}
          >
            <s.ReportMisuseListTitle>
              <s.ReportMisuseTitleCopy isOpen={this.state.listOpen === misuseReason.category}>{misuseReason.name}</s.ReportMisuseTitleCopy>
              <s.ReportMisuseArrow isOpen={this.state.listOpen === misuseReason.category} />
            </s.ReportMisuseListTitle>
            <s.ReportMisuseAction isOpen={this.state.listOpen === misuseReason.category}>
              {misuseReason.subcategories.map(subcategory => (
                <s.ReportMisuseLabelWrap
                  key={subcategory.id}
                  onClick={e => {
                    e.stopPropagation();
                  }}
                >
                  <s.ReportMisuseCheckBox
                    type="checkbox"
                    name="reason[]"
                    id={subcategory.id}
                    value={subcategory.reason}
                    checked={subcategory.selected}
                    onChange={e => {
                      e.stopPropagation();
                      return this.onReasonChecked(misuseReason.category, subcategory.reason);
                    }}
                  />
                  <s.ReportMisuseLabel htmlFor={subcategory.id}>{subcategory.reason}</s.ReportMisuseLabel>
                </s.ReportMisuseLabelWrap>
              ))}
              <s.ReportMisuseError isVisible={this.state.showError}>Please specify reason</s.ReportMisuseError>
            </s.ReportMisuseAction>
          </s.ReportMisuseMainWrap>
        ))}

        <s.ReportMisuseFooter>
          <s.ReportMisuseBtn onClick={this.onMisuseReasonSubmit} isVisible={this.state.listOpen !== ''}>
            Submit
          </s.ReportMisuseBtn>
        </s.ReportMisuseFooter>
      </s.ReportMisuseReasonsWrap>
    );
  }

  renderMisuseUpload() {
    return (
      <s.ReportMisuseUploadWrp isVisible={this.props.data.isUploaderVisible}>
        <s.CloseIntentModalBtn onClick={this.props.onModalClose} />
        <s.ReportMisuseReportingIcon />
        <s.ReportMisuseThankyouText>
          <s.ReportMisuseThankyouMsg>Thanks for reporting this Profile</s.ReportMisuseThankyouMsg>
          Our Security Team will get in touch with you to get further details
        </s.ReportMisuseThankyouText>

        <s.ReportMisuseTextarea
          placeholder="Please provide any additional information about issue"
          value={this.state.misuseUploadInfo}
          onChange={e => this.setState({ misuseUploadInfo: e.target.value })}
          onClick={e => e.preventDefault()}
        />

        <s.ReportingBorder />
        <s.ReportMisuseUploadTxt>Please upload supporting screenshot, if any</s.ReportMisuseUploadTxt>

        <s.MisuseSsUploadingWrap>
          <s.UploadPhotoBlock isVisible={this.props.data.isUploaderInputVisible}>
            <s.ChooseFileInputWrap>
              <s.InpuFileField id="file" type="file" value="" onChange={this.onUploadAttachment} />
              <s.InputLabelWrap htmlFor="file">
                <s.ChooseFileIcon />
                <s.ChooseFileText>Choose file</s.ChooseFileText>
              </s.InputLabelWrap>
            </s.ChooseFileInputWrap>
          </s.UploadPhotoBlock>

          <s.ProgressBorder isVisible={this.props.data.isUploaderProgressVisible}>
            <s.FileName>
              {this.props.data.attachmentName && this.props.data.attachmentName}
              {(this.props.data.attachmentProgress &&
                this.props.data.attachmentProgress !== 100 &&
                ` ( ${this.props.data.attachmentProgress}% )`) ||
                ''}
            </s.FileName>
            <s.ProgressBarClose onClick={this.onMisuseUploadReset} />
            <s.ProgressBarWrap attachmentProgress={this.props.data.attachmentProgress}>
              <s.ProgressBar attachmentProgress={this.props.data.attachmentProgress} />
            </s.ProgressBarWrap>
          </s.ProgressBorder>

          <s.ProgressBorder isVisible={this.props.data.isInvalidAttachment}>
            <s.FileName>
              {this.props.data.attachmentName && `${this.props.data.attachmentName} ( Uploading failed, `}
              <s.RetryLink
                onClick={() => {
                  const fileInput = document.getElementById('file');
                  fileInput.click();
                }}
              >
                Retry
              </s.RetryLink>{' '}
              )
            </s.FileName>
            <s.ProgressBarClose onClick={this.onMisuseUploadReset} />
            <s.ProgressBarWrap>
              <s.ProgressFailed />
            </s.ProgressBarWrap>
          </s.ProgressBorder>

          <s.ProgressDelete isVisible={this.props.data.isUploaderDeleteVisible}>
            <s.FileNameDele>{this.props.data.attachmentName && `${this.props.data.attachmentName} `}</s.FileNameDele>
            <s.FileDeleteIcon onClick={this.onMisuseUploadReset} />
          </s.ProgressDelete>
        </s.MisuseSsUploadingWrap>

        <s.ReportMisuseFooter>
          <s.ReportMisuseBtn onClick={this.onMisuseUploadSubmit} isVisible>
            Continue
          </s.ReportMisuseBtn>
        </s.ReportMisuseFooter>
      </s.ReportMisuseUploadWrp>
    );
  }

  renderThanksMessage() {
    return (
      <s.ThanksWrap isVisible={this.props.data.isThanksVisible}>
        <s.CloseIntentModalBtn onClick={this.props.onModalClose} />
        <s.ThanksGreenIcon />
        <s.ThanksMsg>Thanks!</s.ThanksMsg>
        <s.ThanksMsgPara>We will get in touch with you shortly</s.ThanksMsgPara>
      </s.ThanksWrap>
    );
  }

  renderLoader() {
    return (
      <s.ModalLoader isVisible={this.props.data.isLoaderVisible}>
        <s.SvgLoader>
          <s.SvgPath viewBox="25 25 50 50">
            <s.SvgCircle cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
          </s.SvgPath>
        </s.SvgLoader>
      </s.ModalLoader>
    );
  }

  render() {
    return (
      <s.BlockMember>
        <ss.Content isReportMisuse>
          {this.renderReportMisuseReasons()}
          {this.renderMisuseUpload()}
          {this.renderThanksMessage()}
          {this.renderLoader()}
        </ss.Content>
      </s.BlockMember>
    );
  }
}

ReportMisuse.propTypes = {
  data: PropTypes.shape({
    uid: PropTypes.string,
    name: PropTypes.string,
    helpdeskid: PropTypes.number,
    attachmentURL: PropTypes.string,
    attachmentProgress: PropTypes.number,
    attachmentName: PropTypes.string,
    onUploadCancel: PropTypes.func,
    isUploaderInputVisible: PropTypes.bool.isRequired,
    isUploaderProgressVisible: PropTypes.bool.isRequired,
    isUploaderDeleteVisible: PropTypes.bool.isRequired,
    isInvalidAttachment: PropTypes.bool.isRequired,
    isReasonVisible: PropTypes.bool.isRequired,
    isLoaderVisible: PropTypes.bool.isRequired,
    isUploaderVisible: PropTypes.bool.isRequired,
    isThanksVisible: PropTypes.bool.isRequired,
    isModalClosed: PropTypes.bool.isRequired,
  }).isRequired,
  onModalClose: PropTypes.func.isRequired,
  onAction: PropTypes.func.isRequired,
};

export default ReportMisuse;
