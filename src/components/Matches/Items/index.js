import React from 'react';
import PropTypes from '../../../PropTypes';
import UpgradeCard from '../UpgradeCard';
import CrownBadge from '../../Common/ProfilePhoto/CrownBadge';
import { Image } from '../styles';
import { widgetTypeInfoMap, renderTypeInfoMap, formatInfo, redirectTo } from '../configs';
import Eoi from '../../Common/Eoi';
import '../styles.css';

class Item extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onChatNow = this.action('chatNow');
    this.state = {
      isHovered: false,
    };
    this.onMouseEnter = () => this.setState({ isHovered: true });
    this.onMouseLeave = () => this.setState({ isHovered: false });
    this.onShowContactDetails = () => this.props.onAction(this.props.profile.uid, 'contact');
  }

  action(type) {
    return e => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      this.props.onAction(this.props.profile.uid, type);
    };
  }
  shouldShowUpgradeCard = () => {
    const { settings: { isPaidUser }, profile: { flags: { connectionStatus } } } = this.props;
    const widgetConfigs = widgetTypeInfoMap[this.props.widgetType] || widgetTypeInfoMap.default;
    if (widgetConfigs.showUpgradeCard && !isPaidUser) {
      if (!['accepted'].includes(connectionStatus)) {
        return false;
      }

      return true;
    }
    return false;
  };
  render() {
    const { props } = this;
    if (this.shouldShowUpgradeCard()) {
      return (
        <UpgradeCard
          {...props}
          onShowContactDetails={this.onShowContactDetails}
          onChatNow={this.onChatNow}
          showMaskedContact={props.item.justNow}
          showViewPlan={props.item.justNow}
          showCta={!props.item.justNow}
        />
      );
    }

    const { renderType, widgetType } = props;
    const renderTypeConfig = renderTypeInfoMap[renderType];
    const widgetTypeConfig = widgetTypeInfoMap[widgetType] || widgetTypeInfoMap.default;
    return (
      <div
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        className={`items items_${renderTypeConfig.classSuffix} ${widgetTypeConfig.additionalStyling}`}
      >
        <CrownBadge
          styles={{ position: 'absolute', width: '24px', left: '-1px', top: '5px' }}
          crownType={renderTypeConfig.crownType}
          isVisible={renderType === 'carousal'}
          membershipLevel={props.profile.flags.membershipLevel}
          membershipTags={props.profile.flags.membershipTags}
        />

        <a href={redirectTo(props.profile.uid, props.evt_ref)} title={props.profile.name} target="_blank">
          <Image dimension={renderTypeConfig.dimension} src={props.profile.thumbnail} />
        </a>

        <div className={`infoWrapper infoWrapper_${renderTypeConfig.classSuffix}`}>
          <a href={redirectTo(props.profile.uid, props.evt_ref)} target="_blank">
            <div style={{ display: `${renderType === 'default' ? 'flex' : 'inline-block'}`, alignItems: 'center' }}>
              <span className="profileName" title={props.profile.name}>
                {props.profile.name}
              </span>
              <span
                style={{
                  position: 'relative',
                  marginLeft: '8px',
                  display: 'inline-block',
                  maxWidth: '74px',
                  height: '10px',
                }}
              >
                <CrownBadge
                  styles={{ width: '74px', position: 'absolute', top: '-6px', backgroundPosition: 'left center' }}
                  crownType={renderTypeConfig.crownType}
                  isVisible={renderType === 'default'}
                  membershipLevel={props.profile.flags.membershipLevel}
                  membershipTags={props.profile.flags.membershipTags}
                />
              </span>
            </div>
            <div className={`profileDetails profileDetails_${renderTypeConfig.classSuffix}`}>
              {formatInfo(props.profile.base.profileInfo, renderTypeConfig.infoPattern)}
            </div>
          </a>
        </div>
        <Eoi
          type={(widgetTypeInfoMap[props.widgetType] || widgetTypeInfoMap.default).eoiType || 'widget'}
          justNow={props.item.justNow}
          profile={props.profile}
          tooltip={{ position: '', body: [] }}
          actionType={props.item.actionType}
          loadingStyle={props.item.eoiLoadingStyle}
          heShe={props.profile.heShe}
          hisHer={props.profile.hisHer}
          connectionStatus={props.profile.flags.connectionStatus}
          justNowText={props.profile.flags.connectionJustNowText}
          onAction={props.onAction}
          settings={props.settings}
          onTooltipClose={null}
          shortlistItems={[]}
          onChatNow={this.onChatNow}
          eoiClose={props.item.eoiClose}
          onShowContactDetails={this.onShowContactDetails}
          isHovered={this.state.isHovered}
        />
      </div>
    );
  }
}

Item.defaultProps = {
  renderType: 'default',
  evt_ref: '',
  widgetType: 'default',
};
Item.propTypes = {
  profile: PropTypes.objectOf(PropTypes.shape(PropTypes.searchProfile)).isRequired,
  onAction: PropTypes.func.isRequired,
  settings: PropTypes.shape({ isPaidUser: PropTypes.bool.isRequired }).isRequired,
  widgetType: PropTypes.string,
};
export default Item;
