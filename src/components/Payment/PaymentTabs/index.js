import React from 'react';
import PropTypes from 'prop-types';
import PremiumPromise from './PremiumPromise';
import PersonalisePromise from './PersonalisePromise';
import Products from '../Products';
import s from './styles';
import MopContext from '../../Common/Tabs/MopContext';
import Tabs from '../../Common/Tabs';
import Tab from '../../Common/Tabs/Tab';
import TabList from '../../Common/Tabs/TabList';
import TabPanels from '../../Common/Tabs/TabPanels';
import TabPanel from '../../Common/Tabs/TabPanel';
import ComparePlanLink from './ComparePlanLink';

const PlanPromises = ({ isPremiumProduct }) => (isPremiumProduct === true ? <PremiumPromise /> : <PersonalisePromise />);
PlanPromises.propTypes = { isPremiumProduct: PropTypes.bool.isRequired };

const PaymentTabs = props => {
  const { productDetails, wwwBaseUrl, location, addToCart, cartResult } = props;
  const productProps = { cartResult, addToCart, productDetails };
  return (
    <s.PaymentContainer>
      <Tabs>
        <s.tabBorder>
          <TabList getListStyle={s.getListStyle}>
            <Tab getStyle={s.getStyle}>
              {({ isActive }) => (
                <React.Fragment>
                  <span id="PremiumTab">
                    Premium Plans
                    <s.NavLink isActive={isActive} />
                  </span>
                </React.Fragment>
              )}
            </Tab>
            <Tab getStyle={s.getStyle}>
              {({ isActive }) => (
                <React.Fragment>
                  <span id="PersonaliseTab">
                    Personalised Plans
                    <s.NavLink isActive={isActive} />
                  </span>
                </React.Fragment>
              )}
            </Tab>
            <ComparePlanLink
              showSkipLink={productDetails.showSkipLink}
              wwwBaseUrl={wwwBaseUrl}
              isSkipLink
              location={location}
              skipProfileId={productDetails.skipProfileId}
            />
          </TabList>
        </s.tabBorder>
        <TabPanels>
          <TabPanel>
            <s.DisplayFlex>
              <s.PaymentLeft>
                <Products {...productProps} isPremiumProduct />
              </s.PaymentLeft>
              <s.PaymentRight>
                <PlanPromises isPremiumProduct />
              </s.PaymentRight>
            </s.DisplayFlex>
          </TabPanel>
          <TabPanel>
            <s.DisplayFlex>
              <s.PaymentLeft>
                <Products {...productProps} />
              </s.PaymentLeft>
              <s.PaymentRight>
                <PlanPromises isPremiumProduct={false} />
              </s.PaymentRight>
            </s.DisplayFlex>
          </TabPanel>
        </TabPanels>
        <MopContext.Consumer>
          {({ activeIndex }) => (
            <ComparePlanLink
              activeIndex={activeIndex}
              showSkipLink={productDetails.showSkipLink}
              wwwBaseUrl={wwwBaseUrl}
              isSkipLink={false}
            />
          )}
        </MopContext.Consumer>
      </Tabs>
    </s.PaymentContainer>
  );
};

PaymentTabs.propTypes = {
  productDetails: PropTypes.shape(PropTypes.productDetails).isRequired,
  location: PropTypes.shape(PropTypes.location).isRequired,
  addToCart: PropTypes.func.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  cartResult: PropTypes.shape({
    cartErrorMsg: PropTypes.string.isRequired,
    btnloading: PropTypes.bool.isRequired,
  }).isRequired,
};

export default PaymentTabs;
