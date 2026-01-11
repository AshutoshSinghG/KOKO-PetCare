# Veterinary Chatbot SDK - Integration Guide

```html
#Backend URL = https://koko-petcare.onrender.com
```

## Quick Start

Add the chatbot to any website with a single script tag:

```html
<script src="https://your-backend-url.com/sdk/chatbot.js"></script>
```

That's it! The floating chat widget will automatically appear in the bottom-right corner.

---

## Integration Options

### Option 1: Basic Integration (No Configuration)

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
</head>
<body>
    <!-- Your website content -->
    <h1>Welcome to My Pet Store</h1>
    
    <!-- Add chatbot - just this one line! -->
    <script src="https://your-backend-url.com/sdk/chatbot.js"></script>
</body>
</html>
```

### Option 2: With User Context

Pass user/pet information for personalized experience:

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
</head>
<body>
    <!-- Your website content -->
    
    <!-- Step 1: Configure context (BEFORE the SDK script) -->
    <script>
        window.VetChatbotConfig = {
            userId: "user_123",
            userName: "John Doe",
            petName: "Buddy",
            source: "my-website",
            apiUrl: "https://your-backend-url.com"
        };
    </script>
    
    <!-- Step 2: Load the SDK -->
    <script src="https://your-backend-url.com/sdk/chatbot.js"></script>
</body>
</html>
```

---

## Configuration Options

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `userId` | string | No | Unique identifier for the user |
| `userName` | string | No | Name of the pet owner |
| `petName` | string | No | Name of the user's pet |
| `source` | string | No | Source/page where chatbot is embedded |
| `apiUrl` | string | Yes* | Backend API URL (*required for production) |

---

## SDK URLs

### Development (Local)
```
http://localhost:3001/sdk/chatbot.js
```

### Production (After Deployment)
```
https://your-render-app.onrender.com/sdk/chatbot.js
```

---

## Features

✅ **Veterinary Q&A** - AI-powered answers about pet health  
✅ **Appointment Booking** - Conversational booking flow  
✅ **Responsive Design** - Works on desktop and mobile  
✅ **Auto-initialization** - No JavaScript coding required  
✅ **Context Support** - Pass user data for personalization  

---

## Testing Locally

1. Start the backend:
   ```bash
   cd backend
   npm run dev
   ```

2. Build the SDK:
   ```bash
   cd frontend
   npm run build:sdk
   ```

3. Open demo files in browser:
   - `demo/basic-integration.html`
   - `demo/context-integration.html`

---

## Troubleshooting

### SDK not loading?
- Ensure backend is running
- Run `npm run build:sdk` in frontend directory
- Check browser console for errors

### CORS errors?
- The backend allows all origins by default
- Verify `apiUrl` in config matches your backend

### Chat not responding?
- Verify `GEMINI_API_KEY` is set in backend `.env`
- Check backend logs for errors
