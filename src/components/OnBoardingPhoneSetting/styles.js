import styled from 'styled-components';
import radioButtonStyle from '../Common/FormElements/RadioTabGroup/styles';
import buttonStyle from '../Common/FormElements/Button/styles';

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
  height: 472px;
  @media (max-width: 768px) {
    width: 93%;
  }
`;

s.onBoardingShape = styled.div`
  width: 36px;
  height: 35px;
  background: url(/assets/onboarding-layer-shape.svg) no-repeat;
  margin: 4px auto 18px;
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
s.VerifyHeading = styled.div`
  color: #51505d;
  text-align: center;
  font: 300 26px 'Roboto', sans-serif;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;
s.VerifySubHeading = styled.div`
  font-size: 18px;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

s.VerifyChooseHeading = styled.div`
  text-align: center;
  font: 400 20px 'Roboto', sans-serif;
  color: #51505d;
  padding: 0 0 12px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
s.VerifyHeadingBorder = styled.div`
  border: 1px solid #dfe0e3;
  width: 100px;
  margin: 22px auto;
  }
`;

s.RadioChoiceWrapper = styled.h1`
  text-align: center;
  margin: 0 auto;
  padding: 0;
  width: 200px;
`;

s.CtaBtnWrp = styled.div`
  margin: 10px 0;
`;

s.radioTabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  z-index: 1;
`;
s.StyleButton = radioButtonStyle.StyleButton.extend`    
    margin: 12px 0 0 !important;
    width: 100% !important;
 `;
s.InputButton = buttonStyle.InputButton.extend`
  && {
    width: 178px !important;
    padding: 0 !important;
    margin: 25px 0 15px !important;;
    border-radius: 20px;
 }
`;
s.DisabledInputButton = s.InputButton.extend`
&& {
  background-color: #cdced1;
}
`;
s.recommendedText = styled.div`
  font: 400 10px 'Roboto', sans-serif;
  text-transform: uppercase;
  text-align: center;
  width: 86px;
  padding: 3px 0;
  border: 1px solid #ffb400;
  position: absolute;
  z-index: 2;
  right: -21%;
  color: #fff;
  height: 10px;
  line-height: 11px;
  border-radius: 3px;
  margin: -13px 0 0;
  background: #ffa922;
`;
s.LoaderWrp = styled.div`
  margin: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
s.ThankyouWrapper = styled.div`
  margin: 117px 0 100px;
`;

export default s;
