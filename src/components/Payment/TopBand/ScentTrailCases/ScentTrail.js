import PropTypes from 'prop-types';
import React from 'react';
import ScentTrailTopHeading from './ScentTrailTopHeading';
import ScentTrailThumbnail from './ScentTrailThumbnail';
import ScentTrailUrlText from './ScentTrailUrlText';
import ScentTrailText from './ScentTrailText';

class ScentTrail extends React.Component {
  static Thumbnail = props => <ScentTrailThumbnail {...props} />;
  static Text = props => <ScentTrailText {...props} />;
  static UrlText = props => <ScentTrailUrlText {...props} />;
  static TopHeading = props => <ScentTrailTopHeading {...props} />;

  render() {
    return this.props.children;
  }
}
ScentTrail.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};
export default ScentTrail;
