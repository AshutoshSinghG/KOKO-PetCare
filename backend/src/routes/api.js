const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Session routes
router.post('/chat/session', chatController.createSession);

// Message routes
router.post('/chat/message', chatController.sendMessage);

// History routes
router.get('/chat/history/:sessionId', chatController.getHistory);

// Appointment routes
router.get('/appointments/:sessionId', chatController.getAppointments);
router.get('/appointments', chatController.getAllAppointments);

// Health check
router.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'vet-chatbot-api'
    });
});

module.exports = router;
