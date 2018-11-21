var jusPayEventObject = {};
var creditDebitForm = Juspay.Setup({
  payment_form: '#juspay_form',
  success_handler: function(status) {},
  error_handler: function(error_code, error_message, bank_error_code, bank_error_message, gateway_id) {},
  iframe_elements: {
    card_number: {
      /* Class name of the <div> which will hold the iframe element for card number. */
      container: ".card_number_div",
      attributes: {
        placeholder: ""
      }
    },
    card_exp_month: {
      /* Class name of the <div> which will hold the iframe element for card expiry month. */
      container: ".card_exp_month_div",
      attributes: {
        placeholder: "MM"
      }
    },
    card_exp_year: {
      /* Class name of the <div> which will hold the iframe element for card expiry year. */
      container: ".card_exp_year_div",
      attributes: {
        placeholder: "YY"
      }
    },
    security_code: {
      /* Class name of the <div> which will hold the iframe element for card security code. */
      container: ".security_code_div",
      attributes: {
        placeholder: ""
      }
    },
    name_on_card: {
      /* Class name of the <div> which will hold the iframe element for card holder name. */
      container: ".name_on_card_div",
      attributes: {
        placeholder: ""
      }
    },
  },
  /* Set `auto_tab_enabled` flag to true if you want to enable auto-switching between fields when user types the valid data,
   * which will have the following order:
   * `card_exp_month` -> `card_exp_year` -> `security_code`.
   * Note: You can ignore `auto_tab_enabled` field if auto-switching between fields isn't required.
   */
  auto_tab_enabled: true,
  /* Set `auto_tab_from_card_number` to either `card_exp_month` or `name_on_card` based on which field is rendered next after card_number.
   * Note 1: Please set `auto_tab_enabled` to `true` as shown above to enable this functionality.
   * Note 2: You can ignore `auto_tab_from_card_number` field if this functionality isn't required.
   */
  auto_tab_from_card_number: "card_exp_month",
  auto_tab_from_security_code: "name_on_card",
  styles: {
    /* Add common styling for all input fields here */
    "html, body": {
      "height": "50px",
    },
    "input": {
      "box-sizing": "border-box",
      "height": "34px",
      "color": "#51505d",
      "border-image": "initial",
      "outline": "none",
      "font": "300 14px Roboto, sans-serif",
      "background-color": "white",
      "user-select": "text",
    },
    ".card_number_iframe": {
      "line-height": "10px",
      "font-size": "16px"
    },
    /* Add the styling for card number input field here */
    ".card_number_div": {
      "height": "150px",
      "font-size": "14px"
    },
    /* Add the styling for card holder name input field here */
    ".name_on_card": {
      "line-height": "20px",
      "font-size": "14px",
    },
    /* Add the styling for card expiry month input field here */
    ".card_exp_month": {
      "line-height": "30px",
      "font-size": "14px",
      "width": "80px"
    },
    /* Add the styling for card expiry year input field here */
    ".card_exp_year": {
      "line-height": "30px",
      "font-size": "14px",
      "width": "60px"
    },
    /* Add the styling for card security code input field here */
    ".security_code": {
      "line-height": "30px",
      "font-size": "16px",
      "width": "60px"
    },
    /* Add the styling to be added to input fields in focus state */
    ":focus": {
      "outline": 0,
    }
  },
  /* 
   * This function will be called with an event object as parameter in two cases:
   * 1. When some event occurs on the input field inside iframe element.
   * 2. The user clicks on the submit button and the values in some of the input fields are invalid. (In second case, we will send the event object with state of the first invalid field in checkout form.)
   *
   * This event object will contain the state of the input field. You should use this event object to show validation messages in your checkout form.
   *
   */
  iframe_element_callback: function(event) {
    jusPayEventObject = event;    
    /*
     *  The following information will be available in the event object:
     *  1. event.target_element - (card_number/name_on_card/card_exp_month/card_exp_year/security_code) Name of the field field which generated this event.
     *
     *  2. event.type - (focus/blur/keyup/change) This field explains the event type which triggered the event callback.
     *
     *  3. event.valid - (true/false) This explains whether the value inside the input field of target_element is valid or not.
     *
     *  4. event.empty - (true/false) This explains whether the input field of target_element is empty or not.
     *
     *  5. event.card_isin - ISIN valud of the card number (Available only when target_element is card_number)
     *
     *  6. event.card_brand - MASTERCARD/VISA/MAESTRO/AMEX/DINERS/DISCOVER/JCB/RUPAY (Available only when target_element is card_number)
     * 
     *  7. event.card_type - (DEBIT/CREDIT) (Available only when target_element is card_number)
     *      
     *  8. event.partially_valid - This explains whether the user is typing the card number correctly. (Available only when target_element is card_number)
     *      
     *  9. event.expiry_valid - This explains whether the combination of month or year is valid or not. There may be a case when the input year is current year and the input month is any month before current month, then you will get valid=true for both month and year separately, but together they are not valid. To keep such cases in mind, you need to validaate whether expiry_valid is true or not. (Available only when target_element is either card_exp_month or card_exp_year)
     *
     * 10. event.atm_pin_auth_support - This explains whether the card number entered is valid for ATM PIN transactions. Please note that this field will be set only if your merchant account supports ATM PIN transactions.
     */
  }
})