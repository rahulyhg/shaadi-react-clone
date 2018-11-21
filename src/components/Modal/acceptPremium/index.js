import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import PropTypes from '../../../PropTypes';
import s from './styles';
import ss from '../styles';
import Spinner from '../../Common/Spinner';
import ConfettiAnimation from '../../../components/Common/Animations/Confetti';
import Tooltip from '../../Common/Tooltip';
import ChatIcon from '../../Common/ChatIcon';
import { encode64 } from '../../../helpers/common';

class AcceptPremium extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      message: props.data.message || '',
      ready: false,
      charactersLeft: 4000 - (props.data.message || '').length,
      isDraftListVisible: false,
      draftId: null,
      isSaveBtnActive: false,
      isReadMore: false,
      toggleFromMessage: false,
      openedDraftId: [],
    };
  }

  componentDidMount() {
    this.reloadDrafts();
  }

  componentWillReceiveProps(props) {
    if (!this.props.data || this.props.data.message !== props.data.message) {
      this.setState({ message: props.data.message || '', charactersLeft: 4000 - (props.data.message || '').length, ready: true });
    }
  }

  onOpenDraftsClick = () => {
    if (!this.state.isDraftListVisible) {
      this.reloadDrafts();
    }
    this.toggleDraftList();
  };

  onTextAreaChange = value => {
    const charactersLeft = 4000 - value.length;
    if (charactersLeft >= 0) {
      this.setState({
        charactersLeft,
        message: value,
        isSaveBtnActive: value.length && value.length > 0,
      });
    }
  };

  onChooseDraftClick = item => {
    const message = item.message;
    const charactersLeft = 4000 - message.length;
    this.setState({
      charactersLeft,
      message,
      draftId: item.id,
      isSaveBtnActive: false,
      isDraftListVisible: false,
    });
  };

  onOverwriteDraft = () => {
    if (!this.state.isSaveBtnActive || !this.state.draftId) {
      return;
    }
    this.setState({ isSaveBtnActive: false });
    const { message, draftId } = this.state;
    this.props.doProfileAction(this.props.data.source, this.props.data.uid, 'modifyDraft', message, draftId);
  };

  onSaveDraft = () => {
    if (!this.state.isSaveBtnActive) {
      return;
    }
    this.setState({ isSaveBtnActive: false });
    this.props.doProfileAction(this.props.data.source, this.props.data.uid, 'newDraft', this.state.message);
  };

  sendRequest = () => {
    if (this.props.data.uid) {
      const action = 'accept_confirm';
      this.props.doProfileAction(this.props.data.source, this.props.data.uid, action, this.state.message);
    }
  };

  reloadDrafts = () => this.props.doProfileAction(this.props.data.source, this.props.data.uid, 'reloadDrafts');

  toggleDraftList = () => this.setState({ isDraftListVisible: !this.state.isDraftListVisible });

  readMoreDraft = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    const draftId = [...this.state.openedDraftId];
    const index = draftId.indexOf(id);
    if (index >= 0) {
      draftId.splice(index, 1);
    } else {
      draftId.push(id);
    }
    this.setState({ openedDraftId: draftId });
  };

  renderButtons = () => {
    if (this.props.data.flash) {
      return <s.RequestFlash icon={this.props.data.flashIcon}>{this.props.data.flash}</s.RequestFlash>;
    }
    return (
      <div>
        {this.props.data.hasExceededDraftLimit || this.props.data.draftItems.length >= 5 ? (
          <Tooltip trigger="hover" offset={[100, 0]} tooltip={manageDraftTooltip} overlayClassName="withBorder">
            <s.DraftBtn isActive={false}>Save as new message</s.DraftBtn>
          </Tooltip>
        ) : (
          <s.DraftBtn isActive={this.state.isSaveBtnActive} onClick={this.onSaveDraft}>
            Save as new message
          </s.DraftBtn>
        )}
        <s.DraftBtnDivider />
        <s.DraftBtn isActive={this.state.isSaveBtnActive && this.state.draftId} onClick={this.onOverwriteDraft}>
          Overwrite this message
        </s.DraftBtn>
      </div>
    );
  };

  renderMessageHistory = () => {
    const message = this.props.data.history[this.props.data.history.length - 1] || {};
    const body = message.body || '';
    if (body === '') {
      return false;
    }

    return (
      <s.HistoryWrap>
        <s.SmallPhotoWrap>
          <s.ProfilePhotoSmall profilePhoto={this.props.data.profilePhoto}>
            {this.props.data.presence.onlineStatus && (
              <s.ChatIconWrap>
                <ChatIcon viewType="onlineTabChat" chatDetails={this.props.data.presence} />
              </s.ChatIconWrap>
            )}
          </s.ProfilePhotoSmall>
        </s.SmallPhotoWrap>
        <s.FromMessageWrap showMore={this.state.toggleFromMessage}>
          <s.FromMessage showMore={this.state.toggleFromMessage}>
            {body}
            {this.state.toggleFromMessage && (
              <s.DraftReadMoreFrom
                onClick={() => {
                  this.setState({ toggleFromMessage: !this.state.toggleFromMessage });
                }}
              >
                show less
              </s.DraftReadMoreFrom>
            )}
          </s.FromMessage>
          <s.DraftReadMoreFrom
            onClick={() => {
              this.setState({ toggleFromMessage: !this.state.toggleFromMessage });
            }}
          >
            {!this.state.toggleFromMessage && 'read more'}
          </s.DraftReadMoreFrom>
        </s.FromMessageWrap>
      </s.HistoryWrap>
    );
  };

  renderDrafts = () => (
    <s.DraftListWrap>
      {this.state.isDraftListVisible && this.props.data.draftItems.length > 0 && <s.UpArrow />}
      <s.DraftList isVisible={this.state.isDraftListVisible && this.props.data.draftItems.length > 0}>
        <Scrollbars autoHeight>
          {this.props.data.draftItems.map(item => {
            const isOpen = this.state.openedDraftId.indexOf(item.id) >= 0;
            return (
              <ss.DraftItemPremium key={item.key}>
                <ss.DraftMessageWrapper onClick={() => this.onChooseDraftClick(item)}>
                  <ss.DraftMessagePremium showMore={isOpen}>
                    {item.message}
                    {item.message.length > 80 &&
                      isOpen && (
                        <s.DraftReadMore
                          onClick={e => {
                            this.readMoreDraft(e, item.id);
                          }}
                        >
                          show less
                        </s.DraftReadMore>
                      )}
                  </ss.DraftMessagePremium>
                </ss.DraftMessageWrapper>
                <s.DraftReadMore
                  onClick={e => {
                    this.readMoreDraft(e, item.id);
                  }}
                >
                  {item.message.length < 80 ? '' : isOpen ? '' : 'read more'}
                </s.DraftReadMore>
              </ss.DraftItemPremium>
            );
          })}
          {this.props.data.isLoadingDrafts && <Spinner isVisible text="Loading Drafts" />}
        </Scrollbars>
      </s.DraftList>
    </s.DraftListWrap>
  );

  render() {
    const isDraftListVisible = this.state.isDraftListVisible && this.props.data.draftItems.length > 0;
    return (
      <s.LayerWrap>
        <s.CloseIcon onClick={this.props.onModalClose} title="Close" />
        <s.MonetizationWrap>
          <ConfettiAnimation />
          <s.TopSectionWrap>
            <s.LayerTitle type="sent" title="It's an Accept!" />
            <s.TopMsg>
              You have accepted{' '}
              <s.LayerLink to={`/profile?profileid=${this.props.data.uid}&evt_ref=${encode64('Accept_Success')}`} target={'_blank'}>
                <s.NameBg title={this.props.data.name}>{this.props.data.name}&#39;s</s.NameBg>
              </s.LayerLink>{' '}
              Invitation
            </s.TopMsg>
            <s.PhotoWrap>
              <s.LayerLink to={`/profile?profileid=${this.props.data.uid}&evt_ref=${encode64('Accept_Success')}`} target={'_blank'}>
                <s.ProfilePhoto profilePhoto={this.props.data.profilePhoto} />
              </s.LayerLink>
            </s.PhotoWrap>
            <s.LayerLink to={`/profile?profileid=${this.props.data.uid}&evt_ref=${encode64('Accept_Success')}`} target={'_blank'}>
              <s.ProfileName>{this.props.data.name}</s.ProfileName>
            </s.LayerLink>
          </s.TopSectionWrap>
          <s.BtmSection>
            {isDraftListVisible && (
              <s.MsgTopUtilWrap>
                <s.MsgLabel>Send {this.props.data.himHer.toLowerCase()} a message</s.MsgLabel>
                <s.SavedMsgLinkWrap isVisible>
                  <s.SavedMsgLink isVisible onClick={this.onOpenDraftsClick}>
                    Saved messages
                    <s.DraftDropDown isVisible={isDraftListVisible} />
                    {this.renderDrafts()}
                  </s.SavedMsgLink>
                </s.SavedMsgLinkWrap>
              </s.MsgTopUtilWrap>
            )}
            <Scrollbars
              autoHeight
              renderTrackHorizontal={props => <div {...props} style={{ display: 'none' }} className="track-horizontal" />}
            >
              {this.props.data.type === 'accept' &&
                this.props.data.history &&
                this.props.data.history.length > 0 &&
                this.renderMessageHistory()}
              {!isDraftListVisible && (
                <s.MsgTopUtilWrap>
                  <s.MsgLabel>Send {this.props.data.himHer.toLowerCase()} a message</s.MsgLabel>
                  {this.props.data.draftItems.length > 0 && (
                    <s.SavedMsgLinkWrap isVisible={isDraftListVisible}>
                      <s.SavedMsgLink isVisible={isDraftListVisible} onClick={this.onOpenDraftsClick}>
                        Saved messages
                        <s.DraftDropDown isVisible={isDraftListVisible} />
                      </s.SavedMsgLink>
                    </s.SavedMsgLinkWrap>
                  )}
                </s.MsgTopUtilWrap>
              )}
              <s.TextAreaWrap>
                <ss.TextAreaPremium
                  disabled={this.props.data.disabled || !this.state.ready}
                  value={this.state.message}
                  onChange={e => this.onTextAreaChange(e.target.value)}
                />
                <s.SelfPhotoSmall profilePhoto={this.props.selfPhoto} />
              </s.TextAreaWrap>
            </Scrollbars>
            <s.DraftBtnsWrapper isVisible>{this.renderButtons()}</s.DraftBtnsWrapper>
            <s.SendMsgButton title="Accept" onClick={this.sendRequest}>
              Send Message
            </s.SendMsgButton>
          </s.BtmSection>
        </s.MonetizationWrap>
      </s.LayerWrap>
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
          text: 'You can save only 5 messages. To save this message, overwrite or delete an existing one.',
        },
        {
          type: 'link',
          key: 'bleh2',
          text: 'Manage messages',
          url: '/inbox/messages/manage-draft',
        },
      ],
    },
  ],
};

AcceptPremium.defaultProps = {
  onModalClose: null,
  data: {
    presence: {
      onlineStatus: null,
      chatIcon: 'app_online',
    },
  },
};

AcceptPremium.propTypes = {
  onModalClose: PropTypes.func,
  selfPhoto: PropTypes.string.isRequired,
  data: PropTypes.shape({
    hasExceededDraftLimit: PropTypes.bool,
    disabled: PropTypes.bool.isRequired,
    himHer: PropTypes.himHer.isRequired,
    uid: PropTypes.string,
    name: PropTypes.string,
    flashIcon: PropTypes.oneOf(['none', 'error', 'success', 'loading']).isRequired,
    flash: PropTypes.string,
    message: PropTypes.string,
    source: PropTypes.string,
    isLoadingDrafts: PropTypes.bool,
    type: PropTypes.string,
    profilePhoto: PropTypes.string,
    draftItems: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
      }),
    ).isRequired,
    presence: PropTypes.shape({
      onlineStatus: PropTypes.string,
      chatIcon: PropTypes.string,
    }),
    history: PropTypes.arrayOf(PropTypes.shape),
  }).isRequired,
  doProfileAction: PropTypes.func.isRequired,
};

export default AcceptPremium;
