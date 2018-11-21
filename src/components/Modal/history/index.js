/* eslint no-string-refs: 0 */
import PropTypes from 'prop-types';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import s from './styles';
import ss from '../styles';
import Tooltip from '../../Common/Tooltip';
import Spinner from '../../Common/Spinner';

class History extends React.PureComponent {
  componentDidUpdate(prevProps, prevState) {
    const historyScrollbar = this.historyScrollbar;
    if (historyScrollbar.scrollToBottom) {
      historyScrollbar.scrollToBottom();
    }
  }

  render() {
    const profileUrl = (uid, evtRef, atact) => `/profile?profileid=${uid}&evtRef=${evtRef}&atact=${atact}`;

    const NoMessages = () => (
      <s.NoMessages>
        <s.ChatIcon />
        <s.NoMessageLabel>No recent Messages</s.NoMessageLabel>
      </s.NoMessages>
    );

    const Loading = () => (
      <s.LoadingWrapper>
        <Spinner isVisible />
      </s.LoadingWrapper>
    );

    return (
      <s.InviteLimitWrapper>
        <ss.Header>
          <ss.Title>Conversation History with {this.props.data.name}</ss.Title>
          <ss.CloseModalBtn onClick={this.props.onModalClose} />
        </ss.Header>
        <Scrollbars
          autoHeight
          autoHeightMin={453}
          ref={c => {
            this.historyScrollbar = c;
          }}
        >
          <ss.Content>
            {(this.props.data.loading && <Loading />) || (
              <s.Main isVisible={!this.props.data.loading}>
                <s.Actions isVisible={this.props.data.loading}>
                  <s.HistoryLink
                    title="This Member will not be able to see or contact you on Shaadi.com"
                    to={profileUrl(this.props.data.uid, this.props.data.evtRef, 'block')}
                    type="block"
                    target="_blank"
                    onClick={() => {
                      this.props.doProfileAction('profile', this.props.data.uid, 'block', []);
                    }}
                  >
                    Block {(this.props.data.himHer || 'this member').toLowerCase()}
                  </s.HistoryLink>
                  <s.HistoryLink
                    to={profileUrl(this.props.data.uid, this.props.data.evtRef, 'misuse')}
                    target="_blank"
                    type="report"
                    onClick={() => {
                      this.props.doProfileAction('profile', this.props.data.uid, 'reportMisuse', []);
                    }}
                  >
                    Report Misuse
                  </s.HistoryLink>
                  <Tooltip
                    isQuestionMark
                    placement="bottom"
                    offset={[0, -5]}
                    tooltip={{
                      body: [
                        {
                          key: 'misuse',
                          items: [
                            {
                              type: 'text',
                              key: 'misuse_items',
                              text:
                                'Report this member for any inappropriate behaviour, false profile information, requests made for money or any other concerns you may have.',
                            },
                          ],
                        },
                      ],
                    }}
                  />
                </s.Actions>
                {!(this.props.data.items[0] || []).length && <NoMessages />}
                {(this.props.data.items[0] || []).map(i => (
                  <s.Day key={i.time}>
                    <s.DayHeading>
                      <s.DayText>{i.day}</s.DayText>
                    </s.DayHeading>
                    {i.items.map(item => (
                      <div key={item.time}>
                        <s.Top>
                          <div>
                            <s.TopNameLink target="_blank" to={`/profile?profileid=${this.props.data.uid}`} isSelf={item.isSelf}>
                              {item.isSelf ? 'You' : this.props.data.name}
                            </s.TopNameLink>
                            {item.isSelf ? ' sent a Message.' : ' sent you a Message.'}
                          </div>
                          <s.Time>{item.time}</s.Time>
                        </s.Top>
                        <s.Message ViewHistory>{item.message}</s.Message>
                      </div>
                    ))}
                  </s.Day>
                ))}
              </s.Main>
            )}
          </ss.Content>
        </Scrollbars>
      </s.InviteLimitWrapper>
    );
  }
}

History.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    uid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    himHer: PropTypes.string.isRequired,
    evtRef: PropTypes.string.isRequired,
    atact: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        day: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            uid: PropTypes.string.isRequired,
            time: PropTypes.string.isRequired,
          }),
        ).isRequired,
      }),
    ).isRequired,
  }).isRequired,
  onModalClose: PropTypes.func.isRequired,
  doProfileAction: PropTypes.func.isRequired,
};

export default History;
