'use strict';
// Google Tag устанавливается отдельно в head каждой HTML-страницы.
const leadForm = document.querySelector('#lead-form');
if (leadForm) {
  leadForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (typeof gtag === 'function') {
      gtag('event', 'generate_lead', {
        lead_source: 'contact_form'
      });
    }
    const status = document.querySelector('#form-status');
    if (status) {
      status.textContent = 'Учебная форма проверена. Данные не отправлены.';
    }
  });
}

const programCta = document.querySelector('#program-cta');
const programPreview = document.querySelector('#program-preview');
if (programCta && programPreview) {
  programCta.addEventListener('click', () => {
    programPreview.hidden = false;
    if (typeof gtag === 'function') {
      gtag('event', 'cta_click', {
        button_name: 'program',
        page_section: 'hero'
      });
    }
  });
}
