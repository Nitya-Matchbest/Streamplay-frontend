/**
 * StreamPlay - Main JavaScript
 * Consolidated from inline scripts in index.html
 * ============================================================
 * Sections:
 *  1.  Lazy Image / Video Loader (IntersectionObserver)
 *  2.  Feature Card Highlight Rotator
 *  3.  Hover Item (Location) Tabs
 *  4.  Header Navigation (dropdowns + hamburger)
 *  5.  Back-to-Top Button
 *  6.  Footer Accordion (mobile)
 *  7.  Floating CTA Show/Hide on Scroll
 *  8.  Fixed CTA Show/Hide on Scroll
 *  9.  Scroll CTA Button Show/Hide
 *  10. Tab Switcher with Active Line
 *  11. Accordion (FAQ)
 *  12. In-Viewport Animation Trigger
 *  13. Cookie Utilities
 *  14. Cookie Banner Logic
 *  15. Mobile Popup (deposit)
 *  16. Popup Modal (open/close)
 *  17. Form Utilities (country select, phone validation)
 *  18. Demo Popup Form (show/hide)
 *  19. HubSpot Form Validation (textarea min-length)
 *  20. Load Script Helper
 * ============================================================
 */

'use strict';

/* ============================================================
   1. LAZY IMAGE / VIDEO LOADER
   Uses IntersectionObserver to load [data-src] elements
   only when they enter the viewport.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  var lazyElements = document.querySelectorAll('[data-src]');

  /**
   * Loads the actual src/backgroundImage for a lazy element.
   * @param {Element} el
   */
  function loadLazyElement(el) {
    var src = el.getAttribute('data-src');
    if (!src) return;

    if (el.tagName === 'IMG' || el.tagName === 'VIDEO') {
      el.src = src;
    } else {
      el.style.backgroundImage = 'url(' + src + ')';
    }
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        loadLazyElement(entry.target);
        obs.unobserve(entry.target);
      });
    });

    lazyElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    /* Fallback: load all immediately for older browsers */
    lazyElements.forEach(loadLazyElement);
  }

  /* Remove responsive placeholder elements based on viewport */
  var isMobile = window.matchMedia('(max-width: 768px)').matches;
  var removeDesktop = document.getElementById('remove768');
  var removeDesktopAlt = document.getElementById('added768');

  if (isMobile) {
    if (removeDesktop) removeDesktop.remove();
    /* Also remove elements with class .rm768 */
    document.querySelectorAll('.rm768').forEach(function (el) { el.remove(); });
  } else {
    if (removeDesktopAlt) removeDesktopAlt.remove();
    document.querySelectorAll('.add768').forEach(function (el) { el.remove(); });
    /* Remove mobile popup on desktop */
    var mobilePopup = document.getElementById('mobile_popup');
    if (mobilePopup) mobilePopup.remove();
  }
});


/* ============================================================
   2. FEATURE CARD HIGHLIGHT ROTATOR
   Cycles a "highlight" class across elements #element1..6
   every 3 seconds.
   ============================================================ */

(function () {
  var INTERVAL_MS = 3000;
  var HIGHLIGHT_CLASS = 'highlight';
  var TOTAL_ELEMENTS = 6;

  function addClassToElement(id, cls) {
    var el = document.getElementById(id);
    if (el) el.classList.add(cls);
  }

  function removeClassFromElement(id, cls) {
    var el = document.getElementById(id);
    if (el) el.classList.remove(cls);
  }

  function startHighlightCycle() {
    var previousId = null;

    for (var i = 1; i <= TOTAL_ELEMENTS; i++) {
      (function (index) {
        setTimeout(function () {
          if (previousId) removeClassFromElement(previousId, HIGHLIGHT_CLASS);
          var currentId = 'element' + index;
          addClassToElement(currentId, HIGHLIGHT_CLASS);
          previousId = currentId;
        }, index * INTERVAL_MS);
      })(i);
    }
  }

  startHighlightCycle();
})();


/* ============================================================
   3. HOVER ITEM TABS
   Restores "active" class to first item when no item is hovered.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  var locationItems = document.querySelectorAll('.hover-item');
  if (!locationItems.length) return;

  var firstItem = locationItems[0];

  locationItems.forEach(function (item) {
    item.addEventListener('mouseenter', function () {
      firstItem.classList.remove('active');
    });

    item.addEventListener('mouseleave', function () {
      /* Only restore if nothing else is hovered */
      if (!document.querySelector('.hover-item:hover')) {
        firstItem.classList.add('active');
      }
    });
  });
});


/* ============================================================
   4. HEADER NAVIGATION
   Handles dropdown menus and hamburger toggle.
   ============================================================ */

(function () {
  /* Dropdown menus - toggle on click (mobile) */
  var dropMenus = document.getElementsByClassName('dropmenu-new');

  for (var i = 0; i < dropMenus.length; i++) {
    dropMenus[i].addEventListener('click', function () {
      if (this.classList.contains('dropmenu-active')) {
        this.classList.remove('dropmenu-active');
      } else {
        /* Close all other open dropdowns first */
        for (var j = 0; j < dropMenus.length; j++) {
          dropMenus[j].classList.remove('dropmenu-active');
        }
        this.classList.add('dropmenu-active');
      }
    });
  }

  /* Hamburger toggle */
  var ham = document.getElementById('ham');
  if (ham) {
    ham.addEventListener('click', function () {
      var nav = document.getElementById('nav');
      if (nav) nav.classList.toggle('nav-active');
      ham.classList.toggle('ham-toggle');
    });
  }
})();


/* ============================================================
   5. BACK-TO-TOP BUTTON
   Shows button after scrolling 300px, smooth-scrolls on click.
   ============================================================ */

(function () {
  var backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', function () {
    backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });

  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ============================================================
   6. FOOTER ACCORDION (Mobile only)
   Opens/closes footer sub-menu sections on mobile.
   ============================================================ */

function openfooterTab(event, submenuId) {
  if (!window.matchMedia('(max-width: 767px)').matches) return;

  /* Close all submenu sections */
  var submenus = document.getElementsByClassName('footer-submenu');
  for (var i = 0; i < submenus.length; i++) {
    submenus[i].style.display = 'none';
  }

  /* Remove active class from all headers */
  var heads = document.getElementsByClassName('footer-head');
  for (var j = 0; j < heads.length; j++) {
    heads[j].className = heads[j].className.replace(' active', '');
  }

  /* Open the clicked submenu */
  var target = document.getElementById(submenuId);
  if (target) target.style.display = 'block';
  event.currentTarget.className += ' active';
}


/* ============================================================
   7. FLOATING CTA SHOW/HIDE ON SCROLL
   Adds "show" class after 110px scroll.
   ============================================================ */

window.addEventListener('scroll', function () {
  var scroll = window.pageYOffset || document.documentElement.scrollTop || 0;
  var floatingCta = document.querySelector('.floating-cta');
  if (!floatingCta) return;

  if (scroll >= 110) {
    floatingCta.classList.add('show');
  } else {
    floatingCta.classList.remove('show');
  }
});


/* ============================================================
   8. FIXED CTA SHOW/HIDE ON SCROLL
   ============================================================ */

window.addEventListener('scroll', function () {
  var scroll = window.pageYOffset || document.documentElement.scrollTop || 0;
  var fixedCta = document.querySelector('.fixed-cta');
  if (!fixedCta) return;

  if (scroll >= 110) {
    fixedCta.classList.add('show');
  } else {
    fixedCta.classList.remove('show');
  }
});


/* ============================================================
   9. SCROLL CTA BUTTON SHOW/HIDE
   Shows the side-tab CTA after 600px scroll.
   ============================================================ */

window.addEventListener('scroll', function () {
  var scrollBtn = document.getElementById('scrollButton');
  if (!scrollBtn) return;

  if (window.scrollY >= 600) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
});


/* ============================================================
   10. TAB SWITCHER WITH ANIMATED ACTIVE LINE
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
  var tabs = document.querySelectorAll('.tabss li');
  var tabContents = document.querySelectorAll('.tab-vsv');
  var activeLine = document.querySelector('.active-lines');

  if (!tabs.length || !activeLine) return;

  function updateActiveLine(tab) {
    activeLine.style.width = tab.offsetWidth + 'px';
    activeLine.style.left  = tab.offsetLeft + 'px';
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      /* Deactivate all */
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tabContents.forEach(function (c) { c.style.display = 'none'; });

      /* Activate clicked */
      tab.classList.add('active');
      var content = document.querySelector('#' + tab.dataset.tab);
      if (content) content.style.display = 'block';
      updateActiveLine(tab);
    });
  });

  /* Default: activate first tab */
  if (tabs[0]) {
    tabs[0].classList.add('active');
    if (tabContents[0]) tabContents[0].style.display = 'block';
    updateActiveLine(tabs[0]);
  }
});


/* ============================================================
   11. FAQ ACCORDION
   Toggles "open" class on parent .accordion-slide.
   ============================================================ */

(function () {
  var accordions = document.getElementsByClassName('accordion');

  for (var i = 0; i < accordions.length; i++) {
    accordions[i].addEventListener('click', function () {
      this.parentElement.classList.toggle('open');
    });
  }
})();


/* ============================================================
   12. IN-VIEWPORT ANIMATION TRIGGER
   Adds "section-animated" to elements with class "boxsection"
   when they scroll into view.
   ============================================================ */

(function () {
  function checkInViewport(className) {
    var elements   = document.getElementsByClassName(className);
    var winHeight  = window.innerHeight;

    function check() {
      for (var i = 0; i < elements.length; i++) {
        var top    = elements[i].getBoundingClientRect().top;
        var offset = top + 250;

        if (offset < winHeight) {
          elements[i].classList.add('section-animated');
        } else {
          elements[i].classList.remove('section-animated');
        }
      }
    }

    check();
    window.addEventListener('scroll', check);
  }

  checkInViewport('boxsection');
})();


/* ============================================================
   13. COOKIE UTILITIES
   ============================================================ */

/**
 * Set a cookie with optional expiry in days.
 * @param {string} name
 * @param {string} value
 * @param {number} [days]
 */
function setCookies(name, value, days) {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (24 * days * 60 * 60 * 1000));
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

/**
 * Get a cookie value by name.
 * @param {string} name
 * @returns {string}
 */
function getCookies(name) {
  var nameEq = name + '=';
  var parts  = document.cookie.split(';');

  for (var i = 0; i < parts.length; i++) {
    var part = parts[i].trim();
    if (part.indexOf(nameEq) === 0) {
      return part.substring(nameEq.length);
    }
  }
  return '';
}

/**
 * Get a cookie value (alternate implementation used in some places).
 * @param {string} name
 * @returns {string|undefined}
 */
function getCookie(name) {
  var value = '; ' + document.cookie;
  var parts = value.split('; ' + name + '=');
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
}

/**
 * Accept cookies - hide the banner and set a long-lived cookie.
 */
function setCookie() {
  var banner = document.getElementById('cookies');
  if (banner) banner.style.display = 'none';

  var expires = '';
  var date    = new Date();
  date.setTime(date.getTime() + 3888000000);
  expires = '; expires=' + date.toUTCString();
  document.cookie = 'usercookies=cookies-test' + expires + '; path=/';
}


/* ============================================================
   14. COOKIE BANNER LOGIC
   Shows banner after 15s delay; hides if already accepted.
   ============================================================ */

(function () {
  /* Show cookie banner after 15 seconds */
  function showCookieBanner() {
    var banner = document.getElementById('cookies');
    if (banner) banner.style.display = 'flex';
  }

  setTimeout(showCookieBanner, 15000);

  /* Hide immediately if already accepted */
  if (getCookie('usercookies')) {
    var banner = document.getElementById('cookies');
    if (banner) banner.style.display = 'none';
  }
})();


/* ============================================================
   15. MOBILE POPUP (Deposit / slide-up)
   Shows after 20 seconds on mobile only.
   ============================================================ */

(function () {
  if (window.innerWidth >= 768) return;

  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
      var popup = document.getElementById('popup-deposit');
      if (popup) popup.style.display = 'block';
    }, 20000);
  });
})();

/**
 * Remove the mobile slide-up popup.
 */
function removePopUp() {
  var popup = document.getElementById('popup-deposit');
  if (popup) popup.remove();

  /* Show cookie banner after removal */
  setTimeout(function () {
    var banner = document.getElementById('cookies');
    if (banner) banner.style.bottom = '0';
  }, 20000);
}


/* ============================================================
   16. POPUP MODAL (Open / Close)
   ============================================================ */

/* Close overlay via close button */
(function () {
  var closeBtn = document.getElementById('ButtonClose');
  var myDiv    = document.getElementById('myDiv');

  if (myDiv) {
    /* Keep hidden on load - users go to /contact.html */
    myDiv.style.display = 'none';
  }

  if (closeBtn && myDiv) {
    closeBtn.onclick = function () {
      myDiv.style.display = 'none';
    };
  }
})();

/**
 * Open the popup overlay.
 */
function showPopUpForm() {
  var el = document.getElementById('new-demo-popup');
  if (!el) return;
  el.style.cssText = 'display:flex !important; visibility:visible !important; opacity:1 !important;';
  document.body.style.overflow = 'hidden';
}

/**
 * Close the popup overlay.
 */
function removePopUpForm() {
  var el = document.getElementById('new-demo-popup');
  if (!el) return;
  el.style.cssText = 'display:none !important;';
  document.body.style.overflow = '';
}

/* jQuery-based popup (model-popup) */
$(document).ready(function () {
  /* Open */
  $('.popup').click(function () {
    $('.model-popup').addClass('open zoomIn');
    $('.model-overlay').addClass('open-overlay zoomIn');
    $('body').addClass('model-opens');
  });

  /* Close */
  $('.model-header svg').click(function () {
    $('.model-popup').removeClass('open zoomIn');
    $('.model-overlay').removeClass('open-overlay zoomIn');
    $('body').removeClass('model-opens');
  });
});

/**
 * Called on demo form submit to add relative class to menu.
 */
function formSubmit() {
  $('#streamplay-menu').addClass('relative');
}


/* ============================================================
   17. FORM UTILITIES
   Country select sync, phone validation, solution select.
   ============================================================ */

$(document).ready(function () {

  /* Sync geocountry dropdown to hidden country field */
  $('#geocountry').on('change', function () {
    $('#country').val($('#geocountry option:selected').text());
  });

  /* Solution dropdown validation */
  $('#solution').on('change focus', function () {
    if ($('#solution').val() == 0) {
      $('#solution').addClass('text-cont-error-select');
    } else {
      $('#solution').removeClass('text-cont-error-select');
    }
  });

  $('#solution').on('blur', function () {
    if ($('#solution').val() == 0) {
      $('#solution').addClass('text-cont-error-select');
    }
  });

  /* Allow numbers only in phone fields */
  $(document).on('keypress', '.phone', function (e) {
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
      return false;
    }
  });

  /* Fix menu position on narrow screens */
  if ($(window).width() < 768) {
    $('#streamplay-menu').css('position', 'fixed');
    $('#contact4').css('margin-top', '105px');
  }

  /* Floating scroll sync - show on 110px scroll */
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 110) {
      $('.floating-cta').addClass('show');
    } else {
      $('.floating-cta').removeClass('show');
    }
  });
});


/* ============================================================
   18. GEO IP - AUTO-DETECT COUNTRY FOR PHONE INPUT
   Fetches user country code and initialises intl-tel-input.
   ============================================================ */

$(document).ready(function () {
  var countryCode = '';

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pro.ip-api.com/json/?key=93k3yVvLrwSRim6', true);

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        var data = JSON.parse(xhr.responseText);
        if (data && data.countryCode) {
          countryCode = data.countryCode;
          initializeIntlTelInput(countryCode);
        }
      } catch (e) {
        console.warn('Geo IP parse error:', e);
      }
    } else {
      console.warn('Geo IP request failed:', xhr.status);
    }
  };

  xhr.onerror = function () {
    console.warn('Geo IP request error');
  };

  xhr.send();

  function initializeIntlTelInput(code) {
    $('#txtphone').intlTelInput({
      autoHideDialCode:  true,
      autoPlaceholder:   'ON',
      dropdownContainer: document.body,
      formatOnDisplay:   true,
      initialCountry:    code,
      placeholderNumberType: 'MOBILE',
      preferredCountries: ['us', 'gb', 'in'],
      separateDialCode:  true
    });

    $('#geocountry').val(code);
    $('#country').val($('#geocountry option:selected').text());
    $('#ipcountry').val($('#geocountry option:selected').text());

    /* Update dial code display on country change */
    $(document).on('countrychange', '#txtphone', function () {
      var dialCode = $(this).intlTelInput('getSelectedCountryData').dialCode;
      $('#displayDialCode').val(dialCode);
    });

    /* Set initial dial code display */
    var selectedDialCode = document.querySelector('.selected-dial-code');
    if (selectedDialCode) {
      document.getElementById('displayDialCode').value = selectedDialCode.innerHTML;
    }
  }
});


/* ============================================================
   19. HUBSPOT FORM VALIDATION
   Enforces minimum 15 character textarea before allow submit.
   ============================================================ */

window.addEventListener('message', function (event) {
  if (event.data.type !== 'hsFormCallback') return;
  if (event.data.eventName !== 'onFormReady') return;

  var form = document.getElementById('hsForm_1cd753b6-88d4-404d-90ba-4cfc260669b1');
  if (!form) return;

  var interval = setInterval(function () {
    var textarea  = form.querySelector('textarea');
    var submitBtn = form.querySelector('input.hs-button[type="submit"]');

    if (!textarea || !submitBtn) return;

    /* Create error message element if not present */
    var errorMsg = form.querySelector('.char-error-msg');
    if (!errorMsg) {
      errorMsg = document.createElement('div');
      errorMsg.textContent    = 'Please enter at least 15 characters.';
      errorMsg.className      = 'char-error-msg';
      errorMsg.style.color    = 'red';
      errorMsg.style.fontSize = '13px';
      errorMsg.style.marginTop = '5px';
      errorMsg.style.display  = 'none';
      textarea.parentNode.appendChild(errorMsg);
    }

    /* Disable submit by default */
    submitBtn.disabled = true;

    function validateTextarea() {
      var trimmed = textarea.value.trim();
      var isValid = trimmed.length >= 15;

      submitBtn.disabled    = !isValid;
      errorMsg.style.display = (isValid || trimmed.length === 0) ? 'none' : 'block';
      return isValid;
    }

    textarea.addEventListener('input', validateTextarea);
    textarea.addEventListener('blur',  validateTextarea);
    validateTextarea();

    clearInterval(interval);
  }, 200);
});


/* ============================================================
   20. LOAD SCRIPT HELPER
   Dynamically loads a script by URL or evaluates inline code.
   ============================================================ */

/**
 * Loads a script dynamically.
 * @param {string|null} code   - Inline JS code to evaluate, or null.
 * @param {string|null} url    - External script URL to load, or null.
 * @param {Function}    [callback] - Called after load/eval.
 */
function loadScript(code, url, callback) {
  if (code) {
    try {
      // eslint-disable-next-line no-eval
      eval(code);
    } catch (e) {
      console.error('loadScript eval error:', e);
    }
    if (callback) callback();
    return;
  }

  if (url) {
    var script  = document.createElement('script');
    script.src  = url;
    script.async = true;
    script.onload = function () {
      if (callback) callback();
    };
    document.head.appendChild(script);
  }
}

/* ============================================================
   21. MOBILE MONETIZATION CAROUSEL DOTS
   Handles scroll snapping dots indicator.
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  var container = document.querySelector('.player-container.mixed-bg');
  if (!container) return;

  var cards = container.querySelectorAll('.player-wrapper');
  if (cards.length === 0) return;

  // Create dots container
  var dotsContainer = document.createElement('div');
  dotsContainer.className = 'carousel-dots';
  dotsContainer.style.display = 'none'; // Hidden on desktop by default
  container.parentNode.insertBefore(dotsContainer, container.nextSibling);

  var dots = [];
  cards.forEach(function (card, index) {
    var dot = document.createElement('span');
    dot.className = 'dot' + (index === 0 ? ' active' : '');
    dotsContainer.appendChild(dot);
    dots.push(dot);

    // Click to scroll to card
    dot.addEventListener('click', function () {
      var cardWidth = card.offsetWidth;
      var gap = 16;
      var scrollLeft = index * (cardWidth + gap);
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    });
  });

  // Fallback active dot detection if IntersectionObserver is not supported
  function updateActiveDotScroll() {
    var scrollLeft = container.scrollLeft;
    var cardWidth = cards[0].offsetWidth;
    var gap = 16;
    var activeIndex = Math.round(scrollLeft / (cardWidth + gap));
    activeIndex = Math.max(0, Math.min(activeIndex, cards.length - 1));

    dots.forEach(function (dot, index) {
      dot.classList.toggle('active', index === activeIndex);
    });
  }

  // Use IntersectionObserver for perfect detection of active snap item
  if ('IntersectionObserver' in window) {
    var observerOptions = {
      root: container,
      threshold: 0.6
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var cardIndex = Array.prototype.indexOf.call(cards, entry.target);
          if (cardIndex !== -1) {
            dots.forEach(function (dot, idx) {
              dot.classList.toggle('active', idx === cardIndex);
            });
          }
        }
      });
    }, observerOptions);

    cards.forEach(function (card) {
      observer.observe(card);
    });
  } else {
    container.addEventListener('scroll', updateActiveDotScroll);
  }
});

/* ============================================================
   22. MOBILE PLATFORM OWNERSHIP CAROUSEL & COVERFLOW EFFECT
   Handles scroll snapping, dots, and active card animations
   for the Complete Platform Ownership section.
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  var container = document.querySelector('.player-container.boxsection.light');
  if (!container) return;

  var cards = container.querySelectorAll('.player-wrapper.box');
  if (cards.length === 0) return;

  // Create dots container
  var dotsContainer = document.createElement('div');
  dotsContainer.className = 'carousel-dots ownership-dots';
  dotsContainer.style.display = 'none'; // CSS shows it on mobile via .ownership-dots
  container.parentNode.insertBefore(dotsContainer, container.nextSibling);


  var dots = [];
  cards.forEach(function (card, index) {
    var dot = document.createElement('span');
    dot.className = 'dot' + (index === 0 ? ' active' : '');
    dotsContainer.appendChild(dot);
    dots.push(dot);

    // Click to scroll to card
    dot.addEventListener('click', function () {
      var cardWidth = card.offsetWidth;
      var gap = 20; // gap + margins
      var scrollLeft = index * (cardWidth + gap);
      
      // Calculate scroll offset considering center alignment
      var containerWidth = container.offsetWidth;
      var targetScroll = scrollLeft - (containerWidth - cardWidth) / 2;

      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    });
  });

  // Track active card and apply 3D effect class
  function highlightActiveCard(activeIndex) {
    cards.forEach(function (card, index) {
      if (index === activeIndex) {
        card.classList.add('active-card');
      } else {
        card.classList.remove('active-card');
      }
    });

    dots.forEach(function (dot, index) {
      dot.classList.toggle('active', index === activeIndex);
    });
  }

  // Fallback active card detection on scroll
  function updateActiveCardScroll() {
    var scrollLeft = container.scrollLeft;
    var containerWidth = container.offsetWidth;
    var cardWidth = cards[0].offsetWidth;
    var gap = 20;
    
    // Find card closest to viewport center
    var containerCenter = scrollLeft + containerWidth / 2;
    var activeIndex = 0;
    var minDistance = Infinity;

    cards.forEach(function (card, index) {
      var cardCenter = index * (cardWidth + gap) + cardWidth / 2;
      var distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        activeIndex = index;
      }
    });

    highlightActiveCard(activeIndex);
  }

  // IntersectionObserver for precise detection of active card
  if ('IntersectionObserver' in window) {
    var observerOptions = {
      root: container,
      threshold: 0.5,
      rootMargin: '0px -10% 0px -10%' // Restrict focus region to center
    };

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var cardIndex = Array.prototype.indexOf.call(cards, entry.target);
          if (cardIndex !== -1) {
            highlightActiveCard(cardIndex);
          }
        }
      });
    }, observerOptions);

    cards.forEach(function (card) {
      observer.observe(card);
    });
  } else {
    container.addEventListener('scroll', updateActiveCardScroll);
  }

  // Initial trigger
  setTimeout(updateActiveCardScroll, 100);
});

