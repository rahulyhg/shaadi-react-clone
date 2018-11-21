import React from 'react';
import PropTypes from '../../../PropTypes';
import Eoi from '../../Common/Eoi';
import CrownBadge from '../../Common/ProfilePhoto/CrownBadge';
import { Image } from '../styles';
import { renderTypeInfoMap, redirectTo, widgetTypeInfoMap } from '../configs';

import DiscountMsg from './../../Common/DiscountMsg';

import '../styles.css';

const UpgradeCard = props => {
  const { renderType, widgetType } = props;
  const renderTypeConfig = renderTypeInfoMap[renderType];
  const widgetTypeConfig = widgetTypeInfoMap[widgetType] || widgetTypeInfoMap.default;
  const contactPartial =
    (props.profile.contact.mask_contact_no && `${props.profile.contact.country_code} ${props.profile.contact.mask_contact_no}`) || '';
  return (
    <div className={`items items_${renderTypeConfig.classSuffix} ${widgetTypeConfig.additionalStyling}`}>
      <CrownBadge
        styles={{ position: 'absolute', width: '22px', left: '-1px', top: '5px' }}
        crownType={renderTypeConfig.crownType}
        isVisible={renderType === 'carousal'}
        membershipLevel={props.profile.flags.membershipLevel}
        membershipTags={props.profile.flags.membershipTags}
      />

      <a href={redirectTo(props.profile.uid, 'profile', props.evt_ref)} title={props.profile.name} target="_blank">
        <Image src={props.profile.thumbnail} />
      </a>

      <div className={`infoWrapper infoWrapper_${renderTypeConfig.classSuffix}`}>
        <a href={redirectTo(props.profile.uid, 'profile', props.evt_ref)} target="_blank">
          <div style={{ display: `${renderType === 'default' ? 'flex' : 'inline-block'}`, alignItems: 'center' }}>
            <span className="profileName" title={props.profile.name}>
              {props.profile.name}
            </span>

            <CrownBadge
              styles={{ 'margin-left': '8px' }}
              crownType={renderTypeConfig.crownType}
              isVisible={renderType === 'default'}
              membershipLevel={props.profile.flags.membershipLevel}
              membershipTags={props.profile.flags.membershipTags}
            />
            {props.showMaskedContact ? (
              <div style={{ height: '35px' }}>
                <div>{`Contact ${props.profile.himHer.toLowerCase()} directly ${contactPartial ? ` on, ` : `.`}  `}</div>
                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: 500,
                  }}
                >
                  {`${contactPartial.substr(0, contactPartial.length - 5)} ${contactPartial.substr(
                    contactPartial.length - 5,
                    contactPartial.length,
                  )}`}
                </div>
              </div>
            ) : (
              <div style={{ margin: '41px 0 4px', fontStyle: 'italic' }}>
                To take the next step <a style={{ textDecoration: 'none', color: '#00bcd5', fontWeight: 500 }}>upgrade</a>
              </div>
            )}
            {!!props.showViewPlan && (
              <div
                style={{
                  width: '125px',
                  height: '59px',
                  justifyContent: 'flex-end',
                  marginTop: '43px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <DiscountMsg offer_details={props.settings.offer_details} bannerType="dashboard" />
                <a
                  style={{
                    lineHeight: '30px',
                    borderRadius: '18px',
                    height: '30px',
                    width: '120px',
                    boxShadow: `0 2px 2px rgba(11, 226, 255, 0.39)`,
                    backgroundImage: `linear-gradient(180deg, #60ced4 0%, #00bcd5 100%)`,
                    color: '#ffffff',
                    fontFamily: 'Roboto',
                    fontSize: '12px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    margin: '7px auto 0',
                  }}
                  href={redirectTo(props.profile.uid, 'payment', props.evt_ref)}
                >
                  View Plans
                </a>
              </div>
            )}
          </div>
        </a>
      </div>
      {!!props.showCta && (
        <Eoi
          type={(widgetTypeInfoMap[props.widgetType] || widgetTypeInfoMap.default).eoiType || 'widget'}
          justNow={props.item.justNow}
          profile={props.profile}
          tooltip={{}}
          loadingStyle={props.item.eoiLoadingStyle}
          heShe={props.profile.heShe}
          hisHer={props.profile.hisHer}
          connectionStatus={props.profile.flags.connectionStatus}
          justNowText={props.profile.flags.connectionJustNowText}
          onAction={props.onAction}
          settings={props.settings}
          onTooltipClose={null}
          shortlistItems={[]}
          onChatNow={props.onChatNow}
          eoiClose={props.item.eoiClose}
          onShowContactDetails={props.onShowContactDetails}
        />
      )}
    </div>
  );
};
UpgradeCard.defaultProps = {
  renderType: 'default',
  evt_ref: '',
  showMaskedContact: false,
  showViewPlan: false,
  showCta: false,
  onAction: () => {},
};
UpgradeCard.propTypes = {
  renderType: PropTypes.oneOf(['default', 'carousal']),
  evt_ref: PropTypes.string,
  profile: PropTypes.objectOf(PropTypes.shape(PropTypes.searchProfile)).isRequired,
  showMaskedContact: PropTypes.bool,
  showViewPlan: PropTypes.bool,
  showCta: PropTypes.bool,
  widgetType: PropTypes.string.isRequired,
  item: PropTypes.shape({
    justNow: PropTypes.bool.isRequired,
    eoiLoadingStyle: PropTypes.string.isRequired,
    eoiClose: PropTypes.bool,
  }).isRequired,
  settings: PropTypes.shape({ isPaidUser: PropTypes.bool.isRequired, offer_details: PropTypes.string }).isRequired,
  onAction: PropTypes.func,
  onChatNow: PropTypes.func.isRequired,
  onShowContactDetails: PropTypes.func.isRequired,
};
export default UpgradeCard;
