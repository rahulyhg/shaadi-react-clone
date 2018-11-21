const getHeight = heightInInches => {
  const ft = Math.floor(heightInInches / 12);
  const inches = heightInInches % 12;
  const cms = Math.floor(heightInInches * 2.54);

  return `${ft}ft ${inches ? `${inches}in ` : ''}- ${cms}cm`;
};

export default getHeight;
