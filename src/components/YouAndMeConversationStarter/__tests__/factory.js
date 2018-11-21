const props = {
  displayData: [
    'He is a vegetarian as well',
    "You both have done your Bachelor's degree",
    'He is a Gemini - you both share the "Air" zodiac element',
  ],
  himHer: 'Him',
};

const factory = { props };

it('should export conversation starter props', () => {
  expect(factory.props).not.toBeFalsy();
});

export default factory;
