import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../../Common/Tooltip';
import s from './styles';
import TextLink from './textLink';

class InfoItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      interestSlideIndex: 0,
      astroLoaderClip: 0,
      astroLoaderDegree: 0,
    };
    this.printPopup = null;
    this.onMoreBtnClick = this.onMoreBtnClick.bind(this);
    this.renderIconItems = this.renderIconItems.bind(this);
    this.renderInterestItems = this.renderInterestItems.bind(this);
    this.onInterestNavClick = this.onInterestNavClick.bind(this);
    this.onReadMoreClick = this.onReadMoreClick.bind(this);
    this.onHoroscopeClick = this.onHoroscopeClick.bind(this);
    this.horoscopeWidgetItems = this.horoscopeWidgetItems.bind(this);
  }

  componentDidMount() {
    if (Object.keys(this.props.horoscopeWidget).length > 0 && Object.keys(this.props.horoscopeWidget.horoscopeMatch).length > 0) {
      let i = 0;
      const tagetPercentage = this.props.horoscopeWidget.horoscopeMatch.rankdata;
      const scoreBase = this.props.horoscopeWidget.horoscopeMatch.maxscore;
      if (tagetPercentage && scoreBase) {
        const timer = setInterval(() => {
          if (i >= tagetPercentage) {
            clearInterval(timer);
          } else {
            i += 1;
            const angle = 360 * (i / scoreBase);
            const astroLoaderClip = i > 50 || angle > 180 ? 'auto' : angle;
            const astroLoaderDegree = angle;
            this.setState({ astroLoaderClip, astroLoaderDegree });
          }
        }, 25);
      }
    }
  }

  onMoreBtnClick(key) {
    this.setState({ [key]: true });
  }

  onInterestNavClick(direction) {
    let { interestSlideIndex } = this.state;
    interestSlideIndex = direction === 'left' ? interestSlideIndex - 1 : interestSlideIndex + 1;
    this.setState({ interestSlideIndex });
  }

  onHoroscopeClick(link) {
    const printUrl = `/horoscope/${this.props.uid}/l/${link.language_format}/hs/${link.horoscope_style}`;
    if (this.printPopup !== null && this.printPopup.closed) {
      this.printPopup = null;
    }

    if (this.printPopup === null) {
      const width = 880;
      const height = 635;
      const left = ((window.screen.availWidth || 900) - width) / 2;
      const top = ((window.screen.availHeight || 800) - height) / 2;
      this.printPopup = window.open(printUrl, 'printPopup', `height=${height},width=${width},scrollbars=yes,left=${left},top=${top}`);
    } else if (this.printPopup && typeof this.printPopup === 'function') {
      this.printPopup.focus();
    } else if (window.focus) {
      this.printPopup.focus();
    }
  }

  onReadMoreClick() {
    this.props.onAction(this.props.profile.uid, 'showInterestModal');
  }

  // eslint-disable-next-line class-methods-use-this
  horoscopeWidgetItems(widgetInfo, isLinkVisible) {
    if (!widgetInfo.horoscopeMatch.rankdata) return false;
    return (
      <s.AstroLoaderWrap>
        <s.FirstCircleWrap>
          <s.FirstCircle>
            <s.FirstCircleCounter profilePageBucket={this.props.profilePageBucket}>
              {widgetInfo.horoscopeMatch.rankdata}/{widgetInfo.horoscopeMatch.maxscore}
            </s.FirstCircleCounter>
            <s.FirstCircleBg />
            <s.FirstCircleClipWrap astroLoaderClip={this.state.astroLoaderClip}>
              <s.FirstCircleAnimation astroLoaderDegree={this.state.astroLoaderDegree} />
              <s.FirstCircleAnimation2 isVisible={this.state.astroLoaderClip === 'auto'} />
            </s.FirstCircleClipWrap>
            <s.FirstCircleBg2 />
          </s.FirstCircle>
        </s.FirstCircleWrap>

        <s.HorosCopyWrap profilePageBucket={this.props.profilePageBucket}>
          <s.HorosTitle>Horoscope Match</s.HorosTitle>
          <s.HorosText>{widgetInfo.info}</s.HorosText>
          <s.HorosTextLink isVisible={isLinkVisible} onClick={() => this.onHoroscopeClick(widgetInfo.link)}>
            View Horoscope
          </s.HorosTextLink>
        </s.HorosCopyWrap>
      </s.AstroLoaderWrap>
    );
  }
  renderInterestItems(items) {
    return (
      <s.InterestWrapper>
        <s.InterestNavIcon
          isVisible={items.length > 3}
          direction="left"
          onClick={() => this.onInterestNavClick('left')}
          disabled={this.state.interestSlideIndex === 0}
          profilePageBucket={this.props.profilePageBucket}
        />
        <s.InterestSlideWrapper>
          <s.InterestIconList slideIndex={this.state.interestSlideIndex} isVisible>
            {items.map(item => (
              <s.IconListItem key={item.key}>
                <s.InterestListIcon icon={item.icon} profilePageBucket={this.props.profilePageBucket} />
                <s.InterestListTitle>{item.title}</s.InterestListTitle>
                <s.InterestListDesc>{`${item.desc.substr(0, 65)}${item.desc.length > 65 ? '...' : ''}`}</s.InterestListDesc>
                {(item.desc.length > 65 && <s.ReadMoreBtn onClick={this.onReadMoreClick}>Read more</s.ReadMoreBtn>) || ''}
              </s.IconListItem>
            ))}
          </s.InterestIconList>
        </s.InterestSlideWrapper>
        <s.InterestNavIcon
          isVisible={items.length > 3}
          direction="right"
          onClick={() => this.onInterestNavClick('right')}
          disabled={this.state.interestSlideIndex === 1}
          profilePageBucket={this.props.profilePageBucket}
        />
      </s.InterestWrapper>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderIconItems(items) {
    return (
      <s.IconList isVisible>
        {items.filter(item => item.icon).map(item => (
          <s.IconListItem key={item.key}>
            <s.IconListIcon title={item.title || ''} icon={item.icon} />
            <s.IconDesc>{item.desc}</s.IconDesc>
          </s.IconListItem>
        ))}
      </s.IconList>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderListItems(items) {
    return (
      <s.InfoList isVisible>
        {items.map(item => (
          <s.InfoListItem key={item.key} isVisible={item.desc && item.desc.length > 0}>
            <s.Icon icon={item.icon} />
            <s.Desc title={item.title || item.desc}>
              {item.desc}
              {item.link && <s.HorosTextLink onClick={() => this.onHoroscopeClick(item.link)}>View Horoscope</s.HorosTextLink>}
              <TextLink
                name={item.iconSuffix}
                options={{ isFreeMember: this.props.isFreeMember }}
                profileContactCard={this.props.profileContactCard}
              />
            </s.Desc>
            {item.tooltip &&
              item.tooltip !== '' && (
                <Tooltip
                  trigger="hover"
                  isQuestionMark
                  placement="bottom"
                  tooltip={{
                    title: '',
                    body: [
                      {
                        key: 'beh',
                        items: [
                          {
                            type: 'text',
                            key: 'bleh',
                            text: item.tooltip,
                          },
                        ],
                      },
                    ],
                  }}
                />
              )}
          </s.InfoListItem>
        ))}
      </s.InfoList>
    );
  }

  renderPreferenceItems(items, profile, self, matchCount) {
    return (
      <s.PreferenceWrapper isVisible>
        <s.PreferenceHeader>
          <s.PhotoWrapper>
            <s.Photo style={{ backgroundImage: `url(${profile.photo})` }} />
            <s.PhotoCaption profilePageBucket={this.props.profilePageBucket}>{profile.hisHer} Preferences</s.PhotoCaption>
          </s.PhotoWrapper>
          <s.CountWrapper profilePageBucket={this.props.profilePageBucket}>
            <span>
              You match {matchCount}
              /
              {items.length} of {(profile.hisHer || '').toLowerCase()} Preferences
            </span>
          </s.CountWrapper>
          <s.PhotoWrapper>
            <s.Photo style={{ backgroundImage: `url(${self.photo})` }} />
            <s.PhotoCaption profilePageBucket={this.props.profilePageBucket}>You match</s.PhotoCaption>
          </s.PhotoWrapper>
        </s.PreferenceHeader>
        <s.PreferenceList>
          {items.filter(p => p.desc !== '').map(item => (
            <s.PreferenceListItem key={item.key}>
              <s.PreferenceListItemInfo>
                <s.Term profilePageBucket={this.props.profilePageBucket}>{item.term}</s.Term>
                {(() => {
                  if (item.desc.length >= 60 && !this.state[item.key]) {
                    return (
                      <s.PrefDesc>
                        <s.PrefDescText>
                          {`${item.desc.substring(0, 60)}... `}
                          <s.MoreBtn onClick={() => this.onMoreBtnClick(item.key)}>more</s.MoreBtn>
                        </s.PrefDescText>
                      </s.PrefDesc>
                    );
                  }
                  return <div>{item.desc}</div>;
                })()}
              </s.PreferenceListItemInfo>
              <s.RemarkBox>
                <s.RemarkIcon isMatch={item.isMatch} />
              </s.RemarkBox>
            </s.PreferenceListItem>
          ))}
        </s.PreferenceList>
      </s.PreferenceWrapper>
    );
  }

  render() {
    return (
      <s.InfoItem id={this.props.id} isGamified={this.props.isGamified} isVisible={this.props.isVisible}>
        <s.Heading>
          <s.HeadingIcon icon={this.props.icon} />
          <s.Title profilePageBucket={this.props.profilePageBucket}>{this.props.title}</s.Title>
        </s.Heading>
        {['B', 'C'].includes(this.props.profilePageBucket) &&
          this.props.section === 'about_profile' && (
            <s.ProfileCreatedWapper>
              {this.props.profile.userHandle} &nbsp;{' | '}&nbsp; Profile created by {this.props.profile.summary.profileCreatedBy || '...'}
            </s.ProfileCreatedWapper>
          )}
        <s.Content
          id={this.props.id}
          isGamified={this.props.isGamified}
          isFormDisplayed={this.props.isFormDisplayed}
          profilePageBucket={this.props.profilePageBucket}
        >
          {!!this.props.interestItems.length && this.renderInterestItems(this.props.interestItems)}
          {!!this.props.iconItems.length && this.renderIconItems(this.props.iconItems)}
          {!!this.props.listItems.length && this.renderListItems(this.props.listItems)}
          {!!this.props.listItems.length &&
            this.props.horoscopeWidget &&
            this.props.horoscopeStatus !== 'locked' &&
            this.horoscopeWidgetItems(this.props.horoscopeWidget, !this.props.isAstroStatusError || true)}
          {!!this.props.preferenceItems.length &&
            this.renderPreferenceItems(this.props.preferenceItems, this.props.profile, this.props.self, this.props.matchCount)}
          {this.props.children}
        </s.Content>
      </s.InfoItem>
    );
  }
}

InfoItem.defaultProps = {
  id: '',
  listItems: [],
  iconItems: [],
  interestItems: [],
  preferenceItems: [],
  matchCount: null,
  self: {},
  profile: {},
  children: null,
  isGamified: false,
  isVisible: true,
  uid: '',
  onAction: () => {},
  horoscopeWidget: {
    info: '',
    horoscopeMatch: {},
    link: {
      language_format: 'ENG',
      horoscope_style: 'l',
    },
  },
  isFormDisplayed: false,
  isAstroStatusError: false,
  horoscopeStatus: '',
  profilePageBucket: 'A',
  section: '',
  isFreeMember: true,
  profileContactCard: 'A',
};

const listItemPropTypes = {
  key: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

const iconItemPropTypes = {
  key: PropTypes.string,
  icon: PropTypes.string,
  desc: PropTypes.string,
};

const interestItemPropTypes = {
  key: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

const preferenceItemPropTypes = {
  key: PropTypes.string.isRequired,
  term: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  isMatch: PropTypes.bool.isRequired,
};
const horoscopeMatchPropTypes = {
  rankdata: PropTypes.number,
  maxscore: PropTypes.number,
};
const linkPropTypes = {
  language_format: PropTypes.string,
  horoscope_style: PropTypes.string,
};

const horoscopeWidgetPropTypes = {
  info: PropTypes.string.isRequired,
  horoscopeMatch: PropTypes.shape(horoscopeMatchPropTypes),
  link: PropTypes.shape(linkPropTypes),
};

const profilePropTypes = {
  photo: PropTypes.string,
  heShe: PropTypes.string,
  himHer: PropTypes.string,
  hisHer: PropTypes.string,
};

InfoItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  uid: PropTypes.string,
  icon: PropTypes.string.isRequired,
  isGamified: PropTypes.bool,
  matchCount: PropTypes.number,
  children: PropTypes.element,
  profile: PropTypes.shape(profilePropTypes).isRequired,
  self: PropTypes.shape(profilePropTypes).isRequired,
  listItems: PropTypes.arrayOf(PropTypes.shape(listItemPropTypes)),
  iconItems: PropTypes.arrayOf(PropTypes.shape(iconItemPropTypes)),
  interestItems: PropTypes.arrayOf(PropTypes.shape(interestItemPropTypes)),
  preferenceItems: PropTypes.arrayOf(PropTypes.shape(preferenceItemPropTypes)),
  isVisible: PropTypes.bool.isRequired,
  onAction: PropTypes.func,
  horoscopeWidget: PropTypes.shape(horoscopeWidgetPropTypes),
  isAstroStatusError: PropTypes.bool,
  isFormDisplayed: PropTypes.bool,
  horoscopeStatus: PropTypes.string,
  profilePageBucket: PropTypes.string,
  section: PropTypes.string,
  isFreeMember: PropTypes.bool,
  profileContactCard: PropTypes.string,
};

export default InfoItem;
