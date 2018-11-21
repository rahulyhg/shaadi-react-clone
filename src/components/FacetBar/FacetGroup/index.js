import React from 'react';
import MorePopover from '../MorePopover';
import s from './styles';
import PropTypes from '../../../PropTypes';

const deriveOptions = items =>
  items.length > 6
    ? items
        .slice(0, 6)
        .concat(items.slice(6).filter(i => i.isSelected))
        .slice(0, 21)
    : items;
const copySelections = (src, dest) => dest.map(o => ({ ...o, isSelected: (src.filter(i => i.id === o.id)[0] || {}).isSelected }));

class FacetGroup extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      items: props.facet.options,
      localOptions: deriveOptions(props.facet.options),
      status: 'fresh',
      hasOpened: true,
    };
    this.onToggleFacet = this.onToggleFacet.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSelectionDoneClick = this.onSelectionDoneClick.bind(this);
    this.isDisabled = this.isDisabled.bind(this);
  }

  componentWillReceiveProps(props) {
    if (this.props.facet && props.facet.options !== this.props.facet.options) {
      this.setState({ items: props.facet.options, localOptions: deriveOptions(props.facet.options), status: 'fresh' });
    }
    if (props.loading !== this.props.loading) {
      this.setState({ status: 'fresh' });
    }
  }

  onSelectionDoneClick(items) {
    let options = items;
    if (options.filter(i => i.isSelected).length === 0) {
      options = this.state.items
        .filter(i => i.id === 'All')
        .map(i => ({ ...i, isSelected: true }))
        .concat(options);
    }
    this.setState({
      items: copySelections(options, this.state.items),
      localOptions: copySelections(options, this.state.localOptions),
    });
    this.props.onFacetChange({ ...this.props.facet, options });
  }

  onToggleFacet() {
    const open = !this.state.open;
    const hasOpened = open;
    this.setState({ open });
    setTimeout(() => {
      this.setState({ hasOpened });
    }, 500);
  }

  isDisabled() {
    if (['matches', 'recentlyViewed'].includes(this.props.facet.id)) {
      return false;
    }
    const frozen = this.props.isFrozen || (this.props.frozenBy && this.props.frozenBy !== this.props.facet.id);
    return !!(this.props.isMorePopoverVisible || this.props.loading || this.state.status === 'frozen' || frozen);
  }

  handleInputChange(value, id) {
    if (this.isDisabled()) {
      return; // Note: Needed because IE 10 doesn't respect radio disabled.
    }

    let items = this.state.items;
    if ((id === 'All' && value) || !this.props.facet.isMulti) {
      items = items.map(i => ({ ...i, isSelected: i.id === id }));
    } else {
      items = items.map(i => ({ ...i, isSelected: i.id === id ? value : i.isSelected }));
      items = items.map(i => ({ ...i, isSelected: i.id === 'All' ? false : i.isSelected }));
    }
    if (id !== 'All' && items.filter(i => i.isSelected).length === 0) {
      items = items.map(i => ({ ...i, isSelected: i.id === 'All' }));
    }
    const oldSelections = this.state.items
      .filter(i => i.isSelected)
      .map(i => i.id)
      .join(',');
    const selections = items
      .filter(i => i.isSelected)
      .map(i => i.id)
      .join(',');
    if (selections === oldSelections) {
      return;
    }
    this.setState({
      items,
      localOptions: copySelections(items, this.state.localOptions),
    });
    if (selections === '') {
      return;
    }
    if (this.state.status === 'fresh') {
      this.setState({ status: 'active' });
      setTimeout(() => {
        let options = this.state.items;
        if (this.state.items.filter(i => i.isSelected).length === 0) {
          options = options.map(i => ({ ...i, isSelected: i.id === 'All' }));
        }
        this.props.onFacetChange({ ...this.props.facet, options });
        this.setState({ status: 'frozen' });
      }, this.props.facet.isMulti ? 2000 : 2);
      this.props.onFacetChangeStart(this.props.facet);
    }
  }

  render() {
    const { facet, loading, source } = this.props;
    const { items, localOptions } = this.state;
    const { title, identifier, isMulti } = facet;
    const hasMoreOptions = items.length > 6;
    return (
      <section>
        {!!title && (
          <s.Title isLoading={loading}>
            <s.TitleText>{title}</s.TitleText>
            <s.ToggleBtn isOpen={this.state.open} onClick={this.onToggleFacet} isVisible={!loading} />
          </s.Title>
        )}
        <s.OptionsWrapper
          itemCount={localOptions.length}
          isOpen={this.state.open}
          isMorePopoverVisible={this.props.isMorePopoverVisible && this.state.open && this.state.hasOpened}
        >
          <s.Options>
            {localOptions.map(item => (
              <s.Option key={item.id} source={source}>
                <s.Input
                  name={`${facet.id}-${item.id}`}
                  type={!isMulti ? 'radio' : 'checkbox'}
                  checked={item.isSelected}
                  id={`${facet.id}-${item.id}`}
                  disabled={this.isDisabled()}
                  onChange={e => this.handleInputChange(e.target.checked, item.id)}
                />
                <s.Label htmlFor={`${facet.id}-${item.id}`} isAllLabel={item.label === 'All'} title={item.title}>
                  {item.label}
                  <s.Count isVisible={item.count && item.count.length}>({item.count})</s.Count>
                </s.Label>
              </s.Option>
            ))}
          </s.Options>
          {hasMoreOptions && (
            <MorePopover
              id={facet.id}
              title={title}
              identifier={identifier}
              isPopoverVisible={this.props.isMorePopoverVisible}
              items={this.state.items}
              onSelectionDoneClick={this.onSelectionDoneClick}
              onPopoverClose={this.props.onPopoverClose}
              onMoreClick={this.props.onMoreClick}
            />
          )}
        </s.OptionsWrapper>
      </section>
    );
  }
}

FacetGroup.defaultProps = {
  frozenBy: null,
  source: 'default',
};

FacetGroup.propTypes = {
  facet: PropTypes.shape({
    id: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape(PropTypes.facetOption)),
    isMulti: PropTypes.bool,
    title: PropTypes.string.isRequired,
  }).isRequired,
  isMorePopoverVisible: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  isFrozen: PropTypes.bool.isRequired,
  frozenBy: PropTypes.string,
  onFacetChange: PropTypes.func.isRequired,
  onPopoverClose: PropTypes.func.isRequired,
  onMoreClick: PropTypes.func.isRequired,
  onFacetChangeStart: PropTypes.func.isRequired,
  source: PropTypes.string,
};

export default FacetGroup;
