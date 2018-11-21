import React from 'react';
import PropTypes from '../../PropTypes';
import Tooltip from '../Common/Tooltip';
import s from './styles';

const TrustBadge = props =>
  !!(props.verification && props.verification.count) && (
    <s.TrustBadge
      isHide={props.isDR && !props.verification.shield_state}
      isShieldView={props.verification.shield_state}
      profilePageBucket={props.profilePageBucket}
    >
      {props.verification.shield_state && (
        <s.Heading profilePageBucket={props.profilePageBucket}>
          <s.BadgeIcon isShieldView={props.verification.shield_state.toLowerCase()} />
          Verifications
        </s.Heading>
      )}
      {props.verification.shield_state && (
        <s.Details profilePageBucket={props.profilePageBucket}>{props.verification.derived_text}</s.Details>
      )}
      {!props.isDR &&
        !['B', 'C'].includes(props.profilePageBucket) && (
          <s.Actions
            isBorderVisible={props.verification.shield_state}
            isVisible={!['blocked', 'theyDeclined', 'theyCancelled', 'sameGender', 'hidden'].includes(props.flags.connectionStatus)}
          >
            <s.Btn
              profilePageBucket={props.profilePageBucket}
              title="This Member will not be able to see or contact you on Shaadi.com"
              onClick={props.onBlockClick}
            >
              Block {props.himHer.toLowerCase()}
            </s.Btn>
            <s.iconDivider>|</s.iconDivider>
            <s.Btn profilePageBucket={props.profilePageBucket} onClick={props.onMisuseClick}>
              Report Profile/Photos
            </s.Btn>
            <Tooltip
              trigger="hover"
              offset={[0, -5]}
              placement="bottom"
              tooltip={{
                body: [
                  {
                    key: 'beh',
                    items: [
                      {
                        type: 'text',
                        key: 'bleh',
                        text: 'Help us build a safer community by reporting inappropriate behaviour or misleading information.',
                      },
                    ],
                  },
                ],
              }}
            >
              <s.QuestionIcon />
            </Tooltip>
          </s.Actions>
        )}
    </s.TrustBadge>
  );

TrustBadge.defaultProps = {
  isDR: false,
  profilePageBucket: 'A',
};

TrustBadge.propTypes = {
  himHer: PropTypes.oneOf(['Him', 'Her']).isRequired,
  flags: PropTypes.shape({
    connectionStatus: PropTypes.connectionStatus.isRequired,
  }).isRequired,
  onBlockClick: PropTypes.func.isRequired,
  onMisuseClick: PropTypes.func.isRequired,
  isDR: PropTypes.bool,
  verification: PropTypes.shape({
    count: PropTypes.number,
    shield_state: PropTypes.string,
    derived_text: PropTypes.string,
    verified_proofs: PropTypes.array,
  }).isRequired,
  profilePageBucket: PropTypes.string,
};

export default TrustBadge;
