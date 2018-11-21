import styled from 'styled-components';

export const Language = styled.div`
  width: 98px;
  height: 32px;
  line-height: 32px;
  background-color: #fff;
  border: 1px solid #dfe0e3;
  margin: 10px;
  border-radius: 18px;
  position: relative;
`;

export const LangDiv = styled.div`
  font: 400 15px/32px 'Roboto', sans-serif;
  color: #72727d;
  text-align: center;
`;

export const LangWrap = styled.div`
  background: #ffffff;
  width: 203px;
  height: 526px;
  padding: 14px;
  position: absolute;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  top: -2px;
  left: -100px;
  z-index: 2;
  font-size: 15px;
  text-align: left;
  box-sizing: border-box;
  line-height: 50px;
`;

export const LangWrapper = styled.div``;
export const Arrow = styled.span`
  transform: rotate(90deg);
  background: url(http://img.shaadi.com/mobile/images/dmt/dmt-sprite-v2.png) left -945px no-repeat;
  display: inline-block;
  width: 6px;
  height: 10px;
  margin: 0 0 0 8px;
`;

export const LangOpt = styled.span`
  font-weight: ${props => (props.isSelected ? '500' : '400')};
  font-size: 15px;
  color: #51505d;
  font-family: Roboto;
  text-decoration: none;
  > label {
    width: 150px;
    display: inline-block;
  }
`;

export const LangLabel = styled.label``;

export const LabelLink = styled.div`
  text-decoration: none;
`;
export const Tick = styled.div`
  color: #89c965;
  width: 16px;
  height: 13px;
  display: inline-block;
  background: url(https://img2.shaadi.com/assests/2018/images/check-mark.png) left top/cover no-repeat;
`;
