document.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash');
  const enterBtn = document.getElementById('enter-btn');
  const mainSite = document.getElementById('main-site');

  enterBtn.addEventListener('click', () => {
    splash.style.display = 'none';
    mainSite.classList.remove('hidden');
    document.body.style.overflow = 'auto';
  });

  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
  });
});
