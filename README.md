# Veterinary Chatbot SDK

A website-integrable chatbot SDK that answers veterinary questions and books appointments using Google Gemini AI.

![Demo](https://img.shields.io/badge/demo-live-brightgreen) ![Node.js](https://img.shields.io/badge/node-%3E%3D18-blue) ![License](https://img.shields.io/badge/license-MIT-green)

## Features

- **Plug-and-Play SDK**: Single script tag integration
- **AI-Powered Q&A**: Answers veterinary questions using Google Gemini
- **Appointment Booking**: Conversational flow for booking vet appointments
- **Context Support**: Pass user/pet info for personalized experience
- **Modern UI**: Floating widget with smooth animations
- **MongoDB Storage**: Persists conversations and appointments

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Google Gemini API key

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd KOKO

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Configuration

1. Copy environment template:
```bash
cd backend
cp .env.example .env
```

2. Update `.env` with your values:
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/vet-chatbot
GEMINI_API_KEY=your_gemini_api_key
```

### Running

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend (development)
cd frontend
npm run dev
```

### Build SDK for Production

```bash
cd frontend
npm run build:sdk
# Output: frontend/dist/sdk/chatbot.js
```

## Integration

### Basic Integration

```html
<script src="https://your-domain.com/chatbot.js"></script>
```

### With Configuration

```html
<script>
  window.VetChatbotConfig = {
    userId: "user_123",
    userName: "John Doe",
    petName: "Buddy",
    source: "marketing-website",
    apiUrl: "https://your-api.com"
  };
</script>
<script src="https://your-domain.com/chatbot.js"></script>
```

## Architecture

```
KOKO/
├── backend/                 # Node.js + Express API
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Error handling, logging
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API routes
│   │   └── services/       # Gemini AI, Appointment logic
│   └── .env.example
│
├── frontend/               # React chatbot widget
│   ├── src/
│   │   ├── components/     # ChatWidget components
│   │   ├── sdk/            # SDK entry point
│   │   └── styles/         # Widget CSS
│   └── vite.config.js      # SDK bundling config
│
└── demo/                   # Demo integration page
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat/session` | Create new chat session |
| POST | `/api/chat/message` | Send message, get AI response |
| GET | `/api/chat/history/:sessionId` | Get conversation history |
| GET | `/api/appointments/:sessionId` | Get session appointments |
| GET | `/api/appointments` | Get all appointments (admin) |
| GET | `/api/health` | Health check |

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| **Session-based conversations** | Stateless API design enables horizontal scaling |
| **State machine for booking** | Clear flow, easy validation, resumable booking |
| **Vite library mode** | Optimized SDK bundle with tree-shaking |
| **Inline SDK styles** | Single file bundle, no external CSS dependency |
| **Gemini intent detection** | Leverages AI for natural language booking triggers |

## Trade-offs & Assumptions

### Assumptions
- Users have modern browsers (ES6+ support)
- MongoDB is available (local or cloud)
- Gemini API rate limits are sufficient

### Trade-offs
- **Inline styles in SDK**: Larger bundle but simpler integration
- **Session in memory for booking state**: Simplicity over distributed state
- **Basic phone validation**: Allows flexibility over strict validation

## Future Improvements

- [ ] WebSocket support for real-time updates
- [ ] Admin dashboard for appointment management
- [ ] Multi-language support (i18n)
- [ ] Voice input capability
- [ ] Rate limiting and API key authentication
- [ ] Docker containerization
- [ ] E2E tests with Playwright
- [ ] Webhook notifications for new appointments

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Backend server port | 3001 |
| `MONGODB_URI` | MongoDB connection string | localhost |
| `GEMINI_API_KEY` | Google Gemini API key | Required |
| `NODE_ENV` | Environment mode | development |
| `FRONTEND_URL` | Frontend URL for CORS | localhost:5173 |

## License

MIT
