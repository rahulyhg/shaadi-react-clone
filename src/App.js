import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import NotFound from './pages/NotFound';
import FourOFour from './pages/FourOFour';
import Splash from './pages/Splash';
import theme from './theme';
import initializeStore, { createStorageListener } from './store';
import ShaadiApp from './ShaadiApp';
import ErrorBoundary from './components/ErrorBoundary';
import LoadComponentIfCalled from './components/LoadComponentIfCalled';

import SearchPartnerPage from './pages/SearchPartnerPage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import DailyRecommendationsPage from './pages/DailyRecommendationsPage';
import MatchesGroupPage from './pages/MatchesGroupPage';
import MyPhotos from './pages/MyPhotos';
import MyShaadiDashboard from './pages/MyShaadiDashboard';
import InboxPage from './pages/InboxPage';
import CartPage from './pages/CartPage';
import StopPage from './pages/StopPage';
import PaymentPage from './pages/PaymentPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import HeaderPartial from './partials/HeaderPartial';
import ChatPartial from './partials/ChatPartial';
import LayerPartial from './partials/LayerPartial';
import FooterPartial from './partials/FooterPartial';
import LayoutPartial from './partials/LayoutPartial';
import ContactSummaryPage from './pages/ContactSummaryPage';
import ComparePlans from './pages/ComparePlans';

const StoppageHeaderPartial = LoadComponentIfCalled(() =>
  import(/* webpackChunkName: "StoppageHeaderPartial" */ './partials/StoppageHeaderPartial').then(module => module.default),
);

const StoppageFooterPartial = LoadComponentIfCalled(() =>
  import(/* webpackChunkName: "StoppageFooterPartial" */ './partials/StoppageFooterPartial').then(module => module.default),
);

const ProfileCreationPage = LoadComponentIfCalled(() =>
  import(/* webpackChunkName: "ProfileCreationPage" */ './pages/ProfileCreationPage').then(module => module.default),
);

const { Main, Content } = theme;

const store = initializeStore();
window.addEventListener('storage', createStorageListener(store));
const App = () => (
  <ErrorBoundary showError>
    <Provider store={store}>
      <Router>
        <ShaadiApp dispatch={store.dispatch} getState={store.getState}>
          <LayoutPartial>
            {/* Below Pages would decider their own structure of header, footer and main content section */}
            <Switch>
              <Route path="/profile-creation/step/:stepNumber([1-4]{1})" exact component={ProfileCreationPage} />
            </Switch>

            <Switch>
              <Route path="/profile-creation/step/:stepNumber" exact null />
              <Route path="/stop-page/upload-id" exact null />
              <Route path="/stop-page/*" exact component={StoppageHeaderPartial} />
              <Route component={HeaderPartial} />
            </Switch>

            <Content>
              <Main>
                <Switch>
                  <Route path="/" exact component={Splash} />
                  <Route path="/stop-page/:pageName" exact component={StopPage} />
                  <Route path="/search/partner" exact component={SearchPartnerPage} />
                  <Route path="/search/partner/viewed" exact component={SearchPartnerPage} />
                  <Route path="/search/partner/index" exact component={SearchPartnerPage} />
                  <Route path="/search/partner/index/gtrk/2" exact component={SearchPartnerPage} />
                  <Route path="/search/new-matches" exact component={SearchPage} />
                  <Route path="/search/new-matches/viewed" exact component={SearchPage} />
                  <Route path="/search/near-me" exact component={SearchPage} />
                  <Route path="/search/near-me/viewed" exact component={SearchPage} />
                  <Route path="/search/broader" exact component={SearchPage} />
                  <Route path="/search/broader/viewed" exact component={SearchPage} />
                  <Route path="/search/personal" exact component={SearchPage} />
                  <Route path="/search/ematchmaker" exact component={SearchPage} />
                  <Route path="/search/discovery/recently-joined" exact component={SearchPage} />
                  <Route path="/search/discovery/recently-joined-viewed" exact component={SearchPage} />
                  <Route path="/search/discovery/premium" exact component={SearchPage} />
                  <Route path="/search/discovery/premium-viewed" exact component={SearchPage} />
                  <Route path="/search/discovery/recent-visitors" exact component={SearchPage} />
                  <Route path="/search/discovery/recent-visitors-viewed" exact component={SearchPage} />
                  <Route path="/search/basic_search" exact component={SearchPage} />
                  <Route path="/search/smart_search" exact component={SearchPage} />
                  <Route path="/search/online" exact component={SearchPage} />
                  <Route path="/search/specialcase" exact component={SearchPage} />
                  <Route path="/search/astro" exact component={SearchPage} />
                  <Route path="/profile" exact component={ProfilePage} />
                  <Route path="/profile/daily-recommendations" exact component={DailyRecommendationsPage} />
                  <Route path="/profile/discovery" exact component={() => <MatchesGroupPage grpType="discover" />} />
                  <Route path="/profile/viewed" exact component={() => <MatchesGroupPage grpType="intents" />} />
                  <Route path="/my-shaadi" exact component={MyShaadiDashboard} />
                  <Route path="/my-shaadi/photo" exact component={MyPhotos} />
                  <Route path="/inbox/pending/interests" exact component={() => <InboxPage type="connect" action="pending" />} />
                  <Route path="/inbox/pending/recent-interests" exact component={() => <InboxPage type="connect" action="pending" />} />
                  <Route path="/inbox/filteredout" exact component={() => <InboxPage type="connect" action="filtered" />} />
                  <Route path="/inbox/accepted/interests" exact component={() => <InboxPage type="connect" action="accepted" />} />
                  <Route path="/inbox/sent/interests" exact component={() => <InboxPage type="connect" action="awaiting" />} />
                  <Route path="/inbox/archived/interests" exact component={() => <InboxPage type="connect" action="deleted" />} />
                  <Route path="/inbox/contact-summary" exact component={ContactSummaryPage} />
                  <Route path="/inbox/pending/requests" exact component={() => <InboxPage type="request" action="pending" />} />
                  <Route path="/inbox/accepted/requests" exact component={() => <InboxPage type="request" action="accepted" />} />
                  <Route path="/inbox/sent/requests" exact component={() => <InboxPage type="request" action="awaiting" />} />
                  <Route path="/inbox/sent/photo-requests" exact component={() => <InboxPage type="request" action="awaiting" />} />
                  <Route path="/cart" exact component={CartPage} />
                  <Route path="/payment" exact component={PaymentPage} />
                  {<Route path="/payment/thankyou" exact component={OrderSuccessPage} />}
                  <Route path="/compare-plans" exact component={ComparePlans} />
                  <Route path="/uva" exact component={FourOFour} />
                  <Route path="/404" component={FourOFour} />
                  <Route component={({ location }) => !location.pathname.includes('profile-creation') && <NotFound />} />
                </Switch>

                <Switch>
                  <Route path="/profile-creation/step/:stepNumber" exact null />
                  <Route path="/stop-page/upload-id" exact null />
                  <Route path="/stop-page/*" exact component={StoppageFooterPartial} />
                  <Route component={FooterPartial} />
                </Switch>
              </Main>

              <ChatPartial />
            </Content>

            <LayerPartial />
          </LayoutPartial>
        </ShaadiApp>
      </Router>
    </Provider>
  </ErrorBoundary>
);

export default hot(module)(App);
