"use strict";

// modal login
var loginButton = document.querySelector(".user-menu .login-button");
var modalLogin = document.querySelector(".modal-login");
var loginForm = document.querySelector(".modal-login .login-form");
var loginInput = document.querySelector('.login-form input[name="login"]');
var passwordInput = document.querySelector('.login-form input[name="password"]');

var modalOverlay = document.querySelector(".modal-overlay");

var isStorageSupport = true;
var loginStorage = "";

try {
  loginStorage = localStorage.getItem("login");
} catch (err) {
  isStorageSupport = false;
}

if (document.body.contains(loginButton)) {
  loginButton.addEventListener("click", function(evt){
    evt.preventDefault();
    modalLogin.classList.add("modal-show");
    modalOverlay.style.display = "block";
    if (loginStorage) {
      loginInput.value = loginStorage;
      passwordInput.focus();
    } else {
      loginInput.focus();
    }
  });
}

if (document.body.contains(loginForm)) {
  loginForm.addEventListener("submit", function(evt){
    if (!loginInput.value || !passwordInput.value) {
      evt.preventDefault();
      modalLogin.classList.add("modal-error");
    } else {
      if (isStorageSupport) {
        localStorage.setItem("login", loginInput.value);
      }
    }
  });
}

// promo slider
var slideBackwardButton = document.querySelector(".slider-controls .slider-backward-button");
var slideForwardButton = document.querySelector(".slider-controls .slider-forward-button");
var slides = document.querySelectorAll(".promo-slider-list .slider-item");
var slideIndicators = document.querySelectorAll(".slide-indicators .slide-indicator");

if (document.body.contains(slideBackwardButton)) {
  slideBackwardButton.addEventListener("click", function(evt){
    evt.preventDefault();
    var currentSlide = document.querySelector(".promo-slider-list .slider-item-current");
    var currentSlideNumber = [...currentSlide.parentNode.children].indexOf(currentSlide);
    var currentSlideIndicator = document.querySelector(".slide-indicators .slide-indicator-current");
    var currentSlideIndicatorNumber = [...currentSlideIndicator.parentNode.children].indexOf(currentSlideIndicator);

    currentSlide.classList.remove("slider-item-current");
    currentSlideIndicator.classList.remove("slide-indicator-current");
    if (!currentSlideNumber) {
      currentSlideNumber = slides.length;
    }
    if (!currentSlideIndicatorNumber) {
      currentSlideIndicatorNumber = slideIndicators.length;
    }
    slideIndicators[currentSlideIndicatorNumber-1].classList.add("slide-indicator-current");
    slides[currentSlideNumber-1].classList.add("slider-item-current");
    slides[currentSlideNumber-1].classList.add("shift-left");
    setTimeout(function(){slides[currentSlideNumber-1].classList.remove("shift-left")}, 500);
  });
}

if (document.body.contains(slideForwardButton)) {
  slideForwardButton.addEventListener("click", function(evt){
    evt.preventDefault();
    var currentSlide = document.querySelector(".promo-slider-list .slider-item-current");
    var currentSlideNumber = [...currentSlide.parentNode.children].indexOf(currentSlide);
    var currentSlideIndicator = document.querySelector(".slide-indicators .slide-indicator-current");
    var currentSlideIndicatorNumber = [...currentSlideIndicator.parentNode.children].indexOf(currentSlideIndicator);

    currentSlide.classList.remove("slider-item-current");
    currentSlideIndicator.classList.remove("slide-indicator-current");
    if (currentSlideNumber === slides.length-1) {
      currentSlideNumber = -1;
    }
    if (currentSlideIndicatorNumber === slideIndicators.length-1) {
      currentSlideIndicatorNumber = -1;
    }
    slideIndicators[currentSlideIndicatorNumber+1].classList.add("slide-indicator-current");
    slides[currentSlideNumber+1].classList.add("slider-item-current");
    slides[currentSlideNumber+1].classList.add("shift-right");
    setTimeout(function(){slides[currentSlideNumber+1].classList.remove("shift-right")}, 500);
  });
}

if (document.body.contains(slideIndicators[0])) {
  for (var i = 0; i < slideIndicators.length; i++) {
    slideIndicators[i].addEventListener("click", function(evt){
      evt.preventDefault();
      var currentSlide = document.querySelector(".promo-slider-list .slider-item-current");
      var currentSlideIndicator = document.querySelector(".slide-indicators .slide-indicator-current");
      var activeSlideIndicatorNumber = [...evt.target.parentNode.children].indexOf(evt.target);

      currentSlide.classList.remove("slider-item-current");
      currentSlideIndicator.classList.remove("slide-indicator-current");
      if (activeSlideIndicatorNumber > slides.length-1) {
        slides[slides.length-1].classList.add("slider-item-current");
      } else {
        slides[activeSlideIndicatorNumber].classList.add("slider-item-current");
      }
      slideIndicators[activeSlideIndicatorNumber].classList.add("slide-indicator-current");
    });
  }
}

// buy and add to bookmarks buttons
var buyButtons = document.querySelectorAll(".manage-item-popup-menu .buy-button");
var addToBookmarksButtons = document.querySelectorAll(".manage-item-popup-menu .add-to-bookmarks-button");
var cartButton = document.querySelector(".main-header .cart-button");
var bookmarksButton = document.querySelector(".main-header .bookmarks-button");
var cartAmount = document.querySelector('.main-header output[name="cart-amount"]');
var bookmarksAmount = document.querySelector('.main-header output[name="bookmarks-amount"]');
var modalCartNotification = document.querySelector(".modal-cart-notification");
var continueButton = document.querySelector(".modal-cart-notification .continue-button");

if (document.body.contains(buyButtons[0])) {
  for (var i = 0; i < buyButtons.length; i++) {
    buyButtons[i].addEventListener("click", function(evt){
      if (!cartButton.classList.contains("not-empty")) {
        cartButton.classList.add("not-empty");
      }
      cartAmount.value++;
      modalCartNotification.classList.add("modal-show");
      modalOverlay.style.display = "block";
    });
  }
}

if (document.body.contains(addToBookmarksButtons[0])) {
  for (var i = 0; i < addToBookmarksButtons.length; i++) {
    addToBookmarksButtons[i].addEventListener("click", function(evt){
      if (!bookmarksButton.classList.contains("not-empty")) {
        bookmarksButton.classList.add("not-empty");
      }
      bookmarksAmount.value++;
    });
  }
}

if (document.body.contains(continueButton)) {
  continueButton.addEventListener("click", function(evt){
    evt.preventDefault();
    modalCartNotification.classList.remove("modal-show");
    modalOverlay.style.display = "none";
  });
}

// modal feedback
var contactUsButton = document.querySelector(".contacts .contact-us-button")
var modalFeedback = document.querySelector(".modal-feedback");
var feedbackForm = document.querySelector(".modal-feedback .feedback-form");
var nameInput = document.querySelector('.feedback-form [name="name"]');
var emailInput = document.querySelector('.feedback-form [name="email"]');
var messageInput = document.querySelector('.feedback-form [name="message"]');

if (document.body.contains(contactUsButton)) {
  contactUsButton.addEventListener("click", function(evt){
    evt.preventDefault();
    modalFeedback.classList.add("modal-show");
    modalOverlay.style.display = "block";
    nameInput.focus();
  });
}


if (document.body.contains(feedbackForm)) {
  feedbackForm.addEventListener("submit", function(evt){
    if (!nameInput.value || !emailInput.value || !messageInput.value) {
      evt.preventDefault();
      modalFeedback.classList.add("modal-error");
    }
  });
}

// modal map
var openMapLink = document.querySelector(".contacts .open-map-link");
var modalMap = document.querySelector(".modal-map");

if (document.body.contains(openMapLink)) {
  openMapLink.addEventListener("click", function(evt){
    evt.preventDefault();
    modalMap.classList.add("modal-show");
    modalOverlay.style.display = "block";
  });
}

// modals close
var modalWindows = document.querySelectorAll(".modal");
var modalCloseBtns = document.querySelectorAll(".modal .modal-close");


if (document.body.contains(modalCloseBtns[0])) {
  for (var i = 0; i < modalCloseBtns.length; i++)
  modalCloseBtns[i].addEventListener("click", function(evt){
    evt.preventDefault();
    for (var i = 0; i < modalWindows.length; i++) {
      if(modalWindows[i].classList.contains("modal-show")) {
        modalWindows[i].classList.remove("modal-show");
      }
      if (modalWindows[i].classList.contains("modal-error")) {
        modalWindows[i].classList.remove("modal-error");
      }
    }
    modalOverlay.style.display = "none";
  });
}

if (document.body.contains(modalWindows[0])) {
  window.addEventListener("keydown", function(evt){
    if (evt.keyCode === 27 && modalWindows.classList.contains("modal-show")) {
      evt.preventDefault();
      for (var i = 0; i < modalWindows.length; i++) {
        if(modalWindows[i].classList.contains("modal-show")) {
          modalWindows[i].classList.remove("modal-show");
        }
        if (modalWindows[i].classList.contains("modal-error")) {
          modalWindows[i].classList.remove("modal-error");
        }
      }
      modalOverlay.style.display = "none";
    }
  });
}
