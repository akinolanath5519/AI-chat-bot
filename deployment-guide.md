# Deploying Your AI Chatbot to Production

This guide will walk you through the process of deploying your AI chatbot to a production environment so it can be used on your live website.

## Deployment Overview

Deploying the chatbot involves two main components:

1. **Backend Deployment**: Hosting the Node.js server on a cloud platform
2. **Frontend Integration**: Adding the chatbot widget to your website

## Backend Deployment Options

### Option 1: Deploying to Heroku

Heroku is one of the simplest platforms for deploying Node.js applications.

1. **Create a Heroku Account**
   - Sign up at [Heroku](https://signup.heroku.com/) if you don't have an account

2. **Install the Heroku CLI**
   - Download and install from [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

3. **Prepare Your Backend for Deployment**
   - Create a `Procfile` in your backend directory with the content:
     ```
     web: node server.js
     ```

4. **Initialize Git Repository** (if not already done)
   ```
   cd C:\Users\Z-BOOK\Documents\My Projects\ai-chatbot
   git init
   ```

5. **Deploy to Heroku**
   ```
   cd C:\Users\Z-BOOK\Documents\My Projects\ai-chatbot\backend
   heroku login
   heroku create your-chatbot-name
   git add .
   git commit -m "Initial deployment"
   git push heroku master
   ```

6. **Configure Environment Variables**
   - Go to your Heroku dashboard
   - Select your app
   - Go to Settings > Config Vars
   - Add all the variables from your `.env` file:
     - `CLAUDE_API_KEY`
     - `GOOGLE_CLIENT_EMAIL`
     - `GOOGLE_PRIVATE_KEY`
     - `GOOGLE_SHEET_ID`
     - `EMAIL_SERVICE`
     - `EMAIL_USER`
     - `EMAIL_PASS`
     - `EMAIL_TO`

7. **Verify Deployment**
   - Your API should now be available at `https://your-chatbot-name.herokuapp.com`
   - Test it by visiting `https://your-chatbot-name.herokuapp.com/api/health`

### Option 2: Deploying to DigitalOcean App Platform

1. **Create a DigitalOcean Account**
   - Sign up at [DigitalOcean](https://www.digitalocean.com/)

2. **Create a New App**
   - Go to the App Platform section
   - Click "Create App"
   - Connect your GitHub repository or upload your code
   - Select the backend directory as your source
   - Configure as a Node.js app

3. **Configure Environment Variables**
   - Add all the variables from your `.env` file in the Environment Variables section

4. **Deploy the App**
   - Complete the setup and deploy
   - Your API will be available at the URL provided by DigitalOcean

### Option 3: Deploying to AWS Elastic Beanstalk

1. **Create an AWS Account**
   - Sign up at [AWS](https://aws.amazon.com/)

2. **Install the AWS CLI and EB CLI**
   - Follow the instructions at [AWS CLI](https://aws.amazon.com/cli/)
   - Install the EB CLI with `pip install awsebcli`

3. **Initialize Elastic Beanstalk**
   ```
   cd C:\Users\Z-BOOK\Documents\My Projects\ai-chatbot\backend
   eb init
   ```
   - Follow the prompts to configure your application

4. **Create an Environment**
   ```
   eb create chatbot-production
   ```

5. **Configure Environment Variables**
   - Use the AWS Management Console
   - Go to Elastic Beanstalk > Your Environment > Configuration
   - Add all the variables from your `.env` file

6. **Deploy Your Application**
   ```
   eb deploy
   ```

## Frontend Integration

Once your backend is deployed, you need to integrate the chatbot widget into your website:

1. **Copy the Frontend Files**
   - Copy `frontend/css/styles.css` to your website's assets directory
   - Copy `frontend/js/chatbot.js` to your website's assets directory

2. **Add the HTML to Your Website**
   - Add the chatbot HTML to your website's template or pages:

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
            <!-- Messages will be added here dynamically -->
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

3. **Include the Required CSS and JavaScript**

```html
<!-- Font Awesome for icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
<!-- Chatbot styles -->
<link rel="stylesheet" href="/path/to/styles.css">
<!-- Chatbot script -->
<script src="/path/to/chatbot.js"></script>
```

4. **Initialize the Chatbot with Your Backend URL**

```html
<script>
  initChatbot({
    apiUrl: 'https://your-backend-url.com', // Your deployed backend URL
    theme: 'light', // or 'dark'
    initialMessage: "Hello! Welcome to our website. How can I help you today?"
  });
</script>
```

## Security Considerations

1. **CORS Configuration**
   - Update the CORS settings in your backend `server.js` to allow requests only from your website's domain:
   ```javascript
   app.use(cors({
     origin: 'https://your-website.com'
   }));
   ```

2. **API Rate Limiting**
   - Consider adding rate limiting to prevent abuse:
   ```javascript
   const rateLimit = require('express-rate-limit');
   
   const apiLimiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   });
   
   app.use('/api/', apiLimiter);
   ```

3. **HTTPS**
   - Ensure your backend is served over HTTPS
   - Most cloud platforms provide this by default

## Monitoring and Maintenance

1. **Set Up Logging**
   - Consider adding a logging service like Winston or Bunyan
   - Or use a service like Loggly or Papertrail

2. **Monitor Performance**
   - Use services like New Relic or Datadog to monitor your backend
   - Set up alerts for high error rates or response times

3. **Regular Updates**
   - Keep your dependencies updated
   - Regularly review and improve your chatbot's responses

## Scaling Considerations

If your chatbot becomes popular, you might need to scale:

1. **Horizontal Scaling**
   - Deploy multiple instances of your backend
   - Use a load balancer to distribute traffic

2. **Database Scaling**
   - If you move from Google Sheets to a database, ensure it can handle your load
   - Consider caching frequently accessed data

3. **Claude API Costs**
   - Monitor your Claude API usage
   - Implement caching for common questions to reduce API calls

## Troubleshooting Production Issues

1. **Check Logs**
   - Always check your server logs first when troubleshooting

2. **Test API Endpoints**
   - Use tools like Postman to test your API endpoints directly

3. **Browser Console**
   - Check the browser console for frontend errors

4. **CORS Issues**
   - CORS errors are common in production - ensure your CORS settings are correct
