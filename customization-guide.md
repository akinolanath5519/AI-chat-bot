# Customizing Your AI Chatbot

This guide will help you customize the appearance and behavior of your AI chatbot to match your brand and specific requirements.

## Appearance Customization

### Changing Colors

The main colors of the chatbot can be customized by modifying the CSS variables in `frontend/css/styles.css`:

1. **Primary Color**: This is the main color used for the chatbot header, buttons, and user messages.
   ```css
   /* Find this section in styles.css */
   .chatbot-header {
       background-color: #3498db; /* Change this to your brand color */
       color: #fff;
       /* ... */
   }
   
   .user-message {
       /* ... */
       background-color: #3498db; /* Change this to your brand color */
       color: #fff;
       /* ... */
   }
   
   #send-btn {
       background-color: #3498db; /* Change this to your brand color */
       /* ... */
   }
   
   .chat-launcher {
       /* ... */
       background-color: #3498db; /* Change this to your brand color */
       /* ... */
   }
   ```

2. **Secondary Colors**: These are used for bot messages, form buttons, etc.
   ```css
   .bot-message {
       /* ... */
       background-color: #f1f1f1; /* Change this for bot message bubbles */
       color: #333; /* Change this for bot message text */
       /* ... */
   }
   
   .submit-btn {
       background-color: #3498db; /* Change this for form submit buttons */
       /* ... */
   }
   ```

### Changing Fonts

To change the font family:

```css
body {
    font-family: 'Your-Font-Name', Tahoma, Geneva, Verdana, sans-serif;
    /* ... */
}
```

You can use web-safe fonts or include custom fonts using `@font-face` or Google Fonts.

### Changing Dimensions

To adjust the size of the chat widget:

```css
.chatbot-widget {
    /* ... */
    width: 350px; /* Change the width */
    height: 500px; /* Change the height */
    /* ... */
}
```

To adjust the size of the chat launcher button:

```css
.chat-launcher {
    /* ... */
    width: 50px; /* Change the width */
    height: 50px; /* Change the height */
    /* ... */
}
```

### Adding a Custom Logo or Avatar

To add a logo to the chatbot header:

1. Add this HTML to the chatbot header in your integration:
   ```html
   <div class="chatbot-header">
       <div class="chatbot-logo">
           <img src="path/to/your-logo.png" alt="Logo">
       </div>
       <div class="chatbot-title">AI Assistant</div>
       <!-- ... -->
   </div>
   ```

2. Add this CSS to your styles:
   ```css
   .chatbot-logo {
       margin-right: 10px;
   }
   
   .chatbot-logo img {
       height: 24px;
       width: auto;
   }
   ```

### Adding Dark Mode

The chatbot already supports a dark mode theme. To enable it, initialize the chatbot with the `theme` option set to `'dark'`:

```javascript
initChatbot({
    apiUrl: 'https://your-backend-url.com',
    theme: 'dark'
});
```

To customize the dark mode colors, add these CSS variables:

```css
[data-theme="dark"] {
    --primary-color: #2980b9;
    --primary-text-color: #fff;
    --secondary-color: #2c3e50;
    --secondary-text-color: #ecf0f1;
    --background-color: #34495e;
    --input-background: #2c3e50;
    --input-text-color: #ecf0f1;
    --border-color: #7f8c8d;
}
```

## Behavior Customization

### Changing the Initial Message

To customize the initial greeting message, modify the `initialMessage` option when initializing the chatbot:

```javascript
initChatbot({
    apiUrl: 'https://your-backend-url.com',
    initialMessage: "Hello! Welcome to [Your Company]. How can I assist you today?"
});
```

### Customizing the AI Personality

To change the AI's personality and behavior, modify the system message in `backend/controllers/chatController.js`:

```javascript
// Initialize conversation history for new sessions
if (!conversationHistory[sessionId]) {
  conversationHistory[sessionId] = [
    {
      role: 'system',
      content: `You are a helpful customer support assistant for [Your Company].
               Your goal is to provide helpful information about [your products/services].
               If appropriate, ask for the user's name and email to generate leads, but do so naturally in conversation.
               Be [friendly/professional/casual] in your responses.
               [Add any specific instructions about how the AI should respond]`
    }
  ];
}
```

### Customizing Lead Generation Behavior

To change when the lead form appears, modify the `shouldShowLeadForm` function in `frontend/js/chatbot.js`:

```javascript
function shouldShowLeadForm(message) {
  // Add or modify keywords that trigger the lead form
  const leadKeywords = [
    'email address',
    'contact information',
    'contact details',
    'your email',
    'your name',
    'contact you',
    'reach you',
    'provide your',
    // Add your custom triggers here
    'get a quote',
    'speak to a representative',
    'learn more about pricing'
  ];
  
  const lowerMessage = message.toLowerCase();
  return leadKeywords.some(keyword => lowerMessage.includes(keyword));
}
```

### Customizing the Lead Form

To modify the fields in the lead form, update the HTML in your integration:

```html
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
        <!-- Add additional fields as needed -->
        <div class="form-group">
            <label for="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone">
        </div>
        <div class="form-group">
            <label for="company">Company</label>
            <input type="text" id="company" name="company">
        </div>
        <button type="submit" class="submit-btn">Submit</button>
    </form>
</div>
```

Then update the `handleLeadSubmission` function in `frontend/js/chatbot.js` to handle the new fields:

```javascript
async function handleLeadSubmission(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone')?.value.trim() || '';
    const company = document.getElementById('company')?.value.trim() || '';
    
    if (!name || !email) return;
    
    try {
        // Send lead information to backend
        const response = await fetch(`${config.apiUrl}/api/lead`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                company
            })
        });
        
        // ... rest of the function
    } catch (error) {
        // ... error handling
    }
}
```

Also update the backend `leadController.js` to handle the new fields.

## Advanced Customization

### Adding Custom Animations

To add custom animations, you can modify the CSS animations in `frontend/css/styles.css`:

```css
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Add your custom animations here */
@keyframes pulseEffect {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
}

/* Apply your custom animation */
.chat-launcher:hover {
    animation: pulseEffect 1s infinite;
}
```

### Adding Sound Effects

To add sound effects for messages:

1. Add audio elements to your HTML:
   ```html
   <audio id="message-sent-sound" src="path/to/sent-sound.mp3" preload="auto"></audio>
   <audio id="message-received-sound" src="path/to/received-sound.mp3" preload="auto"></audio>
   ```

2. Modify the JavaScript to play sounds:
   ```javascript
   function addUserMessage(message) {
       // ... existing code
       
       // Play sound
       document.getElementById('message-sent-sound').play().catch(e => console.log('Sound play failed:', e));
   }
   
   function addBotMessage(message) {
       // ... existing code
       
       // Play sound
       document.getElementById('message-received-sound').play().catch(e => console.log('Sound play failed:', e));
   }
   ```

### Adding Analytics

To track chatbot usage:

1. Add a function to track events:
   ```javascript
   function trackEvent(eventName, eventData = {}) {
       // If you're using Google Analytics
       if (window.gtag) {
           gtag('event', eventName, eventData);
       }
       
       // If you're using a custom analytics solution
       console.log('Chatbot event:', eventName, eventData);
       
       // You can also send events to your backend
       fetch(`${config.apiUrl}/api/analytics`, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({
               event: eventName,
               data: eventData,
               timestamp: new Date().toISOString()
           })
       }).catch(e => console.error('Analytics error:', e));
   }
   ```

2. Call this function at key points:
   ```javascript
   function openChat() {
       // ... existing code
       trackEvent('chatbot_opened');
   }
   
   function sendMessage() {
       // ... existing code
       trackEvent('message_sent', { messageLength: message.length });
   }
   
   function handleLeadSubmission(e) {
       // ... existing code
       trackEvent('lead_submitted', { hasEmail: !!email, hasName: !!name });
   }
   ```

## Testing Your Customizations

After making customizations:

1. Test the appearance in different browsers (Chrome, Firefox, Safari, Edge)
2. Test on mobile devices to ensure responsive design works
3. Test with different message lengths to ensure the layout handles them properly
4. Verify that all functionality still works as expected

Remember to back up your original files before making significant changes, so you can revert if needed.
