import { PureComponent } from 'react';
import update from 'immutability-helper';
import isArray from 'lodash/isArray';
import isIE from '../../../helpers/deviceInfo/isIE';
import PropTypes from '../../../PropTypes';

const isDownArrowKeyPressed = (prevProps, nextProps) => prevProps.moveDown !== nextProps.moveDown;
const isUpArrowKeyPressed = (prevProps, nextProps) => prevProps.moveUp !== nextProps.moveUp;
const isArrowKeyPressed = (prevProps, nextProps) =>
  isUpArrowKeyPressed(prevProps, nextProps) || isDownArrowKeyPressed(prevProps, nextProps);
const isEnterKeyPressed = (prevProps, nextProps) => prevProps.isEnterKeyPressed !== nextProps.isEnterKeyPressed;
const isTabKeyPressed = (prevProps, nextProps) => prevProps.isTabKeyPressed !== nextProps.isTabKeyPressed;
const isActionKeyPressed = (prevProps, nextProps) => isEnterKeyPressed(prevProps, nextProps) || isTabKeyPressed(prevProps, nextProps);
const isNewOptions = (prevProps, nextProps) =>
  JSON.parse(JSON.stringify(prevProps.options)) !== JSON.parse(JSON.stringify(nextProps.options));
const isInputValueDifferent = (prevProps, nextProps) => prevProps.value !== nextProps.value;
const canFilterOptions = props => !!props.value && !props.isReadOnly && (props.hasError() || props.isChangedEvent) && !props.noFilter;
const defaultFilterOption = (option, value, props) => {
  let label = option.label;
  let inputText = value;
  if (props.ignoreCase) {
    label = label.toLowerCase();
    inputText = inputText.toLowerCase();
  }
  const isExcluded = props.excludeForFilter.includes(label);
  let isAcronymMatched = false;
  if (props.filterByAcronym) {
    const str = label.toLowerCase().replace(' and ', ' ');
    const matches = str.match(/\b(\w)/g);
    const acronym = matches.join('');
    isAcronymMatched = acronym.indexOf(inputText) !== -1;
  }
  const isExactMatch = label.includes(inputText);
  return isAcronymMatched || isExactMatch || isExcluded;
};

class ControlledDropDown extends PureComponent {
  state = {
    selectedIndexes: [],
    highlightedOptionIndex: -1,
    options: [],
    isOpen: this.props.isFocused || this.props.alwaysShowOptions,
  };
  componentWillMount = () => this.setOptionAndSelectedIndex(this.props);
  componentDidMount = () => {
    this.props.afterOptionLoad({ ...this.props, ...this.state });
    this.autoScrollToSelectedOption();
  };
  componentWillReceiveProps = nextProps => {
    if (isArrowKeyPressed(this.props, nextProps)) {
      this.setIndexToHighlight(nextProps);
    } else if (
      !isActionKeyPressed(this.props, nextProps) &&
      (isInputValueDifferent(this.props, nextProps) || isNewOptions(this.props, nextProps))
    ) {
      this.setOptionAndSelectedIndex(nextProps);
    }
  };
  componentDidUpdate = (prevProps, prevState) => {
    isActionKeyPressed(prevProps, this.props) && this.handleKeyPress(this.props);
    isArrowKeyPressed(prevProps, this.props) && this.autoScrollToSelectedOption();
  };
  componentWillUnmount = () => !this.props.option && this.onOptionListClose();
  onOptionSelection = (option, index) => {
    const mutatedOption = this.props.mutateSelectedOption(option);
    this.props.setInputState(
      { value: this.props.updateInputWith(option), isDirty: true, isEnterKeyPressed: false, isTabKeyPressed: false, option: mutatedOption },
      () => {
        this.props.onOptionSelection(mutatedOption, this.props);
        this.props.focusOut();
      },
    );
  };
  onOptionListClose = () => {
    this.props.autoSelectOnBlur &&
      this.hasOptions(this.state.options) &&
      this.props.isMatching({ option: this.state.options[0], value: this.props.value }) &&
      this.onOptionSelection(this.state.options[0], 0);
    this.props.onOptionClosing({ ...this.state, ...this.props });
  };
  onOptionClick = (option, index) => event => {
    event.preventDefault();
    this.onOptionSelection(option, index);
  };
  // @todo highlight option whose starting characters matches the most
  getFlattenedFilteredOptions = (options, option, index, { group, groupOptions = [], ...props }) => {
    const {
      value,
      values,
      canShowOption,
      uniqueOptionsOnly,
      isSelected,
      extraOptionParams,
      getOptionValue,
      getOptionLabel,
      onOptionGroupClick,
      filterOption,
    } = props;
    const currentOptionIndex = options.length;
    const optionValue = option.options || getOptionValue(option);
    const isOptionGroup = isArray(optionValue);
    const isOption = isOptionGroup ? undefined : true;
    const label = getOptionLabel(option);
    const groupOpt = isOptionGroup && { label };
    const canFilter = canFilterOptions(props);
    if (uniqueOptionsOnly && options.uniqueKeys && options.uniqueKeys[label]) {
      return options;
    }
    const flattenedOpt = {
      ...extraOptionParams(option),
      label,
      isOptionGroup,
      group,
      value: isOption && optionValue,
    };
    if (canFilter && !filterOption(flattenedOpt, value, props) && isOption) {
      return options;
    }
    if (!canShowOption(flattenedOpt)) {
      return options;
    }
    flattenedOpt.onMouseDown = isOption ? this.onOptionClick(flattenedOpt, index) : onOptionGroupClick;
    const isOptionSelected = isSelected({ option: flattenedOpt, value, values });
    const selectedIndexes = options.selectedIndexes || [];
    !canFilter && isOptionSelected && selectedIndexes.push(currentOptionIndex);
    // @todo get API to send unique values in
    // GET state list
    // GET city list
    // GET caste list
    // GET grew up in country list
    options.uniqueKeys = {
      ...options.uniqueKeys,
      [label]: true,
    };
    options.selectedIndexes = selectedIndexes;
    options.highlightWords = values && !value ? values.split(',') : value;
    if (canFilter) {
      options.highlightedOptionIndex = 0;
    } else if (isOptionSelected) {
      options.highlightedOptionIndex = currentOptionIndex;
      flattenedOpt.innerRef = this.setHighlightedOptionRef;
    } else if (!options.selectedIndexes.length && !currentOptionIndex) {
      options.highlightedOptionIndex = isOptionGroup ? 1 : 0;
    }
    if (isOptionGroup) {
      !canFilter && options.push(flattenedOpt);
    } else {
      options.push(flattenedOpt);
    }
    isOptionGroup &&
      optionValue.reduce(
        (optGroupOpts, optGrp, optGrpIndex) =>
          this.getFlattenedFilteredOptions(optGroupOpts, optGrp, optGrpIndex, { ...props, group: groupOpt, groupOptions: optionValue }),
        options,
      );
    return options;
  };
  getFilteredOptions = ({ options, value }) => options.filter(option => this.props.filterOption(option, value, this.props));
  getSelectedIndex = (selectedIndex, moveBy) => selectedIndex + moveBy;
  setHighlightedOptionRef = element => {
    this.selectedOptionRef = element;
  };
  setIndexToHighlight = params => {
    this.setState(({ highlightedOptionIndex, selectedIndexes, options }) => {
      let newHighlightedOptionIndex = this.getSelectedIndex(
        highlightedOptionIndex,
        this.moveSelectedIndexBy(highlightedOptionIndex, params),
      );
      if (newHighlightedOptionIndex < 0 || !options[newHighlightedOptionIndex]) {
        return null;
      }
      if (options[newHighlightedOptionIndex].isOptionGroup) {
        newHighlightedOptionIndex += isUpArrowKeyPressed(this.props, params) ? -1 : 1;
        if (newHighlightedOptionIndex === -1) {
          newHighlightedOptionIndex = 1;
        }
      }
      return {
        highlightedOptionIndex: newHighlightedOptionIndex,
        highlightMode: true,
        options: update(options, { [newHighlightedOptionIndex]: { innerRef: { $set: element => this.setHighlightedOptionRef(element) } } }),
      };
    });
  };
  setOptionAndSelectedIndex = props => {
    this.setState(state => {
      const reducerArr = [];
      reducerArr.highlightedOptionIndex = state.highlightedOptionIndex;
      // @todo find a better way to prevent array of object mutation
      const options = JSON.parse(JSON.stringify(props.options)).reduce(
        (flattenedOpts, option, index) => this.getFlattenedFilteredOptions(flattenedOpts, option, index, props),
        reducerArr,
      );
      const selectedIndexes = options.selectedIndexes;
      const highlightWords = options.highlightWords;
      const highlightedOptionIndex = options.highlightedOptionIndex;
      return {
        options,
        selectedIndexes,
        highlightWords,
        highlightedOptionIndex,
      };
    });
  };
  isOptionClosing = prevProps => !this.props.isFocused && prevProps.isFocused && canFilterOptions(prevProps);
  canAutoScroll = (prevProps, prevState) =>
    ((this.props.isFocused && !prevProps.isFocused) || this.state.highlightedOptionIndex !== prevState.highlightedOptionIndex) &&
    !!this.selectedOptionRef;
  autoScrollToSelectedOption = () => {
    if (isIE() && this.selectedOptionRef) {
      this.selectedOptionRef.scrollIntoView(false);
    } else if (this.selectedOptionRef && this.selectedOptionRef.scrollIntoView) {
      this.selectedOptionRef.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  };
  moveSelectedIndexBy = (highlightedOptionIndex, nextProps) => {
    let moveBy = 0;
    if (nextProps.moveUp && nextProps.moveUp !== this.props.moveUp && highlightedOptionIndex > 0) {
      moveBy -= 1;
    } else if (nextProps.moveDown && nextProps.moveDown !== this.props.moveDown && highlightedOptionIndex < this.state.options.length - 1) {
      moveBy += 1;
    }
    return moveBy;
  };
  handleKeyPress = ({ isEnterKeyPressed: isEnterHit, isTabKeyPressed: isTabHit }) => {
    const currentHighlightedOption = this.state.options[this.state.highlightedOptionIndex];
    if ((isEnterHit || isTabHit) && currentHighlightedOption) {
      this.onOptionSelection(currentHighlightedOption, this.state.highlightedOptionIndex);
    }
  };
  hasFilteredOptions = () => !!this.state.options.length;
  canShowNoResultFound = () => !this.hasFilteredOptions() && !this.props.hideNoResultFound;
  isSelected = index => index === this.state.selectedIndex;
  canHighlight = (option, index) => {
    const { highlightedOptionIndex, selectedIndexes, highlightMode } = this.state;
    if (this.props.value && highlightedOptionIndex === -1 && !selectedIndexes.length && index === 0) {
      return true;
    }
    if (this.state.highlightedOptionIndex === index) {
      return true;
    }
    if (!highlightMode && this.state.selectedIndexes.includes(index)) {
      return true;
    }
    return false;
  };
  hasOptions = (options = this.state.options) => !!options.length;
  canShowOptions = () => this.props.isFocused || this.props.alwaysShowOptions;
  render = () =>
    this.props.children({
      ...this.state,
      filterOption: this.props.filterOption,
      hasOptions: this.hasOptions,
      hasFilteredOptions: this.hasFilteredOptions,
      canShowOptions: this.canShowOptions,
      canShowNoResultFound: this.canShowNoResultFound,
      canHighlight: this.canHighlight,
      onOptionSelection: this.onOptionSelection,
      isSelected: this.isSelected,
      getOptionLabel: this.getOptionLabel,
      getOptionValue: this.getOptionValue,
    });
}

ControlledDropDown.defaultProps = {
  value: '',
  values: '',
  moveUp: 0,
  moveDown: 0,
  isFocused: false,
  alwaysShowOptions: false,
  hideNoResultFound: false,
  uniqueOptionsOnly: true,
  options: [],
  option: undefined,
  children() {},
  setInputState() {},
  focus() {},
  getOptionLabel: option => option && option.label,
  getOptionValue: option => option && option.value,
  updateInputWith: option => option.label,
  onOptionSelection() {},
  onOptionClosing() {},
  afterOptionLoad() {},
  canShowOption: () => true,
  extraOptionParams() {},
  isMatching: ({ option, value }) => option.label.toLowerCase() === value.toLowerCase(),
  mutateSelectedOption: ({ onMouseDown, ...option }) => option,
  isSelected: ({ option, value }) => value === option.value,
  onOptionGroupClick: event => {
    event.preventDefault();
    event.stopPropagation();
  },
  filterOption: defaultFilterOption,
  ignoreCase: true,
  excludeForFilter: [],
  filterByAcronym: true,
  autoSelectOnBlur: true,
};

ControlledDropDown.propTypes = {
  value: PropTypes.string.isRequired,
  values: PropTypes.string.isRequired,
  moveUp: PropTypes.number.isRequired,
  moveDown: PropTypes.number.isRequired,
  uniqueOptionsOnly: PropTypes.bool,
  isFocused: PropTypes.bool.isRequired,
  alwaysShowOptions: PropTypes.bool.isRequired,
  hideNoResultFound: PropTypes.bool.isRequired,
  autoSelectOnBlur: PropTypes.bool,
  children: PropTypes.func.isRequired,
  onOptionSelection: PropTypes.func.isRequired,
  setInputState: PropTypes.func.isRequired,
  focusOut: PropTypes.func.isRequired,
  getOptionLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
  onOptionClosing: PropTypes.func,
  afterOptionLoad: PropTypes.func,
  canShowOption: PropTypes.func,
  mutateSelectedOption: PropTypes.func,
  extraOptionParams: PropTypes.func,
  isSelected: PropTypes.func,
  isMatching: PropTypes.func,
  updateInputWith: PropTypes.func,
  onOptionGroupClick: PropTypes.func,
  filterOption: PropTypes.func,
  option: PropTypes.shape({}),
};

export default ControlledDropDown;
