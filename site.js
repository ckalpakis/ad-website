/* Progressive enhancements. Navigation, evidence, FAQs, and booking work without JS. */
document.documentElement.classList.add('js');

const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.site-nav');
function closeMenu() {
  menu.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = 'Menu';
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menu.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? 'Close' : 'Menu';
});
menu.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header')) closeMenu();
});

const filterBar = document.querySelector('.filters');
if (filterBar) {
  filterBar.hidden = false;
  const status = document.querySelector('.filter-status');
  status.hidden = false;
  filterBar.addEventListener('click', (event) => {
    const button = event.target.closest('[data-filter]');
    if (!button) return;
    const selected = button.dataset.filter;
    let count = 0;
    document.querySelectorAll('[data-filter]').forEach((item) => {
      item.setAttribute('aria-pressed', String(item === button));
    });
    document.querySelectorAll('[data-category]').forEach((section) => {
      section.hidden = selected !== 'all' && section.dataset.category !== selected;
      if (!section.hidden) count += section.querySelectorAll('.result-card').length;
    });
    const category = { all: 'all results', campaigns: 'ad performance results', appointments: 'appointment updates', jobs: 'closed-job updates' };
    status.textContent = 'Showing ' + count + ' ' + category[selected] + '.';
  });
}

const dialog = document.querySelector('.image-dialog');
if (dialog && typeof dialog.showModal === 'function') {
  const preview = dialog.querySelector('.dialog-image');
  const title = dialog.querySelector('#dialog-title');
  const original = dialog.querySelector('.dialog-original');
  let returnFocus;
  let previousOverflow;
  document.querySelectorAll('.proof-image').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      returnFocus = link;
      title.textContent = link.dataset.title || 'Result screenshot';
      preview.src = link.href;
      preview.alt = link.querySelector('img').alt;
      original.href = link.href;
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.showModal();
    });
  });
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow || '';
    if (returnFocus) returnFocus.focus({ preventScroll: true });
  });
}

const copyButton = document.querySelector('.copy-button');
if (copyButton && navigator.clipboard && window.isSecureContext) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    const status = document.querySelector('.copy-status');
    try {
      await navigator.clipboard.writeText('carson@steelscalesystems.com');
      status.textContent = 'Email address copied.';
    } catch {
      status.textContent = 'Select the email address above to copy it.';
    }
  });
}
