import PropTypes from 'prop-types';
import React from 'react';
import { parse } from 'qs';
import TopBand from '../TopBand';
import './payment-style.css';
import BaseLink from '../../Common/BaseLink';
import { skipLinkUrl } from '../PaymentTabs/utils';

const TopBandAndSkipLink = ({ topBandProps, location, wwwBaseUrl, skipProfileId, showSkipLink }) => {
  const queryParams = parse(location.search.slice(1));
  const goUrl = skipLinkUrl(queryParams, wwwBaseUrl, skipProfileId);
  const skipLinkProps = { to: goUrl, id: 'skip_link', styleMixin: '' };

  return (
    <div id="top_band" className="top_bg" data-test-selector="top_bg">
      <div className="offer_wrapper" data-test-selector="offer_wrapper">
        {showSkipLink && (
          <BaseLink {...skipLinkProps}>
            <div className="skip_btn" data-test-selector="skip_link">{`I'll do this later`}</div>
          </BaseLink>
        )}
        <span className="font_24">
          <TopBand {...topBandProps} revampPage />
        </span>
      </div>
    </div>
  );
};

TopBandAndSkipLink.propTypes = {
  ...PropTypes.topBandProps,
};
export default TopBandAndSkipLink;
