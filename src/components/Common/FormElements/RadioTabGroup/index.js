import React from 'react';
import PropTypes from 'prop-types';
import s from './styles';

class RadioTabGroup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    };
    this.onBodyTypeChange = this.onBodyTypeChange.bind(this);
    this.renderRadioChips = this.renderRadioChips.bind(this);
  }
  componentWillReceiveProps({ value } = {}) {
    this.setState({ value });
  }
  onBodyTypeChange(event, data) {
    const { target: { value } } = data;
    this.setState({ value });
    event.preventDefault();
    event.stopPropagation();
    this.props.onChange({ type: 'change', target: { value } }, { value, name: this.props.name });
  }
  renderRadioChips(item, key) {
    let value = this.state.value;
    if (typeof value === 'string') {
      value = [value];
    }
    const isSelected = this.props.type === 'checkbox' ? value.map(obj => obj.id).includes(item.value) : value.includes(item.value);
    const DefaultBtnWrap = this.props.defaultBtnWrap;
    const LabelImage = isSelected === true ? item.selectedLableImage : item.lableImage;
    return (
      <DefaultBtnWrap
        key={key}
        isselected={isSelected.toString()}
        onClick={event => this.onBodyTypeChange(event, { target: { value: item.value } })}
        name={this.props.name}
      >
        <s.BodyTypeLabel isSelected={isSelected} style={{ textTransform: 'initial' }}>
          {item.lableImage && LabelImage}
          {item.label}
          <s.input
            type={this.props.type}
            name={this.props.name}
            value={item.value}
            checked={isSelected}
            onChange={event => this.onBodyTypeChange(event, { target: { value: item.value } })}
          />
        </s.BodyTypeLabel>
      </DefaultBtnWrap>
    );
  }
  render = () => {
    const DefaultWrap = this.props.defaultWrap;
    return (
      <DefaultWrap data-test-id={this.props.id} id={this.props.id}>
        {this.props.options && this.props.options.map(this.renderRadioChips)}
      </DefaultWrap>
    );
  };
}

RadioTabGroup.defaultProps = {
  type: 'radio',
  defaultWrap: s.tabwrapper,
  defaultBtnWrap: s.StyleButton,
  onChange() {},
  id: '',
  name: '',
  value: '',
};

RadioTabGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    }),
  ).isRequired,
  name: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onChange: PropTypes.func,
  defaultWrap: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.element]).isRequired,
  defaultBtnWrap: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.element]).isRequired,
};

export default RadioTabGroup;
