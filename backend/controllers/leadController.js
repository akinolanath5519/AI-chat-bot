const { google } = require('googleapis');
const nodemailer = require('nodemailer');

/**
 * Configure Google Sheets API
 */
const configureGoogleSheets = () => {
  try {
    // Parse the private key (it comes as a string with escaped newlines)
    const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
    
    // Create JWT client
    const auth = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      null,
      privateKey,
      ['https://www.googleapis.com/auth/spreadsheets']
    );
    
    // Create Google Sheets instance
    const sheets = google.sheets({ version: 'v4', auth });
    
    return sheets;
  } catch (error) {
    console.error('Error configuring Google Sheets:', error);
    throw new Error('Failed to configure Google Sheets');
  }
};

/**
 * Configure email transporter
 */
const configureEmailTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

/**
 * Save lead information to Google Sheet and send email notification
 */
exports.saveLead = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    // Add timestamp
    const timestamp = new Date().toISOString();
    
    // Save to Google Sheet
    await saveToGoogleSheet(name, email, phone, timestamp);
    
    // Send email notification
    await sendEmailNotification(name, email, phone);
    
    res.status(200).json({ success: true, message: 'Lead information saved successfully' });
    
  } catch (error) {
    console.error('Error saving lead:', error);
    res.status(500).json({ 
      error: 'An error occurred while saving lead information',
      details: error.message 
    });
  }
};

/**
 * Save lead data to Google Sheet
 */
const saveToGoogleSheet = async (name, email, phone, timestamp) => {
  try {
    const sheets = configureGoogleSheets();
    
    // Prepare the row data
    const values = [[timestamp, name, email, phone || '']];
    
    // Append data to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:D', // Assumes columns A=Timestamp, B=Name, C=Email, D=Phone
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values
      }
    });
    
    console.log('Lead saved to Google Sheet');
    
  } catch (error) {
    console.error('Error saving to Google Sheet:', error);
    throw new Error('Failed to save lead to Google Sheet');
  }
};

/**
 * Send email notification about new lead
 */
const sendEmailNotification = async (name, email, phone) => {
  try {
    const transporter = configureEmailTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: 'New Lead from AI Chatbot',
      html: `
        <h2>New Lead Information</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log('Lead notification email sent');
    
  } catch (error) {
    console.error('Error sending email notification:', error);
    throw new Error('Failed to send email notification');
  }
};
