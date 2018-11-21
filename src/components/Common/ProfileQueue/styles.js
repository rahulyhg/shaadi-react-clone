import styled from 'styled-components';
import Link from '../Link';

const styles = {};

styles.ProfileNavWrapper = styled.div`
  display: flex;
  ${props => (props.isBottom ? 'width:674px;padding:10px 0 0 0' : 'height:64px;')};
`;

styles.ProfileNavHeading = styled.span`
  display: inline-block;
  position: relative;
  right: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '0' : '5px')};
  font: ${props => (['B', 'C'].includes(props.profilePageBucket) ? "400 14px 'Roboto', sans-serif" : '16px arial')};
  color: ${props => (props.isPageMasked ? '#fff' : ['B', 'C'].includes(props.profilePageBucket) ? '#95959d' : '#b1b3b9')};
  ${props => !['B', 'C'].includes(props.profilePageBucket) && 'height: 31px'};
  text-align: right;
`;

styles.ProfileNavArrow = styled.div`
  ${props => !['B', 'C'].includes(props.profilePageBucket) && 'width: 100%'};
  ${props => !['B', 'C'].includes(props.profilePageBucket) && 'background: url(/assets/more_prof_shadow-v2.png) no-repeat right 5px'};
  ${props => !['B', 'C'].includes(props.profilePageBucket) && 'height: 12px'};
`;

styles.ProfileNavBtns = styled.div`
  ${props => ['B', 'C'].includes(props.profilePageBucket) && 'text-align: right'};
  ${props =>
    ['B', 'C'].includes(props.profilePageBucket) && props.isBottom ? 'width:8.13rem;padding:0.7rem 25px 0 0 ' : 'padding: 0 21px 0 0'};
  ${props =>
    !props.isBottom &&
    `display: flex;
  align-items: center;
  justify-content: flex-end;`};
  flex: 1;
`;

styles.ProfileNavBtn = styled(Link)`
  color: ${props => (props.isDisabled ? '#ccc' : '#00bcd5')};
  text-decoration: none;
  vertical-align: middle;
  ${props =>
    ['B', 'C'].includes(props.profilePageBucket) && props.isBottom
      ? "font: 300 14px 'Roboto', sans-serif"
      : "display: inline-block;font: 400 12px 'Roboto', sans-serif"};
  border: 0;
  outline: 0;
  ${props => props.isBottom && (props.isPrevBtn ? 'padding: 0 0 0 13px' : 'padding: 0 13px 0 0')};
  background: transparent;

  cursor: ${props => (props.isDisabled ? 'text' : 'pointer')};
  &:hover {
    text-decoration: ${props => (props.isDisabled ? 'none' : 'underline')};
  }
`;

styles.ProfileNavBackBtn = styled(Link)`
  color: ${props => (props.isDisabled ? '#ccc' : '#00bcd5')};
  ${props => !['B', 'C'].includes(props.profilePageBucket) && 'cursor: text'};
  padding: 0;
  text-decoration: none;
  vertical-align: top;
  ${props => ['B', 'C'].includes(props.profilePageBucket) && "font: 400 14px 'Roboto', sans-serif"};
  ${props => !['B', 'C'].includes(props.profilePageBucket) && 'font-size: 14px'};
  border: 0;
  outline: 0;
  background: transparent;
  ${props => ['B', 'C'].includes(props.profilePageBucket) && 'margin: 10px 0 8px 0px'};
  ${props => ['B', 'C'].includes(props.profilePageBucket) && 'width: 200px'};
  ${props => ['B', 'C'].includes(props.profilePageBucket) && 'display: inline-block'};
  ${props => ['B', 'C'].includes(props.profilePageBucket) && 'text-align: left'};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

styles.WhitePipe = styled.span`
  color: ${props => (props.isPageMasked ? '#fff' : '')};
`;
styles.BackArrow = styled.span`
  display: inline-block;
  width: 13px;
  height: 14px;
  background: ${props =>
    props.isPageMasked
      ? 'url(/assets/arrow-white.png)  no-repeat left 3px'
      : 'url(/assets/auto-pagnation-sprite.png)  no-repeat left -35px'};
`;
styles.Separator = styled.span`
  display: inline-block;
  vertical-align: middle;
  width: 16px;
  text-align: center;
  ${props => (props.isPageMasked ? 'color:#fff' : !props.isBottom && 'color:#DFE0E3')};
`;
styles.PaginationSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 8px;
  line-height: 8px;
  ${styles.PaginationSection}:hover & {
    color: #000;
  }
`;

styles.NextIconBottom = styled.span`
  display: inline-block;
  width: 13px;
  height: 14px;
  margin-left: 5px;
  background: ${props => (props.isPageMasked ? 'url(/assets/arrow-white.png)' : 'url(/assets/auto-pagnation-sprite.png)')} no-repeat left -16px;
`;
styles.PrevIconBottom = styled.span`
  display: inline-block;
  width: 13px;
  height: 14px;
  background: ${props =>
    props.isPageMasked
      ? 'url(/assets/arrow-white.png)  no-repeat left 3px'
      : 'url(/assets/auto-pagnation-sprite.png)  no-repeat left -35px'};
`;
styles.NextIcon = styled.span`
  display: inline-block;
  width: 13px;
  height: ${props => (!props.isPageMasked ? '10px' : '14px')};
  ${props => !props.isBottom && ' margin-left: 5px;'};
  background: ${props => (props.isPageMasked ? 'url(/assets/arrow-white.png)' : 'url(/assets/Next_arrow.png)')} no-repeat left;
`;
styles.PrevIcon = styled.span`
  display: inline-block;
  width: 13px;
  height: ${props => (!props.isPageMasked ? '10px' : '14px')};
  ${props => !props.isBottom && ' margin-right: -3px;'};
  background: ${props =>
    props.isPageMasked ? 'url(/assets/arrow-white.png)  no-repeat left 3px' : 'url(/assets/Prev_arrow.png)  no-repeat left '};
`;
styles.paginationText = styled.div`
  text-align: ${props => (props.isPrev ? 'right' : 'left')};
  padding: ${props => (props.isPrev ? '0 8px 0 8px' : '0 0 0 6px')};
`;
styles.Img = styled.img`
  width: 40px;
  height: 40px;
  display: inline-block;
  vertical-align: middle;
  border-radius: 50px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  &:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, ${props => (props.isPrev ? '0.5' : '0.7')});
  }
  ${styles.PaginationSection}:hover & {
    box-shadow: 0 0 5px rgba(0, 0, 0, ${props => (props.isPrev ? '0.5' : '0.7')});
  }
`;
styles.ImgDiv = styled.div`
  width: 40px;
  height: 40px;
  background: url(${props => props.src}) no-repeat center top;
  display: inline-block;
  vertical-align: middle;
  border-radius: 50px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  &:hover {
    box-shadow: 0 0 5px rgba(0, 0, 0, ${props => (props.isPrev ? '0.5' : '0.7')});
  }
  ${styles.PaginationSection}:hover & {
    box-shadow: 0 0 5px rgba(0, 0, 0, ${props => (props.isPrev ? '0.5' : '0.7')});
  }
`;
styles.overlay = styled.div`
  width: 40px;
  height: 40px;
  opacity: 0.7;
  position: absolute;
  background: rgb(255, 255, 255);
  border-radius: 50%;
`;
styles.navNextWrapper = styled.div`
  display: inline-block;
`;
styles.boo = styled.h5``;

styles.ImgWrap = styled.div`
  position: relative;
`;

export default styles;
