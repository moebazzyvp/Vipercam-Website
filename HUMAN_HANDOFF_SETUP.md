# Human Handoff System Setup Guide

## Overview
This system allows the AI chat to automatically escalate conversations to human support staff via SMS and email notifications. Staff can respond through email or SMS, and their responses will appear in the customer's chat window.

## Features
- ✅ **Smart Detection**: Automatically detects when human help is needed
- ✅ **SMS Notifications**: Instant alerts to staff phones
- ✅ **Email Notifications**: Detailed context via email
- ✅ **Response Routing**: Staff replies flow back to customer chat
- ✅ **Conversation Tracking**: Maintains chat history and context

## Setup Instructions

### 1. Environment Variables
Create a `.env.local` file in your project root with the following variables:

```env
# Staff Contact Information
STAFF_EMAIL=support@vipercam.net
STAFF_PHONE=(313) 800-3871

# Twilio SMS Configuration (Optional)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# Email Service Configuration (Optional)
# Choose one of the following:

# For Gmail:
GMAIL_CLIENT_ID=your_gmail_client_id
GMAIL_CLIENT_SECRET=your_gmail_client_secret
GMAIL_REFRESH_TOKEN=your_gmail_refresh_token

# For SendGrid:
SENDGRID_API_KEY=your_sendgrid_api_key

# For AWS SES:
AWS_SES_ACCESS_KEY_ID=your_aws_access_key
AWS_SES_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_SES_REGION=us-east-1
```

### 2. SMS Service Setup (Twilio Recommended)

1. **Sign up for Twilio**: https://www.twilio.com/
2. **Get your credentials**:
   - Account SID
   - Auth Token
   - Phone number for sending SMS
3. **Add to environment variables**

### 3. Email Service Setup

Choose one of the following options:

#### Option A: Gmail (Free)
1. **Enable Gmail API**: https://console.developers.google.com/
2. **Create OAuth 2.0 credentials**
3. **Generate refresh token**
4. **Add credentials to environment variables**

#### Option B: SendGrid (Recommended for production)
1. **Sign up for SendGrid**: https://sendgrid.com/
2. **Get API key**
3. **Add to environment variables**

#### Option C: AWS SES
1. **Set up AWS SES**: https://aws.amazon.com/ses/
2. **Get access keys**
3. **Add to environment variables**

### 4. Install Dependencies

```bash
npm install twilio @sendgrid/mail nodemailer
```

### 5. API Endpoints

The system creates two main API endpoints:

- **`/api/chat/handoff`**: Handles escalation requests
- **`/api/chat/response`**: Handles staff responses

### 6. How It Works

#### Customer Experience:
1. Customer types in AI chat
2. AI detects need for human help
3. System shows "Connecting to support team..."
4. Customer can continue chatting
5. Staff responses appear in same chat window

#### Staff Experience:
1. **SMS Alert**: Immediate notification with urgency level
2. **Email Alert**: Detailed context with conversation history
3. **Response Options**:
   - Reply to email (recommended)
   - Reply to SMS
   - Use admin dashboard (future feature)

### 7. Handoff Triggers

The AI automatically escalates when:
- Customer asks for "human" or "real person"
- Uses urgent keywords: "emergency", "broken", "not working"
- Has complex/long messages (>200 characters)
- Has 3+ messages in conversation
- Mentions billing, payments, or complaints

### 8. Testing

1. **Start the development server**: `npm run dev`
2. **Visit**: `http://localhost:3000/support`
3. **Test handoff triggers**:
   - Type: "I need to speak to someone"
   - Type: "This is urgent"
   - Type: "My camera is broken"
4. **Check console logs** for notification attempts

### 9. Production Deployment

For production, you'll need:

1. **Database**: Replace in-memory storage with database
2. **WebSocket**: Real-time message delivery
3. **Webhook endpoints**: For email/SMS service callbacks
4. **Rate limiting**: Prevent abuse
5. **Authentication**: Secure staff access

### 10. Customization

#### Modify Handoff Triggers:
Edit the `needsHumanHandoff` function in `components/ai-chat-bubble.tsx`

#### Change Notification Content:
Edit the email and SMS templates in `app/api/chat/handoff/route.ts`

#### Add More Staff Members:
Update the notification logic to send to multiple contacts

## Support

For technical support or questions about this system, contact:
- **Phone**: (313) 800-3871
- **Email**: support@vipercam.net

## Next Steps

1. **Choose your SMS/email providers**
2. **Set up environment variables**
3. **Test the system**
4. **Deploy to production**
5. **Train staff on response procedures**

The system is designed to be flexible and can be easily customized to match your specific workflow and requirements. 