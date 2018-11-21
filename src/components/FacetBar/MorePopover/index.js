import React from 'react';
import PropTypes from 'prop-types';
import s from './styles';

class MorePopover extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items.filter(i => i.id !== 'All').sort((a, b) => a.vOrder - b.vOrder),
    };
    this.onSelectItem = this.onSelectItem.bind(this);
    this.onClearSelectionsClick = this.onClearSelectionsClick.bind(this);
    this.onSelectionDoneClick = this.onSelectionDoneClick.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.items !== this.props.items) {
      this.setState({
        items: props.items.filter(i => i.id !== 'All').sort((a, b) => a.vOrder - b.vOrder),
      });
    }
  }

  onSelectionDoneClick() {
    this.props.onSelectionDoneClick(this.state.items);
    this.props.onPopoverClose();
  }

  onSelectItem(selectedItem) {
    const { items } = this.state;
    this.setState({
      items: items.map(i => ({ ...i, isSelected: i.id === selectedItem.id ? true : i.isSelected })),
    });
  }

  onRemoveItem(selectedItem) {
    const { items } = this.state;
    this.setState({
      items: items.map(i => ({
        ...i,
        isSelected: i.id === selectedItem.id ? false : i.isSelected,
      })),
    });
  }

  onClearSelectionsClick() {
    const { items } = this.state;
    this.setState({
      items: items.map(i => ({ ...i, isSelected: false })),
    });
  }

  renderItem(title, item, vGroups) {
    const column = item.isSelected ? 'right' : 'left';
    let heading = null;

    if (vGroups[column] !== item.vGroup) {
      vGroups[column] = item.vGroup;
      heading = (
        <s.Option key={`head-${title}-${column}-${item.vGroup || 'heading'}`} title={item.vGroup}>
          <s.Heading title={item.vGroup}>{item.vGroup}</s.Heading>
        </s.Option>
      );
    }
    return (
      <div key={`${title}-${column}-${item.id}`}>
        {heading}
        <s.Option key={`opt-${title}-${column}-${item.id}`} title={item.name}>
          {column === 'right' ? (
            <s.CheckIconImg onClick={() => this.onRemoveItem(item)} src={'/assets/deselect-icon.gif'} />
          ) : (
            <s.Checkbox
              name={item.name}
              type="checkbox"
              checked={item.isSelected}
              id={`${item.name}${item.id}`}
              onChange={() => this.onSelectItem(item)}
            />
          )}
          <s.Label htmlFor={`${item.name}${item.id}`} title={item.title}>
            {item.name}
            <s.Count isVisible={item.count}>&nbsp;({item.count})</s.Count>
          </s.Label>
        </s.Option>
      </div>
    );
  }

  render() {
    const { title } = this.props;
    const selectedItemCount = this.state.items.filter(i => i.isSelected).length || 0;
    const vGroups = {};
    return (
      <s.MorePopover>
        <s.MoreBtn isPopoverVisible={this.props.isPopoverVisible} onClick={() => this.props.onMoreClick(this.props.id)}>
          More&nbsp;
          <img height="9" width="7" title="Select More" alt="Select More" src="/assets/view-arrow.gif" />
        </s.MoreBtn>
        <s.MoreModal isVisible={this.props.isPopoverVisible}>
          <s.Header>
            <s.HeaderText>{title}</s.HeaderText>
            <s.CloseBtn onClick={this.props.onPopoverClose} />
          </s.Header>
          <s.Content>
            <s.OptionsWrapper>
              <s.SubHeading>Available options</s.SubHeading>
              <s.OptionsList>
                {this.state.items.filter(item => !item.isSelected).map(item => this.renderItem(title, item, vGroups))}
              </s.OptionsList>
            </s.OptionsWrapper>
            <s.OptionsWrapper>
              <s.SubHeading>
                <s.SubHeadingText>My selection(s)</s.SubHeadingText>
                <s.ClearBtn onClick={this.onClearSelectionsClick}>Clear</s.ClearBtn>
              </s.SubHeading>
              <s.OptionsList>
                {this.state.items.filter(item => item.isSelected).map(item => this.renderItem(title, item, vGroups))}
                {selectedItemCount <= 0 && (
                  <s.Option>
                    <s.Label>{"Doesn't Matter"}</s.Label>
                  </s.Option>
                )}
              </s.OptionsList>
            </s.OptionsWrapper>
          </s.Content>
          <s.Footer>
            <s.DoneBtn onClick={this.onSelectionDoneClick}>Done</s.DoneBtn>
          </s.Footer>
        </s.MoreModal>
      </s.MorePopover>
    );
  }
}

MorePopover.defaultProps = {
  items: [],
  isPopoverVisible: false,
};

const itemPropTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  count: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  vOrder: PropTypes.number.isRequired,
};

MorePopover.propTypes = {
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape(itemPropTypes)),
  title: PropTypes.string.isRequired,
  onSelectionDoneClick: PropTypes.func.isRequired,
  onPopoverClose: PropTypes.func.isRequired,
  onMoreClick: PropTypes.func.isRequired,
  isPopoverVisible: PropTypes.bool.isRequired,
};

export default MorePopover;
