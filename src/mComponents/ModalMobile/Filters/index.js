import React from 'react';
import PropTypes from 'prop-types';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import { FilterList } from '../styles';

const Filters = props => (
  <FilterList>
    {props.facetBar[0].options.map((option, index) => (
      <DialogContent key={option.name}>
        <DialogContentText
          name="filter"
          key={option.id}
          tabIndex={index}
          role="button"
          onClick={() => props.onAction('filter_seleted', props.source, option.name, option.value)}
        >
          {option.mobileLabel || option.label}
        </DialogContentText>
      </DialogContent>
    ))}
  </FilterList>
);
Filters.defaultProps = {};
Filters.propTypes = {
  facetBar: PropTypes.arrayOf(PropTypes.shape(PropTypes.facet)).isRequired,
};

export default Filters;
