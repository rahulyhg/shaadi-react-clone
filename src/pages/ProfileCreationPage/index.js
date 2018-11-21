import React, { Fragment } from 'react';
import Header from '../../partials/StoppageHeaderPartial';
import Footer from '../../components/Footer/RegFooter';
import Main from './ProfileCreationPageContent';

export default props => (
  <Fragment>
    <Header disableLogoClick />
    <Main {...props} />
    <Footer />
  </Fragment>
);
