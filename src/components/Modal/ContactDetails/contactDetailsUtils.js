import React, { Fragment } from 'react';

const mapMembership = {
  diamond_plus: `Diamond+`,
  platinum_plus: `Platinum+`,
};

export const getMembershipTagMsg = (membership, loggerMembership, hisHer, paidUser) => {
  if (['diamond_plus', 'platinum_plus'].includes(membership) && !paidUser) {
    return (
      <Fragment>
        This {mapMembership[membership]} Member has chosen to make {hisHer} contact details visible to you.
      </Fragment>
    );
  } else if (['diamond_plus', 'platinum_plus'].includes(membership) && paidUser) {
    return <Fragment>Your contact count has not reduced.</Fragment>;
  }
  return null;
};

export const payLink = wwwBaseUrl => `${wwwBaseUrl}/payment?loc=profile&profileid=&source=sms`;

export const mobileVerificationLink = wwwBaseUrl => `${wwwBaseUrl}/my-shaadi/contact-details`;
