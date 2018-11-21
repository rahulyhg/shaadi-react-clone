import React from 'react';
import PropTypes from 'prop-types';
import s from './styles';

const CampaignLayer = props => {
  if (props.data.loading) return null;
  if (props.data.category === 'template1') {
    return (
      <s.CampaignLayer>
        <s.CampaignLayerClose onClick={props.onModalClose} />
        <s.CampaignLink isExternal to={props.data.url} target="_blank">
          <img src={props.data.src} alt={props.data.alt} />
        </s.CampaignLink>
      </s.CampaignLayer>
    );
  }
  return null;
};

CampaignLayer.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.oneOf(['template1']),
    src: PropTypes.string,
    alt: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default CampaignLayer;
