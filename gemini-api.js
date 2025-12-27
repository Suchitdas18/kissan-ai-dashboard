// ===========================
// GEMINI API CONFIGURATION
// ===========================

// You can get a free API key from: https://makersuite.google.com/app/apikey
const GEMINI_API_KEY = 'AIzaSyDGPmT8RbqhPqvXoKhB_4r8aQvYxJxNzAs'; // Replace with your key

// Gemini API endpoint
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

// Call Gemini API
async function callGeminiAPI(message, language = 'en') {
    try {
        // Create a context-aware prompt
        const languageNames = {
            'en': 'English',
            'hi': 'Hindi',
            'bn': 'Bengali',
            'ta': 'Tamil',
            'te': 'Telugu',
            'mr': 'Marathi',
            'gu': 'Gujarati',
            'kn': 'Kannada',
            'pa': 'Punjabi'
        };
        
        const systemPrompt = language === 'en' 
            ? `You are Kissan AI, a helpful farming assistant for Indian farmers. Answer questions about agriculture, crops, farming techniques, weather, soil, pests, fertilizers, and general knowledge. Be concise, practical, and friendly. If it's a farming question, give specific advice for Indian conditions.`
            : `You are Kissan AI, a helpful farming assistant. Answer in ${languageNames[language]} language. Be concise and practical. Give farming advice specific to India.`;
        
        const fullPrompt = `${systemPrompt}\n\nUser question: ${message}\n\nAnswer (in ${languageNames[language]}):`;
        
        const response = await fetch(GEMINI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: fullPrompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 500,
                    topP: 0.8,
                    topK: 40
                }
            })
        });
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        }
        
        throw new Error('Invalid response format');
        
    } catch (error) {
        console.error('Gemini API Error:', error);
        return null; // Return null to trigger fallback
    }
}

// Export for use in ai-assistant.js
window.callGeminiAPI = callGeminiAPI;
