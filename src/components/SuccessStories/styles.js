import styled from 'styled-components';
import Link from '../Common/Link';

const styles = {};

styles.SuccessStories = styled.div`
  margin-top: 20px;
  border-radius: 3px;
  ${props => ['B', 'C'].includes(props.profilePageBucket) && "font: 400 14px 'Roboto', sans-serif"};
  border: 3px solid #fff;
  background: #fff;
  box-shadow: 0 1px 2px rgba(43, 59, 93, 0.29);
`;

styles.Title = styled.h5`
  display: block;
  padding: 8px 12px 10px;
  background: #f0f0f0;
  color: ${props => (['B', 'C'].includes(props.profilePageBucket) ? '#51505d' : '#72727d')};
  font-size: 14px;
  margin: 0;
  font-weight: normal;
  text-transform: ${props => (['B', 'C'].includes(props.profilePageBucket) ? 'capitalize' : 'uppercase')};
`;

styles.StoriesWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
`;

styles.Story = styled.div`
  display: ${props => (props.isActive ? 'block' : 'none')};
  flex: 1 0 100%;
  transition: 0.2s ease;
  opacity: ${props => (props.isActive ? 1 : 0)};
`;

styles.Photo = styled.img`
  width: ${props => props.width};
  height: ${props => props.height};
`;

styles.Name = styled.span`
  display: block;
  padding: 0 0 6px;
  ${props => !['B', 'C'].includes(props.profilePageBucket) && 'font-size: 14px'};
  ${props => !['B', 'C'].includes(props.profilePageBucket) && 'font-weight: bold'};
  ${props => ['B', 'C'].includes(props.profilePageBucket) && "font: 400 14px 'Roboto', sans-serif"};
  padding: 7px 12px 0;
  white-space: nowrap;
  width: 12.6em;
  overflow: hidden;
  text-overflow: ellipsis;
`;

styles.Desc = styled.p`
  display: block;
  padding: 0 0 11px;
  margin: 7px 12px 5px;
  border-bottom: 1px solid #d9d9d9;
  ${props => ['B', 'C'].includes(props.profilePageBucket) && "font: 300 12px 'Roboto', sans-serif"};
  line-height: 16px;
  color: #72727d;
`;

styles.ReadMoreLink = styled(Link)`
  background: url(/assets/view-arrow.gif) no-repeat right 7px;
  padding: 3px 10px 0 0 !important;
  color: #00bcd5;
  margin-left: 3px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

styles.SliderDots = styled.ul`
  display: flex;
  padding-left: 0;
  justify-content: center;
`;

styles.Dot = styled.li`
  display: inline-block;
  height: 8px;
  width: 8px;
  margin: 0 0 0 7px;
  cursor: pointer;
  background: ${props => (props.isActive ? '#999' : '#d1d0d0')};
  border-radius: 80%;
`;

styles.boo = styled.h5``;
styles.StoryWrapper = styled.div`
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 6px, rgba(0, 0, 0, 0.1) 0px 1px 4px;
  background: #fff;
  position: relative;
  padding: 0 10px;
`;

styles.StoryWrapper.displayName = 'PaymentSuccessStories';

styles.PaymentCarousel = styled.div`
  position: relative;
  width: 832px;
  flex-shrink: 0;
  overflow: hidden;
`;
styles.PaymentCarousel.displayName = 'Story';
styles.ThumbContainer = styled(Link)`
  padding: 0 9px 0 0;
  color: #72727d;
  text-decoration: none;
  flex: 1 0 114px;
`;
styles.ThumbContainer.displayName = 'ThumbContainer';
styles.StoryContent = styled(Link)`
  font: 300 14px 'Roboto', sans-serif;
  padding: 7px 0px 0 0;
  color: #72727d;
  text-decoration: none;
  line-height: 18px;
  width: 700px;
  display: block;
`;
styles.StoryContent.displayName = 'StoryContent';
styles.StoryHeading = styled.div`
  font: 400 16px 'Roboto', sans-serif;
  padding: 0 0 8px;
`;
styles.StoryHeading.displayName = 'StoryHeading';
styles.DisplayFlex = styled.div`
  display: flex;
  padding: 5px 0;
`;

export default styles;
