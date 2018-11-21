import styled from 'styled-components';
import Link from '../../Common/Link';

const styles = {};
const stylePropery = {
  fontfamily: 'Roboto, sans-serif',
  normalfont: 'font: 300 20px Roboto, sans-serif',
  whitecolor: 'color: #fff',
  displayinline: 'display: inline-block',
  verticaltop: 'vertical-align: top',
  textleft: 'text-align: left',
  textcenter: 'text-align: center',
};

styles.TopBand = styled.div`
  width: 100%;
  height: 70px;
  background: ${props => (!props.revampPage ? '#39b9c4' : '')};
  background: ${props => (!props.revampPage ? 'linear-gradient(to right, #39b9c4 0%, #42bbb7 17%, #6ec382 77%, #7cc671 100%)' : '')};
  margin: -49px 0 0 0;
`;
styles.Message = styled.div`
  width: 940px;
  margin: 0 auto;
  ${stylePropery.textcenter};
`;
styles.Message.displayName = 'TopHeader';

styles.FontBold = styled.span`
  font: 500 24px ${stylePropery.fontfamily};
`;
styles.FontNormal = styled.span`
  font: 300 24px ${stylePropery.fontfamily};
`;
styles.OfferWrapper = styled.div`
  ${stylePropery.textcenter};
  ${stylePropery.displayinline};
  ${stylePropery.normalfont};
  ${stylePropery.whitecolor};
  height: 70px;
  line-height: 70px;
  ${stylePropery.verticaltop};
`;
styles.OfferWrapper.displayName = 'OfferDiscount';
styles.JustForYou = styled.span`
  background: url(https://img2.shaadi.com/assests/2016/payment/just4u-offer-icon.png) no-repeat left top;
  width: 98px;
  height: 47px;
  ${stylePropery.displayinline};
  ${stylePropery.verticaltop};
  margin: 12px 10px 0 0;
`;
styles.BirthdayIcon = styled.span`
  background: url(https://img2.shaadi.com/assests/2016/payment/birthday-offer-icon.png) no-repeat left top;
  width: 43px;
  height: 47px;
  ${stylePropery.displayinline};
  ${stylePropery.verticaltop};
  margin: 12px 10px 0 0;
`;
styles.ScentTrailWrapper = styled.div`
  ${stylePropery.whitecolor};
  ${stylePropery.normalfont};
  max-width: 753px;
  ${stylePropery.displayinline};
  ${stylePropery.verticaltop};
`;
styles.ScentTrailWrapper.displayName = 'ScentTrailWrap';
styles.ScentTrailThumbnail = styled.div`
  width: 60px;
  padding: 4px 10px 0 0;
  ${stylePropery.textleft};
  ${stylePropery.displayinline};
`;
styles.ThumbnailImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid #dfe0e3;
  overflow: hidden;
`;
styles.ScentTrailText = styled.div`
  ${stylePropery.normalfont};
  ${stylePropery.whitecolor};
  padding: 8px 0 0;
  ${stylePropery.textleft};
  overflow: hidden;
  ${stylePropery.displayinline};
  ${stylePropery.verticaltop};
`;
styles.DisplayUrl = styled(Link)`
  ${stylePropery.whitecolor};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
  ${stylePropery.verticaltop};
  font-weight: 500;
  ${stylePropery.displayinline};
  text-decoration: none;
`;

styles.ScentTrailHeading = styled.div`
  font: 300 14px ${stylePropery.fontfamily};
  border-radius: 3px;
  padding: 2px 9px;
  background: rgba(255, 255, 255, 0.1);
  margin: 6px 0 0;
  ${stylePropery.displayinline};
`;

export default styles;
