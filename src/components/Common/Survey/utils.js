const unique = answers => answers.filter((ans, index, self) => index === self.findIndex(t => t.id === ans.id && t.answer === ans.answer));

export { unique };
