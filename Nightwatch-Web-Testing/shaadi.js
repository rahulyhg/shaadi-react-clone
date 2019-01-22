module.exports = {
    ' test shaadi.com' : function (client) {
      client
        .url('https://www.shaadi.com')
        .waitForElementVisible('//body', 9000)
		.pause(5000)
        .assert.title('Shaadi')
        .end();
    }
  };