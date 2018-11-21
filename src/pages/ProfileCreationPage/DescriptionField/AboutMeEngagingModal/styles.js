import styled from 'styled-components';

const s = {};

s.UploadPhotoLayer = styled.div`
  display: block;
  width: 365px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 0 39px rgba(70, 70, 70, 0.25);
  z-index: inherit;
`;

s.CloseIntentModalBtn = styled.button`
  position: absolute;
  top: ${props => (props.isReportMisuse ? '16px' : '20px')};
  right: ${props => (props.isReportMisuse ? '13px' : '20px')};
  display: block;
  width: ${props => (props.isSlim ? '30px' : '20px')};
  height: ${props => (props.isSlim ? '30px' : '20px')};
  overflow: hidden;
  border: 0;
  outline: 0;
  padding: 0;
  background: ${props =>
    props.isSlim ? 'url(/assets/reg-layer-close.png) no-repeat 7px 7px' : 'url(/assets/big-close-v2.png) no-repeat left -207px'};
  &:hover {
    background: ${props =>
      props.isSlim ? 'url(/assets/reg-layer-close.png) no-repeat 7px -24px' : 'url(/assets/big-close-v2.png) no-repeat left -231px'};
  }
`;

s.ContentWrap = styled.div`
  padding: 46px 25px;
  border-radius: 3px;
  font-size: 14px;
  font-family: arial;
  line-height: 18px;
  background: #fff;
  position: relative;
`;

s.helpmeLayer = styled.div`
  color: #00bcd5;
  display: block;
  font: normal 18px 'Roboto', sans-serif;
  text-align: center;
  cursor: pointer;
`;

s.aboutOrWrap = styled.div`
  margin: 21px auto;
  display: flex;
  color: #51505d;
  font-size: 18px;
  align-items: center;
  font: normal 18px 'Roboto', sans-serif;
  width: 305px;
`;

s.aboutOrLeft = styled.div`
  width: 130px;
  height: 2px;
  background: #fafafb;
  background: linear-gradient(to right, #fafafb 0%, #e1e2e5 100%);
  margin: 0 7px 0;
`;

s.aboutOrRight = styled.div`
  width: 130px;
  height: 2px;
  background: #e1e2e5;
  background: linear-gradient(to right, #e1e2e5 0%, #f7f7f8 100%);
  margin: 0 0 0 7px;
`;

export default s;
