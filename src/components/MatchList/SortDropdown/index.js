import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';

class SortDropdown extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isDropdownVisible: false,
      items: props.items,
    };
    this.onChange = this.onChange.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  componentWillReceiveProps(props) {
    if (this.props.items !== props.items) {
      this.setState({
        items: props.items,
        isDropdownVisible: false,
      });
    }
  }

  onChange(item) {
    this.setState({
      items: this.state.items.map(i => ({ ...i, isSelected: i.key === item.key })),
      isDropdownVisible: false,
    });
    setTimeout(() => this.props.onChange(item), 1);
  }

  onMouseLeave() {
    this.setState({ isDropdownVisible: false });
  }

  render() {
    const { items } = this.state;
    return (
      <s.SortDropdown onMouseLeave={this.onMouseLeave}>
        <s.Selected onClick={() => this.setState({ isDropdownVisible: !this.state.isDropdownVisible })}>
          {Array.isArray(items) && items.filter(item => item.isSelected)[0].label}
        </s.Selected>
        <s.Dropdown isVisible={this.state.isDropdownVisible}>
          {items.map(item => (
            <s.Item key={item.key} onClick={() => this.onChange(item)} isActive={item.isSelected}>
              {item.label}
            </s.Item>
          ))}
        </s.Dropdown>
      </s.SortDropdown>
    );
  }
}

const itemProps = {
  key: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

SortDropdown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(itemProps)).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SortDropdown;
