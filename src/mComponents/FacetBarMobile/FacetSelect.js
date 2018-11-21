import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { CSSTransition } from 'react-transition-group';
import ChipInput from './ChipInput';
import { FacetSelectContainer, FacetActions, FacetOptions, FacetOption, FacetOptionTitle, TickIcon } from './styles';

class FacetSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      in: false,
      filterText: '',
      options: props.options,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ in: true });
    }, 0);
  }
  componentWillReceiveProps(props) {
    if (props.options !== this.props.options) {
      this.setState({ options: props.options });
    }
  }
  handleFilterChange = e => {
    this.setState({ filterText: e.target.value });
  };

  handleOptionChange = option => {
    const { isMulti } = this.props;
    let { options } = this.state;
    const selectedOptionLength = options.filter(item => item.isSelected).length;
    const isLastOptionSelected = selectedOptionLength === 1 && option.isSelected;
    if (isLastOptionSelected) {
      return;
    }
    options = options.map(item => {
      if (option.id !== 'All' && item.id === 'All') {
        item.isSelected = false;
      } else if (option.id === 'All' && isMulti) {
        item.isSelected = item.id === 'All';
      } else if (item.id === option.id) {
        item.isSelected = !item.isSelected;
      } else if (!isMulti) {
        item.isSelected = false;
      }
      return item;
    });
    this.setState({ options });
  };

  render() {
    const { title, isVisible, onCancel, onFacetChange } = this.props;
    if (!isVisible) {
      return null;
    }
    const { filterText, options } = this.state;
    return (
      <CSSTransition in={this.state.in} appear classNames="slide-left" timeout={{ appear: 200, enter: 200, exit: 200 }}>
        <FacetSelectContainer>
          <FacetActions>
            <Typography variant="subheading" color="secondary" onClick={onCancel}>
              Cancel
            </Typography>
            <Typography variant="subheading" color="textSecondary">
              <strong>{title}</strong>
            </Typography>
            <Typography
              variant="subheading"
              color="secondary"
              onClick={() => {
                onCancel();
                onFacetChange(this.props.id, this.state.options);
              }}
            >
              Done
            </Typography>
          </FacetActions>
          <FacetOptions>
            <ChipInput chips={options.filter(option => option.isSelected)} onDelete={this.handleOptionChange}>
              <TextField value={filterText} onChange={this.handleFilterChange} />
            </ChipInput>
            <FacetOptionTitle type="button">Frequently Used</FacetOptionTitle>
            {options.filter(option => option.label.indexOf(filterText) !== -1).map(option => (
              <div key={option.key}>
                <FacetOption onClick={() => this.handleOptionChange(option)}>
                  <Typography>{option.title}</Typography>
                  <TickIcon isSelected={option.isSelected} />
                </FacetOption>
                <Divider light />
              </div>
            ))}
          </FacetOptions>
        </FacetSelectContainer>
      </CSSTransition>
    );
  }
}

FacetSelect.defaultProps = {
  options: [],
};

FacetSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape(PropTypes.facetOption)),
  title: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onFacetChange: PropTypes.func.isRequired,
  isMulti: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default FacetSelect;
