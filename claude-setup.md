# Claude API Setup Guide

This guide will walk you through the process of setting up an Anthropic Claude API key for the AI chatbot.

## Step 1: Create an Anthropic Account

1. Go to [Anthropic's website](https://www.anthropic.com/)
2. Click on "Sign Up" or "Get Started"
3. Follow the registration process to create an account
4. Verify your email address

## Step 2: Subscribe to Claude API Access

As of 2025, Anthropic requires a subscription to access their API:

1. Log in to your Anthropic account
2. Navigate to the API section (typically at console.anthropic.com)
3. Choose a plan that fits your needs:
   - Developer tier for small-scale applications
   - Business tier for production applications
   - Enterprise tier for high-volume usage
4. Enter your payment information
5. Complete the subscription process

## Step 3: Create an API Key

1. Go to the API Keys page in your Anthropic console
2. Click on "Create new API key"
3. Give your key a name (e.g., "AI Chatbot")
4. Set any usage limits if desired
5. Click "Create API key"
6. Copy your API key immediately - you won't be able to see it again!

## Step 4: Configure Your .env File

1. Open your project's `.env` file
2. Add your Claude API key:

```
CLAUDE_API_KEY=your_claude_api_key_here
```

## Step 5: Understand Usage and Billing

1. Be aware that using the Claude API incurs costs based on:
   - The model you use (Claude 3 Opus is more expensive than Haiku or Sonnet)
   - The number of tokens processed (both input and output)
   - The volume of requests

2. Set up usage limits to avoid unexpected charges:
   - Go to the API Keys section in your Anthropic console
   - Set limits on your API key usage
   - Consider setting up billing alerts

3. Monitor your usage:
   - Regularly check the Usage page in your Anthropic console
   - Adjust your implementation if costs are higher than expected

## Step 6: Test Your Integration

Once you've completed these steps, your AI chatbot should be able to communicate with the Claude API. Test it by:

1. Starting your backend server
2. Opening the chatbot in your browser
3. Sending a test message
4. Verifying that you receive an appropriate response

## Troubleshooting

If you encounter issues with the Claude API integration:

1. Check that your API key is correctly formatted in the `.env` file
2. Verify that your Anthropic account has an active subscription
3. Ensure you haven't exceeded your usage limits
4. Check the server logs for any error messages
5. Make sure you're using a supported model name in your code
6. Verify that your message format follows Claude's API requirements

## Security Best Practices

1. Never expose your API key in client-side code
2. Store your API key securely in environment variables
3. Don't commit your `.env` file to version control
4. Rotate your API keys periodically
5. Set appropriate usage limits to prevent unexpected charges
6. Use the minimum required permissions for your API keys

## Claude Model Options

Claude offers several model options with different capabilities and price points:

1. **Claude 3 Opus**: The most capable model, best for complex tasks requiring deep understanding
2. **Claude 3 Sonnet**: A balanced model for most applications, offering good performance at a lower cost
3. **Claude 3 Haiku**: The fastest and most cost-effective model, suitable for simpler tasks

Choose the model that best fits your needs and budget.

## Additional Resources

- [Anthropic API Documentation](https://docs.anthropic.com/claude/reference/)
- [Claude API Pricing](https://www.anthropic.com/api)
- [Claude Usage Policies](https://www.anthropic.com/policies)
- [Claude Model Comparison](https://www.anthropic.com/claude)
