import React from 'react';
import PropTypes from '../../PropTypes';
import Carousel from '../Common/Carousel';
import MatchItem from '../MatchList/MatchItem';
import s from './styles';

class PremiumPlusCarousel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
    };

    this.renderItem = this.renderItem.bind(this);
    this.profiles = props.results.items;
  }
  componentWillReceiveProps(props) {
    if (!!props.results.items.length && props.results.items.length >= 3) {
      this.profiles = props.results.items;
    }
  }
  onMouseEnter = () => this.setState({ isHovered: true });
  onMouseLeave = () => this.setState({ isHovered: false });
  renderItem(item) {
    return (
      <s.CarouselTile key={item.uid}>
        <MatchItem
          key={item.uid}
          order={0}
          type={'premiumCarouselItem'}
          item={item}
          pg_ubt={this.props.results.pg_ubt}
          evt_ref={this.props.results.evt_ref}
          results_id={this.props.results.results_id}
          page={0}
          wwwBaseUrl={this.props.wwwBaseUrl}
          profile={this.props.profiles[item.uid]}
          settings={this.props.settings}
          tooltip={this.props.results.tooltip}
          shortlistItems={this.props.shortlistItems}
          onAction={this.props.onAction}
          onMatchSelectionChange={this.props.onMatchSelectionChange}
          daTracking={this.props.daTracking}
        />
      </s.CarouselTile>
    );
  }
  render() {
    if (!!this.profiles.length && this.profiles.length >= 5) {
      return (
        <s.MainWrapper onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
          <Carousel
            onAction={this.props.onAction}
            width={734}
            height={287}
            maxComponentsInFrame={4.32}
            slidesCnt={this.profiles.length > 20 ? 21 : this.profiles.length}
            steps={4}
            premiumCarousel
            source="premiumCarousel"
            isHovered={this.state.isHovered}
          >
            <s.CarouselInner>
              {this.profiles.map((profile, index) => (index < 20 ? this.renderItem(profile) : ''))}
              {this.profiles.length > 20 && (
                <s.CarouselTileLast>
                  <s.CarouselDetails>
                    <s.SeeAllContainer>
                      <s.SeeAllWrapper>
                        <s.MoreLink target="_blank" to={`${window.location.href}&carouselSeeAll=clicked`}>
                          <s.SeeAllArrow />
                        </s.MoreLink>
                        <s.PremiumMatches>
                          <s.MoreLink id="seeAllLink" target="_blank" to={`${window.location.href}&carouselSeeAll=clicked`}>
                            See All
                          </s.MoreLink>
                        </s.PremiumMatches>
                      </s.SeeAllWrapper>
                    </s.SeeAllContainer>
                  </s.CarouselDetails>
                </s.CarouselTileLast>
              )}
            </s.CarouselInner>
          </Carousel>
        </s.MainWrapper>
      );
    }
    return null;
  }
}

PremiumPlusCarousel.defaultProps = {
  settings: {
    experiments: {
      webCTA_Dec2017: {
        bucket: 'A',
      },
    },
  },
  daTracking: null,
};

PremiumPlusCarousel.propTypes = {
  wwwBaseUrl: PropTypes.string.isRequired,
  results: PropTypes.shape({
    tooltip: PropTypes.shape({
      ...PropTypes.tooltip,
      body: PropTypes.array,
      loading: PropTypes.bool,
      position: PropTypes.oneOf(['none', 'bulk', 'list', 'photo', 'eoi', 'horoscope']),
    }).isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        uid: PropTypes.string.isRequired,
        justNow: PropTypes.bool.isRequired,
        photoLoading: PropTypes.bool.isRequired,
        eoiLoadingStyle: PropTypes.loadingStyle.isRequired,
      }),
    ).isRequired,
    query: PropTypes.shape({
      viewed: PropTypes.string,
    }).isRequired,
    pg_ubt: PropTypes.string.isRequired,
    evt_ref: PropTypes.string.isRequired,
    results_id: PropTypes.string.isRequired,
    goPremiumRef: PropTypes.string.isRequired,
  }).isRequired,
  profiles: PropTypes.objectOf(PropTypes.shape(PropTypes.searchProfile)).isRequired,
  shortlistItems: PropTypes.arrayOf(PropTypes.shape(PropTypes.shortlistItem)).isRequired,

  settings: PropTypes.shape({
    ...PropTypes.searchSettings,
    showUpgradeBanner: PropTypes.bool.isRequired,
    experiments: PropTypes.object,
  }).isRequired,

  onAction: PropTypes.func.isRequired,
  onMatchSelectionChange: PropTypes.func.isRequired,
  daTracking: PropTypes.func,
};
export default PremiumPlusCarousel;
