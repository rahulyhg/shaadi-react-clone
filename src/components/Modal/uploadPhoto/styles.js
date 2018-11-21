import styled from 'styled-components';
import Link from '../../Common/Link';

const styles = {};

styles.UploadPhotoWrapper = styled.div`
  position: relative;
  width: 559px;
  z-index: 3;
  box-shadow: 0 0 39px rgba(70, 70, 70, 0.25);
  border: none;
  border-radius: 3px;
`;
styles.LayerCloseBtn = styled.div`
  width: 30px;
  height: 30px;
  background: url(/assets/reg-layer-close.png) no-repeat 7px 7px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;

  &:hover {
    background: url(/assets/reg-layer-close.png) no-repeat 7px -24px;
  }
`;
styles.UploadTitle = styled.div`
  font: 400 16px/20px 'Roboto', sans-serif;
  color: #51505d;
  text-align: center;
`;
styles.UploadBtn = styled(Link)`
  border: none;
  display: inline-block;
  border-radius: 3px;
  cursor: pointer;
  font: bold 16px/19px 'Roboto', sans-serif;
  color: #fff;
  text-align: center;
  text-decoration: none;
  background: #00bcd5;
  outline: 0;
  margin: 0;
  padding: 12px 20px;
  transition: all 300ms ease;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  margin-top: 40px;
  &:hover {
    background: #0194a8;
    text-decoration: none;
    transition: all 300ms ease;
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);
  }
`;
styles.UploadCaption = styled.div`
  display: block;
  color: #95959d;
  font: 300 12px/22px 'Roboto', sans-serif;
  padding: 8px 0 27px 10px;
  text-align: center;
`;

export default styles;
