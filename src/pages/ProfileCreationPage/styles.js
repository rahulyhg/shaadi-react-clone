import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

const styles = {};

export const Heading = styled.h1`
  font: 300 20px/32px 'Roboto', sans-serif;
  text-align: center;
  color: #51505d;
  margin: 0;
  padding: 0;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const SubHeading = Heading.withComponent('h2').extend`
  font-size: 26px;
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const AsterikSup = styled.sup`
  display: inline-block;
  font: 300 13px 'Roboto', sans-serif;
  margin: 2px 0 0 2px;
`;

export const FormSubmitBtn = styled.span`
  position: relative;
  display: ${({ loading }) => (loading ? 'none' : '')};
  ${props =>
    props.loading !== 'true' &&
    !props.disabled &&
    !props.layerbtn &&
    `&:after {
      content: '';
      width: 6px;
      height: 8px;
      margin: 0 0 0 2px;
      background: url(/assets/arrow.svg) no-repeat left top;
      position: absolute;
      bottom: 16%;
      right: -10px;
    }
  `};
`;

export const RequiredFields = styled.div`
  font: 300 12px/18px 'Roboto', sans-serif;
  color: #51505d;
  text-align: right;
  margin: 6px 9px 0 0;
`;

export const FormLoader = styled.div`
  position: relative;
  color: #ff5a60;
  padding: 30px 0 0;
  text-align: center;
`;

styles.RegMainWrapper = styled.div`
  margin: -100px auto 0;
  width: 630px;
  @media (max-width: 768px) {
    width: 98%;
  }
`;

styles.RegWrapper = styled.div`
  width: 620px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  padding: 9px 0 20px;
  margin: 0 auto;
  font: 300 16px 'Roboto', sans-serif;
  text-align: center;
  background: #fff;
  border-radius: 3px;
  @media (max-width: 768px) {
    width: 90%;
    padding: 20px 10px;
  }
  input::-ms-clear {
    display: none;
  }
`;

styles.RegInnerWrapper = styled.div`
  width: 438px;
  margin: 0 auto;
  padding: 5px 0 0;
  position: relative;
  display: inline-block;
  textarea::placeholder {
    color: #b1b3b9;
  }
  textarea {
    font: 300 16px 'Roboto', sans-serif;
    color: #51505d;
    width: 100%;
  }
  @media (max-width: 768px) {
    width: 98%;
    padding: 0;
  }
`;

styles.RegMainHead = styled.div`
  font: 300 20px/32px 'Roboto', sans-serif;
  text-align: center;
  color: #51505d;
  @media (max-width: 768px) {
    font: 300 14px 'Roboto', sans-serif;
  }
`;

styles.RegMainHeadbtm = styles.RegMainHead.extend`
  font: 300 26px 'Roboto', sans-serif;
  text-align: center;
  color: #51505d;
  @media (max-width: 768px) {
    font: 300 18px 'Roboto', sans-serif;
  }`;

styles.error = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  color: #e53a41;
  text-align: left;
  margin: 4px 0 0;
  font: 300 13px 'Roboto', sans-serif;
`;

styles.communityInput = styled.div`
  color: #51505d;
  display: flex;
  align-items: center;
  font: 300 16px 'Roboto', sans-serif;
  flex-wrap: wrap;
`;

styles.communityCheckbox = styled.div`
  color: #51505d;
  display: flex;
  align-items: center;
  font: 300 15px 'Roboto', sans-serif;
  margin: 0 0 -14px -13px;
  text-align: left;
`;

styles.casteNoBarCheckbox = styles.communityCheckbox.extend`
margin: 0 0 -8px -13px;
`;

styles.capsuleBtn = styled.div`
  border: 1px solid #dfe0e3;
  color: #72727d;
  border-radius: 47px;
  padding: 10px 27px;
  display: inline-block;
  cursor: pointer;
`;

styles.styleButton = styled(Button)`
  && {
    background: #fff !important;
    box-shadow: none;
    border: 1px solid ${props => (props.ischecked === 'true' ? '#00bcd5' : '#dfe0e3')};
    border-radius: 15px;
    font: 300 14px 'Roboto', sans-serif;
    color: ${props => (props.ischecked === 'true' ? '#00bcd5' : '#51505d')};
    cursor: pointer;
    min-width: auto;
    min-height: auto;
    width: auto;
    height: auto;
    text-transform: capitalize;
    margin: 0 6px 0 0;
    text-align: center;
    cursor: pointer;
    padding: 0;
    @media (min-width: 769px) {
      &:hover {
        background: none;
        border: 1px solid ${props => (props.ischecked === 'true' ? '#00bcd5' : '#72727d')};
      }
    }
  }
`;

styles.skinToneWrap = styles.styleButton.extend`
&&{
  border: 1px solid ${props => (props.ischecked === 'true' ? '#00bbd5' : '#fff')};
  font:300 12px 'Roboto', sans-serif;
  border-radius:3px;
  @media (max-width: 768px) {
    font:300 16px 'Roboto', sans-serif;
  }
}`;

styles.complexion = styled.div`
  width: 22px;
  height: 22px;
  :#fde1cc: ;
  border-radius: 50%;
  margin: 4px auto;
  background: #${props =>
      ({
        'Very Fair': 'fde1cc',
        Fair: 'f5d3b7',
        Wheatish: 'e6ba9d',
        Dark: 'd6a079',
      }[props.skinTone])};
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    margin: 4px auto 8px;
  }
`;

styles.input = styled.input`
  display: none;
  &:checked ~ Button {
    border: 1px solid #00bcd5;
  }
`;

styles.bodyTypeMain = styled.div`
  color: ${props => (props.hasError ? '#e53a41' : '#95959d')};
  font: 300 14px 'Roboto', sans-serif;
  margin: 0 0 6px;
  text-align: left;
  @media (max-width: 768px) {
    margin: 0;
  }
`;

styles.habitFieldsWrap = styles.bodyTypeMain.extend`
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0 6px; 
  color: ${props => (props.hasError ? '#e53a41' : '#95959d')};
`;

styles.skinToneMain = styles.habitFieldsWrap.extend`  
  @media (max-width: 768px) {
    margin: 20px 0 0;
  } 
`;

styles.bodytypeWrap = styled.div`
  position: relative;
  display: flex;
`;

styles.TooltipMainWrap = styled.div`
  position: relative;
  -webkit-tap-highlight-color: transparent;
  display: inline-block;
`;
styles.TooltipWrap = styled.div`
  display: inline-block;
  width: 18px;
  height: 18px;
  margin: 2px 8px;
  cursor: default;
  vertical-align: middle;
  -webkit-transition: all 300ms ease;
  transition: all 300ms ease;
  cursor: help;
  width: 21px;
  height: 21px;
  margin: 2px 0 0 12px;
  background: url${props => (props.isActive ? '(/assets/stoppage-tooltip-hover.png)' : '(/assets/stoppage-tooltip.png)')} no-repeat left 0px;
  background-size: 21px;
  @media (max-width: 768px) {
    margin: 2px 0 0 4px;
  }
`;

styles.bodyTypeLabel = styled.label`
  cursor: pointer;
  padding: ${props => (props.isChecked ? '2px 10px' : '5px 12px')};
`;

styles.skinToneLabel = styles.bodyTypeLabel.extend`
  width:64px;
  height:50px;
  padding:0;
  @media (max-width: 768px) {
    height:auto;
  }
  @media (max-width: 320px) {
    width:60px;
    font-size: 0.9em;
  }
`;

styles.communityFieldsWrap = styled.div`
  display: inline-block;
  margin: ${({ noMargin }) => (noMargin ? '0 3px 0 0' : 0)};
  @media (max-width: 768px) {
    margin: 20px 0 0;
  }
`;

styles.habbitFieldsWrap = styles.communityFieldsWrap.extend`
  @media (max-width: 768px) {
    margin: 0;
    display: block;
  }
`;

styles.herDietmain = styled.div`
  display: flex;
`;

styles.herDietWrap = styled.div`
  margin: 0 8px 0 0;
  width: 94%;
`;

styles.errrWrap = styled.div`
  display: ${props => (props.isVisible ? 'block' : 'none')};
`;

styles.styleCheckbox = styled(Checkbox)`
  && {
    margin: 0 -4px 0 -15px;
    &:checked {
      color: #000;
    }
  }
`;

styles.aboutHelpWrap = styled.div`
  text-align: left;
  font: 300 14px 'Roboto', sans-serif;
  color: ${props => (props.isFocused ? '#00bcd5' : props.hasError ? '#e53a41' : '#95959d')};
  margin: 21px 0 -21px;
`;

styles.incomeRequired = styled.div`
  text-align: left;
  display: flex;
  align-items: baseline;
  color: #51505d;
`;

styles.incomeTooltipLabel = styled.div`
  margin: 9px 0px 0 0;
  padding: 5px 7px 0 0;
  font: 300 13px 'Roboto', sans-serif;
`;

styles.helperTextField = styles.incomeRequired.extend`
  font: 300 13px 'Roboto', sans-serif;
  margin-top:5px;
  display: ${props => (props.isVisible ? 'flex' : 'none')};
`;

styles.checkboxText = styled.label`
  margin: 0 0 0 -5px;
`;

styles.casteNoBarWrap = styled.div`
  color: #51505d;
  text-align: left;
  margin-bottom: -15px;
  @media (max-width: 399px) {
    margin-top: 7px;
  }
}`;

styles.checkboxLabel = styled.span`
  color: #51505d;
  display: flex;
  align-items: center;
  font: 300 15px 'Roboto',sans-serif;
  text-align: left;
}`;

styles.physicalDisabilityLabel = styles.checkboxLabel.extend`
  width: 140px;
}`;

styles.casteNoBarLabel = styles.checkboxLabel.extend`
  @media (min-width: 768px) {
    width: 400px;
  }
}`;

styles.countryCodeMainWrap = styled.div`
  width: auto;
`;

styles.countryCode = styled.div`
  display: flex;
  width: 100%;
  align-items: unsafe;
`;

styles.countryCodeWrap = styled.div`
  @media (min-width: 768px) {
    width: 130px;
  }
`;

styles.countryCodeContainer = styled.div`
  flex: 1 1 20%;
`;

styles.countryNumberWrap = styled.div`
  width: 288px;
  margin: 0 0 0 20px;
  @media (max-width: 768px) {
    width: 52.5vw;
  }
  @media (max-width: 320px) {
    margin: 0 0 0 5px;
  }
`;

styles.helpwrapper = styled.div`
  font: normal 14px 'Roboto', sans-serif;
  color: #00bcd5;
  margin: 11px 0 7px;
  text-align: left;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

styles.label = styled.label`
  cursor: pointer;
`;

styles.textareaWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse;
`;

styles.helpwrappervalidation = styled.div`
  font: normal 12px 'Roboto', sans-serif;
  color: #95959d;
  margin-top: 5px;
`;

styles.doshamTypesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    display: block;
  }
`;

styles.doshamTypesWrap = styled.div`
  flex: 1 0 33%;
  margin: 5px;
`;

styles.mobileTooltip = styled.div`
  display: block;
  font: 300 12px/18px 'Roboto', sans-serif;
  color: #72727d;
  padding: 6px 10px;
  background: #eee;
  width: 416px;
  text-align: left;
  box-shadow: 0 4px 3px -3px rgba(0, 0, 0, 0.3);
  margin: 0 0 0 2px;
  @media (max-width: 768px) {
    width: 96%;
    padding: 6px 2%;
  }
`;

styles.bodytypeImages = styled.div`
  background-image: url(/assets/body-types-sprite.png);
  background-repeat: no-repeat;
  background-position: ${props =>
    ({
      'Slim-Female': '-20px 0',
      'Athletic-Female': '-20px -29px',
      'Average-Female': '-19px -57px',
      'Heavy-Female': '-19px -87px',
      'Slim-Male': '-82px 0',
      'Athletic-Male': '-82px -29px',
      'Average-Male': '-82px -57px',
      'Heavy-Male': '-82px -86px',
      'Slim-Female-selected': '0 0',
      'Athletic-Female-selected': '0 -29px',
      'Average-Female-selected': '0 -57px',
      'Heavy-Female-selected': '0 -87px',
      'Slim-Male-selected': '-57px 0',
      'Athletic-Male-selected': '-57px -29px',
      'Average-Male-selected': '-57px -57px',
      'Heavy-Male-selected': '-57px -86px',
    }[`${props.bodytype}-${props.gender}${props.isSelected ? '-selected' : ''}`])};

  width: ${props =>
    ({
      Slim: '9px',
      Athletic: '11px',
      Average: '14px',
      Heavy: '20px',
    }[props.bodytype])};
  height: 25px;
  background-size: 102px;
  margin: 0 7px 0 0;
`;

export default styles;
