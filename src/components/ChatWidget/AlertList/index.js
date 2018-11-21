/* global window */
/* eslint camelcase: 0 */
import PropTypes from 'prop-types';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import s from './styles';

const encode64 = str => window.btoa(unescape(encodeURIComponent(str)));
const evt_ref = encode64('notifications');

const AlertList = props => {
  if (props.items.length === 0 || props.flash) {
    return (
      <s.AlertList>
        {props.flash &&
          props.flash !== '...' &&
          props.items.length === 0 && <s.AlertFlash title={props.flash}>Failed to connect. Please refresh and try again.</s.AlertFlash>}
        <s.NoDataList isVisible={!props.flash && props.items.length === 0}>You have no recent Notifications.</s.NoDataList>
      </s.AlertList>
    );
  }
  const { onItemHover, onItemBlur } = props;
  return (
    <s.AlertList>
      <Scrollbars autoHeight autoHeightMin={props.chatScrollHeight}>
        {props.items.map(item => (
          <div
            key={item.alertId}
            onMouseEnter={e => onItemHover(e, item.uid, 'alerts')}
            onMouseLeave={e => onItemBlur(e, item.uid, 'alerts')}
          >
            <s.AlertItem
              to={
                !item.isSystem
                  ? `/profile?profileid=${item.slug}&source=notification&evt_ref=${evt_ref}`
                  : item.type === 'bothpartypay_accepted' ? `/inbox/accepted/interests` : `/inbox/pending/premium-interests`
              }
              target={'_blank'}
            >
              <s.Photo src={item.thumbnail} alt={item.name} />
              <s.Info>
                <s.AlertMsg isRead={item.isRead} isSystem={item.isSystem}>
                  <s.Name isSystem={item.isSystem}>{item.name} </s.Name>
                  {item.isRead ? item.message : <strong>{item.message}</strong>}
                </s.AlertMsg>
                <s.Time>{item.notifiedDate}</s.Time>
              </s.Info>
            </s.AlertItem>
          </div>
        ))}
        <s.AlertLinkWrapper isVisible={props.items.length >= 20}>
          <s.AlertLink isExternal to="/inbox/notifications">
            View All Alerts
          </s.AlertLink>
        </s.AlertLinkWrapper>
      </Scrollbars>
    </s.AlertList>
  );
};

AlertList.defaultProps = {
  flash: null,
  uid: null,
  name: null,
  slug: null,
};

AlertList.itemPropTypes = {
  alertId: PropTypes.string.isRequired,
  uid: PropTypes.string,
  name: PropTypes.string,
  slug: PropTypes.string,
  notifiedDate: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

AlertList.propTypes = {
  flash: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape(AlertList.itemPropTypes)).isRequired,
  onItemHover: PropTypes.func.isRequired,
  onItemBlur: PropTypes.func.isRequired,
  chatScrollHeight: PropTypes.number.isRequired,
};

export default AlertList;
