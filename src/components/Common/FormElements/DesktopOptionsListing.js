import React from 'react';
import styled from 'styled-components';
import PropTypes from '../../../PropTypes';
import Wrapper from '../../../theme/Wrapper';
import Absolute from '../../../theme/Absolute';
import Highlighter from '../Highlighter';
import ControlledDropDown from './ControlledDropDown';
import ScrollLazyLoad from '../ScrollLazyLoad';
import isIE from '../../../helpers/deviceInfo/isIE';
import ShowHide from '../../HOC/ShowHide';

const NoResultFound = styled.div`
  font-family: Roboto;
  font-size: 12px;
  font-weight: 300;
  padding: 5px 10px 4px;
  width: 95%;
  float: left;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  height: 24px;
  line-height: 25px;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  cursor: ${({ isOptionGroup }) => (isOptionGroup ? 'normal' : 'pointer')};
  background-color: ${({ selected }) => selected && '#83E1ED'};
  text-align: left;
`;

const Option = NoResultFound.extend`
  font-weight: ${({ isOptionGroup }) => (isOptionGroup ? (isIE() ? 'bold' : 600) : 300)};
  width: ${({ width }) => width};
  background-position: center;
  transition: background 0.8s;
  &:hover {
    background: ${({ isOptionGroup }) =>
      !isOptionGroup && 'rgba(131, 225, 237, 0.7) radial-gradient(circle, transparent 1%, rgba(131, 225, 237, 0.7) 1%) center/15000%'};
  }
  &:active {
    background-color: ${({ isOptionGroup }) => !isOptionGroup && '#2196f3'};
    background-size: ${({ isOptionGroup }) => !isOptionGroup && '100%'};
    transition: background 0s;
  }
`;

const OptionsListing = props => (
  <ControlledDropDown {...props} moveUp={props.upKeyPressedCount} moveDown={props.downKeyPressedCount}>
    {optionsListing => (
      <Absolute
        width={props.dropDownWidth}
        zIndex={3}
        boxShadow="0 2px 2px rgba(0, 0, 0, 0.24)"
        background="#f1f1f2"
        maxHeight={props.maxHeight}
        display="flex"
        overflow="auto"
      >
        <Wrapper
          overflow="hidden auto"
          width={props.dropDownWidth || '100%'}
          maxHeight={props.maxHeight}
          zIndex={3}
          border="none"
          display="block"
        >
          <ScrollLazyLoad itemsLimit={props.lazyLoadItems || optionsListing.options.length}>
            {optionsListing.options.map((option, index) => (
              <Option
                width={props.optionWidth || (!props.isMultiColumn ? '95%' : option.isOptionGroup ? '84%' : '28%')}
                {...option}
                selected={optionsListing.canHighlight(option, index)}
                key={`options_${option.label}`}
                pointerEvents={option.isOptionGroup ? 'none' : ''}
                title={option.label}
              >
                <Highlighter highlight={optionsListing.options.highlightWords}>{option.label}</Highlighter>
              </Option>
            ))}
          </ScrollLazyLoad>
          {optionsListing.canShowNoResultFound() && <NoResultFound className="no-result-found">{props.noResultsText}</NoResultFound>}
        </Wrapper>
      </Absolute>
    )}
  </ControlledDropDown>
);

OptionsListing.defaultProps = {
  upKeyPressedCount: 0,
  downKeyPressedCount: 0,
  noResultsText: 'No Result Found',
  filteredOptions: [],
  isMultiColumn: false,
  lazyLoadItems: undefined,
  dropDownWidth: '',
  optionWidth: '',
};

OptionsListing.propTypes = {
  lazyLoadItems: PropTypes.number,
  upKeyPressedCount: PropTypes.number.isRequired,
  downKeyPressedCount: PropTypes.number.isRequired,
  filteredOptions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isMultiColumn: PropTypes.bool,
  value: PropTypes.string.isRequired,
  noResultsText: PropTypes.string,
  dropDownWidth: PropTypes.string,
  optionWidth: PropTypes.string,
  maxHeight: PropTypes.string.isRequired,
};

export default ShowHide(OptionsListing);
