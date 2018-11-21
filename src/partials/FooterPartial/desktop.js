/* eslint react/require-default-props: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Footer from '../../components/Footer';

const FooterPartial = props => (
  <Footer mobileAppLinks={props.mobileAppLinks} windowWidth={props.windowWidth} isChatOpen={props.isChatOpen} />
);

FooterPartial.propTypes = {
  mobileAppLinks: Footer.propTypes.mobileAppLinks,
  windowWidth: PropTypes.number.isRequired,
  isChatOpen: PropTypes.bool,
};

const selector = state => {
  const { chat } = state;
  const links = [
    {
      platform: 'apple',
      url: 'http://itunes.apple.com/in/app/shaadi.com-matrimonial-app/id480093204?mt=8',
      key: 'ios',
    },
    {
      platform: 'android',
      url: 'https://play.google.com/store/apps/details?id=com.gujaratishaadi.android',
      key: 'android',
    },
  ];
  return {
    isChatOpen: chat.settings.isOpen,
    mobileAppLinks: links,
    windowWidth: state.view.width,
  };
};

export default connect(state => selector(state), {})(FooterPartial);
