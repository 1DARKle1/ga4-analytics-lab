'use strict';
// На следующих занятиях здесь можно добавить обработчики учебных событий.
// Google Tag устанавливается отдельно в head каждой HTML-страницы.
const form = document.querySelector('#contact-form');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    document.querySelector('#form-status').textContent =
      'Готово! Учебная форма проверена. Данные никуда не отправлены.';
    form.reset();
  });
}
document.querySelectorAll('nav a').forEach((link) => {
  link.addEventListener('click', () => {
    gtag('event', 'nav_click', {
      link_text: link.textContent.trim(),
      from_page: document.title
    });
  });
});
let readCounted = false;
setTimeout(() => {
  if (readCounted || document.hidden) return;
  readCounted = true;
  gtag('event', 'read_30s', {
    page_path: window.location.pathname
  });
}, 30000);
const leadFormFields = document.querySelector('#lead-form');
if (leadFormFields) {
  leadFormFields.addEventListener('invalid', (event) => {
    gtag('event', 'form_error', {
      field_name: event.target.name || 'unknown',
      form_id: 'lead-form'
    });
  }, true);
}

