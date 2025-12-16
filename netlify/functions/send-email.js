const emailjs = require('@emailjs/nodejs');
const axios = require('axios');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }


  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }) 
    };
  }

  try {
    const { name, phone, email, subject, message, captcha } = JSON.parse(event.body);

    console.log('Received form submission:', { name, email, subject });

    if (!name || !email || !message || !captcha) {
      return { 
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' }) 
      };
    }

    console.log('Verifying reCAPTCHA...');
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
      console.error('reCAPTCHA verification failed:', captchaVerify.data);
      return { 
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'reCAPTCHA verification failed' }) 
      };
    }

    console.log('reCAPTCHA verified successfully');

    console.log('Sending email via EmailJS...');
    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      {
        from_name: name,
        phone: phone || 'Not provided',
        from_email: email,
        subject: subject || 'No subject',
        message: message
      },
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY,
      }
    );

    console.log('Email sent successfully:', response);

    return { 
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Email sent successfully' }) 
    };

  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    });
    
    return { 
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to send email. Please try again.',
        details: error.message 
      }) 
    };
  }
};