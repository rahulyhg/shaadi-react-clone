import React from 'react';
import PropTypes from '../../../PropTypes';
import s from './styles';
import ss from '../styles';
import Spinner from '../../Common/Spinner';
import Tooltip from '../../Common/Tooltip';

class SendRequest extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      message: props.data.message || '',
      willSendPassword: false,
      draftId: null,
      charactersLeft: 4000 - (props.data.message || '').length,
      isSaveBtnActive: false,
      isDraftListVisible: false,
      isPreviewVisible: false,
      ready: false,
      isReadMore: false,
    };
    this.onTextAreaChange = this.onTextAreaChange.bind(this);
    this.toggleDraftList = () => this.setState({ isDraftListVisible: !this.state.isDraftListVisible });
    this.sendRequest = this.sendRequest.bind(this);
    this.onOpenDraftsClick = this.onOpenDraftsClick.bind(this);
    this.reloadDrafts = () => this.props.doProfileAction(this.props.data.source, this.props.data.uid, 'reloadDrafts');
    this.onSaveDraft = this.onSaveDraft.bind(this);
    this.onOverwriteDraft = this.onOverwriteDraft.bind(this);
    this.renderSendPassword = this.renderSendPassword.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
    this.renderPreview = this.renderPreview.bind(this);
  }

  componentDidMount() {
    this.reloadDrafts();
  }

  componentWillReceiveProps(props) {
    if (!this.props.data || this.props.data.message !== props.data.message) {
      this.setState({ message: props.data.message || '', charactersLeft: 4000 - (props.data.message || '').length, ready: true });
    }
  }

  onTextAreaChange(value) {
    const charactersLeft = 4000 - value.length;
    if (charactersLeft >= 0) {
      this.setState({
        charactersLeft,
        message: value,
        isSaveBtnActive: value.length && value.length > 0,
      });
    }
  }

  onChooseDraftClick(item) {
    const message = item.message;
    const charactersLeft = 4000 - message.length;
    this.setState({
      charactersLeft,
      message,
      draftId: item.id,
      isSaveBtnActive: false,
      isDraftListVisible: false,
    });
  }

  onSaveDraft() {
    if (!this.state.isSaveBtnActive) {
      return;
    }
    this.setState({ isSaveBtnActive: false });
    this.props.doProfileAction(this.props.data.source, this.props.data.uid, 'newDraft', this.state.message);
  }

  onOverwriteDraft() {
    if (!this.state.isSaveBtnActive || !this.state.draftId) {
      return;
    }
    this.setState({ isSaveBtnActive: false });
    const { message, draftId } = this.state;
    this.props.doProfileAction(this.props.data.source, this.props.data.uid, 'modifyDraft', message, draftId);
  }

  onOpenDraftsClick() {
    if (!this.state.isDraftListVisible) {
      this.reloadDrafts();
    }
    this.toggleDraftList();
  }

  sendRequest() {
    console.log('%c wire SendPhotoPassword case', 'font-size: 20px');
    const actionHash = {
      remind: 'remind_confirm',
      accept: this.props.data.showMessageLayer ? 'send_message' : 'accept_confirm',
    };
    if (this.props.data.uid) {
      const action = actionHash[this.props.data.type] || 'connect_confirm';
      this.props.doProfileAction(this.props.data.source, this.props.data.uid, action, this.state.message, this.state.willSendPassword);
    }
    if (this.props.data.uids && this.props.data.uids.length > 0) {
      this.props.doProfileAction(
        this.props.data.source,
        null,
        'bulkConnect_confirm',
        this.props.data.uids,
        this.state.message,
        this.state.willSendPassword,
      );
    }
  }

  renderButtons() {
    if (this.props.data.flash) {
      return <s.RequestFlash icon={this.props.data.flashIcon}>{this.props.data.flash}</s.RequestFlash>;
    }
    if (this.props.data.hasExceededDraftLimit || this.props.data.draftItems.length >= 5) {
      return (
        <div>
          <Tooltip trigger="hover" offset={[0, -5]} tooltip={manageDraftTooltip}>
            <s.DraftBtn isActive={false}>Save this as a new Draft</s.DraftBtn>
          </Tooltip>
          <s.DraftBtnDivider />
          <s.DraftBtn isActive={this.state.isSaveBtnActive && this.state.draftId} onClick={this.onOverwriteDraft}>
            Overwrite Draft
          </s.DraftBtn>
        </div>
      );
    }
    return (
      <div>
        <s.DraftBtn isActive={this.state.isSaveBtnActive} onClick={this.onSaveDraft}>
          Save this as a new Draft
        </s.DraftBtn>
        <s.DraftBtn isActive={this.state.isSaveBtnActive && this.state.draftId} onClick={this.onOverwriteDraft}>
          Overwrite Draft
        </s.DraftBtn>
      </div>
    );
  }

  renderSendPassword() {
    return (
      <s.SendPhotoPassword>
        <s.Checkbox
          type="checkbox"
          id="willSendPassword"
          value={this.state.willSendPassword}
          onChange={() => this.setState({ willSendPassword: !this.state.willSendPassword })}
        />
        <label htmlFor="willSendPassword">Send Photo Password</label>
      </s.SendPhotoPassword>
    );
  }

  renderPreview() {
    if ((this.props.data.uids || []).length === 0) {
      return null;
    }
    return (
      <s.PreviewWrapper>
        <s.PreviewTitle>
          Your Profile will be promoted on their Premium Wall, Inbox and will be sent via email.&nbsp;
          <s.PreviewLink onClick={() => this.setState({ isPreviewVisible: !this.state.isPreviewVisible })}>See Preview</s.PreviewLink>
        </s.PreviewTitle>
        {this.state.isPreviewVisible && (
          <s.PreviewCard membershipLevel={this.props.preview.flags.membershipLevel}>
            <s.PreviewPhoto src={this.props.preview.photo} />
            <s.PreviewDetails>
              <s.PreviewName>{this.props.preview.name}</s.PreviewName>
              <s.PreviewList>
                {this.props.preview.summary.infoMap.map(item => (
                  <s.PreviewListItem key={item.key}>
                    <s.PreviewLabel>{item.label}</s.PreviewLabel>
                    <s.PreviewValue>:&nbsp;{item.value}</s.PreviewValue>
                  </s.PreviewListItem>
                ))}
              </s.PreviewList>
              <s.PreviewMessage>{this.state.message}</s.PreviewMessage>
              <s.PreviewBtns>
                <s.PreviewBtn isPrimary>Accept</s.PreviewBtn>
                <s.PreviewBtn>
                  <s.PreviewText>Decline</s.PreviewText>
                  <s.PreviewIcon />
                </s.PreviewBtn>
              </s.PreviewBtns>
            </s.PreviewDetails>
          </s.PreviewCard>
        )}
      </s.PreviewWrapper>
    );
  }

  renderMessageHistory() {
    const message = this.props.data.history[this.props.data.history.length - 1] || {};
    const body = message.body || '';
    const timeAgo = message.timeAgo || '';
    if (body === '') {
      return false;
    }
    let isReadMoreThere = this.state.isReadMore;
    if (body.length < 285) {
      isReadMoreThere = true;
    }
    return (
      <div>
        <s.RespondPremiumTitle>
          <s.RespondPremiumText>Message from {`${this.props.data.name}`}</s.RespondPremiumText>
          <s.RespondPremiumDate>{timeAgo}</s.RespondPremiumDate>
        </s.RespondPremiumTitle>
        <s.RespondPremiumMsgFrom>
          <s.RespondingPremiumDraftText isVisible={!isReadMoreThere}>
            {body.substr(0, 275)}....&nbsp;<s.RespondPremiumLink
              onClick={() => {
                this.setState({ isReadMore: true });
              }}
            >
              Read more
            </s.RespondPremiumLink>
          </s.RespondingPremiumDraftText>
          <s.RespondingPremiumDraftText2 isVisible={isReadMoreThere}>{body}</s.RespondingPremiumDraftText2>
        </s.RespondPremiumMsgFrom>
      </div>
    );
  }

  render() {
    const messageHash = {
      accept: this.props.data.showMessageLayer ? 'Send Message' : 'Accept',
      remind: 'Send Reminder',
    };
    return (
      <s.SendRequest>
        <ss.Header>
          <ss.Title>{this.props.data.title}</ss.Title>
          <ss.CloseModalBtn isSlim onClick={this.props.onModalClose} />
        </ss.Header>
        <ss.Content>
          {this.props.data.type === 'accept' &&
            this.props.data.history &&
            this.props.data.history.length > 0 &&
            this.renderMessageHistory()}
          {this.props.data.filtered &&
            this.props.data.type !== 'accept' && (
              <div>
                <s.UnifiedAlert>
                  <s.UnifiedAlertMessage>
                    {`You do not match ${this.props.data.hisHer.toLowerCase()} partner requirements. You may choose to send ${this.props.data.himHer.toLowerCase()} an Invitation, but ${this.props.data.heShe.toLowerCase()} may not respond.`}
                  </s.UnifiedAlertMessage>
                </s.UnifiedAlert>
                <s.Spacer5 />
              </div>
            )}
          <s.LabelWrapper>
            <s.Label>
              {this.props.data.uid && !['remind', 'accept'].includes(this.props.data.type)
                ? 'Add a message'
                : `Reply to ${this.props.data.himHer.toLowerCase()}`}
            </s.Label>
            <s.UseDraftBtn isVisible={this.props.data.draftItems.length} onClick={this.onOpenDraftsClick}>
              Use Draft
            </s.UseDraftBtn>
            <ss.DraftList isVisible={this.state.isDraftListVisible && this.props.data.draftItems.length}>
              {this.props.data.draftItems.map(item => (
                <ss.DraftItem key={item.key}>
                  <ss.DraftMessageWrapper>
                    <ss.DraftMessage>{item.message}</ss.DraftMessage>
                    <s.DraftReadLink isExternal to={`${this.props.wwwBaseUrl}/inbox/messages/manage-draft?draftid=${item.id}`}>
                      {item.message.length < 80 ? '' : 'Read More'}
                    </s.DraftReadLink>
                  </ss.DraftMessageWrapper>
                  <s.ChooseDraftBtn onClick={() => this.onChooseDraftClick(item)}>Use Draft</s.ChooseDraftBtn>
                </ss.DraftItem>
              ))}
              {this.props.data.isLoadingDrafts && <Spinner isVisible text="Loading Drafts" />}
            </ss.DraftList>
          </s.LabelWrapper>
          <ss.TextArea
            disabled={this.props.data.disabled || !this.state.ready}
            value={this.state.message}
            onChange={e => this.onTextAreaChange(e.target.value)}
          />
          <ss.DraftBtnsWrapper isVisible>
            {this.renderButtons()}
            <s.CharactersRemaining>
              Characters left:
              <s.CharactersCount>{this.state.charactersLeft}</s.CharactersCount>
            </s.CharactersRemaining>
          </ss.DraftBtnsWrapper>
          {this.props.data.uids && <s.DividerBorder />}
          {this.props.settings.canSendPasswordOnConnect && this.renderSendPassword()}
          <s.ConnectBtn onClick={this.sendRequest}>
            {messageHash[this.props.data.type] ? (
              `${messageHash[this.props.data.type]}`
            ) : this.props.data.uid ? (
              'Connect'
            ) : (
              <span>
                Submit <s.SendRequestBtn />
              </span>
            )}
          </s.ConnectBtn>
          {this.props.settings.isPaidUser && this.renderPreview()}
        </ss.Content>
      </s.SendRequest>
    );
  }
}
const manageDraftTooltip = {
  title: null,
  body: [
    {
      key: 'para-1',
      items: [
        {
          type: 'text',
          key: 'bleh',
          text: 'You have already saved 5 Email Drafts. To create a new Draft, Edit or Delete an existing one.',
        },
        {
          type: 'link',
          key: 'bleh2',
          text: 'Manage Draft',
          url: '/inbox/messages/manage-draft',
        },
      ],
    },
  ],
};

SendRequest.propTypes = {
  preview: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    summary: PropTypes.shape({
      infoMap: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        }),
      ),
    }),
    flags: PropTypes.shape({
      membershipLevel: PropTypes.membershipLevel.isRequired,
    }).isRequired,
  }).isRequired,
  data: PropTypes.shape({
    filtered: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    heShe: PropTypes.heShe.isRequired,
    hisHer: PropTypes.hisHer.isRequired,
    himHer: PropTypes.himHer.isRequired,
    uid: PropTypes.string,
    name: PropTypes.string,
    uids: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    flashIcon: PropTypes.oneOf(['none', 'error', 'success', 'loading']).isRequired,
    flash: PropTypes.string,
    message: PropTypes.string,
    history: PropTypes.arrayOf(PropTypes.Object),
    source: PropTypes.string,
    isLoadingDrafts: PropTypes.bool,
    hasExceededDraftLimit: PropTypes.bool,
    type: PropTypes.string,
    showMessageLayer: PropTypes.bool,
    draftItems: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  settings: PropTypes.shape({
    canSendPasswordOnConnect: PropTypes.bool.isRequired,
    isPaidUser: PropTypes.bool.isRequired,
  }).isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
  doProfileAction: PropTypes.func.isRequired,
};

export default SendRequest;
