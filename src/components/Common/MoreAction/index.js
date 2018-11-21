import React from 'react';
import PropTypes from '../../../PropTypes';
import SvgLoader from '../../Common/SvgLoader';
import SvgCheckmark from '../../Common/SvgCheckmark';
import s from './styles';
import Tooltip from '../../Common/Tooltip';

const allowedConnectionStatusForMoreAction = {
  addShortlist: ['default', 'shortlisted'],
  removeShortlist: ['default', 'shortlisted'],
  addToIgnore: ['default', 'shortlisted'],
  viewHistory: ['contacted', 'theyContacted', 'accepted', 'theyAccepted'],
  cancelInvitation: ['contacted', 'filteredContacted'],
};

class MoreAction extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownVisible: false,
      isAddVisible: false,
      isRemoveVisible: false,
      isIgnoreVisible: false,
      isCancelVisible: false,
      feedBackShow: false,
    };
    this.onToggleMoreAction = this.onToggleMoreAction.bind(this);
  }

  componentWillReceiveProps(props) {
    const { fromPage, status, shortlists, profileid } = this.props;
    const { feedBackShow } = this.state;

    if (props.profileid !== profileid && ['profile', 'daily_recommendations'].includes(fromPage)) {
      if (shortlists.count > 0 && feedBackShow) {
        setTimeout(() => {
          this.setState({ isDropdownVisible: false });
        }, 5000);
      }
      switch (status) {
        case 'shortlisted':
          this.setState({ isAddVisible: false });
          break;
        case 'ignored':
          this.setState({ isIgnoreVisible: false });
          break;
        case 'skip':
          this.setState({ isIgnoreVisible: false });
          break;
        case 'cancelled':
          this.setState({ isCancelVisible: false });
          break;
        default:
          break;
      }
    }
  }

  onToggleMoreAction() {
    const isDropdownVisible = !this.state.isDropdownVisible;
    this.setState({ isDropdownVisible });
    this.setState({ feedBackShow: false });
    if (isDropdownVisible) {
      this.props.onShortlistOpen();
    }
  }

  onDropdownBlur(event) {
    setTimeout(() => {
      this.onToggleMoreAction();
    }, 100);
  }

  onWidgetCtaClick(c) {
    this.setState({ isAddVisible: false });
    this.setState({ isRemoveVisible: false });
    this.setState({ isIgnoreVisible: false });
    this.setState({ isCancelVisible: false });
    switch (c) {
      case 'add': {
        const isAddVisible = !this.state.isAddVisible;
        this.setState({ isAddVisible });
        this.setState({ feedBackShow: true });
        this.props.onDirectlyShortlist();
        break;
      }
      case 'remove': {
        const isRemoveVisible = !this.state.isRemoveVisible;
        this.setState({ isRemoveVisible });
        this.props.onDirectlyRemoveShortlist();
        break;
      }
      case 'ignore': {
        const isIgnoreVisible = !this.state.isIgnoreVisible;
        this.setState({ isIgnoreVisible });
        this.props.onDirectlyIgnore();
        break;
      }
      case 'block_click': {
        this.props.onBlockClick();
        break;
      }
      case 'report_misuse': {
        this.props.onMisuseClick();
        break;
      }
      case 'view_history': {
        this.props.onViewHistory();
        break;
      }
      case 'cancel_invitation': {
        const isCancelVisible = !this.state.isCancelVisible;
        this.setState({ isCancelVisible });
        this.props.onCancelClick();
        break;
      }
      default:
        console.log('Unhandled widget click', c);
    }
  }

  renderProfilepageMoreAction = () => {
    const { shortlists = {}, status, fromPage, canCancelInvite } = this.props;
    return (
      <s.ListDropdownWrapProfilePage data-test-selector="list_dropdown_wrap_profile_page">
        <s.ListDropdownArrowProfilePage onClick={() => this.onToggleMoreAction()} />
        <s.ListDropdownProfilePage isVisible={this.state.isDropdownVisible} onMouseLeave={e => this.onDropdownBlur(e)}>
          {shortlists.count === 0 &&
            allowedConnectionStatusForMoreAction.addShortlist.includes(status) && (
              <s.ListDropdownBtnWrap>
                {!this.state.isAddVisible && (
                  <s.ListDropdownBtn data-test-selector="addToShortlistProfilePage" onClick={() => this.onWidgetCtaClick('add')}>
                    Add to Shortlist
                  </s.ListDropdownBtn>
                )}
                <SvgLoader isVisible={this.state.isAddVisible} />
              </s.ListDropdownBtnWrap>
            )}
          {shortlists.count > 0 &&
            allowedConnectionStatusForMoreAction.removeShortlist.includes(status) && (
              <s.ListDropdownBtnWrap>
                {!this.state.isRemoveVisible && (
                  <s.ListDropdownBtn data-test-selector="removeFromShortlistProfilePage" onClick={() => this.onWidgetCtaClick('remove')}>
                    <s.CheckmarkWrap isVisible={this.state.feedBackShow}>
                      <SvgCheckmark isDropdownWidget={this.state.feedBackShow} />
                    </s.CheckmarkWrap>
                    {this.state.feedBackShow ? 'Shortlisted' : 'Remove from Shortlist'}
                  </s.ListDropdownBtn>
                )}
                <SvgLoader isVisible={this.state.isRemoveVisible} />
              </s.ListDropdownBtnWrap>
            )}
          {((status !== 'ignored' && fromPage === 'profile') || (status !== 'skip' && fromPage === 'daily_recommendations')) &&
            allowedConnectionStatusForMoreAction.addToIgnore.includes(status) && (
              <s.ListDropdownBtnWrap>
                {!this.state.isIgnoreVisible && (
                  <s.ListDropdownBtn
                    data-test-selector="dontShowAgainProfilePage"
                    onClick={() => this.onWidgetCtaClick('ignore')}
                  >{`Don't show again`}</s.ListDropdownBtn>
                )}
                <SvgLoader isVisible={this.state.isIgnoreVisible} />
              </s.ListDropdownBtnWrap>
            )}
          {fromPage === 'profile' && (
            <s.ListDropdownBtnWrap>
              {
                <s.ListDropdownBtn
                  data-test-selector="blockProfileProfilePage"
                  onClick={() => this.onWidgetCtaClick('block_click')}
                >{`Block Profile`}</s.ListDropdownBtn>
              }
            </s.ListDropdownBtnWrap>
          )}
          {fromPage === 'profile' && (
            <s.ListDropdownBtnWrap>
              {
                <s.ListDropdownBtn
                  data-test-selector="reportProfilePhotoProfilePage"
                  onClick={() => this.onWidgetCtaClick('report_misuse')}
                >{`Report Profile/Photo`}</s.ListDropdownBtn>
              }
            </s.ListDropdownBtnWrap>
          )}
          {allowedConnectionStatusForMoreAction.viewHistory.includes(status) && (
            <s.ListDropdownBtnWrap>
              {!this.state.isViewHistoryVisible && (
                <s.ListDropdownBtn
                  data-test-selector="viewHistoryProfilePage"
                  onClick={() => this.onWidgetCtaClick('view_history')}
                >{`View History`}</s.ListDropdownBtn>
              )}
              <SvgLoader isVisible={this.state.isViewHistoryVisible} />
            </s.ListDropdownBtnWrap>
          )}
          {fromPage === 'profile' &&
            allowedConnectionStatusForMoreAction.cancelInvitation.includes(status) &&
            (!canCancelInvite ? (
              <Tooltip
                trigger="hover"
                placement="left"
                overlayClassName="rc-tooltip-dark-invite"
                offset={[7, 0]}
            overlay={<span>You can Cancel an Invitation only <br />after 7 days of sending it</span>} //eslint-disable-line
              >
                <s.ListDropdownBtnWrap>
                  {
                    <s.ListDropdownBtn
                      data-test-selector="cancelInvitationProfilePage"
                      isMuted={!canCancelInvite}
                    >{`Cancel Invitation`}</s.ListDropdownBtn>
                  }
                </s.ListDropdownBtnWrap>
              </Tooltip>
            ) : (
              <s.ListDropdownBtnWrap>
                {!this.state.isCancelVisible && (
                  <s.ListDropdownBtn
                    data-test-selector="cancelInvitationProfilePage"
                    onClick={() => this.onWidgetCtaClick('cancel_invitation')}
                  >{`Cancel Invitation`}</s.ListDropdownBtn>
                )}
                <SvgLoader isVisible={this.state.isCancelVisible} />
              </s.ListDropdownBtnWrap>
            ))}
        </s.ListDropdownProfilePage>
      </s.ListDropdownWrapProfilePage>
    );
  };

  render() {
    const { fromPage, status } = this.props;
    switch (fromPage) {
      case 'profile':
      case 'daily_recommendations':
        return this.renderProfilepageMoreAction();
      default:
    }
    return (
      <s.ListDropdownWrap data-test-selector="listDropdown">
        <s.ListDropdownArrow onClick={() => this.onToggleMoreAction()} />
        <s.ListDropdown isVisible={this.state.isDropdownVisible} onMouseLeave={e => this.onDropdownBlur(e)}>
          {allowedConnectionStatusForMoreAction.addShortlist.includes(status) &&
            status !== 'shortlisted' && (
              <s.ListDropdownBtnWrap>
                {!this.state.isAddVisible && (
                  <s.ListDropdownBtn data-test-selector="addToShortlist" onClick={() => this.onWidgetCtaClick('add')}>
                    Add to Shortlist
                  </s.ListDropdownBtn>
                )}
                <SvgLoader isVisible={this.state.isAddVisible} />
              </s.ListDropdownBtnWrap>
            )}
          {status === 'shortlisted' && (
            <s.ListDropdownBtnWrap>
              {!this.state.isRemoveVisible && (
                <s.ListDropdownBtn data-test-selector="removeFromShortlist" onClick={() => this.onWidgetCtaClick('remove')}>
                  <s.CheckmarkWrap isVisible={this.state.feedBackShow}>
                    <SvgCheckmark isDropdownWidget={this.state.feedBackShow} />
                  </s.CheckmarkWrap>
                  {this.state.feedBackShow ? 'Shortlisted' : 'Remove from Shortlist'}
                </s.ListDropdownBtn>
              )}
              <SvgLoader isVisible={this.state.isRemoveVisible} />
            </s.ListDropdownBtnWrap>
          )}
          {allowedConnectionStatusForMoreAction.addToIgnore.includes(status) &&
            status !== 'ignored' && (
              <s.ListDropdownBtnWrap>
                {!this.state.isIgnoreVisible && (
                  <s.ListDropdownBtn
                    data-test-selector="dontShowAgain"
                    onClick={() => this.onWidgetCtaClick('ignore')}
                  >{`Don't show again`}</s.ListDropdownBtn>
                )}
                <SvgLoader isVisible={this.state.isIgnoreVisible} />
              </s.ListDropdownBtnWrap>
            )}
          {
            <s.ListDropdownBtnWrap>
              {
                <s.ListDropdownBtn
                  data-test-selector="blockProfile"
                  onClick={() => this.onWidgetCtaClick('block_click')}
                >{`Block Profile`}</s.ListDropdownBtn>
              }
            </s.ListDropdownBtnWrap>
          }
          {
            <s.ListDropdownBtnWrap>
              {
                <s.ListDropdownBtn
                  data-test-selector="reportProfilePhoto"
                  onClick={() => this.onWidgetCtaClick('report_misuse')}
                >{`Report Profile/Photo`}</s.ListDropdownBtn>
              }
            </s.ListDropdownBtnWrap>
          }
        </s.ListDropdown>
      </s.ListDropdownWrap>
    );
  }
}

MoreAction.defaultProps = {
  fromPage: null,
  onViewHistory: null,
  shortlists: {},
  profileid: null,
  onCancelClick: null,
  canCancelInvite: false,
};

MoreAction.propTypes = {
  status: PropTypes.connectionStatus.isRequired,
  onShortlistOpen: PropTypes.func.isRequired,
  onDirectlyShortlist: PropTypes.func.isRequired,
  onDirectlyRemoveShortlist: PropTypes.func.isRequired,
  onDirectlyIgnore: PropTypes.func.isRequired,
  onBlockClick: PropTypes.func.isRequired,
  onMisuseClick: PropTypes.func.isRequired,
  onViewHistory: PropTypes.func,
  fromPage: PropTypes.string,
  profileid: PropTypes.string,
  onCancelClick: PropTypes.func,
  canCancelInvite: PropTypes.bool,
  shortlists: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default MoreAction;
