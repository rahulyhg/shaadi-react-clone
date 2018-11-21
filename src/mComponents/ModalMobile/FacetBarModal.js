import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import FacetBarMobile, { FacetItem } from '../../mComponents/FacetBarMobile';

class FacetBarModal extends React.PureComponent {
  render() {
    const { items, onModalClose, onAction } = this.props;
    return (
      <FacetBarMobile onModalClose={onModalClose}>
        {items.filter(facet => facet.id !== 'featured').map(facet => {
          const onFacetChange = () => onAction('onFacetChange', facet);
          return (
            <div key={facet.key}>
              <FacetItem {...facet} onFacetChange={onFacetChange} />
              <Divider light />
            </div>
          );
        })}
      </FacetBarMobile>
    );
  }
}

FacetBarModal.defaultProps = {};

FacetBarModal.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onModalClose: PropTypes.func.isRequired,
  onAction: PropTypes.func.isRequired,
};

export default FacetBarModal;
