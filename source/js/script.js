'use strict';

// Оживление мобильного меню
var menu = document.getElementById('menu');
var menuList = menu.querySelector('.menu__list');
var menuToggleBtn = menu.querySelector('.menu__toggle');

// Открытие и закрытие мобильного меню
menuToggleBtn.addEventListener('click', function (evt) {
  evt.preventDefault();
  menuToggle();
});

// Закрытие мобильного меню клавишей ESC
if (window.matchMedia('(max-width: 1279px)').matches) {
  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();

      // Проверка, открыто ли мобильного меню
      if (menu.classList.contains('menu--shown')) {
        menuClose();
      }
    }
  });
}

// Оживление ссылок меню
var menuLinks = menu.querySelectorAll('.menu__link');
menuLinks[0].classList.add('menu__link--active');

var addMenuLinksClickHandler = function (link) {
  link.addEventListener('click', function (evt) {
    evt.preventDefault();

    // Закрытие мобильного меню после клика по ссылке
    if (window.matchMedia('(max-width: 1279px)').matches) {
      menuClose();
    }

    // Плавная прокрутка к якорю после клика по ссылке
    document.getElementById(link.hash.substring(1)).scrollIntoView({behavior: 'smooth'});
  });
};

for (var i = 0; i < menuLinks.length; i++) {
  addMenuLinksClickHandler(menuLinks[i]);
}

// Активные ссылки меню
window.onscroll = function () {
  for (var j = 0; j < menuLinks.length; j++) {
    if (isSectionInView(document.getElementById(menuLinks[j].hash.substring(1)))) {
      menuLinkActive(j);
    }
  }
};

// Появление и закрытие мобильного меню
function menuToggle() {
  menu.classList.contains('menu--shown') ? menuClose() : menuOpen();
}

// Появление мобильного меню
function menuOpen() {
  menu.classList.add('menu--shown');
  menuList.classList.add('menu__list--shown');
}

// Закрытие мобильного меню
function menuClose() {
  // Сброс CSS-анимации
  menuList.classList.remove('menu__list--shown');
  void menuList.offsetWidth;
  menuList.classList.add('menu__list--shown');

  menuList.style.animationDirection = 'reverse';
  menu.classList.remove('menu--shown');

  window.setTimeout(function () {
    menuList.classList.remove('menu__list--shown');
    menuList.removeAttribute('style');
  }, 1000);
}

// Проверка, находится ли блок во вьюпорте
function isSectionInView(elmnt) {
  var scrollY = window.scrollY || window.pageYOffset;
  var sectionPosition = elmnt.getBoundingClientRect().top + scrollY;

  if (scrollY >= sectionPosition && scrollY < sectionPosition + elmnt.clientHeight || scrollY + window.innerHeight >= document.body.clientHeight) {
    return true;
  }

  return false;
}

// Активная ссылка меню
function menuLinkActive(n) {
  menuList.querySelector('.menu__link--active').classList.remove('menu__link--active');
  menuLinks[n].classList.add('menu__link--active');
}
