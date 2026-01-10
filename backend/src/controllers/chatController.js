const { v4: uuidv4 } = require('uuid');
const Conversation = require('../models/Conversation');
const geminiService = require('../services/geminiService');
const appointmentService = require('../services/appointmentService');

// Create a new chat session
exports.createSession = async (req, res) => {
    try {
        const { context } = req.body;
        const sessionId = uuidv4();

        const conversation = new Conversation({
            sessionId,
            messages: [],
            context: context || {},
            bookingState: {
                isActive: false,
                currentStep: 'idle',
                collectedData: {}
            }
        });

        await conversation.save();

        res.status(201).json({
            success: true,
            sessionId,
            message: 'Session created successfully'
        });
    } catch (error) {
        console.error('Create session error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create session'
        });
    }
};

// Send a message and get AI response
exports.sendMessage = async (req, res) => {
    try {
        const { sessionId, message } = req.body;

        if (!sessionId || !message) {
            return res.status(400).json({
                success: false,
                error: 'Session ID and message are required'
            });
        }

        // Find or create conversation
        let conversation = await Conversation.findOne({ sessionId });

        if (!conversation) {
            conversation = new Conversation({
                sessionId,
                messages: [],
                context: req.body.context || {}
            });
        }

        // Add user message
        conversation.messages.push({
            role: 'user',
            content: message,
            timestamp: new Date()
        });

        let botResponse;
        let appointmentData = null;

        // Check if we're in booking flow
        if (conversation.bookingState && conversation.bookingState.isActive) {
            // Process booking step
            const bookingResult = await appointmentService.processBookingStep(conversation, message);
            botResponse = bookingResult.response;
            if (bookingResult.appointment) {
                appointmentData = bookingResult.appointment;
            }
        } else {
            // Check for appointment intent or use Gemini
            const hasAppointmentIntent = geminiService.detectAppointmentIntent(message);

            if (hasAppointmentIntent) {
                // Start booking flow
                const bookingResult = appointmentService.startBooking(conversation);
                botResponse = bookingResult.response;
            } else {
                // Get AI response
                const recentMessages = conversation.messages.slice(-10); // Last 10 messages for context
                const aiResult = await geminiService.generateResponse(message, recentMessages);

                if (aiResult.isAppointmentIntent) {
                    // AI detected appointment intent
                    const bookingResult = appointmentService.startBooking(conversation);
                    botResponse = bookingResult.response;
                } else {
                    botResponse = aiResult.response;
                }
            }
        }

        // Add bot response to conversation
        conversation.messages.push({
            role: 'assistant',
            content: botResponse,
            timestamp: new Date()
        });

        await conversation.save();

        res.json({
            success: true,
            response: botResponse,
            sessionId,
            isBookingActive: conversation.bookingState?.isActive || false,
            appointment: appointmentData
        });
    } catch (error) {
        console.error('Send message error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to process message'
        });
    }
};

// Get conversation history
exports.getHistory = async (req, res) => {
    try {
        const { sessionId } = req.params;

        const conversation = await Conversation.findOne({ sessionId });

        if (!conversation) {
            return res.status(404).json({
                success: false,
                error: 'Conversation not found'
            });
        }

        res.json({
            success: true,
            messages: conversation.messages,
            context: conversation.context
        });
    } catch (error) {
        console.error('Get history error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve history'
        });
    }
};

// Get appointments for a session
exports.getAppointments = async (req, res) => {
    try {
        const { sessionId } = req.params;

        const appointments = await appointmentService.getAppointmentsBySession(sessionId);

        res.json({
            success: true,
            appointments
        });
    } catch (error) {
        console.error('Get appointments error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve appointments'
        });
    }
};

// Get all appointments (admin)
exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await appointmentService.getAllAppointments();

        res.json({
            success: true,
            appointments,
            total: appointments.length
        });
    } catch (error) {
        console.error('Get all appointments error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve appointments'
        });
    }
};
