# OpenAI API Setup Guide

This guide will walk you through the process of setting up an OpenAI API key for the AI chatbot.

## Step 1: Create an OpenAI Account

1. Go to [OpenAI's website](https://openai.com/)
2. Click on "Sign Up" in the top right corner
3. Follow the registration process to create an account
4. Verify your email address

## Step 2: Subscribe to a Paid Plan (Required for API Access)

As of 2025, OpenAI requires a paid subscription to access their API:

1. Log in to your OpenAI account
2. Navigate to the [API section](https://platform.openai.com/)
3. Click on "Upgrade" or "Subscribe"
4. Choose a plan that fits your needs
5. Enter your payment information
6. Complete the subscription process

## Step 3: Create an API Key

1. Go to the [API Keys page](https://platform.openai.com/api-keys)
2. Click on "Create new secret key"
3. Give your key a name (e.g., "AI Chatbot")
4. Click "Create secret key"
5. Copy your API key immediately - you won't be able to see it again!

## Step 4: Configure Your .env File

1. Open your project's `.env` file
2. Add your OpenAI API key:

```
OPENAI_API_KEY=your_api_key_here
```

## Step 5: Understand Usage and Billing

1. Be aware that using the OpenAI API incurs costs based on:
   - The model you use (GPT-4 is more expensive than older models)
   - The number of tokens processed (both input and output)
   - The volume of requests

2. Set up usage limits to avoid unexpected charges:
   - Go to the [Usage Limits page](https://platform.openai.com/account/billing/limits)
   - Set a hard limit on your monthly spending

3. Monitor your usage:
   - Regularly check the [Usage page](https://platform.openai.com/account/usage)
   - Adjust your implementation if costs are higher than expected

## Step 6: Test Your Integration

Once you've completed these steps, your AI chatbot should be able to communicate with the OpenAI API. Test it by:

1. Starting your backend server
2. Opening the chatbot in your browser
3. Sending a test message
4. Verifying that you receive an appropriate response

## Troubleshooting

If you encounter issues with the OpenAI API integration:

1. Check that your API key is correctly formatted in the `.env` file
2. Verify that your OpenAI account has an active subscription
3. Ensure you haven't exceeded your usage limits
4. Check the server logs for any error messages
5. Make sure you're using a supported model name in your code

## Security Best Practices

1. Never expose your API key in client-side code
2. Store your API key securely in environment variables
3. Don't commit your `.env` file to version control
4. Rotate your API keys periodically
5. Set appropriate usage limits to prevent unexpected charges

## Additional Resources

- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
- [OpenAI Pricing](https://openai.com/pricing)
- [OpenAI Usage Policies](https://openai.com/policies/usage-policies)
