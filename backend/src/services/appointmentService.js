const Appointment = require('../models/Appointment');

// Booking state machine steps
const BOOKING_STEPS = {
    IDLE: 'idle',
    ASKING_OWNER: 'asking_owner',
    ASKING_PET: 'asking_pet',
    ASKING_PHONE: 'asking_phone',
    ASKING_DATETIME: 'asking_datetime',
    CONFIRMING: 'confirming'
};

// Prompts for each step
const STEP_PROMPTS = {
    [BOOKING_STEPS.ASKING_OWNER]: "Great! I'd be happy to help you book a veterinary appointment. Could you please tell me your name (the pet owner's name)?",
    [BOOKING_STEPS.ASKING_PET]: "Thank you! And what is your pet's name?",
    [BOOKING_STEPS.ASKING_PHONE]: "Perfect! Could you please provide your phone number so we can contact you?",
    [BOOKING_STEPS.ASKING_DATETIME]: "Almost done! When would you prefer to schedule the appointment? Please provide your preferred date and time (e.g., 'January 15th at 2 PM' or 'next Monday morning')."
};

class AppointmentService {
    // Validate phone number (basic validation)
    validatePhone(phone) {
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        return /^\+?[\d]{10,15}$/.test(cleanPhone);
    }

    // Start the booking flow
    startBooking(conversation) {
        conversation.bookingState = {
            isActive: true,
            currentStep: BOOKING_STEPS.ASKING_OWNER,
            collectedData: {}
        };
        return {
            response: STEP_PROMPTS[BOOKING_STEPS.ASKING_OWNER],
            bookingState: conversation.bookingState
        };
    }

    // Process user input during booking flow
    async processBookingStep(conversation, userMessage) {
        const { currentStep, collectedData } = conversation.bookingState;

        switch (currentStep) {
            case BOOKING_STEPS.ASKING_OWNER:
                // Store owner name and ask for pet name
                collectedData.ownerName = userMessage.trim();
                conversation.bookingState.currentStep = BOOKING_STEPS.ASKING_PET;
                return {
                    response: STEP_PROMPTS[BOOKING_STEPS.ASKING_PET],
                    bookingState: conversation.bookingState,
                    complete: false
                };

            case BOOKING_STEPS.ASKING_PET:
                // Store pet name and ask for phone
                collectedData.petName = userMessage.trim();
                conversation.bookingState.currentStep = BOOKING_STEPS.ASKING_PHONE;
                return {
                    response: STEP_PROMPTS[BOOKING_STEPS.ASKING_PHONE],
                    bookingState: conversation.bookingState,
                    complete: false
                };

            case BOOKING_STEPS.ASKING_PHONE:
                // Validate and store phone, ask for datetime
                const phone = userMessage.trim();
                if (!this.validatePhone(phone)) {
                    return {
                        response: "That doesn't look like a valid phone number. Please enter a valid phone number (e.g., 1234567890 or +1-234-567-8900).",
                        bookingState: conversation.bookingState,
                        complete: false
                    };
                }
                collectedData.phone = phone;
                conversation.bookingState.currentStep = BOOKING_STEPS.ASKING_DATETIME;
                return {
                    response: STEP_PROMPTS[BOOKING_STEPS.ASKING_DATETIME],
                    bookingState: conversation.bookingState,
                    complete: false
                };

            case BOOKING_STEPS.ASKING_DATETIME:
                // Store datetime and ask for confirmation
                collectedData.preferredDateTime = userMessage.trim();
                conversation.bookingState.currentStep = BOOKING_STEPS.CONFIRMING;
                const confirmationMsg = this.generateConfirmationMessage(collectedData);
                return {
                    response: confirmationMsg,
                    bookingState: conversation.bookingState,
                    complete: false
                };

            case BOOKING_STEPS.CONFIRMING:
                // Check if user confirmed
                const lowerMsg = userMessage.toLowerCase();
                if (lowerMsg.includes('yes') || lowerMsg.includes('confirm') || lowerMsg.includes('correct') || lowerMsg.includes('ok') || lowerMsg.includes('sure')) {
                    // Create the appointment
                    const appointment = await this.createAppointment(conversation.sessionId, collectedData);
                    this.resetBooking(conversation);
                    return {
                        response: `Your appointment has been booked successfully! 🎉\n\nAppointment Details:\n• Pet Owner: ${collectedData.ownerName}\n• Pet Name: ${collectedData.petName}\n• Phone: ${collectedData.phone}\n• Preferred Time: ${collectedData.preferredDateTime}\n\nWe'll contact you to confirm the exact time. Is there anything else I can help you with?`,
                        bookingState: conversation.bookingState,
                        complete: true,
                        appointment
                    };
                } else if (lowerMsg.includes('no') || lowerMsg.includes('cancel') || lowerMsg.includes('wrong')) {
                    this.resetBooking(conversation);
                    return {
                        response: "No problem! The appointment booking has been cancelled. Would you like to start over or is there anything else I can help you with?",
                        bookingState: conversation.bookingState,
                        complete: true,
                        cancelled: true
                    };
                } else {
                    return {
                        response: "Please confirm your appointment by saying 'Yes' or 'Confirm', or say 'No' or 'Cancel' to cancel the booking.",
                        bookingState: conversation.bookingState,
                        complete: false
                    };
                }

            default:
                return null;
        }
    }

    // Generate confirmation message
    generateConfirmationMessage(data) {
        return `Please confirm your appointment details:\n\n• Pet Owner: ${data.ownerName}\n• Pet Name: ${data.petName}\n• Phone: ${data.phone}\n• Preferred Time: ${data.preferredDateTime}\n\nIs this correct? (Reply 'Yes' to confirm or 'No' to cancel)`;
    }

    // Reset booking state
    resetBooking(conversation) {
        conversation.bookingState = {
            isActive: false,
            currentStep: BOOKING_STEPS.IDLE,
            collectedData: {}
        };
    }

    // Create appointment in database
    async createAppointment(sessionId, data) {
        const appointment = new Appointment({
            sessionId,
            ownerName: data.ownerName,
            petName: data.petName,
            phone: data.phone,
            preferredDateTime: data.preferredDateTime,
            status: 'pending'
        });

        await appointment.save();
        return appointment;
    }

    // Get appointments by session
    async getAppointmentsBySession(sessionId) {
        return Appointment.find({ sessionId }).sort({ createdAt: -1 });
    }

    // Get all appointments (for admin)
    async getAllAppointments(query = {}) {
        return Appointment.find(query).sort({ createdAt: -1 });
    }
}

module.exports = new AppointmentService();
