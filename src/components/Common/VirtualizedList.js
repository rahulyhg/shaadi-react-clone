import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Wrapper from '../../theme/Wrapper';

class VirtualizedList extends PureComponent {
  static getDerivedStateFromProps = (nextProps, prevState) => ({
    totalHeight:
      prevState.childrenCount !== nextProps.children.length ? nextProps.itemHeight * nextProps.children.length : prevState.totalHeight,
    childrenCount: nextProps.children.length,
  });
  state = {
    startingIndex: this.props.defaultStartingIndex,
    totalHeight: this.props.itemHeight * this.props.children.length,
    childrenCount: this.props.children.length,
  };
  componentDidUpdate = () => {
    if (this.state.totalHeight - this.scrollableWrapper.scrollTop - this.props.maxHeight === 0) {
      let moreHeight = 0;
      Array(this.itemsCountToShow)
        .fill()
        .forEach((_, i) => {
          const ref = this.listItemsRef[this.getIndexBeingLooped(i)];
          if (ref && ref.getBoundingClientRect().top > this.props.maxHeight) {
            moreHeight += ref.getBoundingClientRect().top - this.props.maxHeight;
          }
        });
      moreHeight && this.setState({ totalHeight: this.state.totalHeight + moreHeight });
    }
  };
  onScroll = event => this.setState({ startingIndex: Math.ceil(this.scrollableWrapper.scrollTop / this.props.itemHeight) });
  setScrollableWrapper = element => {
    this.scrollableWrapper = element;
  };
  setListItemRef = index => element => {
    this.listItemsRef[index] = element;
  };
  getIndexBeingLooped = key => this.state.startingIndex + key;
  get marginTop() {
    return this.scrollableWrapper ? this.scrollableWrapper.scrollTop : 0;
  }
  get itemsCountToShow() {
    return Math.ceil(this.props.maxHeight / this.props.itemHeight);
  }
  get scrollHeight() {
    return this.state.totalHeight > this.props.maxHeight ? this.state.totalHeight : this.props.maxHeight;
  }
  listItemsRef = [];
  renderListItems = (_, i) => {
    const listItem = this.props.children[this.getIndexBeingLooped(i)];
    return (
      listItem && (
        <Wrapper key={`options-${this.getIndexBeingLooped(i)}`} innerRef={this.setListItemRef(this.getIndexBeingLooped(i))}>
          {listItem}
        </Wrapper>
      )
    );
  };
  render = () => (
    <Wrapper
      maxHeight={`${this.props.maxHeight}px`}
      innerRef={this.setScrollableWrapper}
      onScroll={this.onScroll}
      onTouchMove={this.onScroll}
      overflow="auto"
    >
      <Wrapper height={`${this.scrollHeight}px`} overflow="hidden">
        <Wrapper margin={`${this.marginTop}px 0 0`}>
          {Array(this.itemsCountToShow)
            .fill()
            .map(this.renderListItems)}
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
}

VirtualizedList.defaultProps = {
  children: [],
  defaultStartingIndex: 0,
  maxHeight: 0,
};

VirtualizedList.propTypes = {
  maxHeight: PropTypes.number.isRequired,
  itemHeight: PropTypes.number.isRequired,
  defaultStartingIndex: PropTypes.number,
  children: PropTypes.arrayOf(PropTypes.node),
};

export default VirtualizedList;
