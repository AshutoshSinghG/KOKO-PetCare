const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['user', 'assistant'],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const conversationSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    messages: [messageSchema],
    context: {
        userId: String,
        userName: String,
        petName: String,
        source: String
    },
    // Track appointment booking state
    bookingState: {
        isActive: {
            type: Boolean,
            default: false
        },
        currentStep: {
            type: String,
            enum: ['idle', 'asking_owner', 'asking_pet', 'asking_phone', 'asking_datetime', 'confirming'],
            default: 'idle'
        },
        collectedData: {
            ownerName: String,
            petName: String,
            phone: String,
            preferredDateTime: String
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Conversation', conversationSchema);
