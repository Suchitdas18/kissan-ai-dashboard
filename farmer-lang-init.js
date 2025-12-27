// Farmer Dashboard Translation Initialization
document.addEventListener('DOMContentLoaded', function() {
    const lang = getCurrentLanguage();
    
    // Update language selector
    document.getElementById('currentLanguage').textContent = languageNames[lang];
    
    // Update header
    document.getElementById('appName').textContent = '🌾 ' + t('appName');
    document.getElementById('subtitle').textContent = t('smartCropSoil');
    
    // Update crop selection card
    const cropTitle = document.querySelector('.crop-selection-card .card-title');
    const cropSubtitle = document.querySelector('.crop-selection-card .card-subtitle');
    if (cropTitle) cropTitle.textContent = '🌱 ' + t('selectYourCrop');
    if (cropSubtitle) cropSubtitle.textContent = t('selectCropSubtitle');
    
    // Update tabs
    const plantTab = document.querySelector('[data-type="plants"] .tab-label');
    const vegTab = document.querySelector('[data-type="vegetables"] .tab-label');
    if (lang === 'en') {
        if (plantTab) plantTab.innerHTML = t('plants') + '<br><small>' + t('plantsHindi') + '</small>';
        if (vegTab) vegTab.innerHTML = t('vegetables') + '<br><small>' + t('vegetablesHindi') + '</small>';
    } else {
        if (plantTab) plantTab.innerHTML = t('plants') + '<br><small>Plants</small>';
        if (vegTab) vegTab.innerHTML = t('vegetables') + '<br><small>Vegetables</small>';
    }
    
    // Update search placeholder
    const searchInput = document.getElementById('cropSearchInput');
    if (searchInput) searchInput.placeholder = t('searchCrop');
    
    // Update selected crop display
    const selectedDisplay = document.querySelector('.selected-crop-display');
    if (selectedDisplay) {
        const selectedName = document.getElementById('selectedCropName');
        if (selectedName && selectedName.textContent === 'None') {
            selectedDisplay.innerHTML = t('selected') + ': <strong id="selectedCropName">' + t('none') + '</strong>';
        }
    }
    
    // Update confirm button
    const confirmBtn = document.querySelector('.confirm-crop-btn .btn-text');
    const confirmSubtext = document.querySelector('.confirm-crop-btn .btn-subtext');
    if (confirmBtn) confirmBtn.textContent = t('confirmContinue');
    if (confirmSubtext) confirmSubtext.textContent = t('continueHindi');
    
    // Update soil section
    const soilTitle = document.querySelector('.soil-section .card-title');
    if (soilTitle) soilTitle.textContent = '🌱 ' + t('soilIntelligence');
    
    const healthScoreLabel = document.querySelector('.score-label');
    if (healthScoreLabel) healthScoreLabel.textContent = t('healthScore');
    
    // Update metric labels
    const metrics = document.querySelectorAll('.metric');
    if (metrics.length > 0) {
        const labels = ['npk', 'ph', 'moisture'];
        metrics.forEach((metric, index) => {
            const label = metric.querySelector('.metric-label');
            const comingSoon = metric.querySelector('.coming-soon');
            if (label && labels[index]) label.textContent = t(labels[index]);
            if (comingSoon) comingSoon.textContent = t('comingSoon');
        });
    }
    
    // Update market section
    const marketTitle = document.querySelector('.market-card .card-title');
    if (marketTitle) marketTitle.textContent = '🏪 ' + t('marketAccess');
    
    const findBuyersBtn = document.querySelector('.find-buyers-btn .btn-text');
    if (findBuyersBtn) findBuyersBtn.textContent = t('findBuyers');
    
    // Update crop names
    updateCropNames();
    
    // Language dropdown functionality
    const languageBtn = document.getElementById('languageBtn');
    const languageDropdown = document.getElementById('languageDropdown');
    
    languageBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        languageDropdown.classList.toggle('hidden');
    });
    
    document.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            const selectedLang = this.getAttribute('data-lang');
            changeLanguage(selectedLang);
        });
        
        if (option.getAttribute('data-lang') === lang) {
            option.style.background = 'var(--farmer-light)';
            option.style.fontWeight = '700';
        }
    });
});
