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

// Оживление видео
var videos = document.querySelectorAll('.clip__video video');
var videosPlayPayse = document.querySelectorAll('.clip__playpause');
var videosProgress = document.querySelectorAll('.clip__progress');
var videosCurrentTime = document.querySelectorAll('.clip__time-current');
var videosDuration = document.querySelectorAll('.clip__time-full');

// Переключение состояния видео
var addVideosStateHandler = function (video) {
  video.addEventListener('play', function () {
    videoStateChange(video);
  });

  video.addEventListener('pause', function () {
    videoStateChange(video);
  });
};

// Подключение кастомных элементов управления для видео
var addVideosControlsHandler = function (video, playpause, progress, current, duration) {
  video.addEventListener('loadedmetadata', function () {
    progress.setAttribute('max', video.duration);
    duration.textContent = timeMinSec(video.duration);
  });

  video.addEventListener('click', function (evt) {
    evt.preventDefault();
    videoPlayPause(video);
  });

  playpause.addEventListener('click', function (evt) {
    evt.preventDefault();
    videoPlayPause(video);
  });

  video.addEventListener('timeupdate', function () {
    if (!progress.getAttribute('max')) {
      progress.setAttribute('max', video.duration);
    }

    progress.value = video.currentTime;
    current.textContent = timeMinSec(video.currentTime);
  });

  if (window.navigator.userAgent.indexOf('MSIE ') > 0 || window.navigator.userAgent.indexOf('Trident/') > 0) {
    progress.addEventListener('change', function () {
      video.currentTime = progress.value;
    });
  } else {
    progress.addEventListener('input', function () {
      video.currentTime = progress.value;
    });
  }
};

for (var k = 0; k < videos.length; k++) {
  videos[k].controls = false;

  addVideosStateHandler(videos[k]);
  addVideosControlsHandler(videos[k], videosPlayPayse[k], videosProgress[k], videosCurrentTime[k], videosDuration[k]);
}

// Появление и закрытие мобильного меню
function menuToggle() {
  if (menu.classList.contains('menu--shown')) {
    menuClose();
  } else {
    menuOpen();
  }
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

// Переключение состояния видео
function videoStateChange(video) {
  if (video.paused || video.ended) {
    video.setAttribute('data-state', 'pause');
  } else {
    video.setAttribute('data-state', 'play');
  }
}

// Проигрывание и остановка видео
function videoPlayPause(video) {
  if (video.paused || video.ended) {
    video.play();
  } else {
    video.pause();
  }
}

// Преобразование времени в формат mm:ss
function timeMinSec(time) {
  var seconds = Math.floor(time) % 60;
  var minutes = Math.floor(time / 60);

  return minutes + ':' + (seconds > 9 ? seconds : '0' + seconds);
}
