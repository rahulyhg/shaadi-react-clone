const Base_Test = require("../../../Base/Base_Test");
const profile_test_data = require("../../Tests/testdata_profile.js");
const test_data = require("./netbanking_test_data.json");

let baseTest, env, test_url, AB;

this['@tags'] = ['netbanking']

this['before'] = function (browser) {
    baseTest = new Base_Test(browser);
    env = baseTest.shaadiConfig.environment;
    test_url = baseTest.shaadiConfig.test_url;
    AB = baseTest.shaadiConfig.AB;

    let username = profile_test_data["juspay"][AB][env][0];
    let pass = profile_test_data["juspay"][AB][env][1];

    baseTest.login.quickLogin(username, pass);
}

this['beforeEach'] = function (browser) {
    browser
        .pause(400)
        .url(test_url + "/payment")
        .waitForElementVisible("//div[@data-test-selector='payment_card']");

    baseTest.pp1_revamp.selectPremiumPlan("gold");
    browser.waitForElementVisible("//div[@id='creditCardTab']");

    baseTest.pp2_JusPay.clickPaymentTab("net banking");
}

this['verify all errors when text input is blank '] = function (browser) {
    baseTest.pp2_JusPay.clickNext();

    browser
        .assert.containsText('//*[@id="netbanking_error"]/div', 'Please select prefered Bank.');
}

this['Verify popular banks are being selected'] = function (browser) {
    let popularData = ["NB_SBI", "NB_HDF", "NB_ICI", "NB_UTI", "NB_IDB", "NB_PNB"];

    popularData.forEach(item => {
        baseTest.pp2_JusPay.selectNetBBank(test_data[item][0]);
        browser.pause(1000)

        browser.execute('return document.querySelector("#bank_code").options[document.querySelector("#bank_code").selectedIndex].text', [], function (response) {
            let value1 = response.value;
            browser.assert.deepEqual(value1, test_data[item][0], "Popular Bank is selected : " + test_data[item][0])
        });
    });
}


for (const item in test_data) {
    this['Verify Net banking ' + item] = function (browser) {
        baseTest.pp2_JusPay.selectNetBBank(test_data[item][0]);
        baseTest.pp2_JusPay.clickNext();

        browser.waitForElementNotPresent("//div[@id='creditCardTab']");
        browser.pause(5000)
        browser.assert.urlContains(test_data[item][1]);
    }
}






