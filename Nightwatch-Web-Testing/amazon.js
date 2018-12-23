module.exports = {
    'Demo test Google' : function (client) {
      client
        .url('http://www.amazon.com')
        .waitForElementVisible('//body', 9000)
        .assert.title('Amazon.com: Online Shopping for Electronics, Apparel, Computers, Books, DVDs & more')
        .end();
    }
  };