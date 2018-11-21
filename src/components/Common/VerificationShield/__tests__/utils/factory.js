const props = {
  verification: {
    count: 3,
    shield_state: 'GREEN',
    derived_text: 'Aadhaar, Facebook and Mobile number Verified',
    verified_proofs: ['Aadhaar Verified', 'Facebook Verified', 'Mobile number Verified'],
  },
};

const factory = { props };

it('should export verification props', () => {
  expect(factory.props).not.toBeFalsy();
});

export default factory;
