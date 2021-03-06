
class Deleted
{
  constructor(_browser)
  {
    this.browser = _browser;
  }

  selectFilter(item_to_check)
  {
    let selector = "";
    if(item_to_check == "All") selector = "//input[@id='custom-All']";
    else if (item_to_check == "Cancelled by me") selector = "//input[@id='custom-Cancelled by me']";
    else if (item_to_check == "Cancelled by him") selector = "//input[@id='custom-Cancelled by him']";
    else if (item_to_check == "Cancelled by her") selector = "//input[@id='custom-Cancelled by her']";
    else
    selector = "//input[@id='custom-Cancelled by undefined']";

    this.browser
    .waitForElementVisible(selector)
    .click(selector);

    this.browser
    .waitForElementNotPresent("//input[@id='custom-All' and @disabled]");
  }

  usePagination(navigator)
  {
    let selector = "";
    if(navigator == "Next") selector = "//button[contains(text(),'Next')]";
    if(navigator == "Prev") selector = "//button[contains(text()='Prev')]";

    this.browser
    .waitForElementVisible(selector)
    .click(selector);
  }
}
module.exports = Deleted;