const storyDecorator = story => {
  const { id, photo1, small_desc, title } = story;
  const photoPath = photo1 && `https://img.shaadi.com/success-story/${photo1}`;
  return {
    id: `${id}`,
    title,
    photo: photoPath,
    description: small_desc,
  };
};

export default (payload = {}) => (payload.list || []).map(story => storyDecorator(story));
