# Email Notification Setup Guide

This guide will walk you through the process of setting up email notifications for the AI chatbot to alert you when new leads are collected.

## Step 1: Choose an Email Service Provider

The chatbot uses Nodemailer to send emails, which supports various email service providers. For this guide, we'll focus on setting up Gmail, but you can adapt these instructions for other providers.

## Step 2: Create or Use an Existing Gmail Account

1. If you don't already have a Gmail account you want to use for sending notifications, create one at [Gmail](https://mail.google.com)
2. Sign in to the Gmail account you'll use for sending notifications

## Step 3: Set Up App Password (for Gmail)

Google's security settings typically don't allow direct password authentication for third-party apps. Instead, you'll need to create an "App Password":

1. Go to your [Google Account](https://myaccount.google.com/)
2. Select "Security" from the left navigation panel
3. Under "Signing in to Google," select "2-Step Verification" (you may need to enable this first)
4. At the bottom of the page, select "App passwords"
5. Click "Select app" and choose "Mail"
6. Click "Select device" and choose "Other (Custom name)"
7. Enter a name like "AI Chatbot"
8. Click "Generate"
9. Google will display a 16-character app password. **Copy this password** - you'll need it for your `.env` file

## Step 4: Configure Your .env File

1. Open your project's `.env` file
2. Add your email configuration:

```
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=recipient@example.com
```

Where:
- `EMAIL_SERVICE`: The email service provider (e.g., 'gmail', 'outlook', 'yahoo')
- `EMAIL_USER`: Your email address
- `EMAIL_PASS`: Your app password (not your regular Gmail password)
- `EMAIL_TO`: The email address where you want to receive notifications

## Step 5: Test Your Email Configuration

Once you've completed these steps, your AI chatbot should be able to send email notifications when new leads are collected. Test it by:

1. Starting your backend server
2. Using the chatbot to submit lead information
3. Checking your recipient email inbox for the notification

## Using Other Email Providers

If you prefer to use a different email provider, you'll need to adjust the configuration:

### Outlook/Hotmail

```
EMAIL_SERVICE=outlook
EMAIL_USER=your-email@outlook.com
EMAIL_PASS=your-password
EMAIL_TO=recipient@example.com
```

### Yahoo

```
EMAIL_SERVICE=yahoo
EMAIL_USER=your-email@yahoo.com
EMAIL_PASS=your-password
EMAIL_TO=recipient@example.com
```

### Custom SMTP Server

```
EMAIL_HOST=smtp.your-domain.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@your-domain.com
EMAIL_PASS=your-password
EMAIL_TO=recipient@example.com
```

For custom SMTP servers, you'll need to modify the email configuration in `leadController.js` to use these additional parameters.

## Troubleshooting

If you encounter issues with email notifications:

1. Check that your email credentials are correct in the `.env` file
2. Verify that you're using an app password for Gmail, not your regular password
3. Check your spam/junk folder for the notification emails
4. Ensure your email provider allows sending from third-party applications
5. Check the server logs for any error messages related to email sending

## Security Best Practices

1. Never expose your email password or app password in client-side code
2. Store your email credentials securely in environment variables
3. Don't commit your `.env` file to version control
4. Consider using a dedicated email account for your chatbot notifications
5. Regularly rotate your app passwords

## Customizing Email Templates

You can customize the email notification template by modifying the HTML in the `sendEmailNotification` function in `leadController.js`. The current template includes:

- Lead's name
- Lead's email
- Timestamp

You can enhance this with additional information, styling, or branding elements as needed.
