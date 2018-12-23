module.exports = {
    'Demo test Google' : function (client) {
      client
        .url('http://www.netflix.com')
        .waitForElementVisible('//body', 9000)
        .assert.title('Netflix India – Watch TV Programmes Online, Watch Films Online')
        .end();
    }
  };