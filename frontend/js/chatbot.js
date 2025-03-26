/**
 * AI Chatbot Widget
 * This script handles the functionality of the AI chatbot widget
 */

// Configuration (can be overridden when initializing)
const DEFAULT_CONFIG = {
    apiUrl: 'http://localhost:3000/chat', // Default API URL (should be changed in production)
    theme: 'light', // Theme: 'light' or 'dark'
    initialMessage: "Hello! I'm your AI assistant. How can I help you today?",
    typingDelay: true, // Show typing indicator
};

// State management
let config = { ...DEFAULT_CONFIG };
let sessionId = generateSessionId();
let isChatOpen = false;
let isMinimized = false;
let isWaitingForResponse = false;

// DOM Elements
let chatWidget;
let chatLauncher;
let chatMessages;
let userInput;
let sendButton;
let minimizeButton;
let closeButton;
let leadForm;

// Initialize the chatbot when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initElements();
    setupEventListeners();
});

/**
 * Initialize chatbot with custom configuration
 * @param {Object} customConfig - Custom configuration options
 */
function initChatbot(customConfig = {}) {
    config = { ...DEFAULT_CONFIG, ...customConfig };
    
    // Apply theme if specified
    if (config.theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
}

/**
 * Initialize DOM elements
 */
function initElements() {
    chatWidget = document.getElementById('chatbot-widget');
    chatLauncher = document.getElementById('chat-launcher');
    chatMessages = document.getElementById('chat-messages');
    userInput = document.getElementById('user-input');
    sendButton = document.getElementById('send-btn');
    minimizeButton = document.getElementById('minimize-btn');
    closeButton = document.getElementById('close-btn');
    leadForm = document.getElementById('lead-form');
    
    // Clear any existing messages except the first one
    while (chatMessages.children.length > 1) {
        chatMessages.removeChild(chatMessages.lastChild);
    }
    
    // Set initial message if there are no messages
    if (chatMessages.children.length === 0) {
        addBotMessage(config.initialMessage);
    }
}

/**
 * Set up event listeners for chat interactions
 */
function setupEventListeners() {
    // Chat launcher button
    chatLauncher.addEventListener('click', toggleChat);
    
    // Send button
    sendButton.addEventListener('click', sendMessage);
    
    // Enter key in input field
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Auto-resize textarea
    userInput.addEventListener('input', () => {
        userInput.style.height = 'auto';
        userInput.style.height = (userInput.scrollHeight < 100) ? 
            `${userInput.scrollHeight}px` : '100px';
    });
    
    // Minimize button
    minimizeButton.addEventListener('click', toggleMinimize);
    
    // Close button
    closeButton.addEventListener('click', closeChat);
    
    // Lead form submission
    document.getElementById('user-info-form').addEventListener('submit', handleLeadSubmission);
}

/**
 * Toggle chat widget open/closed
 */
function toggleChat() {
    if (isChatOpen) {
        closeChat();
    } else {
        openChat();
    }
}

/**
 * Open the chat widget
 */
function openChat() {
    chatWidget.classList.add('active');
    isChatOpen = true;
    isMinimized = false;
    chatWidget.classList.remove('minimized');
}

/**
 * Close the chat widget
 */
function closeChat() {
    chatWidget.classList.remove('active');
    isChatOpen = false;
}

/**
 * Toggle minimize state of chat widget
 */
function toggleMinimize() {
    if (isMinimized) {
        chatWidget.classList.remove('minimized');
        isMinimized = false;
    } else {
        chatWidget.classList.add('minimized');
        isMinimized = true;
    }
}

/**
 * Send user message to the backend
 */
async function sendMessage() {
    const message = userInput.value.trim();
    
    if (message === '' || isWaitingForResponse) return;
    
    // Add user message to chat
    addUserMessage(message);
    
    // Clear input field
    userInput.value = '';
    userInput.style.height = 'auto';
    
    // Show typing indicator
    if (config.typingDelay) {
        showTypingIndicator();
    }
    
    isWaitingForResponse = true;
    
    try {
        // Send message to backend
        const response = await fetch(`${config.apiUrl}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message,
                sessionId
            })
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        // Remove typing indicator
        if (config.typingDelay) {
            removeTypingIndicator();
        }
        
        // Add bot response to chat
        addBotMessage(data.message);
        
        // Check if the message contains a request for lead information
        if (shouldShowLeadForm(data.message)) {
            showLeadForm();
        }
        
    } catch (error) {
        console.error('Error sending message:', error);
        
        // Remove typing indicator
        if (config.typingDelay) {
            removeTypingIndicator();
        }
        
        // Show error message
        addBotMessage("I'm sorry, I'm having trouble connecting to the server. Please try again later.");
    }
    
    isWaitingForResponse = false;
}

/**
 * Add a user message to the chat
 * @param {string} message - The message text
 */
function addUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message user-message';
    
    const contentElement = document.createElement('div');
    contentElement.className = 'message-content';
    contentElement.textContent = message;
    
    messageElement.appendChild(contentElement);
    chatMessages.appendChild(messageElement);
    
    // Scroll to bottom
    scrollToBottom();
}

/**
 * Add a bot message to the chat
 * @param {string} message - The message text
 */
function addBotMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.className = 'message bot-message';
    
    const contentElement = document.createElement('div');
    contentElement.className = 'message-content';
    contentElement.textContent = message;
    
    messageElement.appendChild(contentElement);
    chatMessages.appendChild(messageElement);
    
    // Scroll to bottom
    scrollToBottom();
}

/**
 * Show typing indicator while waiting for bot response
 */
function showTypingIndicator() {
    const typingElement = document.createElement('div');
    typingElement.className = 'typing-indicator';
    typingElement.id = 'typing-indicator';
    
    for (let i = 0; i < 3; i++) {
        const dotElement = document.createElement('span');
        typingElement.appendChild(dotElement);
    }
    
    chatMessages.appendChild(typingElement);
    scrollToBottom();
}

/**
 * Remove typing indicator
 */
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

/**
 * Scroll chat messages to the bottom
 */
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * Generate a unique session ID
 * @returns {string} - A unique session ID
 */
function generateSessionId() {
    return 'session_' + Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
}

/**
 * Check if the bot message is asking for lead information
 * @param {string} message - The bot message
 * @returns {boolean} - True if the message is asking for lead information
 */
function shouldShowLeadForm(message) {
    // Simple heuristic: check if the message contains keywords related to contact information
    const leadKeywords = [
        'email address',
        'contact information',
        'contact details',
        'your email',
        'your name',
        'your phone',
        'phone number',
        'contact you',
        'reach you',
        'provide your',
        'call you'
    ];
    
    const lowerMessage = message.toLowerCase();
    return leadKeywords.some(keyword => lowerMessage.includes(keyword));
}

/**
 * Show the lead collection form
 */
function showLeadForm() {
    leadForm.classList.remove('hidden');
}

/**
 * Hide the lead collection form
 */
function hideLeadForm() {
    leadForm.classList.add('hidden');
}

/**
 * Handle lead form submission
 * @param {Event} e - The form submission event
 */
async function handleLeadSubmission(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
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
                phone
            })
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        // Hide the form
        hideLeadForm();
        
        // Add confirmation message
        addBotMessage(`Thank you, ${name}! I've received your information and our team will get back to you soon. How else can I help you today?`);
        
        // Clear form fields
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';
        
    } catch (error) {
        console.error('Error submitting lead:', error);
        addBotMessage("I'm sorry, I couldn't save your information. Please try again later.");
    }
}

// Export the initialization function for external use
window.initChatbot = initChatbot;
