const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
const mobile = window.matchMedia('(max-width: 1199px)');
function setMenu(open, restoreFocus = false) {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? '關閉選單' : '開啟選單');
  nav.classList.toggle('open', open);
  if (restoreFocus) toggle.focus();
}
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
nav.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setMenu(false, true);
});
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) setMenu(false); });
document.addEventListener('focusin', event => { if (!event.target.closest('.site-header')) setMenu(false); });
mobile.addEventListener('change', () => setMenu(false));
// The unenhanced navigation stays visible when JavaScript is unavailable.
document.documentElement.classList.add('js');
