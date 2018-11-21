import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';

const Banner = props => {
  if (props.bannerdetails.img.src === '') {
    return null;
  }

  const bannnerUrl = props.bannerdetails.url.replace(/&amp;/g, '&');
  const layerId = props.bannerdetails.layerId;
  return (
    <s.Banner isVisible bannerDimension={props.bannerDimension}>
      <s.BannerLink isExternal to={bannnerUrl} target="_blank" layerId={layerId}>
        <s.Bannerimage src={props.bannerdetails.img.src} bannerDimension={props.bannerDimension} layerId={layerId} />
      </s.BannerLink>
    </s.Banner>
  );
};
Banner.defaultProps = {
  bannerDimension: null,
};
Banner.propTypes = {
  bannerdetails: PropTypes.shape({
    url: PropTypes.string,
    img: PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
      height: PropTypes.number,
      width: PropTypes.number,
    }).isRequired,
    layerId: PropTypes.string,
  }).isRequired,
  bannerDimension: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }),
};

export default Banner;
