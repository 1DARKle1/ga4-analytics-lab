'use strict';

const leadForm = document.querySelector('#lead-form');
if (leadForm) {
  const params = new URLSearchParams(window.location.search);
  const defaults = {utm_source: 'direct', utm_medium: 'none', utm_campaign: 'not_set'};
  for (const [key, fallback] of Object.entries(defaults)) {
    const field = leadForm.elements.namedItem(key);
    if (field) field.value = params.get(key)?.trim() || fallback;
  }
  const requestId = leadForm.elements.namedItem('request_id');
  leadForm.addEventListener('submit', (event) => {
    if (!/^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec$/.test(leadForm.action)) {
      event.preventDefault();
      document.querySelector('#form-status').textContent = 'Сначала укажите URL опубликованного Apps Script Web App.';
      return;
    }
    if (requestId && !requestId.value) requestId.value = 'REQ-' + crypto.randomUUID().toUpperCase();
    if (typeof gtag === 'function') {
      gtag('event', 'generate_lead', {lead_source: 'contact_form'});
    }
    document.querySelector('#form-status').textContent =
      'POST отправляется. Подтвердите сохранение по request_id в таблице: ' + (requestId ? requestId.value : '');
  });
  leadForm.addEventListener('reset', () => {
    setTimeout(() => {
      if (requestId) requestId.value = '';
      for (const [key, fallback] of Object.entries(defaults)) {
        const field = leadForm.elements.namedItem(key);
        if (field) field.value = params.get(key)?.trim() || fallback;
      }
      document.querySelector('#form-status').textContent = 'Можно заполнить новую заявку.';
    }, 0);
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
