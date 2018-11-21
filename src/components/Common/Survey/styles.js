import styled from 'styled-components';
import buttonStyle from '../../Common/FormElements/Button/styles';

const s = {};

s.MainWrapper = styled.div`
  margin: -116px 0 0;
  @media (max-width: 768px) {
    margin: -123px 0 0;
  }
`;

s.SubMainWrapper = styled.div`
  width: 620px;
  margin: 18px auto;
  @media (max-width: 768px) {
    width: 93%;
  }
`;

s.MainBgSurvey = styled.div`
  width: 100%;
  box-shadow: 0 1px 2px rgba(43, 59, 93, 0.29);
  border-radius: 3px;
  background: #fff;
  padding: 20px 0 32px;
  font: 300 26px 'Roboto', sans-serif;
  position: relative;
`;

s.VerifyHeading = styled.h1`
  color: #51505d;
  text-align: center;
  margin: 0 0 2px;
  font: 300 26px 'Roboto', sans-serif;
  @media (max-width: 768px) {
    font-size: 17px;
  }
`;

s.Bold = styled.span`
  font: 300 20px 'Roboto', sans-serif;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

s.CtaBtnWrp = styled.div`
  margin: ${props => (props.addMargin ? '115px 0 0' : 0)};
  text-align: center;
`;

s.ThankYouFor = styled.div`
  color: #51505d;
  font: 300 24px/30px 'Roboto', sans-serif;
  margin: 0 auto;
  padding: 10px 0 0;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 19px;
    padding: 6px 0 0;
  }
`;

s.tickWapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 45px 0 5px;
`;

s.LoaderWrp = styled.div`
  margin: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

s.ContinueButton = buttonStyle.InputButton.extend`
  && {
    width: 178px !important;
    padding: 0 !important;
    margin: 25px 0 15px !important;;
    border-radius: 20px;
    &:hover {
      background-color: #0194a8 !important;
    }
`;
export default s;
