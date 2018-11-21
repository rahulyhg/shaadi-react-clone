import styled, { css } from 'styled-components';
import Link from '../Common/Link';
import { composeMixins } from '../../helpers/styleUtils';

const styles = {};
styles.CompareContainer = styled.div`
  width: 960px;
  margin: 0 auto 30px;
`;

styles.CompareContainer.displayName = 'CompareContainer';

styles.CompareHeading = styled.div`
  font: 400 24px 'Roboto', arial, sans-serif;
  color: #51505d;
  text-align: center;
  padding: 16px 0;
  margin: -50px 0 0;
`;
styles.CompareHeading.displayName = 'CompareHeading';
styles.CompareWrapper = styled.div`
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 6px, rgba(0, 0, 0, 0.1) 0px 1px 4px;
  background: #fff;
  padding: 20px 20px;
`;
styles.FeatureWrapper = styled.div`
  width: 920px;
  margin: 0 auto;
  display: flex;
  font: 300 16px 'Roboto', arial, sans-serif;
  flex-wrap: wrap;
`;

styles.FeatureHeading = styled.div`
  text-align: left;
  border-right: 1px solid #fff;
  color: #51505d;
  width: ${props => (props.isBigHeading ? '275px' : '160px')};
  text-align: center;
  border-bottom: 1px solid #cdced1;
`;

styles.FeatureBg = styled.div`
  background: #ff5a60;
  color: #fff;
  padding: 10px 0;
  text-align: center;
  border-radius: 3px 3px 0 0;
  font-size: 16px;
`;

styles.CrossIcon = styled.span`
  background: url(https://img2.shaadi.com/assests/2018/payment/payment-one.png) no-repeat -212px -257px;
  width: 20px;
  height: 15px;
  display: inline-block;
`;

styles.TickIcon = styled.span`
  background: url(https://img2.shaadi.com/assests/2018/payment/payment-one.png) no-repeat -250px -257px;
  width: 20px;
  height: 15px;
  display: inline-block;
`;

styles.RedAstrick = styled.span`
  color: #ff5a60;
  display: inline-block;
  vertical-align: middle;
`;

styles.DisplayFlex = styled.div`
  display: flex;
`;

styles.MembershipFaq = styled.div`
  padding: 10px 0;
  font: 300 14px 'Roboto', sans-serif;
  color: #72727d;
  display: flex;
`;
styles.HeadingPad = styled.div`
  padding: 10px 0;
  font-size: 16px;
`;
styles.FeaturePad = styled.div`
  padding: 0 0 0 30px;
`;

styles.NewText = styled.div`
  font-size: 10px;
  line-height: 15px;
  color: #fff;
  font-weight: bold;
  height: 15px;
  width: 28px;
  display: inline-block;
  text-align: center;
  border-radius: 3px;
  background: #ffa922;
  vertical-align: top;
`;

styles.MembershipFaqWrap = styled.div`
  width: 700px;
`;

styles.MembershipLink = styled(Link)`
  color: #00bcd5;
  text-decoration: none;
  font: 400 14px 'Roboto', sans-serif;
`;

styles.MembershipNote = styled.div`
  font: 400 12px 'Roboto', arial, sans-serif;
  color: #72727d;
  text-align: right;
  width: 219px;
`;

styles.ColumnMixin = css`
  width: 160px;
  font-family: roboto;
  font-size: 14px;
  color: #51505d;
  text-align: center;
  border-bottom: 1px solid #cdced1;
  display: table-cell;
  vertical-align: bottom;
`;

styles.BigColumnMixin = css`
  display: table-cell;
  vertical-align: middle;
`;

styles.WideColumnMixin = css`
  width: 275px;
  text-align: left;
`;

styles.FeatureBackGroundMixin = css``;

styles.GreyBackgroundMixin = css`
  background: #f1f1f2;
  border-left: 1px solid #cdced1;
  border-right: 1px solid #cdced1;
`;
styles.GreyBorderMixin = css`
  border-right: 1px solid #cdced1;
`;

styles.BorderMixin = css`
  border-bottom: 1px solid #cdced1;
`;

styles.DefaultHeaderMixin = styles.ColumnMixin;
styles.DefaultColumnMixin = composeMixins(styles.ColumnMixin, styles.BigColumnMixin);

styles.PrimaryHeaderMixin = composeMixins(styles.DefaultHeaderMixin, styles.FeatureBackGroundMixin, styles.WideColumnMixin);

styles.FirstRowMixin = composeMixins(
  styles.DefaultColumnMixin,
  styles.WideColumnMixin,
  styles.BorderMixin,
  css`
    border-left: 1px solid #cdced1;
  `,
);

styles.AlternateGreyColumnMixin = composeMixins(
  styles.DefaultColumnMixin,
  css`
    &:nth-child(2),
    &:nth-child(4) {
      ${styles.GreyBackgroundMixin};
    }
    &:nth-child(5) {
      ${styles.GreyBorderMixin};
    }
  `,
  styles.BorderMixin,
  css`
    width: 159px;
  `,
);

export default styles;
