import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { languageOptions } from './utils';
import { Language, LangOpt, Tick, LangDiv, Arrow, LabelLink, LangWrap, LangWrapper, LangLabel } from './styles';
import api from '../../api';
import { createCookie } from '../../api/helpers';

const LangListItem = props => (
  <Fragment>
    {Object.keys(languageOptions).map(lang => (
      <Fragment key={lang}>
        <LangOpt isSelected={props.selectedLang === lang} isExternal={false} onClick={e => props.onSelection(lang)}>
          <LangLabel>{languageOptions[lang].text}</LangLabel>
        </LangOpt>
        {props.selectedLang === lang && <Tick />}
      </Fragment>
    ))}
  </Fragment>
);

LangListItem.propTypes = {
  selectedLang: PropTypes.string.isRequired,
  onSelection: PropTypes.func.isRequired, // eslint-disable-line  
};

class LangDropDown extends PureComponent {
  state = { showList: false, lang: this.props.selectedLang, litem: this.props.litem };

  componentDidMount = () => {
    this.props.litem === 'true' &&
      api
        .get('/member/get-language')
        .then(response => {
          if (response && response.data && languageOptions[response.data.app_language]) {
            createCookie('slang', response.data.app_language, 60 * 60 * 24);
            this.setState({ lang: response.data.app_language, litem: 'true' });
          }
        })
        .catch(error => {});
    document.addEventListener('click', this.onDocumentClick);
  };

  onDocumentClick = event => {
    event.target.id !== 'LangDiv' && this.setState({ showList: false });
  };

  onSelection = lang => {
    createCookie('slang', lang, 60 * 60 * 24);
    api
      .put('/member/update-language', { data: { display_settings: { language: lang } } })
      .then(() => {
        if (window.app) {
          window.app.clearWebviewCache();
        }
        window.location.reload(true);
      })
      .catch(error => {});
  };
  onClick = event => this.setState(state => ({ showList: !state.showList }));
  render = () => {
    if (this.state.litem !== 'true') return null;
    return (
      <Fragment>
        <Language>
          <LabelLink onClick={this.onClick}>
            <LangDiv id="LangDiv">
              {(languageOptions[this.state.lang] && languageOptions[this.state.lang].text) || languageOptions['en-US'].text}
              <Arrow />
            </LangDiv>
          </LabelLink>
          <LangWrapper>
            {this.state.showList && (
              <LangWrap>
                <LangListItem selectedLang={this.state.lang} onSelection={this.onSelection} />{' '}
              </LangWrap>
            )}
          </LangWrapper>
        </Language>
      </Fragment>
    );
  };
}

LangDropDown.defaultProps = {
  selectedLang: 'en-US',
  litem: 'false',
};

LangDropDown.propTypes = {
  selectedLang: PropTypes.string,
  litem: PropTypes.string,
};

export default LangDropDown;
