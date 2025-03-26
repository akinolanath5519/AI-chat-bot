/**
 * AI Chatbot Widget - Demo Mode
 * This script provides a demo version of the chatbot that works without a backend
 * It simulates responses for testing the UI and appearance
 */

// Configuration
const DEMO_CONFIG = {
    theme: 'light',
    initialMessage: "Hello! I'm your AI assistant in demo mode. I can show you how the chatbot interface works, but I'm not connected to a real AI backend.",
    typingDelay: true,
};

// Demo responses for testing
const DEMO_RESPONSES = [
    "I'm a demo version of the AI chatbot. In the real version, I would be powered by Anthropic's Claude.",
    "This is a demonstration of the chat interface. The actual chatbot would provide more intelligent responses based on your questions.",
    "In the full version, I can help with customer support and collect lead information when appropriate.",
    "You can customize my appearance and behavior to match your brand and specific needs.",
    "To set up the full version, you'll need to configure the backend with your Claude API key and other credentials.",
    "The chatbot can be integrated into any website by adding a few lines of HTML, CSS, and JavaScript.",
    "Would you like to provide your name, email, and phone number for a demonstration of the lead collection feature?",
    "Thank you for trying out the demo! To implement the full version, follow the instructions in the README file."
];

// State management
let config = { ...DEMO_CONFIG };
let isChatOpen = false;
let isMinimized = false;
let isWaitingForResponse = false;
let responseIndex = 0;

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
function initDemoMode(customConfig = {}) {
    config = { ...DEMO_CONFIG, ...customConfig };
    
    // Apply theme if specified
    if (config.theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    // Add demo mode indicator
    const demoIndicator = document.createElement('div');
    demoIndicator.className = 'demo-indicator';
    demoIndicator.textContent = 'DEMO MODE';
    document.querySelector('.chatbot-header').appendChild(demoIndicator);
    
    // Add demo mode styles
    const style = document.createElement('style');
    style.textContent = `
        .demo-indicator {
            position: absolute;
            top: 5px;
            right: 100px;
            background-color: #ff5722;
            color: white;
            font-size: 10px;
            padding: 2px 6px;
            border-radius: 10px;
            font-weight: bold;
        }
    `;
    document.head.appendChild(style);
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
    
    // Clear any existing messages
    chatMessages.innerHTML = '';
    
    // Add initial message
    addBotMessage(config.initialMessage);
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
 * Send user message and get demo response
 */
function sendMessage() {
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
    
    // Simulate API delay
    setTimeout(() => {
        // Remove typing indicator
        if (config.typingDelay) {
            removeTypingIndicator();
        }
        
        // Get demo response
        const response = DEMO_RESPONSES[responseIndex];
        responseIndex = (responseIndex + 1) % DEMO_RESPONSES.length;
        
        // Add bot response to chat
        addBotMessage(response);
        
        // Check if the message contains a request for lead information
        if (response.toLowerCase().includes('name, email, and phone')) {
            showLeadForm();
        }
        
        isWaitingForResponse = false;
    }, 1500);
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
function handleLeadSubmission(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
    if (!name || !email) return;
    
    // Hide the form
    hideLeadForm();
    
    // Add confirmation message
    addBotMessage(`Thank you, ${name}! In the full version, your information would be saved to a Google Sheet and an email notification would be sent. How else can I help you today?`);
    
    // Clear form fields
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
}

// Export the initialization function for external use
window.initDemoMode = initDemoMode;
