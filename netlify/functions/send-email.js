const axios = require('axios');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Method Not Allowed' }) 
    };
  }

  try {
    const { name, phone, email, subject, message, captcha } = JSON.parse(event.body);

    if (!name || !email || !message || !captcha) {
      return { 
        statusCode: 400, 
        body: JSON.stringify({ error: 'Missing required fields' }) 
      };
    }

    const captchaVerify = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: captcha
        }
      }
    );

    if (!captchaVerify.data.success) {
      return { 
        statusCode: 400, 
        body: JSON.stringify({ error: 'reCAPTCHA verification failed' }) 
      };
    }

    await axios.post('https://api.emailjs.com/api/v1.0/email/send', {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      template_params: {
        from_name: name,
        phone: phone || 'Not provided',
        from_email: email,
        subject: subject || 'No subject',
        message: message
      }
    });

    return { 
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ success: true, message: 'Email sent successfully' }) 
    };

  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: 'Failed to send email. Please try again.' }) 
    };
  }
};