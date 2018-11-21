import React from 'react';
import PropTypes from 'prop-types';
import Cta from '../../../Common/Button/Cta';
import '../styles.css';

class DashBoard extends React.PureComponent {
  state = {};
  render() {
    return (
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '10px' }}>
          <Cta actionType="decline" versionType="grey" onClick={this.props.onAccept}>
            <button className="Cta_Btn">Decline</button>
          </Cta>
        </div>

        <Cta actionType="accept" versionType="green" onClick={this.props.onAccept}>
          <button className="Cta_Btn">Accept</button>
        </Cta>
      </div>
    );
  }
}

DashBoard.propTypes = {
  onAccept: PropTypes.func.isRequired,
};
export default DashBoard;
