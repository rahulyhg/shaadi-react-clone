import React, { Fragment } from 'react';
import PropTypes from '../../../PropTypes';
import Option from '../../../theme/Option';
import Highlighter from '../Highlighter';
import ControlledDropDown from './ControlledDropDown';
import VirtualizedList from '../VirtualizedList';
import Ripple from '../Ripple';

const OptionsListing = props => (
  <ControlledDropDown {...props} moveUp={props.upKeyPressedCount} moveDown={props.downKeyPressedCount}>
    {optionsListingProps => (
      <Fragment>
        {!!optionsListingProps.options.length && (
          <VirtualizedList itemHeight={48} maxHeight={props.optionFixedHeight}>
            {optionsListingProps.options.map((option, index) => (
              <Ripple color="#83E1ED" key={`options_${option.label}`}>
                <Option {...option} selected={optionsListingProps.canHighlight(option, index)} title={option.label}>
                  <Highlighter highlight={optionsListingProps.options.highlightWords}>{option.label}</Highlighter>
                </Option>
              </Ripple>
            ))}
          </VirtualizedList>
        )}
        {optionsListingProps.canShowNoResultFound() && <Option className="no-result-found">{props.noResultsText}</Option>}
      </Fragment>
    )}
  </ControlledDropDown>
);

OptionsListing.defaultProps = {
  noResultsText: 'No Result Found',
  filteredOptions: [],
  lazyLoadItems: undefined,
  optionFixedHeight: undefined,
};

OptionsListing.propTypes = {
  upKeyPressedCount: PropTypes.number.isRequired,
  downKeyPressedCount: PropTypes.number.isRequired,
  optionFixedHeight: PropTypes.number,
  noResultsText: PropTypes.string.isRequired,
  filteredOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  lazyLoadItems: PropTypes.number,
};

export default OptionsListing;
