import React from 'react';
import PropTypes from 'prop-types';

import ContactSummaryItem from '../../ContactSummaryItem';
import Inbox from './inbox';

class NoResult extends React.PureComponent {
  render() {
    switch (this.props.source) {
      case 'contactSummaryItem': {
        return <ContactSummaryItem {...this.props} />;
      }
      case 'inbox': {
        return <Inbox {...this.props} />;
      }
      default:
        return null;
    }
  }
}
NoResult.defaultProps = {
  sourceType: 'none',
  counts: {},
};
NoResult.propTypes = {
  source: PropTypes.string.isRequired,
  sourceType: PropTypes.string,
  counts: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};
export default NoResult;
