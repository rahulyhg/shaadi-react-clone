const successStoriesProps = {
  stories: {
    loading: false,
    flash: '',
    items: [],
  },
  wwwBaseUrl: 'https://www.shaadi.com/',
};
const oneStoryProps = {
  stories: {
    loading: false,
    flash: '',
    items: [
      {
        id: '182',
        title: 'Nagarajan & Premakuamri',
        description: 'It is a great pleasure that Shaadi.com brought us together.',
        photo: 'nagarajan-premakuamri-sm.jpg',
      },
    ],
  },
  wwwBaseUrl: 'https://www.shaadi.com/',
};
const moreThanOneStoriesProps = {
  stories: {
    loading: false,
    flash: '',
    items: [
      {
        id: '182',
        title: 'Nagarajan & Premakuamri',
        description: 'It is a great pleasure that Shaadi.com brought us together.',
        photo: 'nagarajan-premakuamri-sm.jpg',
      },
      {
        id: '183',
        title: 'Nagarajan & Premakuamri',
        description: 'It is a great pleasure that Shaadi.com brought us together.',
        photo: 'nagarajan-premakuamri-sm.jpg',
      },
      {
        id: '184',
        title: 'Nagarajan & Premakuamri',
        description: 'It is a great pleasure that Shaadi.com brought us together.',
        photo: 'nagarajan-premakuamri-sm.jpg',
      },
    ],
  },
  wwwBaseUrl: 'https://www.shaadi.com/',
};
const factory = {
  successStoriesProps,
  oneStoryProps,
  moreThanOneStoriesProps,
};
it('should export payment', () => {
  expect(factory.successStoriesProps).not.toBeFalsy();
  expect(factory.oneStoryProps).not.toBeFalsy();
  expect(factory.moreThanOneStoriesProps).not.toBeFalsy();
});
export default factory;
