// ===========================
// VOICE/AUDIO SUPPORT SYSTEM
// ===========================

class VoiceManager {
    constructor() {
        this.synth = window.speechSynthesis;
        this.voices = [];
        this.currentLang = getCurrentLanguage();
        this.speaking = false;
        
        // Language to speech synthesis locale mapping
        this.langMap = {
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
        
        // Load voices
        this.loadVoices();
        
        // Reload voices when they change (some browsers need this)
        if (this.synth.onvoiceschanged !== undefined) {
            this.synth.onvoiceschanged = () => this.loadVoices();
        }
    }
    
    loadVoices() {
        this.voices = this.synth.getVoices();
    }
    
    speak(text, lang = null) {
        // Stop any ongoing speech
        this.stop();
        
        if (!text || text.trim() === '') return;
        
        const utterance = new SpeechSynthesisUtterance(text);
        const language = lang || this.currentLang;
        const locale = this.langMap[language] || 'en-US';
        
        // Try to find a voice for the selected language
        const voice = this.voices.find(v => v.lang === locale || v.lang.startsWith(language));
        
        if (voice) {
            utterance.voice = voice;
        }
        
        utterance.lang = locale;
        utterance.rate = 0.9; // Slightly slower for better comprehension
        utterance.pitch = 1;
        utterance.volume = 1;
        
        // Visual feedback
        this.speaking = true;
        
        utterance.onend = () => {
            this.speaking = false;
        };
        
        utterance.onerror = (event) => {
            console.error('Speech error:', event);
            this.speaking = false;
        };
        
        this.synth.speak(utterance);
    }
    
    stop() {
        if (this.synth.speaking) {
            this.synth.cancel();
            this.speaking = false;
        }
    }
    
    toggle(text, lang = null) {
        if (this.speaking) {
            this.stop();
        } else {
            this.speak(text, lang);
        }
    }
}

// Global voice manager instance
let voiceManager;

// Initialize voice manager
document.addEventListener('DOMContentLoaded', function() {
    voiceManager = new VoiceManager();
});

// Helper function to add speaker button to element
function addVoiceButton(element, textToSpeak = null) {
    if (!element) return;
    
    // Don't add if button already exists
    if (element.querySelector('.voice-btn')) return;
    
    const voiceBtn = document.createElement('button');
    voiceBtn.className = 'voice-btn';
    voiceBtn.innerHTML = '🔊';
    voiceBtn.setAttribute('aria-label', 'Listen to this text');
    voiceBtn.setAttribute('title', 'Tap to hear this aloud / सुनने के लिए टैप करें');
    
    voiceBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        
        const text = textToSpeak || element.textContent.trim();
        
        if (voiceManager) {
            voiceManager.toggle(text);
            
            // Visual feedback
            if (voiceManager.speaking) {
                voiceBtn.classList.add('speaking');
            } else {
                voiceBtn.classList.remove('speaking');
            }
        }
    });
    
    // Position button
    const container = document.createElement('div');
    container.className = 'voice-container';
    element.parentNode.insertBefore(container, element);
    container.appendChild(element);
    container.appendChild(voiceBtn);
    
    return voiceBtn;
}

// Auto-add voice buttons to important elements
function enableVoiceSupport() {
    // Add to page title/header
    const titles = document.querySelectorAll('h1, h2.card-title, .selection-title');
    titles.forEach(title => addVoiceButton(title));
    
    // Add to role cards
    const roleCards = document.querySelectorAll('.role-card');
    roleCards.forEach(card => {
        const cardTitle = card.querySelector('.card-title');
        if (cardTitle) {
            const text = cardTitle.textContent.trim();
            addVoiceButton(cardTitle, text);
        }
    });
    
    // Add to crop options
    const cropBtns = document.querySelectorAll('.crop-option-btn');
    cropBtns.forEach(btn => {
        const cropName = btn.querySelector('.option-name');
        if (cropName) {
            const text = cropName.textContent.split('\n')[0].trim();
            addVoiceButton(cropName, text);
        }
    });
    
    // Add to important buttons
    const importantBtns = document.querySelectorAll('.confirm-crop-btn, .analyze-btn, .upload-trigger-btn');
    importantBtns.forEach(btn => {
        const btnText = btn.querySelector('.btn-text');
        if (btnText) {
            addVoiceButton(btnText);
        }
    });
}

// Enable voice on page headings
function enablePageVoice() {
    // Create floating voice assistant button
    const voiceAssistant = document.createElement('button');
    voiceAssistant.className = 'voice-assistant-btn';
    voiceAssistant.innerHTML = '🔊';
    voiceAssistant.setAttribute('aria-label', 'Voice Assistant');
    voiceAssistant.setAttribute('title', 'Voice Assistant - Read page aloud / पेज पढ़ें');
    
    voiceAssistant.addEventListener('click', function() {
        if (!voiceManager) return;
        
        // Read the main content of the page
        const mainContent = document.querySelector('.dashboard-main, .role-selection-container');
        if (mainContent) {
            const text = Array.from(mainContent.querySelectorAll('h1, h2, h3, p, .card-title'))
                .map(el => el.textContent.trim())
                .filter(t => t.length > 0)
                .join('. ');
            
            voiceManager.toggle(text);
            
            if (voiceManager.speaking) {
                voiceAssistant.classList.add('speaking');
            } else {
                voiceAssistant.classList.remove('speaking');
            }
        }
    });
    
    document.body.appendChild(voiceAssistant);
}

// Initialize voice support when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        enableVoiceSupport();
        enablePageVoice();
    }, 1000); // Wait for other scripts to load
});

// Speak function for manual use
function speak(text) {
    if (voiceManager) {
        voiceManager.speak(text);
    }
}

// Stop speaking function
function stopSpeaking() {
    if (voiceManager) {
        voiceManager.stop();
    }
}
