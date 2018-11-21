import React from 'react';
import PropTypes from '../../../PropTypes';
import Carousel from '../Carousel';
import MatchItem from '../../MatchList/MatchItem';
import s from './styles';
import { Context } from '../Context';
import { encode64 } from '../../../helpers/common';

class SimilarProfile extends React.PureComponent {
  state = {
    animateNow: false,
    isHovered: false,
  };

  componentWillMount() {
    setTimeout(() => {
      this.setState({ animateNow: true });
    }, this.props.wait * 1000);
  }

  // We were facing onMouseLeave event trigerring very often which was leading to disappear the arrows of carrousel. We found the solution by refering below url
  // https://stackoverflow.com/questions/45266854/mouseleave-triggered-by-click
  onMouseEnter = () => this.setState({ isHovered: true });
  onMouseLeave = event => {
    const relatedTarget = event.relatedTarget.self;
    !relatedTarget && this.setState(state => ({ isHovered: false }));
  };

  onUserAction = (uid, type, args) => {
    this.props.onAction(uid, type, { source: 'similar_profile', ...args });
  };

  renderItem = (item, profile, similarItem) => (
    <s.itemWrap key={profile.uid}>
      <s.item animateNow={this.state.animateNow}>
        <MatchItem
          type="similarItem"
          source="similar_profile"
          profile={profile}
          settings={this.props.settings}
          item={item}
          tooltip={similarItem.tooltip}
          evt_ref={encode64('similar_profile')}
          results_id={similarItem.results.results_id}
          pg_ubt={this.props.pg_ubt}
          page={this.props.page}
          order={this.props.order}
          onAction={this.onUserAction}
          wwwBaseUrl={this.props.wwwBaseUrl}
        />
      </s.item>
    </s.itemWrap>
  );

  render() {
    const { uid } = this.props;
    return (
      <Context.Consumer>
        {({ similarProfiles, profiles }) => {
          const similarItem = similarProfiles[uid] || { count: 0 };
          return (
            similarItem.count > 4 && (
              <s.SimilarProfileCard
                animateNow={this.state.animateNow}
                type={this.props.type}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
              >
                <s.carouselWrap>
                  <s.CardTitle>
                    <s.ProfileCount>
                      {similarItem.count}
                      {` Suggested Profiles `}
                    </s.ProfileCount>
                    because you liked {this.props.profileName}
                  </s.CardTitle>
                  <Carousel
                    onAction={this.onUserAction}
                    width={{ listing: 734, profile: 654 }[this.props.type]}
                    height={292}
                    slidesCnt={similarItem.count}
                    steps={1}
                    source="similarProfile"
                    maxComponentsInFrame={this.props.maxComponentsInFrame}
                    isHovered={this.state.isHovered}
                  >
                    {similarItem.items.map(item => this.renderItem(item, profiles[item.uid], similarItem))}
                  </Carousel>
                </s.carouselWrap>
              </s.SimilarProfileCard>
            )
          );
        }}
      </Context.Consumer>
    );
  }
}

SimilarProfile.defaultProps = {
  wait: 0.5,
  order: 1,
  page: 1,
  maxComponentsInFrame: 4.3,
  type: 'listing',
};

SimilarProfile.propTypes = {
  profileName: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
  settings: PropTypes.shape(PropTypes.settings).isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  order: PropTypes.number,
  page: PropTypes.number,
  pg_ubt: PropTypes.string.isRequired,
  wait: PropTypes.number,
  maxComponentsInFrame: PropTypes.number,
  type: PropTypes.string,
};

export default SimilarProfile;
