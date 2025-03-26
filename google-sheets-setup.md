# Google Sheets Integration Setup Guide

This guide will walk you through the process of setting up Google Sheets integration for the AI chatbot to store lead information.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Rename the spreadsheet to something like "AI Chatbot Leads"
3. Add the following headers to the first row:
   - A1: Timestamp
   - B1: Name
   - C1: Email

## Step 2: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use an existing one)
3. Name your project (e.g., "AI Chatbot")
4. Wait for the project to be created

## Step 3: Enable the Google Sheets API

1. In your Google Cloud project, go to "APIs & Services" > "Library"
2. Search for "Google Sheets API"
3. Click on "Google Sheets API" in the results
4. Click "Enable"

## Step 4: Create a Service Account

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Enter a name for your service account (e.g., "AI Chatbot Service Account")
4. Optionally add a description
5. Click "Create and Continue"
6. For the "Role" dropdown, select "Project" > "Editor"
7. Click "Continue"
8. Click "Done"

## Step 5: Create Service Account Key

1. In the "Service Accounts" list, find the service account you just created
2. Click on the three dots (actions menu) on the right side
3. Select "Manage keys"
4. Click "Add Key" > "Create new key"
5. Select "JSON" as the key type
6. Click "Create"
7. The key file will be downloaded to your computer - keep this file secure!

## Step 6: Share Your Google Sheet with the Service Account

1. Open your "AI Chatbot Leads" Google Sheet
2. Click the "Share" button in the top right
3. In the "Add people and groups" field, paste the email address of your service account
   - It should look like: `service-account-name@project-id.iam.gserviceaccount.com`
4. Make sure the role is set to "Editor"
5. Uncheck "Notify people"
6. Click "Share"

## Step 7: Configure Your .env File

1. Open the downloaded JSON key file
2. Find the following values:
   - `client_email`: This is your `GOOGLE_CLIENT_EMAIL`
   - `private_key`: This is your `GOOGLE_PRIVATE_KEY`
3. Get your Google Sheet ID from the URL:
   - The URL looks like: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`
   - The part between `/d/` and `/edit` is your `GOOGLE_SHEET_ID`
4. Add these values to your `.env` file:

```
GOOGLE_CLIENT_EMAIL=your-service-account-email@project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-google-sheet-id
```

Note: Make sure to include the quotes around the private key, as it contains newline characters.

## Testing the Integration

Once you've completed these steps, your AI chatbot should be able to save lead information to your Google Sheet. When a user provides their name and email through the chatbot, a new row will be added to your spreadsheet with their information and a timestamp.

## Troubleshooting

If you encounter issues with the Google Sheets integration:

1. Make sure the Google Sheets API is enabled for your project
2. Verify that you've shared the spreadsheet with the correct service account email
3. Check that the service account has Editor permissions on the spreadsheet
4. Ensure the private key in your .env file is properly formatted with newline characters
5. Confirm that the spreadsheet ID in your .env file is correct
