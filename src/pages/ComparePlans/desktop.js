import React from 'react';
import ComparePlans from '../../components/ComparePlans';

class ComparePlansPage extends React.PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return <ComparePlans />;
  }
}
export default ComparePlansPage;
