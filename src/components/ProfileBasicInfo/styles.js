import styled from 'styled-components';
import Link from '../Common/Link';

const styles = {};

styles.ProfileBasicInfo = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 15px 0;
  background: #fff;
  box-shadow: 0 1px 2px rgba(43, 59, 93, 0.29);
  border-radius: 3px;
`;

styles.LeftSection = styled.ul`
  list-style: none;
  padding: 13px 0 6px 10px;
  font: 14px arial;
  color: #72727d;
  width: 363px;
  margin: 0 20px 0 0;
`;

styles.Item = styled.li`
  display: flex;
  align-items: center;
  margin: 0 0 8px;
`;

const spriteV6Icons = {
  height_sunsign: 'left 3px',
  marital_status: 'left -15px',
  profile_religion: 'left -34px',
  profile_community: 'left -849px',
  edu_qualification: 'left -115px',
  profile_profession: 'left -56px',
  profile_gotra: 'left -56px',
  profile_living_in: 'left -98px',
  profile_born_detail: 'left -77px',
  profile_special_cases: 'left -970px',
  defaultIcon: 'left top',
};

styles.Icon = styled.span`
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 19px;
  background: url(/assets/pp-icon-sprite-v6.png) no-repeat ${props => spriteV6Icons[props.name] || spriteV6Icons.defaultIcon};
`;

styles.Desc = styled.p`
  width: ${props => (props.isEducation ? '300px' : '338px')};
  line-height: 20px;
  margin: 0;
  padding: 0 0 0 5px;
  word-wrap: break-word;
  height: ${props => (props.isEducation ? '18px' : 'auto')};
  overflow: ${props => (props.isEducation ? 'hidden' : 'initial')};
  text-overflow: ${props => (props.isEducation ? 'ellipsis' : 'initial')};
  white-space: ${props => (props.isEducation ? 'nowrap' : 'initial')};
`;

styles.RightSection = styled.section`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  width: 260px;
  border: 1px solid #ecf9fa;
  border-bottom: 0;
  background: #ecf9fa;
  font: italic 13px arial;
  color: #72727d;
  padding: 8px 0 0;
  margin: 12px 0;
  position: relative;
`;
styles.Interest = styled.p`
  background: url(/assets/right-tic.png) no-repeat left 4px;
  padding: 0 0 8px 17px;
  margin: 6px 8px;
`;

styles.AddInterestsPrompt = styled.p`
  margin: 8px;
  font-size: 11px;
  color: #72727d;
  font-style: italic;
`;

styles.Link = styled(Link)`
  color: #00bcd5;
  text-decoration: none;
  background: url(https://img2.shaadi.com/imgs/unified/next.png) no-repeat right 3px;
  padding: 0 8px 0 0;

  &:hover {
    text-decoration: underline;
  }
`;

export default styles;
