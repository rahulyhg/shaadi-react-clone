import PropTypes from 'prop-types';
import { parse } from 'qs';
import React from 'react';
import s from './styles';
import { skipLinkUrl } from './utils';
import BaseLink from '../../Common/BaseLink';

const popUpFunction = () =>
  window.open(`/compare-plans`, 'mywindow', 'toolbar=0,status=0,menubar=1,resizable=1,width=1382,height=850,scrollbars=1');

const ComparePlanLink = ({ activeIndex, showSkipLink, isSkipLink, wwwBaseUrl, location, skipProfileId }) => {
  if (showSkipLink && isSkipLink) {
    const queryParams = parse(location.search.slice(1));
    const goUrl = skipLinkUrl(queryParams, wwwBaseUrl, skipProfileId);
    const skipLinkProps = { to: goUrl, id: 'skip_link', styleMixin: s.SkipLinkMixin };
    return (
      <s.CompareWrapper>
        <BaseLink {...skipLinkProps}>{`I'll do this later`}</BaseLink>
      </s.CompareWrapper>
    );
  } else if (activeIndex === 0 && !showSkipLink === isSkipLink) {
    const comparePlanProps = { onClick: popUpFunction, styleMixin: s.ComparePlanMixin };
    return (
      <React.Fragment>
        {showSkipLink && (
          <BaseLink {...comparePlanProps} id="data_test_compareskip">
            Compare Plans in detail
          </BaseLink>
        )}
        {!showSkipLink && (
          <s.CompareWrapper>
            <BaseLink {...comparePlanProps} id="data_test_compare">
              Compare Plans in detail
            </BaseLink>
          </s.CompareWrapper>
        )}
      </React.Fragment>
    );
  }
  return '';
};

ComparePlanLink.defaultProps = {
  activeIndex: 0,
  location: {},
  skipProfileId: '',
};

ComparePlanLink.propTypes = {
  activeIndex: PropTypes.number,
  showSkipLink: PropTypes.bool.isRequired,
  isSkipLink: PropTypes.bool.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  skipProfileId: PropTypes.string.isRequired,
  location: PropTypes.oneOfType([PropTypes.shape(PropTypes.location).isRequired]),
};
export default ComparePlanLink;
