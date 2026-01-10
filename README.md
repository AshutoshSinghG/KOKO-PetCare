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

### Running Locally

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

## Deployment

### Backend on Render

1. **Create account** at [render.com](https://render.com)

2. **Create Web Service** → Connect GitHub repo

3. **Configure**:
   | Setting | Value |
   |---------|-------|
   | Name | `vet-chatbot-api` |
   | Root Directory | `backend` |
   | Runtime | Node |
   | Build Command | `npm install` |
   | Start Command | `npm start` |

4. **Environment Variables**:
   ```
   PORT=3001
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://your-atlas-uri
   GEMINI_API_KEY=your-key
   FRONTEND_URL=https://your-vercel-app.vercel.app
   ```

5. **Deploy** → Get URL: `https://vet-chatbot-api.onrender.com`

---

### Frontend/SDK on Vercel

1. **Create account** at [vercel.com](https://vercel.com)

2. **Import repository** → Select repo

3. **Configure**:
   | Setting | Value |
   |---------|-------|
   | Framework | Vite |
   | Root Directory | `frontend` |
   | Build Command | `npm run build:sdk` |
   | Output Directory | `dist/sdk` |

4. **Environment Variable**:
   ```
   VITE_API_URL=https://vet-chatbot-api.onrender.com
   ```

5. **Deploy** → Get URL: `https://your-app.vercel.app/chatbot.js`

---

### MongoDB Atlas Setup

1. Create free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create database user
3. Whitelist `0.0.0.0/0` for Render access
4. Copy connection string → Add to Render env vars

---

### Final Integration

```html
<script>
  window.VetChatbotConfig = {
    apiUrl: "https://vet-chatbot-api.onrender.com"
  };
</script>
<script src="https://your-app.vercel.app/chatbot.js"></script>
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
│   │   ├── components/     # ChatWidget, HomePage
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
| **Session-based conversations** | Stateless API enables horizontal scaling |
| **State machine for booking** | Clear flow, easy validation, resumable |
| **Vite library mode** | Optimized SDK bundle with tree-shaking |
| **Inline SDK styles** | Single file, no external CSS dependency |
| **Gemini intent detection** | Natural language booking triggers |

## Trade-offs & Assumptions

### Assumptions
- Modern browsers (ES6+ support)
- MongoDB available (local or cloud)
- Gemini API rate limits sufficient

### Trade-offs
- **Inline styles**: Larger bundle but simpler integration
- **Session in memory**: Simplicity over distributed state
- **Basic validation**: Flexibility over strict rules

## Future Improvements

- [ ] WebSocket for real-time updates
- [ ] Admin dashboard
- [ ] Multi-language support
- [ ] Voice input
- [ ] Rate limiting & API auth
- [ ] Docker setup
- [ ] E2E tests

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Backend port | 3001 |
| `MONGODB_URI` | MongoDB connection | localhost |
| `GEMINI_API_KEY` | Gemini API key | Required |
| `NODE_ENV` | Environment | development |
| `FRONTEND_URL` | Frontend URL for CORS | localhost:5173 |

## License

MIT
