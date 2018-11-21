import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import api from '../../api';
import Arrow from '../Common/FormElements/Arrow';
import { Language, LangList, LangOpt, Tick } from './styles';

const languages = ['English', 'Hindi', 'Marathi', 'Gujrati', 'Kannada', 'Telugu', 'Tamil', 'Malayalam', 'Bengali', 'Punjabi'];

const LanguageList = props =>
  languages.map(lang => (
    <LangList>
      <LangOpt onClick={props.onSelection(lang)}>{lang}</LangOpt>
      <Tick isVisible={props.selectedLang === lang} />
    </LangList>
  ));

LanguageList.propTypes = {
  lang: PropTypes.string.isRequired,
  onSelection: PropTypes.func.isRequired,
};

class ChangeLanguage extends PureComponent {
  state = { showList: false, lang: this.props.lang };
  onClick = event => this.setState(state => ({ showList: !state.showList }));
  onSelection = lang => event =>
    api
      .get()
      .then(this.afterLangSet(lang))
      .error(this.afterLangSetFail);
  afterLangSet = lang => response => this.setState({ lang });
  afterLangSetFail = error => {};
  render = () => (
    <Fragment>
      <Language>
        {this.state.lang}
        <Arrow right="0px" />
      </Language>
      <LanguageList isVisible={this.state.showList} onSelection={this.onSelection} />
    </Fragment>
  );
}

ChangeLanguage.defaultProps = {
  lang: 'English',
};

ChangeLanguage.propTypes = {
  lang: PropTypes.string,
};

export default ChangeLanguage;
