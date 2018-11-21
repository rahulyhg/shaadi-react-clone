/* global window */
import React from 'react';
import FacetGroup from './FacetGroup';
import s from './styles';
import PropTypes from '../../PropTypes';

class FacetBar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visiblePopoverId: null,
      isFrozen: false,
    };
    this.sourcePropsMap = {
      default: {
        title: 'Refine Search',
      },
      inbox: {
        title: 'Filters',
      },
    };
    this.onMoreClick = this.onMoreClick.bind(this);
    this.onPopoverClose = this.onPopoverClose.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.loading && !this.props.loading) {
      this.onPopoverClose();
    }
  }

  onPopoverClose() {
    this.setState({ visiblePopoverId: null, isFrozen: false });
  }

  onMoreClick(facetId) {
    this.setState({ visiblePopoverId: facetId, isFrozen: true });
  }

  render() {
    const { items, loading, frozenBy, onFacetChange, onFacetChangeStart, searchType = '' } = this.props;
    if (
      items.length === 0 &&
      ['2-way', 'reverse', 'basic_search', 'smart_search', 'whoisonline', 'specialcase_search', 'astrology_search'].includes(searchType)
    ) {
      return null;
    }
    return (
      <s.FacetBar source={this.props.source}>
        <s.Title>{this.sourcePropsMap[this.props.source].title}</s.Title>
        {items.map(
          facet =>
            facet.id !== 'featured' && (
              <FacetGroup
                key={facet.id}
                facet={facet}
                loading={loading}
                isFrozen={this.state.isFrozen}
                frozenBy={frozenBy}
                isMorePopoverVisible={this.state.visiblePopoverId === facet.id}
                source={this.props.source}
                onMoreClick={this.onMoreClick}
                onPopoverClose={this.onPopoverClose}
                onFacetChange={onFacetChange}
                onFacetChangeStart={onFacetChangeStart}
              />
            ),
        )}
      </s.FacetBar>
    );
  }
}

FacetBar.defaultProps = {
  items: [],
  loading: false,
  frozenBy: null,
  searchType: null,
  source: 'default',
};

FacetBar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(PropTypes.facet)),
  loading: PropTypes.bool.isRequired,
  frozenBy: PropTypes.string,
  searchType: PropTypes.string,
  onFacetChange: PropTypes.func.isRequired,
  onFacetChangeStart: PropTypes.func.isRequired,
  source: PropTypes.string,
};

export default FacetBar;
