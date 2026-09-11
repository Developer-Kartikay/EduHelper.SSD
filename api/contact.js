const { Resend } = require('resend');

module.exports = async (request, response) => {
  if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });
  const { name, email, support, message } = request.body || {};
  if (!name || !email || !support || !message) return response.status(400).json({ error: 'Please complete every field.' });
  if (!process.env.RESEND_API_KEY) return response.status(503).json({ error: 'Email service is not configured.' });
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    await resend.emails.send({
      from: 'EduHelper.SSD website <onboarding@resend.dev>',
      to: ['eduhelper.ssd@gmail.com'],
      replyTo: email,
      subject: `New support request — ${support}`,
      text: `Name: ${name}\nEmail: ${email}\nSupport needed: ${support}\n\nDetails:\n${message}`
    });
    return response.status(200).json({ ok: true });
  } catch (error) {
    return response.status(500).json({ error: 'Unable to send email.' });
  }
};
