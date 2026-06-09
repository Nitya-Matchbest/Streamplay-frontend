/**
 * StreamPlay — Contact & Demo Form Validation
 * Handles all validation, submission and state management
 * for the main request-demo form (#vplayed-request-demo).
 *
 * Dependencies: jQuery, jquery.form.js, Google reCAPTCHA
 * ============================================================
 * Sections:
 *  1.  Input Validators  (email, phone, name, message)
 *  2.  Error Highlighting Helper
 *  3.  reCAPTCHA Setup
 *  4.  Field Focus / Blur Event Bindings
 *  5.  Multi-step Form — Step 1 Validation (emailCheck)
 *  6.  Success State Handler (addClasses)
 *  7.  Form AJAX Submission (#vplayed-request-demo)
 *  8.  Main Validation Gate (validateCheck)
 *  9.  Solution Dropdown Validation
 *  10. Discovery Form Submission (discoverFormSubmit)
 *  11. Phone Number Key Validation
 *  12. Utility: getCookie, removemessage, exitForm
 * ============================================================
 */

'use strict';


/* ============================================================
   1. INPUT VALIDATORS
   Each returns true if the value is valid, false otherwise.
   ============================================================ */

/**
 * Validates a business email address.
 * Rejects common free providers (gmail, yahoo, hotmail, etc.)
 * @param {string} value
 * @returns {boolean}
 */
function validateEmail(value) {
  if ($.trim(value) === '') return false;
  var regex = /^\w+([\.+-]?\w+)*@(?!gmail\.com$|yahoo\.com$|hotmail\.com$|aol\.com$|ymail\.com$|outlook\.com$|gamil\.com$)[\w.-]+\.\w{2,6}$/;
  return regex.test(value);
}

/**
 * Validates a phone number (basic 10-digit format).
 * @param {string} value
 * @returns {boolean}
 */
function validatePhone(value) {
  if ($.trim(value) === '') return false;
  var regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
  return regex.test(value);
}

/**
 * Validates a full name (letters and spaces, 1–30 chars).
 * @param {string} value
 * @returns {boolean}
 */
function validateName(value) {
  if (value === 'Name*')      return false;
  if ($.trim(value) === '')   return false;
  if (isNaN(value) === false) return false;
  var regex = /^[A-Za-z][A-Za-z\ \.]{0,30}$/;
  return regex.test(value);
}

/**
 * Validates a company name (same rules as name).
 * @param {string} value
 * @returns {boolean}
 */
function validateComp(value) {
  if (value === 'Name*')      return false;
  if ($.trim(value) === '')   return false;
  if (isNaN(value) === false) return false;
  var regex = /^[A-Za-z][A-Za-z\ \.]{0,30}$/;
  return regex.test(value);
}

/**
 * Validates a message / description field (non-empty, printable chars).
 * @param {string} value
 * @returns {boolean}
 */
function validateMessage(value) {
  if ($.trim(value) === '')   return false;
  if (isNaN(value) === false) return false;
  return /\w/g.test(value);
}

/**
 * Validates the quote/message textarea (printable chars, any length).
 * @param {string} value
 * @returns {boolean}
 */
function validateQuoteMessage(value) {
  if ($.trim(value) === '')   return false;
  if (isNaN(value) === false) return false;
  var regex = /^[ A-Za-z0-9_!@#$%^&*(),.?":{}|<>]*$/g;
  return regex.test(value);
}


/* ============================================================
   2. ERROR HIGHLIGHTING HELPER
   ============================================================ */

/**
 * Adds the error class to a form field wrapper if not already present.
 * @param {string} selector - jQuery selector e.g. "#div-name"
 */
function addErrorClass(selector) {
  if (!$(selector).hasClass('text-cont-error')) {
    $(selector).addClass('text-cont-error');
  }
}


/* ============================================================
   3. RECAPTCHA SETUP
   Renders reCAPTCHA widgets when the API script is ready.
   ============================================================ */

var CaptchaCallback = function () {
  if ($('#recaptcha-up').length > 0) {
    grecaptcha.render('recaptcha-up', {
      sitekey: '6LeqWJgqAAAAAH6Hac1g8CcWSKJ4YeXUJ9ZME8hF'
    });
  }

  if ($('#recaptcha-down').length > 0) {
    grecaptcha.render('recaptcha-down', {
      sitekey: '6LeqWJgqAAAAAH6Hac1g8CcWSKJ4YeXUJ9ZME8hF'
    });
  }
};


/* ============================================================
   4. FIELD FOCUS / BLUR EVENT BINDINGS
   Clears error state on focus; re-validates on blur.
   ============================================================ */

$(document).ready(function () {

  /* Clear errors on focus */
  $('#txtname').focus(function ()    { $('#div-name').removeClass('text-cont-error'); });
  $('#txtemail').focus(function ()   { $('#div-email').removeClass('text-cont-error'); });
  $('#txtphone').focus(function ()   { $('#div-phone').removeClass('text-cont-error'); });
  $('#txtcompany').focus(function () { $('#div-comp').removeClass('text-cont-error'); });
  $('#message').focus(function ()    { $('#div-message').removeClass('text-cont-error'); });

  /* Re-validate on blur */
  $('#txtname').blur(function () {
    if ($('#txtname').val() === '') addErrorClass('#div-name');
  });

  $('#txtemail').blur(function () {
    if (!validateEmail($('#txtemail').val())) addErrorClass('#div-email');
  });

  $('#txtphone').blur(function () {
    if ($('#txtphone').val() === '') addErrorClass('#div-phone');
  });

  $('#txtcompany').blur(function () {
    if (!validateComp($('#txtcompany').val())) addErrorClass('#div-comp');
  });

  $('#message').blur(function () {
    if (!validateQuoteMessage($('#message').val())) addErrorClass('#div-message');
  });

  $('#solution').blur(function () {
    if ($('#solution').val() == 0) {
      document.getElementById('div-solution').className += ' select-validate';
    }
  });

  /* Allow Enter key to advance to next step */
  $('#txtemail').on('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      emailCheck();
    }
  });

});


/* ============================================================
   5. MULTI-STEP FORM — STEP 1 VALIDATION
   Validates name, email, phone before showing step 2.
   ============================================================ */

/**
 * Validates the first step of the form.
 * Shows step 2 fields if valid, otherwise marks errors.
 */
function emailCheck() {
  if (!validateName($('#txtname').val())) {
    addErrorClass('#div-name');
    return;
  }

  if (!validateEmail($('#txtemail').val())) {
    addErrorClass('#div-email');
    return;
  }

  if ($('#txtphone').val() === '') {
    addErrorClass('#div-phone');
    return;
  }

  /* All step-1 fields valid — reveal step 2 */
  $('#hubspotutk1').val(getCookie('hubspotutk'));
  document.getElementById('hideOnOpen').classList.add('open');
  document.getElementById('closeOnOpen').classList.add('close');
  document.getElementById('hideOnOkay').classList.add('hide');
  document.getElementById('privacyContent').classList.add('hide');
}


/* ============================================================
   6. SUCCESS STATE HANDLER
   Hides the form section and shows the success/thank-you box.
   ============================================================ */

/**
 * Transitions the form to its success state.
 */
function addClasses() {
  var formSection  = document.querySelector('.formSection');
  var successBox   = document.querySelector('.succes-box');
  var closeHeading = document.querySelector('.closeheading');

  if (!formSection || !successBox || !closeHeading) return;

  formSection.classList.add('hide');
  successBox.classList.add('open');
  closeHeading.classList.add('hide');
}


/* ============================================================
   7. FORM AJAX SUBMISSION
   Submits #vplayed-request-demo via jquery.form ajaxForm.
   ============================================================ */

$(document).ready(function () {

  $('#vplayed-request-demo').ajaxForm({

    beforeSubmit: function () {
      var valid = true;

      if (!validateName($('#txtname').val())) {
        addErrorClass('#div-name');
        valid = false;
      }

      if (!validateEmail($('#txtemail').val())) {
        addErrorClass('#div-email');
        valid = false;
      }

      if (!validateComp($('#txtcompany').val())) {
        addErrorClass('#div-comp');
        valid = false;
      }

      if ($('#txtphone').val() === '') {
        addErrorClass('#div-phone');
        valid = false;
      }

      if (!validateQuoteMessage($('#message').val())) {
        addErrorClass('#div-message');
        valid = false;
      }

      /* reCAPTCHA check */
      if (grecaptcha.getResponse() === '') {
        $('#contact_error').css('display', 'block');
        $('#ajx-loader').css('display', 'none');
        valid = false;
      } else {
        $('#contact_error').css('display', 'none');
      }

      /* Solution dropdown check */
      if ($('#solution').val() == 0) {
        $('#solution').addClass('text-cont-error-select');
        $('#div-solution').addClass('select-validate');
        valid = false;
      }

      if (valid) {
        document.getElementById('ads-submit-button').innerHTML = 'Contacting...';
        $('#ajx-loader').css('display', 'block');
      }

      return valid;
    },

    success: function (response) {
      if (response == 1) {
        addClasses();
      } else if (response == 2) {
        $('#contact_error').css('display', 'block').text('An Error Occured. Please Try Again.');
        $('#ajx-loader').css('display', 'none');
        $('#contact-submit-btn').removeAttr('disabled');
      } else if (response == 5) {
        $('#contact_error').css('display', 'block');
        $('#contact-submit-btn').removeAttr('disabled');
        $('#ajx-loader').css('display', 'none');
        $('#contact_error').fadeOut(7000);
      }
    }

  });

});


/* ============================================================
   8. MAIN VALIDATION GATE (validateCheck)
   Called on the submit button click. Validates all fields,
   checks reCAPTCHA, then triggers the form if valid.
   ============================================================ */

/**
 * Validates the full form before allowing submission.
 * Scrolls to first error if invalid.
 */
function validateCheck() {
  var captchaResponse = grecaptcha.getResponse();

  /* Sync country hidden field */
  $('#country').val($('#geocountry option:selected').text());

  var nameValid    = validateName($('#txtname').val());
  var emailValid   = validateEmail($('#txtemail').val());
  var phoneValid   = $('#txtphone').val() !== '';
  var messageValid = $('#message').val() !== '';
  var captchaValid = captchaResponse !== '';

  /* If any field invalid — trigger form to surface errors then scroll */
  if (!nameValid || !emailValid || !phoneValid || !messageValid) {
    var submitBtn = document.getElementById('button-submit');
    submitBtn.className += ' validate-button';
    submitBtn.setAttribute('type', 'button');
    $('#vplayed-request-demo').trigger('submit');
    $('html, body').animate({ scrollTop: $('#vplayed-request-demo').position().top }, 'slow');
    return;
  }

  /* reCAPTCHA */
  if (!captchaValid) {
    $('#contact_error').css('display', 'block');
    $('#ajx-loader').css('display', 'none');
    return;
  }

  /* All valid — populate hidden fields and submit */
  $('#contact_error').css('display', 'none');

  $('.popup-name').val($('#txtname').val());
  $('.popup-email').val($('#txtemail').val());
  $('#txtname-discover').val($('#txtname').val());
  $('#txtphone-discover').val($('#txtphone').val());
  $('#displaycode-discover').val($('#displayDialCode').val());
  $('#txtemail-discover').val($('#txtemail').val());
  $('#country-discover').val($('#country').val());
  $('#geocountry-discover').val($('#geocountry').val());
  $('#txtcompany-discover').val($('#txtcompany').val());
  $('#solution-discover').val($('#solution').val());
  $('#message-discover').val($('#message').val());
  $('#popup-title').text('Thank You ' + $('#txtname').val());

  document.getElementById('div-country').style.display    = 'inline-block';
  document.getElementById('div-geocountry').style.display = 'none';
  $('#country').val($('#geocountry option:selected').text());

  document.getElementById('ads-submit-button').innerHTML = 'Contacting...';
  $('#ajx-loader').css('display', 'block');

  var submitBtn = document.getElementById('button-submit');
  submitBtn.className += ' validate-button';
  submitBtn.setAttribute('type', 'submit');
}

/**
 * Called when reCAPTCHA is completed — hides error message.
 */
function recaptcha_callback() {
  if (grecaptcha.getResponse() !== '') {
    $('#contact_error').css('display', 'none');
  }
}

/**
 * Called on form submit button click — entry point.
 */
function formSubmit() {
  validateCheck();

  if (grecaptcha.getResponse() === '') {
    $('#contact_error').css('display', 'block');
  } else {
    $('#contact_error').css('display', 'none');
  }
}

function handleValidation() {
  /* Reserved for future validation hooks */
}


/* ============================================================
   9. SOLUTION DROPDOWN VALIDATION
   ============================================================ */

$('#solution').on('change', function () {
  var wrapper = document.getElementById('div-solution');
  if ($('#solution').val() == 0) {
    wrapper.className += ' select-validate';
  } else {
    wrapper.classList.remove('select-validate');
  }
});


/* ============================================================
   10. DISCOVERY FORM SUBMISSION
   Multi-radio questionnaire form (#discover-submit-button).
   Validates all radio groups before enabling submit.
   ============================================================ */

/**
 * @param {HTMLFormElement} form - The discovery form element.
 */
function discoverFormSubmit(form) {
  var fields = {
    appl:        $('input[name="Streaming Type Discovery"]:checked').length > 0,
    livestream:  $('input[name="Content Category Discovery"]:checked').length > 0,
    comm:        $('input[name="Users Count Discovery"]:checked').length > 0,
    apply:       $('input[name="Monetization Model Discovery"]:checked').length > 0,
    plat:        $('input[name="VPlayed Hire Discovery"]:checked').length > 0,
    development: $('input[name="Launch Duration Discovery"]:checked').length > 0,
    tech:        $('input[name="Content Volume Discovery"]:checked').length > 0,
    techie:      $('input[name="calling period"]:checked').length > 0
  };

  var allValid = Object.keys(fields).every(function (key) { return fields[key]; });

  if (allValid) {
    document.getElementById('discover-submit-button').innerHTML = 'Submitting...';
    $('#discover-load').addClass('validate-button');
    window.onbeforeunload = false;
    document.getElementById('discover-submit-button').setAttribute('type', 'submit');
    return;
  }

  /* Mark invalid sections */
  fields.appl        ? $('#streamingtype').removeClass('discover-message')           : $('#streamingtype').addClass('discover-message');
  fields.livestream   ? $('#contentcategory').removeClass('discover-message')         : $('#contentcategory').addClass('discover-message');
  fields.comm        ? $('#userscount').removeClass('discover-message')              : $('#userscount').addClass('discover-message');
  fields.apply       ? $('#monetization_model_discovery').removeClass('discover-message') : $('#monetization_model_discovery').addClass('discover-message');
  fields.plat        ? $('#vplayedteam').removeClass('discover-message')             : $('#vplayedteam').addClass('discover-message');
  fields.development ? $('#launchduration').removeClass('discover-message')          : $('#launchduration').addClass('discover-message');
  fields.tech        ? $('#contentvolume-li').removeClass('discover-message')        : $('#contentvolume-li').addClass('discover-message');
  fields.techie      ? $('#contentvolume-lio').removeClass('discover-message')       : $('#contentvolume-lio').addClass('discover-message');

  jQuery('.discovery-popup').animate({
    scrollTop: jQuery('#discovery-top').position().top
  }, 'slow');
}


/* ============================================================
   11. PHONE NUMBER KEY VALIDATION
   Prevents non-numeric characters in phone fields.
   ============================================================ */

$(document).ready(function () {
  $(document).on('keypress', '.phone', function (e) {
    /* Allow: backspace (8), delete (46), and digits (48-57) */
    if (e.which !== 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) {
      return false;
    }
  });
});

/**
 * Validates phone input for paste and drop events.
 * @param {Event} ev - keydown, paste, or drop event
 * @returns {boolean}
 */
function validateNumber(ev) {
  if (ev.type === 'paste' || ev.type === 'drop') {
    var text = (ev.type === 'paste' ? ev.clipboardData : ev.dataTransfer).getData('text');
    return !isNaN(text) && text.indexOf('.') === -1;
  }

  if (ev.type === 'keydown') {
    if (ev.ctrlKey || ev.metaKey) return true;
    var allowed = [187, 8, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
    return allowed.indexOf(ev.keyCode) > -1;
  }

  return true;
}


/* ============================================================
   12. UTILITIES
   ============================================================ */

/**
 * Reads a cookie value by name.
 * @param {string} name
 * @returns {string|undefined}
 */
function getCookie(name) {
  var value = '; ' + document.cookie;
  var parts = value.split('; ' + name + '=');
  if (parts.length === 2) return parts.pop().split(';').shift();
}

/**
 * Removes the discover-message error class from a field.
 * Clears all pending timeouts to prevent race conditions.
 * @param {string} id - Element ID without '#'
 */
function removemessage(id) {
  /* Clear all timeouts to prevent stale error states */
  for (var i = 0; i < 100000; i++) clearTimeout(i);
  $('#' + id).removeClass('discover-message');
}

/**
 * Fallback: force-submits and redirects to acknowledgment page.
 * Used if the normal success flow fails to redirect.
 */
function exitForm() {
  var submitBtn = document.getElementById('button-submit');
  submitBtn.className += ' validate-button';
  $('#vplayed-request-demo')
    .attr('action', '/includes/popup_mailus.php?mail_type=discover_us')
    .submit();
  window.location.href = 'https://www.vplayed.com/acknowledgment.php';
}

function ispositive(val) {
  return val;
}
