const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        index: true
    },
    ownerName: {
        type: String,
        required: true,
        trim: true
    },
    petName: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    preferredDateTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    notes: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);
