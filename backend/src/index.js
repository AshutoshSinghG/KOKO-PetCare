require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/database');
const apiRoutes = require('./routes/api');
const { errorHandler, requestLogger } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Security middleware - configured for SDK usage
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: false // Disable CSP for SDK script loading
}));

// CORS configuration - allow all origins for SDK usage
app.use(cors({
    origin: true, // Allow all origins for SDK
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Session-Id']
}));

// Body parser
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use(requestLogger);

// =====================================================
// SDK STATIC FILE SERVING
// Serves the chatbot.js SDK for script-tag integration
// =====================================================

// Serve SDK from frontend/dist/sdk directory
const sdkPath = path.join(__dirname, '../../frontend/dist/sdk');
app.use('/sdk', express.static(sdkPath, {
    setHeaders: (res, filePath) => {
        // Set CORS headers for SDK file
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 'public, max-age=3600');

        // Set correct content type for JS
        if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

// Fallback route for SDK - check if file exists and provide helpful error
app.get('/sdk/chatbot.js', (req, res) => {
    const chatbotPath = path.join(sdkPath, 'chatbot.js');

    if (!fs.existsSync(chatbotPath)) {
        res.status(404).json({
            error: 'SDK not built',
            message: 'Run "npm run build:sdk" in the frontend directory to build the SDK',
            command: 'cd frontend && npm run build:sdk'
        });
        return;
    }

    res.sendFile(chatbotPath);
});

// API routes
app.use('/api', apiRoutes);

// Root route with SDK documentation
app.get('/', (req, res) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    res.json({
        name: 'Veterinary Chatbot API',
        version: '1.0.0',
        sdk: {
            url: `${baseUrl}/sdk/chatbot.js`,
            integration: {
                basic: `<script src="${baseUrl}/sdk/chatbot.js"></script>`,
                withConfig: `<script>
  window.VetChatbotConfig = {
    userId: "user_123",
    userName: "John Doe",
    petName: "Buddy",
    apiUrl: "${baseUrl}"
  };
</script>
<script src="${baseUrl}/sdk/chatbot.js"></script>`
            }
        },
        endpoints: {
            health: '/api/health',
            createSession: 'POST /api/chat/session',
            sendMessage: 'POST /api/chat/message',
            getHistory: 'GET /api/chat/history/:sessionId',
            getAppointments: 'GET /api/appointments/:sessionId',
            getAllAppointments: 'GET /api/appointments'
        }
    });
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Vet Chatbot API running on port ${PORT}`);
    console.log(`SDK available at: http://localhost:${PORT}/sdk/chatbot.js`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
