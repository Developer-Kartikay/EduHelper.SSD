const form = document.querySelector('#support-form');
const status = document.querySelector('#form-status');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = form.querySelector('button');
  button.disabled = true;
  button.innerHTML = 'Sending request <span>…</span>';
  status.textContent = 'Sending your request securely…';
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    });
    if (!response.ok) throw new Error('Request could not be sent');
    form.reset();
    button.innerHTML = 'Request sent <span>✓</span>';
    status.textContent = 'Thank you — your request has been sent to EduHelper.SSD.';
  } catch {
    button.disabled = false;
    button.innerHTML = 'Send support request <span>↗</span>';
    status.textContent = 'The form is not connected yet. Please email us directly at eduhelper.ssd@gmail.com.';
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();
