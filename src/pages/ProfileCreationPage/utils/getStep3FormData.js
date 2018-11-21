export default form => ({
  lifestyle: {
    diet: form.diet.value,
    drink: form.smokeHabbit.value,
    smoke: form.drinkHabbit.value,
  },
  appearance: {
    complexion: form.skinTone.value,
    built: form.bodyType.value,
    height: form.height.inches,
  },
});
