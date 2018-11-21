/* eslint react/no-array-index-key: 0 */
import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';

const ProfileBasicInfo = props => (
  <s.ProfileBasicInfo>
    <s.LeftSection>
      {props.items.sort((a, b) => a.key > b.key).map(item => (
        <s.Item key={item.key}>
          <s.Icon name={item.icon} />
          <s.Desc isEducation={item.icon === 'edu_qualification'} title={item.icon === 'edu_qualification' ? item.value : ''}>
            {item.value}
          </s.Desc>
        </s.Item>
      ))}
    </s.LeftSection>
    <s.RightSection isVisible={props.commonInterests.length > 0}>
      {props.commonInterests.map((interest, index) => <s.Interest key={index}>{interest}</s.Interest>)}
      {(props.commonInterests.length < 3 && (
        <s.AddInterestsPrompt>
          To know {"what's"} more in common, tell us more about your&nbsp;
          <s.Link to={props.interestsUrl} isExternal>
            Interests & Hobbies
          </s.Link>
        </s.AddInterestsPrompt>
      )) ||
        ''}
    </s.RightSection>
  </s.ProfileBasicInfo>
);

const itemProptypes = {
  key: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

ProfileBasicInfo.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(itemProptypes)).isRequired,
  interestsUrl: PropTypes.string.isRequired,
  commonInterests: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProfileBasicInfo;
