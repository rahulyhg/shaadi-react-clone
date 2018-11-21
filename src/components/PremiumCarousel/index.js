import React from 'react';
import PropTypes from '../../PropTypes';
import Carousel from '../Common/Carousel';
import MatchItem from '../MatchList/MatchItem';
import s from './styles';

class PremiumCarousel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.profiles = this.props.results.items;
    this.listBucket =
      (this.props.settings.experiments &&
        this.props.settings.experiments.webCTA_Dec2017 &&
        this.props.settings.experiments.webCTA_Dec2017.bucket) ||
      'A';
  }
  componentWillReceiveProps(props) {
    if (!!props.results.items.length && props.results.items.length >= 3) {
      this.profiles = props.results.items;
    }
  }
  handleClickChange() {
    this.props.onFacetChangeCarousel();
  }
  renderItem(item) {
    return (
      <s.carouselProfile key={item.uid}>
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
      </s.carouselProfile>
    );
  }
  render() {
    if (!!this.profiles.length && this.profiles.length >= 3) {
      return (
        <s.searchGp>
          <s.title listBucket={this.listBucket}>
            <s.titleHeading>Featured Profiles</s.titleHeading>
            {this.props.profiles.self.flags.isPremium === false && (
              <s.titleGoPremium>
                Want to feature your profile here?{' '}
                <s.GoPremiumLink to={`/payment?source=${this.props.results.goPremiumRef}`}>Go Premium</s.GoPremiumLink>
              </s.titleGoPremium>
            )}
          </s.title>
          <Carousel
            onAction={this.props.onAction}
            width={660}
            height={307}
            maxComponentsInFrame={3}
            slidesCnt={this.profiles.length}
            steps={3}
            premiumCarousel
            listBucket={this.listBucket}
          >
            {this.profiles.map(profile => this.renderItem(profile))}
            {this.profiles.length === 8 && (
              <s.PremiumCarouselItem onClick={() => this.handleClickChange()}>
                <s.carouselProfilePhoto>
                  <s.carouselSlides>
                    <s.viewMore gender={this.props.profiles.self.gender}>
                      <s.viewMorePad>
                        <s.viewMoreLink>
                          View<br />More
                        </s.viewMoreLink>
                      </s.viewMorePad>
                    </s.viewMore>
                  </s.carouselSlides>
                </s.carouselProfilePhoto>
              </s.PremiumCarouselItem>
            )}
          </Carousel>
          <s.seeAllContainer>
            <s.seeAllLink onClick={() => this.handleClickChange()}>See All</s.seeAllLink>
          </s.seeAllContainer>
        </s.searchGp>
      );
    }
    return null;
  }
}

PremiumCarousel.defaultProps = {
  settings: {
    experiments: {
      webCTA_Dec2017: {
        bucket: 'A',
      },
    },
  },
  daTracking: null,
};

PremiumCarousel.propTypes = {
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
  onFacetChangeCarousel: PropTypes.func.isRequired,
  daTracking: PropTypes.func,
};
export default PremiumCarousel;
