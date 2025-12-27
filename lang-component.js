// ===========================
// LANGUAGE SELECTOR COMPONENT
// ===========================

// Generate language selector HTML
function createLanguageSelector() {
    const lang = getCurrentLanguage();
    return `
        <div class="language-selector">
            <button class="language-btn" id="languageBtn" onclick="toggleLanguageDropdown(event)">
                <span class="language-icon">🌐</span>
                <span class="language-text" id="currentLanguage">${languageNames[lang]}</span>
                <span class="dropdown-arrow">▼</span>
            </button>
            <div class="language-dropdown hidden" id="languageDropdown">
                <div class="language-option" data-lang="en" onclick="changeLanguage('en')">English</div>
                <div class="language-option" data-lang="hi" onclick="changeLanguage('hi')">हिंदी (Hindi)</div>
                <div class="language-option" data-lang="bn" onclick="changeLanguage('bn')">বাংলা (Bengali)</div>
                <div class="language-option" data-lang="ta" onclick="changeLanguage('ta')">தமிழ் (Tamil)</div>
                <div class="language-option" data-lang="te" onclick="changeLanguage('te')">తెలుగు (Telugu)</div>
                <div class="language-option" data-lang="mr" onclick="changeLanguage('mr')">मराठी (Marathi)</div>
                <div class="language-option" data-lang="gu" onclick="changeLanguage('gu')">ગુજરાતી (Gujarati)</div>
                <div class="language-option" data-lang="kn" onclick="changeLanguage('kn')">ಕನ್ನಡ (Kannada)</div>
                <div class="language-option" data-lang="pa" onclick="changeLanguage('pa')">ਪੰਜਾਬੀ (Punjabi)</div>
            </div>
        </div>
    `;
}

// Toggle language dropdown
function toggleLanguageDropdown(e) {
    e.stopPropagation();
    const dropdown = document.getElementById('languageDropdown');
    dropdown.classList.toggle('hidden');
}

// Close dropdown when clicking outside
document.addEventListener('click', function() {
    const dropdown = document.getElementById('languageDropdown');
    if (dropdown) {
        dropdown.classList.add('hidden');
    }
});

// Initialize language selector on page load
document.addEventListener('DOMContentLoaded', function() {
    // Highlight current language
    const lang = getCurrentLanguage();
    const options = document.querySelectorAll('.language-option');
    options.forEach(option => {
        if (option.getAttribute('data-lang') === lang) {
            option.style.background = 'var(--farmer-light)';
            option.style.fontWeight = '700';
        }
    });
});

// Helper function to update text content
function updateText(id, translationKey) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = t(translationKey);
    }
}

// Helper function to update HTML content
function updateHTML(id, translationKey) {
    const element = document.getElementById(id);
    if (element) {
        element.innerHTML = t(translationKey);
    }
}

// Helper to update all crop names
function updateCropNames() {
    const lang = getCurrentLanguage();
    const crops = document.querySelectorAll('.crop-option-btn');
    
    crops.forEach(btn => {
        const cropId = btn.getAttribute('data-crop');
        const nameElement = btn.querySelector('.option-name');
        
        if (nameElement) {
            if (lang === 'en') {
                // English primary, Hindi secondary
                const englishName = t(cropId);
                const hindiName = t(cropId + 'Hindi');
                nameElement.innerHTML = `${englishName}<br><small>${hindiName}</small>`;
            } else {
                // Local language primary, English secondary
                const localName = t(cropId);
                const englishName = translations.en[cropId];
                nameElement.innerHTML = `${localName}<br><small>${englishName}</small>`;
            }
        }
    });
}
