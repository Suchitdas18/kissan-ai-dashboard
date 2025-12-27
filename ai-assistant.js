// ===========================
// AI VOICE ASSISTANT CHATBOT
// ===========================

class VoiceAssistant {
    constructor() {
        this.chatOpen = false;
        this.messages = [];
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.isListening = false;
        this.isSpeaking = false;
        
        // Initialize speech recognition
        this.initSpeechRecognition();
        
        // Create UI
        this.createChatUI();
        
        // Add welcome message
        this.addMessage('assistant', this.getWelcomeMessage());
    }
    
    initSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            
            // Set language based on current app language
            const lang = getCurrentLanguage();
            const langMap = {
                'en': 'en-US',
                'hi': 'hi-IN',
                'bn': 'bn-IN',
                'ta': 'ta-IN',
                'te': 'te-IN',
                'mr': 'mr-IN',
                'gu': 'gu-IN',
                'kn': 'kn-IN',
                'pa': 'pa-IN'
            };
            this.recognition.lang = langMap[lang] || 'en-US';
            
            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.handleVoiceInput(transcript);
            };
            
            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.isListening = false;
                this.updateMicButton();
            };
            
            this.recognition.onend = () => {
                this.isListening = false;
                this.updateMicButton();
            };
        }
    }
    
    createChatUI() {
        // Chat button
        const chatBtn = document.createElement('button');
        chatBtn.className = 'ai-chat-btn';
        chatBtn.innerHTML = '🤖';
        chatBtn.title = 'AI Assistant - Ask me anything! / मुझसे कुछ भी पूछें!';
        chatBtn.onclick = () => this.toggleChat();
        document.body.appendChild(chatBtn);
        this.chatBtn = chatBtn;
        
        // Chat container
        const chatContainer = document.createElement('div');
        chatContainer.className = 'ai-chat-container hidden';
        chatContainer.innerHTML = `
            <div class="ai-chat-header">
                <div class="chat-header-left">
                    <span class="chat-avatar">🤖</span>
                    <div class="chat-title-group">
                        <h3 class="chat-title">Kissan AI Assistant</h3>
                        <p class="chat-status">Always here to help</p>
                    </div>
                </div>
                <button class="chat-close-btn" onclick="voiceAssistant.toggleChat()">✕</button>
            </div>
            <div class="ai-chat-messages" id="chatMessages"></div>
            <div class="ai-chat-input">
                <button class="chat-mic-btn" id="micBtn" title="Voice input">🎤</button>
                <input type="text" id="chatInput" placeholder="Ask about crops, diseases, farming tips..." />
                <button class="chat-send-btn" id="sendBtn">➤</button>
            </div>
            <div class="ai-chat-suggestions">
                <button class="suggestion-chip" onclick="voiceAssistant.askQuestion('What diseases affect wheat?')">🌾 Wheat diseases</button>
                <button class="suggestion-chip" onclick="voiceAssistant.askQuestion('Best fertilizer for rice?')">🌾 Rice fertilizer</button>
                <button class="suggestion-chip" onclick="voiceAssistant.askQuestion('When to harvest tomatoes?')">🍅 Harvest time</button>
            </div>
        `;
        document.body.appendChild(chatContainer);
        this.chatContainer = chatContainer;
        
        // Event listeners
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendBtn');
        const micBtn = document.getElementById('micBtn');
        
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        sendBtn.addEventListener('click', () => this.sendMessage());
        micBtn.addEventListener('click', () => this.toggleVoiceInput());
        
        this.chatInput = chatInput;
        this.micBtn = micBtn;
    }
    
    toggleChat() {
        this.chatOpen = !this.chatOpen;
        this.chatContainer.classList.toggle('hidden');
        this.chatBtn.classList.toggle('active');
        
        if (this.chatOpen) {
            this.chatInput.focus();
        }
    }
    
    sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;
        
        this.addMessage('user', message);
        this.chatInput.value = '';
        
        // Show typing indicator
        this.showTyping();
        
        // Get AI response
        setTimeout(() => {
            this.getAIResponse(message);
        }, 1000);
    }
    
    askQuestion(question) {
        this.chatInput.value = question;
        this.sendMessage();
    }
    
    toggleVoiceInput() {
        if (!this.recognition) {
            alert('Voice input not supported in your browser');
            return;
        }
        
        if (this.isListening) {
            this.recognition.stop();
        } else {
            this.isListening = true;
            this.updateMicButton();
            this.recognition.start();
        }
    }
    
    updateMicButton() {
        if (this.isListening) {
            this.micBtn.classList.add('listening');
            this.micBtn.innerHTML = '🔴';
        } else {
            this.micBtn.classList.remove('listening');
            this.micBtn.innerHTML = '🎤';
        }
    }
    
    handleVoiceInput(transcript) {
        this.chatInput.value = transcript;
        this.sendMessage();
    }
    
    addMessage(role, content) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${role}-message`;
        
        if (role === 'assistant') {
            messageDiv.innerHTML = `
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <p>${content}</p>
                    <button class="speak-btn" onclick="voiceAssistant.speak('${content.replace(/'/g, "\\'")}')">🔊</button>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <p>${content}</p>
                </div>
                <div class="message-avatar">👤</div>
            `;
        }
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        this.messages.push({ role, content });
    }
    
    showTyping() {
        const messagesContainer = document.getElementById('chatMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message assistant-message typing-indicator';
        typingDiv.id = 'typingIndicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    hideTyping() {
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
    }
    
    async getAIResponse(userMessage) {
        // This is a simple rule-based system
        // You can replace this with actual Gemini API call
        
        const response = this.generateResponse(userMessage.toLowerCase());
        
        this.hideTyping();
        this.addMessage('assistant', response);
        
        // Auto-speak response if enabled
        if (this.autoSpeak) {
            this.speak(response);
        }
    }
    
    generateResponse(message) {
        const lang = getCurrentLanguage();
        
        // Agriculture knowledge base (simplified)
        const responses = {
            en: {
                wheat: "Wheat is best planted in October-November. Common diseases include rust, blight, and smut. Use balanced NPK fertilizer (120:60:40 kg/ha). Harvest when grain moisture is 20-25%.",
                rice: "Rice requires standing water. Plant in June-July. Common diseases: blast, brown spot. Use fertilizer 120:60:40 NPK. Harvest when 80% grains are golden yellow.",
                tomato: "Tomatoes need well-drained soil. Common diseases: early blight, late blight, leaf curl. Use organic manure + NPK. Harvest when fruits are fully colored.",
                fertilizer: "For general crops, use NPK fertilizer in ratio 4:2:1. Organic options: compost, cow dung, vermicompost. Apply before sowing and during growth.",
                disease: "Upload crop photo in the Disease Detection section for AI diagnosis. Common signs: yellow leaves, spots, wilting, stunted growth.",
                harvest: "Harvest time varies by crop. Check grain moisture, color, and firmness. Generally: wheat (120-150 days), rice (120-140 days), vegetables (60-90 days).",
                default: "I can help with: crop diseases, fertilizers, planting time, harvest tips, pest control, soil health. What would you like to know?"
            },
            hi: {
                wheat: "गेहूं अक्टूबर-नवंबर में बोई जाती है। सामान्य रोग: रतुआ, झुलसा। NPK उर्वरक (120:60:40 किग्रा/हेक्टेयर) उपयोग करें। जब दाने में 20-25% नमी हो तब कटाई करें।",
                rice: "धान को खड़े पानी की जरूरत है। जून-जुलाई में रोपाई करें। सामान्य रोग: ब्लास्ट, भूरी चित्ती। 80% दाने सुनहरे होने पर कटाई करें।",
                tomato: "टमाटर को अच्छी जल निकासी चाहिए। सामान्य रोग: अगेती झुलसा, पिछली झुलसा, पत्ती मोड़। जैविक तर्यद + NPK का उपयोग करें।",
                fertilizer: "सामान्य फसलों के लिए 4:2:1 अनुपात में NPK उर्वरक का उपयोग करें। जैविक विकल्प: कम्पोस्ट, गोबर की खाद, केंचुआ खाद।",
                disease: "AI निदान के लिए रोग पहचान अनुभाग में फसल की फोटो अपलोड करें। सामान्य संकेत: पीली पत्तियां, धब्बे, मुरझाना।",
                harvest: "कटाई का समय फसल के अनुसार बदलता है। दाने की नमी, रंग जांचें। आमतौर पर: गेहूं (120-150 दिन), धान (120-140 दिन)।",
                default: "मैं मदद कर सकता हूं: फसल रोग, उर्वरक, बुवाई समय, कटाई सुझाव, कीट नियंत्रण। आप क्या जानना चाहेंगे?"
            }
        };
        
        const langResponses = responses[lang] || responses.en;
        
        // Simple keyword matching
        if (message.includes('wheat') || message.includes('गेहूं')) return langResponses.wheat;
        if (message.includes('rice') || message.includes('धान') || message.includes('चावल')) return langResponses.rice;
        if (message.includes('tomato') || message.includes('टमाटर')) return langResponses.tomato;
        if (message.includes('fertilizer') || message.includes('उर्वरक') || message.includes('खाद')) return langResponses.fertilizer;
        if (message.includes('disease') || message.includes('रोग')) return langResponses.disease;
        if (message.includes('harvest') || message.includes('कटाई')) return langResponses.harvest;
        
        return langResponses.default;
    }
    
    speak(text) {
        if (this.isSpeaking) {
            this.synthesis.cancel();
            this.isSpeaking = false;
            return;
        }
        
        const utterance = new SpeechSynthesisUtterance(text);
        const lang = getCurrentLanguage();
        const langMap = {
            'en': 'en-US',
            'hi': 'hi-IN',
            'bn': 'bn-IN',
            'ta': 'ta-IN',
            'te': 'te-IN',
            'mr': 'mr-IN',
            'gu': 'gu-IN',
            'kn': 'kn-IN',
            'pa': 'pa-IN'
        };
        
        utterance.lang = langMap[lang] || 'en-US';
        utterance.rate = 0.9;
        
        this.isSpeaking = true;
        utterance.onend = () => {
            this.isSpeaking = false;
        };
        
        this.synthesis.speak(utterance);
    }
    
    getWelcomeMessage() {
        const lang = getCurrentLanguage();
        const welcomes = {
            en: "Namaste! 🙏 I'm your AI farming assistant. Ask me about crops, diseases, fertilizers, or any farming questions!",
            hi: "नमस्ते! 🙏 मैं आपका AI कृषि सहायक हूं। मुझसे फसल, रोग, उर्वरक, या किसी भी खेती के सवाल पूछें!"
        };
        return welcomes[lang] || welcomes.en;
    }
}

// Initialize voice assistant when page loads
let voiceAssistant;
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        voiceAssistant = new VoiceAssistant();
    }, 1000);
});
