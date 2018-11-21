import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { parse } from 'qs';
import PropTypes from '../../PropTypes';
import ContactSummaryItem from '../../components/ContactSummaryItem';
import Pagination from '../../components/Common/Pagination';
import LoadingWrapper from '../../components/Common/LoadingWrapper';
import doContactSummary from '../../actions/doContactSummary';
import doPrivacySettings from '../../actions/doPrivacySettings';
import doProfileAction from '../../actions/doProfileAction';
import s from './styles';

const CallSmsBalanceInfoFn = ({ callSmsBalance, callSmsViewed }) => (
  <s.filterContainer>
    <s.InboxHeading>History of calls initiated & SMSs sent</s.InboxHeading>
    <s.actionContainer />
    <s.callSmsBalanceInfo>Call / SMS Balance:</s.callSmsBalanceInfo>
    <s.smsContacts>
      {callSmsBalance}
      <s.ofSpan>of</s.ofSpan>
      {callSmsBalance + callSmsViewed}
    </s.smsContacts>
  </s.filterContainer>
);
CallSmsBalanceInfoFn.defaultProps = {
  callSmsBalance: 0,
  callSmsViewed: 0,
};

CallSmsBalanceInfoFn.propTypes = {
  callSmsBalance: PropTypes.number.isRequired,
  callSmsViewed: PropTypes.number.isRequired,
};

const getInboxUrl = wwwBaseUrl => `${wwwBaseUrl}/inbox/pending/interests`;

class ContactSummaryPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activePhotoIndex: 0,
    };

    this.renderItem = this.renderItem.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onTooltipClose = this.action('closeEoiTooltip').bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.title = 'Partner Search - Free Matrimonial - Shaadi.com';
    const { result_id, pageNo } = this.getPageNumberDetails(this.props);
    this.props.doContactSummary(result_id, pageNo);
  }

  componentWillReceiveProps(props) {
    if (this.props.location.key !== props.location.key) {
      const link = `${props.location.pathname}${props.location.search}`;
      if (this.props.meta && this.props.meta.permaLink && link !== this.props.meta.permaLink) {
        window.scrollTo(0, 0);
        const { result_id, pageNo } = this.getPageNumberDetails(props);
        props.doContactSummary(result_id, pageNo);
      }
    }
  }

  onPageChange(page) {
    window.scrollTo(0, 0);
    const result_id = this.props.meta.results_id || '';
    setTimeout(() => this.props.doContactSummary(result_id, page), 20);
  }

  onTooltipClose() {
    const isTooltipVisible = false;
    this.setState({ isTooltipVisible });
    this.onTooltipClose();
  }

  onAction(uid, type, ...args) {
    this.props.doProfileAction('contactSummary', uid, type, ...args);
  }

  getPageNumberDetails = props => {
    const { pg_searchresults_id: result_id, page } = parse(props.location.search.slice(1));
    const pageNo = Array.isArray(page) && page[0] ? this.pageNum(page[0]) : page;
    return { result_id, pageNo };
  };

  pageNum = pageStr => {
    if (pageStr) {
      const pageArr = pageStr.split('?');
      return pageArr.length > 0 ? pageArr[0] : null;
    }
    return null;
  };

  action(...args) {
    return () => {
      this.onAction(this.props.profiles.uid, ...args);
    };
  }

  renderItem(info, index) {
    return (
      <ContactSummaryItem
        key={index}
        profileData={this.props.profiles[this.props.items.items[index].uid]}
        meta={this.props.meta}
        settings={this.props.settings}
        onAction={this.onAction}
        doProfileAction={this.props.doProfileAction}
        type="profile"
        onProfileSelection={this.onProfileSelection}
        wwwBaseUrl={this.props.wwwBaseUrl}
        albumUrl={`${this.props.wwwBaseUrl}/profile/index/view-album-photos/profileid/${info.uid}`}
        onTooltipClose={this.onTooltipClose}
        tooltip={this.props.items.tooltip}
        isTooltipVisible={this.props.tooltip.position === 'photo' && this.props.tooltip.uid === info.uid}
        loading={this.props.items.items[index].uid === info.uid && this.props.items.items[index].photoLoading}
        changeCursorStatus={this.props.items.items[index].uid === info.uid && this.props.items.items[index].changeCursorStatus}
        viewSmsShowStatus={this.props.items.items[index].uid === info.uid && this.props.items.items[index].viewSmsShowStatus}
      />
    );
  }
  render() {
    return (
      <s.InboxPage topSpace={this.props.topSpace} isChatOpen={this.props.isChatOpen} windowWidth={this.props.windowWidth}>
        {this.props.meta.loading && <LoadingWrapper isVisible={this.props.meta.loading} />}
        {this.props.items.items.length > 0 && (
          <s.InboxList>
            {CallSmsBalanceInfoFn(this.props.membership)}

            {this.props.items.items.map(this.renderItem)}
            <Pagination
              loading={this.props.meta.loading}
              currentPage={Number(this.props.meta.page)}
              pageCount={Number(this.props.meta.pages)}
              onPageChange={this.onPageChange}
              source="contactSummary"
              itemCount={this.props.meta.total}
            />
          </s.InboxList>
        )}
        {!this.props.meta.loading &&
          this.props.items.items.length === 0 && (
            <s.InboxList>
              {CallSmsBalanceInfoFn(this.props.membership)}
              <s.noResultDiv>
                No calls done / SMSs sent.
                <s.linkGoToInbox target="_blank" to={getInboxUrl(this.props.wwwBaseUrl)}>
                  Go To Inbox<s.blueArrow />
                </s.linkGoToInbox>
              </s.noResultDiv>
            </s.InboxList>
          )}
      </s.InboxPage>
    );
  }
}

ContactSummaryPage.defaultProps = {
  photoLoading: false,
  changeCursorStatus: true,
  tooltip: {},
};

ContactSummaryPage.propTypes = {
  topSpace: PropTypes.number.isRequired,
  windowWidth: PropTypes.number.isRequired,
  isChatOpen: PropTypes.bool.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  profiles: PropTypes.objectOf(PropTypes.shape(PropTypes.profiles)).isRequired,
  items: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape(PropTypes.contactSummaryItem)),
    tooltip: PropTypes.shape({
      uid: PropTypes.string,
      position: PropTypes.string.isRequired,
      title: PropTypes.string,
      body: PropTypes.arrayOf(PropTypes.shape(PropTypes.tooltipBody)).isRequired,
      loading: PropTypes.bool,
    }),
  }).isRequired,
  meta: PropTypes.shape(PropTypes.contactSummaryMeta).isRequired,
  settings: PropTypes.shape(PropTypes.settings).isRequired,
  doContactSummary: PropTypes.func.isRequired,
  doProfileAction: PropTypes.func.isRequired,
  tooltip: PropTypes.shape({
    uid: PropTypes.string,
    position: PropTypes.string.isRequired,
    title: PropTypes.string,
    body: PropTypes.arrayOf(PropTypes.shape(PropTypes.tooltipBody)).isRequired,
    loading: PropTypes.bool,
  }),
  membership: PropTypes.shape(PropTypes.contactSummaryMembership).isRequired,
  location: PropTypes.shape(PropTypes.location).isRequired,
};

const selector = (state, { location }) => {
  const { header, profiles, contactSummary, session, config, chat, view } = state;
  const { meta, items } = contactSummary;
  const { membership } = header;
  const { app } = config;
  return {
    profiles,
    location,
    meta,
    items,
    isChatOpen: chat.settings.isOpen,
    topSpace: view.topSpace,
    windowWidth: view.width,
    tooltip: items.tooltip || {},
    settings: session.settings,
    membership,
    wwwBaseUrl: app.wwwBaseUrl,
  };
};

export default withRouter(
  connect(selector, {
    doProfileAction,
    doContactSummary,
    doPrivacySettings,
  })(ContactSummaryPage),
);
