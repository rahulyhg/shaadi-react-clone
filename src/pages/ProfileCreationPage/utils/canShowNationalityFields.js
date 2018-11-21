export default (livingSince, birthYear) => !!livingSince && livingSince !== 'Birth' && parseInt(livingSince, 10) > birthYear + 4;
