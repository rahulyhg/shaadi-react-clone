import React from 'react';
import '../../theme/transitions.css';
import { SearchPartnerPage } from '../../pages/SearchPartnerPage/mobile';

export default class FakeCardSwipeWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: props.results, //eslint-disable-line
    };
  }

  onAction = (type, uid) => {
    const { results } = this.state;
    results.items = results.items.filter(res => uid !== res);
    this.setState({ results });
  };

  render() {
    const { results } = this.state;
    return <SearchPartnerPage {...this.props} results={results} onAction={this.onAction} />;
  }
}
