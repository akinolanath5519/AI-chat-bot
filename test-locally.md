# Testing Your AI Chatbot Locally

This guide will walk you through the process of testing your AI chatbot on your local machine before deploying it to a production environment.

## Prerequisites

Before testing, make sure you have:

1. Node.js installed (v14 or higher)
2. Configured your `.env` file with the necessary API keys and credentials
3. Installed all dependencies for the backend

## Step 1: Install Backend Dependencies

1. Open a terminal/command prompt
2. Navigate to the backend directory:
   ```
   cd C:\Users\Z-BOOK\Documents\My Projects\ai-chatbot\backend
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Step 2: Start the Backend Server

1. In the same terminal, start the Node.js server:
   ```
   npm start
   ```
2. You should see a message like:
   ```
   Server running on port 3000
   ```
3. Keep this terminal open while testing

## Step 3: Test the Frontend

There are two ways to test the frontend:

### Option 1: Open the Demo Page

1. Simply open the `index.html` file in your browser:
   - Double-click on `C:\Users\Z-BOOK\Documents\My Projects\ai-chatbot\frontend\index.html`
   - Or open it from your browser's File menu

### Option 2: Test with the Integration Example

1. Open the `integration-example.html` file in your browser:
   - Double-click on `C:\Users\Z-BOOK\Documents\My Projects\ai-chatbot\integration-example.html`
   - Or open it from your browser's File menu

## Step 4: Interact with the Chatbot

1. Click on the chat icon in the bottom right corner of the page
2. The chat widget should open
3. Type a message and press Enter or click the send button
4. You should receive a response from the AI assistant

## Step 5: Test Lead Generation

1. Try asking a question that might prompt the chatbot to collect lead information
   - For example: "I'm interested in learning more about your services"
2. The chatbot should respond and may ask for your contact information
3. When it does, the lead form should appear
4. Fill in the form with test data and submit
5. Check your configured email for a notification
6. Check your Google Sheet to see if the lead was recorded

## Troubleshooting

### Backend Issues

If the backend server doesn't start or you see errors:

1. Check that your `.env` file is properly configured
2. Verify that all dependencies are installed
3. Look for error messages in the terminal
4. Make sure no other service is using port 3000

### Frontend Issues

If the chat widget doesn't appear or work correctly:

1. Check your browser's console for JavaScript errors
2. Verify that the backend server is running
3. Ensure the API URL in the frontend code points to your local server
4. Try clearing your browser cache and reloading

### API Integration Issues

If the chatbot doesn't respond or you get API errors:

1. Check that your Claude API key is valid
2. Verify that you have sufficient credits in your Anthropic account
3. Look for error messages in the backend terminal
4. Test the API directly using a tool like Postman

## Next Steps

Once you've verified that everything works locally, you can:

1. Customize the chatbot's appearance to match your brand
2. Modify the system message in `chatController.js` to better suit your use case
3. Deploy the backend to a server (e.g., Heroku, AWS, DigitalOcean)
4. Integrate the frontend code into your production website
