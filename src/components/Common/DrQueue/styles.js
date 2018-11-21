import styled from 'styled-components';
import Link from '../Link';

const styles = {};

styles.DrQueue = styled.div`
  width: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '' : '278px')};
  height: 51px;
  position: relative;
  margin: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '-5px 0 0 0' : '9px 0 0 20px')};
  ${props => !['B', 'C'].includes(props.profilePageBucket) && 'float: right'};
`;

styles.DrQueuePrevWrap = styled.div`
  margin: 18px 9px 0px 0px;
  width: 16px;
  height: auto;
  float: left;
  overflow: hidden;
`;

styles.DrQueuePrev = styled.span`
  width: 16px;
  height: 18px;
  display: inline-block;
  cursor: pointer;
  background: url(/assets/sprite.png) left -680px no-repeat;
`;

styles.DrQueueNextWrap = styled.div`
  width: 16px;
  height: auto;
  overflow: hidden;
  margin: 16px 0 0 5px;
  padding: 0px;
`;

styles.DrQueueNext = styled.span`
  cursor: pointer;
  width: 16px;
  height: 18px;
  display: inline-block;
  margin: 2px 0px 0px 0px;
  background: url(/assets/sprite.png) -79px -680px no-repeat;
`;

styles.DrItemWrap = styled.div`
  margin: 0px;
  padding: 0px;
`;

styles.DrItemLink = styled(Link)`
  position: relative;
  display: inline-block;
  cursor: pointer;
  text-decoration: none;
  border-radius: 50%;
  box-shadow: none;
  background: #fff;
  border: 3px solid #ececec;
  width: 40px;
  height: 40px;
  margin: 0 10px 10px 0;
  padding: 0px;
`;

styles.DrToolTip = styled.div`
  position: relative;
  margin: 0px;
  padding: 0px;
`;

styles.DrQueueImgWrap = styled.span`
  width: 40px;
  height: 40px;
  border-radius: 80px;
  overflow: hidden;
  display: inline-block;
  cursor: pointer;
`;

styles.DrProfilePointer = styled.span`
  left: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '13px' : '16px')};
  bottom: -10px;
  width: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '15px' : '10px')};
  height: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '7px' : '6px')};
  background: ${props =>
    ['B', 'C'].includes(props.profilePageBucket)
      ? 'url(/assets/profile-pointer-v2.png) no-repeat left top'
      : 'url(/assets/profile-pointer.png) no-repeat left top'};
  position: absolute;
`;

styles.DrDisable = styled.span`
  background: #fff;
  border-radius: 50%;
  left: -1px;
  top: -1px;
  border: 1px solid transparent;
  width: 40px;
  height: 40px;
  opacity: 0.9;
  position: absolute;
  cursor: help;
`;

styles.DrAcceptedYes = styled.span`
  background-position: left -234px;
  background-image: url(/assets/daily-rec-v4.png);
  background-repeat: no-repeat;
  width: 14px;
  height: 14px;
  overflow: hidden;
  position: absolute;
  right: 1px;
  bottom: 1px;
`;

styles.DrAcceptedNo = styled.span`
  background-position: -14px -234px;
  background-image: url(/assets/daily-rec-v4.png);
  background-repeat: no-repeat;
  width: 14px;
  height: 14px;
  overflow: hidden;
  position: absolute;
  right: 1px;
  bottom: 1px;
`;

styles.DrAcceptedMayBe = styled.span`
  background-position: -28px -234px;
  background-image: url(/assets/daily-rec-v4.png);
  background-repeat: no-repeat;
  width: 14px;
  height: 14px;
  overflow: hidden;
  position: absolute;
  right: 1px;
  bottom: 1px;
`;

export default styles;
