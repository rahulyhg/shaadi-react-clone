import PropTypes from 'prop-types';
import React from 'react';
import s from '../styles';
import ScentTrail from './ScentTrail';
import { STOPPAGE_SOURCES, MESSAGE_SOURCES, SOURCE_HEADING } from '../../utils';

const ScentTrailText = props => {
  const { type, acceptCount, profileId, profileName, subText, wwwBaseUrl, gender } = props;
  const topHeadingProps = { type, profileId, profileName, acceptCount, wwwBaseUrl, subText, gender };
  const headingBottomText = (
    <s.ScentTrailHeading>
      {((STOPPAGE_SOURCES.includes(type) || MESSAGE_SOURCES.includes(type)) && SOURCE_HEADING(type)) || subText}
    </s.ScentTrailHeading>
  );
  return (
    <s.ScentTrailText>
      <ScentTrail.TopHeading {...topHeadingProps} />
      <br />
      {headingBottomText}
    </s.ScentTrailText>
  );
};

ScentTrailText.defaultProps = {
  type: '',
  acceptCount: 0,
  profileId: '',
  profileName: '',
  subText: '',
  wwwBaseUrl: '',
  gender: 'none',
};
ScentTrailText.propTypes = {
  type: PropTypes.string.isRequired,
  acceptCount: PropTypes.number.isRequired,
  profileId: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  gender: PropTypes.oneOf(['male', 'female', 'none']).isRequired,
};
export default ScentTrailText;
