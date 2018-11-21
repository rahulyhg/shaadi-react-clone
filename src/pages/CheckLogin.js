import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../components/Common/Spinner';

const addSlash = base => (`${base}`.endsWith('/') ? `${base}` : `${base}/`);
const removeSlash = path => (`${path}`.startsWith('/') ? `${path}`.slice(1) : `${path}`);

class CheckLogin extends React.PureComponent {
  componentDidMount() {
    const href = `${addSlash(this.props.base)}${removeSlash(window.location.pathname)}${window.location.search}`;
    window.location.href = href;
    console.log('REDIRECT', href);
  }

  render() {
    return (
      <div style={{ display: 'flex', flex: 1, paddingTop: '60px', alignItems: 'flex-start' }}>
        <Spinner isVisible text="&nbsp;Loading..." />
      </div>
    );
  }
}

CheckLogin.propTypes = {
  base: PropTypes.string.isRequired,
};

const selector = state => ({ base: state.config.app.wwwBaseUrl });

export default connect(selector, {})(CheckLogin);
