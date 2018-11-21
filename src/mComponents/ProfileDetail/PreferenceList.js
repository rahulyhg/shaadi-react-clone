import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import {
  SectionTitle,
  Content,
  PreferenceHeader,
  PhotoWrapper,
  Photo,
  PhotoCaption,
  CountWrapper,
  PreferenceList,
  PreferenceListItem,
  PreferenceListItemInfo,
  Term,
  PrefDesc,
  PrefDescText,
  RemarkBox,
  RemarkIcon,
  MoreBtn,
  CountText,
} from './stylesMobile';

class ProfileDetailPreferenceList extends React.Component {
  state = { visibleSections: {} };
  onMoreBtnClick = key => {
    const { visibleSections } = this.state;
    visibleSections[key] = !visibleSections[key];
    this.setState({ visibleSections });
  };

  render() {
    const { profilePhoto, items, matchCount, selfPhoto, pronoun, title, loading } = this.props;
    const { visibleSections } = this.state;
    return (
      <div>
        <SectionTitle>{title}</SectionTitle>
        <Content>
          <Card>
            <CardContent>
              <PreferenceHeader>
                <PhotoWrapper>
                  <Photo style={{ backgroundImage: `url(${profilePhoto})` }} />
                  <PhotoCaption>{pronoun} Preferences</PhotoCaption>
                </PhotoWrapper>
                <CountWrapper>
                  <CountText>
                    You match {matchCount}
                    /
                    {items.length} Preferences
                  </CountText>
                </CountWrapper>
                <PhotoWrapper>
                  <Photo style={{ backgroundImage: `url(${selfPhoto})` }} />
                  <PhotoCaption>You match</PhotoCaption>
                </PhotoWrapper>
              </PreferenceHeader>
              <PreferenceList>
                {loading && (
                  <div style={{ padding: '20px' }}>
                    {' '}
                    <LinearProgress color="secondary" size={1} />{' '}
                  </div>
                )}
                {items.filter(p => p.desc !== '').map(item => (
                  <PreferenceListItem key={item.key}>
                    <PreferenceListItemInfo>
                      <Term>{item.term}</Term>
                      {(() => {
                        if (item.desc.length >= 60 && !this.state[item.key]) {
                          return (
                            <PrefDesc>
                              <PrefDescText>
                                {`${visibleSections[item.key] ? item.desc : item.desc.substring(0, 60)}${
                                  visibleSections[item.key] ? '' : '...'
                                }`}
                                {!visibleSections[item.key] && <MoreBtn onClick={() => this.onMoreBtnClick(item.key)}>more</MoreBtn>}
                              </PrefDescText>
                            </PrefDesc>
                          );
                        }
                        return <div>{item.desc}</div>;
                      })()}
                    </PreferenceListItemInfo>
                    <RemarkBox>
                      <RemarkIcon isMatch={item.isMatch} />
                    </RemarkBox>
                  </PreferenceListItem>
                ))}
              </PreferenceList>
            </CardContent>
          </Card>
        </Content>
      </div>
    );
  }
}

ProfileDetailPreferenceList.defaultProps = {
  loading: false,
};

const preferenceItemPropTypes = {
  key: PropTypes.string.isRequired,
  term: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  isMatch: PropTypes.bool.isRequired,
};

ProfileDetailPreferenceList.propTypes = {
  title: PropTypes.string.isRequired,
  matchCount: PropTypes.number.isRequired,
  profilePhoto: PropTypes.string.isRequired,
  selfPhoto: PropTypes.string.isRequired,
  pronoun: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape(preferenceItemPropTypes)).isRequired,
  loading: PropTypes.bool,
};

export default ProfileDetailPreferenceList;
