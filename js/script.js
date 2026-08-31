// Saint Guy Dona — script.js

document.addEventListener('DOMContentLoaded', () => {

  // Menu mobile
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Formulaire de contact (Web3Forms)
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (form && status) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Envoi en cours…';

      status.className = 'form-status';
      status.textContent = '';

      try {
        const formData = new FormData(form);
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: formData
        });
        const result = await res.json();

        if (result.success) {
          status.textContent = 'Merci ! Votre message a bien été envoyé, nous vous répondrons rapidement.';
          status.classList.add('visible', 'ok');
          form.reset();
        } else {
          throw new Error(result.message || 'Erreur inconnue');
        }
      } catch (err) {
        status.textContent = "L'envoi a échoué. Merci de réessayer ou de nous écrire directement par WhatsApp / e-mail.";
        status.classList.add('visible', 'err');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }

});
