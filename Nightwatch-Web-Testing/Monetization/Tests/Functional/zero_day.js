//acquistion library
const Reg_Basic_Details = require("../../../Acquisition/WebPages/Reg_Basic_Details");
const Home = require("../../../Acquisition/WebPages/Home");
const Reg_Loc_Mar_Comm = require("../../../Acquisition/WebPages/Reg_Location_Marital_Community");
const Reg_Education_Work = require("../../../Acquisition/WebPages/Reg_Education_Work");
const Reg_LifeStyle = require("../../../Acquisition/WebPages/Reg_LifeStyle");
const Reg_About = require("../../../Acquisition/WebPages/Reg_About");

//utilies
const Excel_Parser =  require("../../../Shared_Items/Utilities/Excel_Parser");

module.exports =
{
  '@tags': ['lib_check','complete_flow'],

  'Create new profile and reach to top matches page' : (browser) =>
  {
    const ods_parser = new Excel_Parser(process.cwd() + "/Monetization/Tests/Functional/zeroD_test_data.ods");
    const test_data = ods_parser.getDataByRow(5);

    const home = new Home(browser);
    const reg_basic_details = new Reg_Basic_Details(browser);
    const reg_loc_mar_comm = new Reg_Loc_Mar_Comm(browser);
    const reg_education_work = new Reg_Education_Work(browser);
    const reg_life_style = new Reg_LifeStyle(browser);
    const reg_about = new Reg_About(browser);

    home.visitHomePage();
    home.clickRegistration();
    
    reg_basic_details.setEmailid(test_data["emailid"],true);
    reg_basic_details.setPassword(test_data["password"]);
    reg_basic_details.setCreatedFor(test_data["createdfor"], test_data["gender"]);
    reg_basic_details.clickNext();

    reg_basic_details.setFullName(test_data["firstname"], test_data["lastname"]);
    reg_basic_details.setDateOfBirth(test_data["date"], test_data["month"], test_data["year"]);
    reg_basic_details.setReligion(test_data["religion"]);
    reg_basic_details.setMotherTongue(test_data["mothertongue"]);
    reg_basic_details.setCountry(test_data["country"]);
    reg_basic_details.clickSignUp();
    browser.url("http://my.shaadi.com/profile-creation/step/1");


    browser.pause(2000); //Page transition
    reg_loc_mar_comm.setState(test_data["state"]);
    reg_loc_mar_comm.setCity(test_data["city"]);
    reg_loc_mar_comm.setMarriedStatus(test_data["maritialstatus"]);
    reg_loc_mar_comm.setCaste(test_data["caste"]);
    
    reg_loc_mar_comm.clickContinue();

    browser.pause(2000); //Page transition
    reg_education_work.setEducationLevel(test_data["educationlevel"]);
    reg_education_work.setEductionField(test_data["educationfield"]);
    //reg_education_work.setCollege1(test_data["college"]);
    reg_education_work.setWorkingWith(test_data["workwith"]);
    reg_education_work.clickContinue();

    browser.pause(2000); //Page transition
    reg_life_style.setDiet(test_data["diet"]);
    reg_life_style.setHeight(test_data["height"]);
    reg_life_style.setBodyType(test_data["bodytype"]);

    reg_life_style.setSkinTone(test_data["skintone"]);
    reg_life_style.setSmoke(test_data["smoke"]);
    reg_life_style.setDrink(test_data["drink"]);
    
    reg_life_style.clickContinue();

    reg_about.setAboutYourself();
    reg_about.setMobileNumber(test_data["mobile"]);

    browser.pause(5000);
    reg_about.clickCreateProfile();

    //close phone dialog box
    browser
    .waitForElementVisible("//a[@class='ripple_effect']")
    .click("//a[@class='ripple_effect']");

    //photo upload
    browser
    .waitForElementNotVisible("//a[@class='ripple_effect']")
    .click("//a[@id='doThisLaterLink']/div");

    //close phone dialog box
    browser
    .waitForElementVisible("//a[@class='ripple_effect']")
    .click("//a[@class='ripple_effect']");

    /*
    //family
    browser
    .waitForElementVisible("//div[@class='family_wrap']")
    .click("//a[@id='doThisLaterLink']/div");
    */
  

    //click save & continue
    browser
    .waitForElementNotVisible("//a[@class='ripple_effect']")
    .click("//div[@class='btn_wrapper']/a");

    browser.pause();
    
   


  },

  'click  on  - OK  CONNECT': +function(browser) 
  {
    //top matches - Yes
    browser.waitForElementVisible("//a[@id='interestedMultiple']");
    browser.assert.urlContains('registration/profile/top-matches');
    browser.click("//a[@id='interestedMultiple']");

    //payment page verification
    browser
    .waitForElementVisible("//form[@id='frmPayment']")
    .waitForElementPresent("//span[@id='profile_images']")
    .assert.urlContains('payment');
    browser.assert.urlContains("source=onboarding_matches");
  },

  'click  on  - No , show me more matches': (browser) =>
  {
     //top matches - No
     browser.waitForElementVisible("//a[@id='interestedMultiple']");
     browser.assert.urlContains('registration/profile/top-matches');
     browser.click("//span[@id='notInterested']");
 
   
  }
};