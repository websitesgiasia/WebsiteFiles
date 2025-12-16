const { Resend } = require('resend');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
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

    if (!name || !email || !message) {
      return { 
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' }) 
      };
    }

    if (captcha) {
      console.log('Verifying reCAPTCHA...');
      const captchaResponse = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`,
        { method: 'POST' }
      );
      const captchaResult = await captchaResponse.json();
      
      if (!captchaResult.success) {
        console.error('reCAPTCHA verification failed');
        return { 
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'reCAPTCHA verification failed' }) 
        };
      }
      console.log('reCAPTCHA verified successfully');
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    console.log('Sending email via Resend...');
    const data = await resend.emails.send({
      from: process.env.SENDER_EMAIL || 'onboarding@resend.dev',
      to: process.env.RECIPIENT_EMAIL,
      replyTo: email,
      subject: `Contact Form: ${subject || 'No Subject'} - from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <p><strong>Message:</strong></p>
            <div style="background: #fff; padding: 15px; border-left: 4px solid #007bff; white-space: pre-wrap;">
${message}
            </div>
          </div>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          
          <p style="color: #666; font-size: 12px;">
            This email was sent from the contact form on sgiasia.com<br>
            You can reply directly to this email to respond to ${name}
          </p>
        </div>
      `
    });

    console.log('Email sent successfully:', data);

    return { 
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Email sent successfully' }) 
    };

  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Error details:', error.message);
    
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
