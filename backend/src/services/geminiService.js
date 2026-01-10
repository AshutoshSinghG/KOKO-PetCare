const { GoogleGenerativeAI } = require('@google/generative-ai');

// Veterinary-specific system prompt to enforce topic restriction
const VETERINARY_SYSTEM_PROMPT = `You are a friendly and knowledgeable veterinary assistant chatbot. Your role is to:

1. Answer ONLY questions related to veterinary topics, including:
   - Pet care and wellness
   - Vaccination schedules for dogs, cats, and other pets
   - Diet and nutrition advice for animals
   - Common pet illnesses and symptoms
   - Preventive care recommendations
   - General animal health information
   - First aid for pets
   - Behavioral advice for pets

2. If a user asks about booking an appointment, schedule a vet visit, or anything related to appointments, respond with exactly: "[APPOINTMENT_INTENT]" followed by a friendly acknowledgment.

3. If a user asks a question that is NOT related to veterinary topics (like weather, politics, general knowledge, coding, etc.), politely decline by saying something like: "I'm your veterinary assistant and can only help with pet health and care questions. Is there anything about your pet's health I can help you with?"

4. Keep responses concise, friendly, and helpful.
5. Always recommend consulting a veterinarian in person for serious health concerns.
6. Never provide specific medication dosages - always defer to a veterinarian.

Remember: You are a veterinary chatbot ONLY. Stay strictly within your domain.`;

class GeminiService {
    constructor() {
        this.genAI = null;
        this.model = null;
        this.initialized = false;
    }

    initialize() {
        if (this.initialized) return;

        if (!process.env.GEMINI_API_KEY) {
            throw new Error('GEMINI_API_KEY environment variable is not set');
        }

        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        this.model = this.genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
            systemInstruction: VETERINARY_SYSTEM_PROMPT
        });
        this.initialized = true;
    }

    // Detect if user wants to book an appointment
    detectAppointmentIntent(message) {
        const appointmentKeywords = [
            'book', 'appointment', 'schedule', 'visit', 'booking',
            'see a vet', 'vet visit', 'checkup', 'check-up', 'consultation',
            'want to come in', 'make an appointment', 'reserve', 'slot'
        ];

        const lowerMessage = message.toLowerCase();
        return appointmentKeywords.some(keyword => lowerMessage.includes(keyword));
    }

    async generateResponse(userMessage, conversationHistory = []) {
        this.initialize();

        try {
            // Build chat history for context
            const history = conversationHistory.map(msg => ({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }]
            }));

            const chat = this.model.startChat({
                history: history,
                generationConfig: {
                    maxOutputTokens: 500,
                    temperature: 0.7
                }
            });

            const result = await chat.sendMessage(userMessage);
            const response = result.response.text();

            // Check if AI detected appointment intent
            const hasAppointmentIntent = response.includes('[APPOINTMENT_INTENT]') ||
                this.detectAppointmentIntent(userMessage);

            // Clean the response if it contains the intent marker
            const cleanedResponse = response.replace('[APPOINTMENT_INTENT]', '').trim();

            return {
                success: true,
                response: cleanedResponse || "I'd be happy to help you schedule a veterinary appointment!",
                isAppointmentIntent: hasAppointmentIntent
            };
        } catch (error) {
            console.error('Gemini API error:', error.message);
            return {
                success: false,
                response: "I'm sorry, I'm having trouble processing your request right now. Please try again in a moment.",
                isAppointmentIntent: false,
                error: error.message
            };
        }
    }
}

module.exports = new GeminiService();
