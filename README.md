# Custom AI Chatbot

A customizable AI-powered chatbot that can be integrated with any website. This chatbot uses Anthropic's Claude to provide intelligent responses for customer support and lead generation.

## Features

- **AI-Powered Conversations**: Utilizes Anthropic's Claude for natural language understanding and generation
- **Lead Generation**: Collects user information (name, email, and phone number) when appropriate
- **Google Sheets Integration**: Automatically saves lead information to a Google Sheet
- **Email Notifications**: Sends email notifications when new leads are collected
- **Customizable UI**: Easily style the chatbot to match your brand
- **Responsive Design**: Works on desktop and mobile devices
- **Session Management**: Maintains conversation context throughout the session

## Project Structure

```
ai-chatbot/
├── backend/               # Node.js backend
│   ├── controllers/       # API controllers
│   │   ├── chatController.js  # Handles chat requests
│   │   └── leadController.js  # Handles lead generation
│   ├── .env.example       # Environment variables template
│   ├── package.json       # Backend dependencies
│   └── server.js          # Express server setup
│
└── frontend/              # Frontend assets
    ├── css/
    │   └── styles.css     # Chatbot styling
    ├── js/
    │   └── chatbot.js     # Chatbot functionality
    └── index.html         # Demo page with chatbot integration
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- Claude API key
- Google Cloud account (for Google Sheets API)
- Email account for notifications

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```
   cp .env.example .env
   ```

4. Fill in the environment variables in the `.env` file:
   - `CLAUDE_API_KEY`: Your Claude API key
   - `GOOGLE_CLIENT_EMAIL`: Your Google service account email
   - `GOOGLE_PRIVATE_KEY`: Your Google service account private key
   - `GOOGLE_SHEET_ID`: The ID of your Google Sheet
   - `EMAIL_*`: Email configuration for notifications

5. Start the server:
   ```
   npm start
   ```

### Google Sheets Setup

1. Create a new Google Sheet with the following columns:
   - Column A: Timestamp
   - Column B: Name
   - Column C: Email
   - Column D: Phone Number

2. Create a Google Cloud project and enable the Google Sheets API

3. Create a service account and download the credentials JSON file

4. Share your Google Sheet with the service account email (with editor permissions)

### Frontend Integration

To integrate the chatbot into your website:

1. Copy the `frontend/css/styles.css` and `frontend/js/chatbot.js` files to your website

2. Add the following HTML to your website:

```html
<!-- Chatbot Widget -->
<div id="chatbot-widget" class="chatbot-widget">
    <div class="chatbot-header">
        <div class="chatbot-title">AI Assistant</div>
        <div class="chatbot-controls">
            <button id="minimize-btn" class="control-btn"><i class="fas fa-minus"></i></button>
            <button id="close-btn" class="control-btn"><i class="fas fa-times"></i></button>
        </div>
    </div>
    
    <div class="chatbot-body">
        <div id="chat-messages" class="chat-messages">
            <!-- Initial message will be added dynamically -->
        </div>
        
        <div id="lead-form" class="lead-form hidden">
            <h3>Please provide your information</h3>
            <form id="user-info-form">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone">
                </div>
                <button type="submit" class="submit-btn">Submit</button>
            </form>
        </div>
        
        <div class="chat-input-container">
            <textarea id="user-input" placeholder="Type your message here..." rows="1"></textarea>
            <button id="send-btn"><i class="fas fa-paper-plane"></i></button>
        </div>
    </div>
</div>

<!-- Chat Launcher Button -->
<button id="chat-launcher" class="chat-launcher">
    <i class="fas fa-comment"></i>
</button>
```

3. Include the required CSS and JavaScript files:

```html
<!-- Font Awesome for icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
<!-- Chatbot styles -->
<link rel="stylesheet" href="path/to/styles.css">
<!-- Chatbot script -->
<script src="path/to/chatbot.js"></script>
```

4. Initialize the chatbot with your backend URL:

```html
<script>
  initChatbot({
    apiUrl: 'https://your-backend-url.com',
    theme: 'light' // or 'dark'
  });
</script>
```

## Customization

### Chatbot Appearance

You can customize the appearance of the chatbot by modifying the CSS variables in `styles.css`. The main colors and dimensions can be adjusted to match your brand.

### Chatbot Behavior

The behavior of the chatbot can be customized by modifying the system message in `chatController.js`. This message sets the tone and purpose of the chatbot.

## License

MIT
