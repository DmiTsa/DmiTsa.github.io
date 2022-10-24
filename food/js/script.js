document.addEventListener('DOMContentLoaded', () => {
  //Tabs

  const tabs = document.querySelectorAll('.tabheader__item');
  const tabsContent = document.querySelectorAll('.tabcontent');
  const tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach((tabCont) => {
      // tabCont.style.display = 'none';
      tabCont.classList.add('hide');
      tabCont.classList.remove('show', 'fade');
    });

    tabs.forEach((tabCont) => {
      tabCont.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    // tabsContent[i].style.display = 'block';
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((tab, i) => {
        if (target == tab) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  //Timer
  const deadline = '2022-10-25';

  function formatDigit(num) {
    if (+num >= 0 && +num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function getTimeRemaining(dl) {
    const total = Date.parse(dl) - Date.parse(new Date());
    const days = Math.floor(total / 24 / 60 / 60 / 1000);
    const hours = Math.floor((total / 60 / 60 / 1000) % 24);
    const minutes = Math.floor((total / 60 / 1000) % 60);
    const seconds = Math.floor((total / 1000) % 60);

    return { total, days, hours, minutes, seconds };
  }

  function setClock(timerSelector, deadline) {
    const ts = document.querySelector(timerSelector);
    const days = ts.querySelector('#days');
    const hours = ts.querySelector('#hours');
    const minutes = ts.querySelector('#minutes');
    const seconds = ts.querySelector('#seconds');
    const timeInterval = setInterval(timerUpdate, 1000);

    timerUpdate();

    function timerUpdate() {
      const t = getTimeRemaining(deadline);

      if (t.total < 0) {
        clearInterval(timeInterval);
        days.textContent = '00';
        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';
      } else {
        days.textContent = formatDigit(t.days);
        hours.textContent = formatDigit(t.hours);
        minutes.textContent = formatDigit(t.minutes);
        seconds.textContent = formatDigit(t.seconds);
      }
    }
  }
  setClock('.timer', deadline);

  //Modal
  const modalButtons = document.querySelectorAll('[data-modal]');
  const modalWindow = document.querySelector('.modal');
  const closeModalBtn = document.querySelector('[data-close]');

  function showModal() {
    modalWindow.classList.remove('hide');
    modalWindow.classList.add('show');
    document.body.style.overflow = 'hidden';
    clearInterval('modalTimeout');
  }

  function closeModal() {
    modalWindow.classList.remove('show');
    modalWindow.classList.add('hide');
    document.body.style.overflow = '';
  }

  modalButtons.forEach((btn) => {
    btn.addEventListener('click', showModal);
  });

  closeModalBtn.addEventListener('click', closeModal);

  modalWindow.addEventListener('click', (e) => {
    if (e.target === modalWindow) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code == 'Escape' && modalWindow.classList.contains('show')) {
      closeModal();
    }
  });

  const modalTimeout = setTimeout(showModal, 5 * 1000);

  function showScrollModal() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 1
    ) {
      showModal();
      window.removeEventListener('scroll', showScrollModal);
    }
  }

  window.addEventListener('scroll', showScrollModal);
});
