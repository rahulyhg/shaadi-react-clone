import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';

class Notifications extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(item, index) {
    if (item.uid) {
      return (
        <s.NewNotifications
          index={index}
          willFade={item.autoHide}
          key={item.id}
          onClick={() => this.props.onClickNotificationToast(item.id)}
        >
          <s.AlertLink to={`/profile?profileid=${item.uid}`} style={{ textDecoration: 'none' }} target="_blank">
            <s.Name>{item.name} </s.Name>
            {item.message}
          </s.AlertLink>
          <s.NotificationBtn
            onClick={event => {
              event.stopPropagation();
              this.props.onHideToast(item.id);
            }}
          />
        </s.NewNotifications>
      );
    }
    return (
      <s.NewNotifications index={index} key={item.id} willFade={item.autoHide} onClick={() => this.props.onClickNotificationToast(item.id)}>
        {item.message}
        <s.NotificationBtn
          onClick={event => {
            event.stopPropagation();
            this.props.onHideToast(item.id);
          }}
        />
      </s.NewNotifications>
    );
  }

  render() {
    return <div>{this.props.items.map(this.renderItem)}</div>;
  }
}

Notifications.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      uid: PropTypes.string,
      message: PropTypes.string.isRequired,
      autoHide: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  onHideToast: PropTypes.func.isRequired,
  onClickNotificationToast: PropTypes.func.isRequired,
};

export default Notifications;
