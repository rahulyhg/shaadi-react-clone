import React from 'react';
import PropTypes from '../../PropTypes';
import MatchesCollection from './MatchesCollection';
import MoreItems from './MoreItems';
import Item from './Items';
import { widgetTypeInfoMap } from './configs';
import './styles.css';

const formatNumber = num => (num >= 1000 ? '999+' : `${num}`);
const itemMinLimitMap = {
  default: 1,
  carousal: 5,
};
const Matches = props =>
  props.results && props.results.length >= itemMinLimitMap[props.renderType] ? (
    <div className="widgetWrap">
      <div className="widgetHeader">
        {props.heading} <div className="count">{props.count ? formatNumber(props.count) : 0}</div>
      </div>
      <div className={`itemWrap itemWrap_${props.renderType}`}>
        <MatchesCollection renderType={props.renderType}>
          {props.results.map(
            (itemInfo, index) =>
              (index < 20 && (
                <Item
                  key={props.profiles[itemInfo.uid].uid}
                  profile={props.profiles[itemInfo.uid]}
                  item={itemInfo}
                  settings={props.settings}
                  renderType={props.renderType}
                  onAction={props.onAction}
                  widgetType={props.widgetType}
                />
              )) || (
                <MoreItems
                  redirectionLink={`${(widgetTypeInfoMap[props.widgetType] || widgetTypeInfoMap.default).seeAllUrl}&pg_searchresults_id=${
                    props.paginator.key
                  }`}
                  styles={{ height: '221px', width: '160px' }}
                />
              ),
          )}
        </MatchesCollection>
        {props.renderType !== 'carousal' &&
          props.count > 5 && (
            <div className="moreItems">
              <a href="search/partner">View All</a>
            </div>
          )}
      </div>
    </div>
  ) : null;
Matches.defaultProps = {
  renderType: 'default',
};
Matches.propTypes = {
  heading: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  results: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.string.isRequired,
    }),
  ).isRequired,

  profiles: PropTypes.objectOf(PropTypes.shape(PropTypes.searchProfile)).isRequired,
  settings: PropTypes.shape(PropTypes.settings).isRequired,
  renderType: PropTypes.oneOf(['default', 'carousal']),
  onAction: PropTypes.func.isRequired,
  widgetType: PropTypes.string.isRequired,
  paginator: PropTypes.shape({
    key: PropTypes.string.isRequired,
  }).isRequired,
};

export default Matches;
