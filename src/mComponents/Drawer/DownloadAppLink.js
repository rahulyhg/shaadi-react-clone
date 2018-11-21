import React from 'react';
import PropTypes from 'prop-types';
import { DownloadAppContainer, DownloadIcon, MenuText } from './styles';

class DownloadApp extends React.PureComponent {
  render() {
    const { platform, url, children } = this.props;
    return (
      <DownloadAppContainer href={url}>
        <DownloadIcon kind={`download_app_${platform}`} />
        <MenuText>{children}</MenuText>
      </DownloadAppContainer>
    );
  }
}

DownloadApp.defaultProps = {
  url: 'https://play.google.com/store/apps/details?id=com.shaadi.android&hl=en',
  platform: 'Android',
};
DownloadApp.propTypes = {
  children: PropTypes.node.isRequired,
  platform: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default DownloadApp;
