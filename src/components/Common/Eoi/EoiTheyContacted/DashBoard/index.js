import React from 'react';
import PropTypes from 'prop-types';
import Cta from '../../../../Common/Button/Cta';
import '../../styles.css';

class DashBoard extends React.PureComponent {
  state = {};
  render() {
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '18px' }}>
          <Cta actionType="decline" versionType="grey" onClick={this.props.onDecline}>
            <button className="Cta_Btn">Decline</button>
          </Cta>
        </div>

        <Cta isHovered={this.props.isHovered} actionType="accept" versionType="green" onClick={this.props.onAccept}>
          <button className={`Cta_Btn ${this.props.isHovered ? 'hover' : ''}`}>Accept</button>
        </Cta>
      </div>
    );
  }
}
DashBoard.defaultProps = {
  isHovered: false,
};
DashBoard.propTypes = {
  onDecline: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
  isHovered: PropTypes.bool,
};
export default DashBoard;
