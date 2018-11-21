/* eslint react/no-did-mount-set-state: 0 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import mr from 'react-intl/locale-data/mr';
import { parse } from 'qs';
import Spinner from '../Spinner';

addLocaleData([...en, ...mr]);

export default function IntlComponent(localeImports) {
  class Intl extends PureComponent {
    static propTypes = {
      children: PropTypes.node.isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        messages: null,
      };
      const languageWithRegionCode = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;
      const params = parse(window.location.search.slice(1));

      const ifValid = str => (Object.keys(localeImports).includes(str) ? str : null);

      this.language =
        ifValid(params.locale) ||
        ifValid(params.language) ||
        ifValid(languageWithRegionCode) ||
        ifValid(languageWithRegionCode.toLowerCase().split(/[_-]+/)[0]) ||
        'en';
    }

    async componentDidMount() {
      const messages = await localeImports[this.language]();
      this.setState({ messages });
    }

    render() {
      const { messages } = this.state;
      if (messages) {
        return (
          <IntlProvider locale={this.language} messages={messages}>
            {this.props.children}
          </IntlProvider>
        );
      }
      return <Spinner />;
    }
  }

  return Intl;
}
