import PropTypes from 'prop-types';
import React from 'react';
import s from '../../styles';
import { featuredJusPayBank } from '../../../utils';

const FeaturedBanks = props => {
  const banks = props.lastThree ? Object.keys(featuredJusPayBank).reverse() : Object.keys(featuredJusPayBank);
  const { onBankClick, bankName } = props;
  return (
    <React.Fragment>
      {banks.map(
        (bankCode, i) =>
          i <= 2 && (
            <s.BankWrapper key={bankCode} onClick={e => onBankClick(bankCode)}>
              <s.RadioButton type="radio" name="bankname" value={bankCode} checked={bankName === bankCode} onChange={() => {}} />
              {bankCode === 'NB_HDFC' && <s.HdfcIcon />}
              {bankCode === 'NB_ICICI' && <s.IciciIcon />}
              {bankCode === 'NB_AXIS' && <s.AxisIcon />}
              {bankCode === 'NB_SBI' && <s.SbiIcon />}
              {bankCode === 'NB_IDBI' && <s.IdbiIcon />}
              {bankCode === 'NB_PNB' && <s.PunjabIcon />}
            </s.BankWrapper>
          ),
      )}
    </React.Fragment>
  );
};
FeaturedBanks.defaultProps = {
  lastThree: false,
};
FeaturedBanks.propTypes = {
  bankName: PropTypes.string.isRequired,
  lastThree: PropTypes.bool,
  onBankClick: PropTypes.func.isRequired,
};
export default FeaturedBanks;
