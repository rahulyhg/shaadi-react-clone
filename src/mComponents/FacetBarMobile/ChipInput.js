import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import { ChipInputContainer } from './styles';

class ChipInput extends React.PureComponent {
  render() {
    const { chips } = this.props; //eslint-disable-line
    return (
      <ChipInputContainer>
        {chips.map((chip, index) => (
          <Chip
            key={chip.id}
            label={chip.label}
            style={{ margin: '0 5px 5px 0', backgroundColor: '#DCF7FD', color: '#41B5C7', borderRadius: '4px' }}
            onDelete={chips.length > 1 ? () => this.props.onDelete(chip) : null}
          />
        ))}
        {this.props.children}
      </ChipInputContainer>
    );
  }
}

ChipInput.defaultProps = {};
ChipInput.propTypes = {
  children: PropTypes.node.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ChipInput;
