import React from 'react';
import PropTypes from 'prop-types';
import { parse, stringify } from 'qs';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import IconButton from '@material-ui/core/IconButton';
import RadioTabGroup from '../../components/Common/FormElements/RadioTabGroup';
import FieldTick from '../../components/Common/FieldTick';
import { languageOptions } from './utils';
import {
  PageWrap,
  Header,
  Logo,
  LangPage,
  Content,
  ChipWrap,
  ChipStyle,
  ButtonContainer,
  Button,
  SuccessMsg,
  Divider,
  HamburgerWrapper,
  Hamburger,
  BackContainer,
  FadeUpDiv,
  TickLoad,
  BottomContainer,
} from './styles';

const LanguageSelectedPage = props => (
  <Content>
    <BackContainer>
      <IconButton onClick={props.onClick}>
        <KeyboardArrowLeft style={{ fontSize: '32px', color: '#ccccd0' }} />
      </IconButton>
    </BackContainer>
    <TickLoad>
      <FieldTick isLangSelection />
    </TickLoad>
    <BottomContainer>
      <SuccessMsg>
        Your language is set to<br />
        <b>{props.selectedLang.text}</b>
      </SuccessMsg>
      <Divider />
      You can change it anytime from the
      <HamburgerWrapper>
        Menu<Hamburger to={`#`} isExternal />
      </HamburgerWrapper>
      <Button isSuccessBtn onClick={props.handleReload}>
        Ok, got it
      </Button>
    </BottomContainer>
  </Content>
);

class LanguageSelectionPage extends React.Component {
  state = {
    language: this.props.appLanguage,
    showSuccess: false,
    animate: false,
  };
  getLanguages = () => {
    let languagesChips = [];
    let EnglishChips = [{ label: 'English', value: 'en-US' }];
    if (this.props.appLanguage !== 'en-US') {
      const selectedLanguage = [{ label: languageOptions[this.props.appLanguage].text, value: this.props.appLanguage }];
      EnglishChips = [...EnglishChips, ...selectedLanguage];
    }
    languagesChips = Object.keys(languageOptions)
      .filter(key => !['en-US', this.props.appLanguage].includes(key))
      .map(key => ({ label: languageOptions[key].text, value: key }));
    return [...EnglishChips, ...languagesChips];
  };

  handleClick = () => {
    this.props.doMemberAction('selectLanguage', this.state.language, 'updateLanguage', this.state.language);
    this.setState({ animate: true });
    setTimeout(() => this.setState({ showSuccess: true }), 500);
  };

  handleBack = () => {
    this.setState({ showSuccess: false, animate: false });
  };

  handleReload = () => {
    if (window.app) {
      window.app.clearWebviewCache();
    }
    const qs = parse(document.referrer);
    window.location = decodeURIComponent(stringify({ ...qs, doReload: 'true' }, { addQueryPrefix: Object.keys(qs).length === 0 }));
  };

  renderLanguageOptions(selectedLang) {
    const { next_url = '' } = parse(this.props.location.search.slice(1));
    return (
      <div>
        {!next_url && (
          <BackContainer>
            <IconButton onClick={this.props.goBack}>
              <KeyboardArrowLeft style={{ fontSize: '32px', color: '#ccccd0' }} />
            </IconButton>
          </BackContainer>
        )}
        <Header>
          <Logo animate={this.state.animate}>
            <img src="/assets/mobile/shaadi-lite-logo-en-US.png" width="144" alt="shaadi.com" />
          </Logo>
          <LangPage language={this.state.language} />
          {this.state.animate && <FadeUpDiv />}
        </Header>
        <Content animate={this.state.animate}>
          <RadioTabGroup
            options={this.getLanguages()}
            value={this.state.language}
            defaultWrap={ChipWrap}
            defaultBtnWrap={ChipStyle}
            onChange={elm => {
              this.setState({ language: elm.target.value });
            }}
          />
          <ButtonContainer>
            <Button onClick={this.handleClick}>Continue with &apos;{selectedLang.text}&apos;</Button>
          </ButtonContainer>
        </Content>
      </div>
    );
  }

  render() {
    const selectedLang = languageOptions[this.state.language];
    return (
      <PageWrap fullLenghtPage={this.state.showSuccess !== true}>
        {this.state.showSuccess === true ? (
          <LanguageSelectedPage
            goBack={this.props.goBack}
            onClick={this.handleBack}
            selectedLang={selectedLang}
            handleReload={this.handleReload}
          />
        ) : (
          this.renderLanguageOptions(selectedLang)
        )}
      </PageWrap>
    );
  }
}

LanguageSelectionPage.propTypes = {
  doMemberAction: PropTypes.func.isRequired,
  appLanguage: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired,
  location: PropTypes.shape(PropTypes.location).isRequired,
};
LanguageSelectedPage.propTypes = {
  onClick: PropTypes.func.isRequired,
  selectedLang: PropTypes.string.isRequired,
  handleReload: PropTypes.func.isRequired,
};

export default LanguageSelectionPage;
