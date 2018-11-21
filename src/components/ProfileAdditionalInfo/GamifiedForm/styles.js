import styled from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

styles.FamilyForm = styled.div`
  position: absolute;
  top: 44px;
  margin: 0 0 10px -7px;
  width: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '572px' : '587px')};
  box-shadow: 0 1px 2px rgba(43, 59, 93, 0.29);
`;

styles.AstroForm = styled.div`
  position: absolute;
  top: 44px;
  margin: 0 0 10px -7px;
  width: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '572px' : '587px')};
  box-shadow: 0 1px 2px rgba(43, 59, 93, 0.29);
`;

styles.FormPrompt = styled.section`
  display: ${props => (props.isVisible ? 'flex' : 'none')};
  text-align: center;
`;

styles.Message = styled.p`
  margin: 0 88px 0 7px;
  font: ${props => (['B', 'C'].includes(props.profilePageBucket) ? "300 14px/16px 'Roboto', sans-serif" : 'normal 14px/16px arial')};
  color: #7f7f7f;
`;

styles.FormToggleAstroBtn = styled(Link)`
  display: inline-block;
  font: ${props => (['B', 'C'].includes(props.profilePageBucket) ? "300 14px 'Roboto', sans-serif" : 'normal 14px arial')};
  text-align: center;
  background: transparent;
  padding: 10px 0 0;
  border: 0;
  font-size: 14px;
  color: #00bcd5;
  outline: 0;
  text-decoration: none;
`;

styles.FormToggleBtn = styled.button`
  font: ${props => (['B', 'C'].includes(props.profilePageBucket) ? "300 14px 'Roboto', sans-serif" : 'normal 14px arial')};
  text-align: center;
  background: transparent;
  padding: 10px 0 0;
  border: 0;
  font-size: 14px;
  color: #00bcd5;
  outline: 0;
  text-decoration: none;
`;

styles.Header = styled.div`
  display: ${props => (props.isVisible ? 'flex' : 'none')};
  align-items: center;
`;

styles.PeelIcon = styled.span`
  display: inline-block;
  background: url(/assets/peel-curve-v3.png) no-repeat left top;
  width: 95px;
  min-height: 80px;
`;

styles.Strong = styled.span`
  font-size: 22px;
`;

styles.LockIcon = styled.span`
  display: inline-block;
  margin: 46px 88px 18px 0;
  width: 38px;
  height: 32px;
  background: url(/assets/lock-peeling.gif) no-repeat;
`;

styles.Heading = styled.h5`
  flex: 1;
  font: bold 16px arial;
  color: #72727d;
  padding: 33px 0 20px 0;
  margin: 0;
  width: 100%;
  background: #fffbe6;
`;

styles.CloseBtn = styled.button`
  position: absolute;
  right: 23px;
  top: 22px;
  background: url(/assets/big-close-v2.png) no-repeat left -208px;
  width: 17px;
  height: 16px;
  overflow: hidden;
  border: 0;
  outline: 0;

  &:hover {
    background-position: left -232px;
  }
`;

styles.Content = styled.div`
  background: #fffbe6;
  min-height: 200px;
  width: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '476px' : '491px')};
`;

styles.DownArrowIcon = styled.span`
  display: inline-block;
  width: 8px;
  height: 7px;
  margin-left: 2px;
  background-image: url(/assets/down-arrow.gif);
`;

styles.Form = styled.form`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  background: #fffbe6;
`;

styles.FormContent = styled.div`
  border-top: dotted 1px #c3c3c3;
  margin: 0 5px 0 33px;
  padding: 22px 0 10px 22px;
`;

styles.Fieldset = styled.div`
  display: flex;
  border: 0;
  margin: 0;
  padding: 0;
  padding-bottom: 10px;
`;

styles.Label = styled.span`
  width: 185px;
  font: normal 12px arial;
  color: #b1b3b9;
  background: url(/assets/colunbg.gif) no-repeat right -5px;
  min-height: 26px;
  margin-right: 10px;
  text-transform: capitalize;
  display: inline-block;
`;

styles.Field = styled.div`
  flex: 0 1 ${props => (props.isSiblingsField ? 'auto' : '294px')};
`;

styles.CountrySelect = styled.select`
  width: 196px;
  height: 24px;
  padding: 1px 0;
  margin: 0 10px 0 0;
  background: #fff;
  border: 1px solid #dfe0e3;
  border-radius: 3px;
  color: #72727d;
  font: 13px arial;
`;

styles.Select = styled.select`
  width: 100%;
`;
styles.TinySelect = styled.select`
  width: 49px;
  margin: 0 5px 0 0;
  background: #fff;
  border: 1px solid #dfe0e3;
  border-radius: 3px;
  color: #72727d;
  font: 13px arial;
  height: 24px;
  padding: 1px 0;
`;

styles.Input = styled.input`
  width: 196px;
  background: #fff;
  border: 1px solid #dfe0e3;
  border-radius: 3px;
  color: #72727d;
  font: 13px arial;
  height: 20px;
`;

styles.Error = styled.p`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  background: url(/assets/hint.gif) no-repeat -11px -11px;
  color: #db0006;
  font: 11px arial;
  width: 214px;
  padding: 4px 0 0 14px;
  margin: 0;
`;

styles.SiblingError = styled.p`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  background: url(/assets/hint.gif) no-repeat -11px -11px;
  color: #db0006;
  font: 11px arial;
  width: 214px;
  padding: 4px 0 0 14px;
  margin: 0;
  margin-left: 195px;
`;

styles.SiblingsField = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

styles.SubField = styled.div`
  &:nth-child(3) {
    margin: 0 26px 0 0;
  }
  &:nth-child(4) {
    text-align: center;
  }
`;

styles.SubTextInput = styled.input`
  width: 288px;
  height: 20px;
  padding: 1px 2px;
  margin-right: 10px;
  background: #fff;
  border: 1px solid #dfe0e3;
  border-radius: 3px;
  font: 13px arial;
  outline: 0;
`;

styles.SubInput = styled.input`
  resize: none;
  outline: none;
  background: #fff;
  border-radius: 3px;
  color: #72727d;
  font: 13px arial;
  height: 20px;
  width: 14px;
  padding: 1px 6px;
  margin: 0 0 2px;
  text-align: center;
  border: 1px solid rgb(189, 214, 168);
`;

styles.SubLabel = styled.span`
  display: block;
  padding: 5px 0 0;
  font-size: 11px;
  color: #72727d;
  white-space: nowrap;
`;

styles.SiblingIcon = styled.span`
  display: inline-block;
  height: 46px;
  margin: 0 15px 0 3px;
  background-image: url(/assets/reg-flow-big-icons-v2.png);
  background-repeat: no-repeat;
  width: ${props => (props.gender === 'male' ? '36px' : props.gender === 'female' ? '44px' : '36px')};
  background-position: ${props => (props.gender === 'female' ? 'left -701px' : props.gender === 'male' ? 'left -644px' : 'left -644px')};
`;

styles.SubmitBtn = styled.button`
  display: block;
  margin: 11px auto;
  font-weight: bold;
  text-align: center;
  padding: 9px 15px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  text-decoration: none;
  line-height: 19px;
  background: #00bcd5;
  border: 1px solid #00bcd5;
  border-radius: 3px;
  box-shadow: none;
  margin-left: 194px;

  &:hover {
    background: #0194a8;
    border: 1px solid #0194a8;
  }
`;

styles.Note = styled.p`
  font: normal 11px/14px arial;
  color: #b1b3b9;
  padding: 7px 0 5px;
  margin: 0;
  text-align: center;
`;

styles.HoroscopeBtn = styled.button`
  display: block;
  margin: 0 auto;
  border: 0;
  outline: 0;
  padding: 0 9px 0 0;
  font: normal 12px/15px arial;
  color: #00bcd5;
  background: url(/assets/right-gray-arrow.png) no-repeat right center;
`;

styles.RadioInput = styled.input`
  display: inline-block;
  vertical-align: middle;
  margin-right: 3px;
`;

styles.RadioLabel = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin-right: 7px;
`;

styles.CheckboxWrap = styled.div`
  padding: 9px 0 4px;
  font-size: 12px;
  color: #72727d;
  display: inline-block;
`;

styles.Checkbox = styled.input`
  margin-right: 10px;
  vertical-align: middle;
`;

styles.CheckBoxLabel = styled.span`
  vertical-align: middle;
  display: inline-block;
`;

export default styles;
