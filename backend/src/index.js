require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/database');
const apiRoutes = require('./routes/api');
const { errorHandler, requestLogger } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
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

// API routes
app.use('/api', apiRoutes);

// Root route
app.get('/', (req, res) => {
    res.json({
        name: 'Veterinary Chatbot API',
        version: '1.0.0',
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
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
