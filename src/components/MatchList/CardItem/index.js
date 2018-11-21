import React, { Fragment, PureComponent } from 'react';
import TrackVisiblity from '../../TrackVisiblity';
import PropTypes from '../../../PropTypes';
import Tooltip from '../../Common/Tooltip';
import s from './styles';

const OptionA = props => {
  const handleDaTracking = e => {
    const event = 'photo_card_seen';
    props.daTracking && props.daTracking(event, { uid: props.profile.uid });
  };
  const isIndianDiaspora = props.profile.flags.isIndianDiaspora;

  return (
    <TrackVisiblity nodeRef={`true_view_${props.profile.uid}`} daTracking={handleDaTracking}>
      <s.ProfileDetailsWrap id={`true_view_${props.profile.uid}`}>
        <s.profileLeft>
          <s.fullPhoto gender={props.profile.gender} />
        </s.profileLeft>
        <s.profileRight>
          <s.profileNameHeader>
            <s.profileName>{props.profile.name}</s.profileName>
            <s.ChatIcon />
          </s.profileNameHeader>
          <s.lineBord />
          <s.profileInfoWrap>
            {props.profile.summary[isIndianDiaspora ? 'infoMapIndian' : 'infoMapNri'].map(detail => {
              const maxLength = (['location', 'marital_status', 'profession', 'grew_up_in_info'].includes(detail.key) && 11) || 16;
              const val =
                (detail.value && detail.value.length > maxLength && `${detail.value.substring(0, maxLength - 3)}...`) || detail.value;
              return <s.DetailDesc key={detail.key}>{val}</s.DetailDesc>;
            })}
          </s.profileInfoWrap>
          <s.extraBorder big />
          <s.extraBorder />
        </s.profileRight>
      </s.ProfileDetailsWrap>
    </TrackVisiblity>
  );
};

const OptionB = props => {
  const handleDaTracking = e => {
    const event = 'photo_card_seen_2';
    props.daTracking && props.daTracking(event, { uid: props.profile.uid });
  };

  return (
    <TrackVisiblity nodeRef={`true_view_${props.profile.uid}`} daTracking={handleDaTracking}>
      <s.ProfileDetailsWrapB id={`true_view_${props.profile.uid}`}>
        <s.yourProfile>
          <s.topLayer>
            <s.thumsDown />
          </s.topLayer>
          <s.otherLayer>
            <s.yourPhoto gender={props.profile.gender} />
            <s.ourProfileDetails>{props.profile.name}</s.ourProfileDetails>
            <s.bottomBorder Big />
            <s.bottomBorder />
          </s.otherLayer>
        </s.yourProfile>
        <s.ourProfile>
          <s.rightTopLayer>
            <s.likes>5</s.likes>
            <s.thumsup />
          </s.rightTopLayer>
          <s.otherLayer>
            <s.ourPhoto gender={props.profile.gender} />
            <s.ourProfileDetails>{(props.profile.gender === 'Female' && 'Sara') || 'Abhishek K'}</s.ourProfileDetails>
            <s.bottomBorder Big />
            <s.bottomBorder />
          </s.otherLayer>
        </s.ourProfile>
        <s.disclaimer>
          <s.disclaimerText>100% privacy controls available </s.disclaimerText>
          <s.hint>
            <Tooltip isQuestionMark overlay={<span>You can choose to hide/unhide Photos later in Privacy Settings</span>} />
          </s.hint>
        </s.disclaimer>
      </s.ProfileDetailsWrapB>
    </TrackVisiblity>
  );
};

class CardItem extends PureComponent {
  constructor(props) {
    super(props);
    this.handleDaTracking = this.handleDaTracking.bind(this);
  }
  handleDaTracking() {
    const event = (this.props.isExtended && 'photo_card_submit_2') || 'photo_card_submit';
    this.props.daTracking && this.props.daTracking(event, { uid: this.props.profile.uid });
    window.open(`/my-shaadi/photo`, '_blank');
  }

  render = () => {
    const { isExtended } = this.props;

    return (
      <Fragment>
        <div>
          <s.MatchItem>
            <s.MatchItemWrap isExtended={isExtended}>
              {(isExtended && <OptionB {...this.props} />) || <OptionA {...this.props} />}
              <s.vectorWrap isExtended={isExtended}>
                <s.photoInfo isExtended={isExtended}>
                  <s.infoFirst isExtended={isExtended}>
                    Members with Photos <br />get twice as many responses
                  </s.infoFirst>
                  <s.infoSecond>Get more responses, add Photos</s.infoSecond>
                  <s.addPhoto id="addPhotoPC" onClick={this.handleDaTracking}>
                    <s.addPhotoWrap>
                      <s.plusIcon> +</s.plusIcon>
                      <s.addPhotoText>Add Photo</s.addPhotoText>
                    </s.addPhotoWrap>
                  </s.addPhoto>
                </s.photoInfo>
              </s.vectorWrap>
            </s.MatchItemWrap>
          </s.MatchItem>
        </div>
      </Fragment>
    );
  };
}

CardItem.defaultProps = {
  daTracking: null,
};

OptionA.defaultProps = {
  daTracking: null,
};

OptionB.defaultProps = {
  daTracking: null,
};

CardItem.propTypes = {
  profile: PropTypes.shape(PropTypes.searchProfile).isRequired,
  isExtended: PropTypes.bool.isRequired,
  daTracking: PropTypes.func,
};

OptionA.propTypes = {
  profile: PropTypes.shape(PropTypes.searchProfile).isRequired,
  daTracking: PropTypes.func,
};

OptionB.propTypes = {
  profile: PropTypes.shape(PropTypes.searchProfile).isRequired,
  daTracking: PropTypes.func,
};

export default CardItem;
