// ===========================
// SOIL ANALYSIS - JAVASCRIPT
// ===========================

document.addEventListener('DOMContentLoaded', function () {
    console.log('Soil Analysis Page Loaded');

    // Initialize upload functionality
    const uploadTriggerBtn = document.getElementById('uploadTriggerBtn');
    const soilImageInput = document.getElementById('soilImageInput');
    const uploadPlaceholder = document.getElementById('uploadPlaceholder');
    const imagePreview = document.getElementById('imagePreview');
    const previewImage = document.getElementById('previewImage');
    const removeImageBtn = document.getElementById('removeImageBtn');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const resultsSection = document.getElementById('resultsSection');
    const actionButtons = document.getElementById('actionButtons');
    const analyzeAnotherBtn = document.getElementById('analyzeAnotherBtn');

    let uploadedImage = null;

    // Trigger file input
    uploadTriggerBtn.addEventListener('click', function () {
        soilImageInput.click();
    });

    // Handle file selection
    soilImageInput.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImageUpload(file);
        } else {
            showNotification('⚠️ Please select a valid image file', 'warning');
        }
    });

    // Remove image
    removeImageBtn.addEventListener('click', function () {
        resetUpload();
    });

    // Analyze button
    analyzeBtn.addEventListener('click', function () {
        if (uploadedImage) {
            performAnalysis();
        }
    });

    // Analyze another button
    analyzeAnotherBtn.addEventListener('click', function () {
        resetUpload();
        resultsSection.classList.add('hidden');
        actionButtons.classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Handle image upload
    function handleImageUpload(file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            uploadedImage = e.target.result;

            // Show preview
            previewImage.src = uploadedImage;
            uploadPlaceholder.classList.add('hidden');
            imagePreview.classList.remove('hidden');

            // Enable analyze button
            analyzeBtn.disabled = false;

            showNotification('✓ Image uploaded successfully!', 'success');
        };

        reader.readAsDataURL(file);
    }

    // Reset upload
    function resetUpload() {
        uploadedImage = null;
        soilImageInput.value = '';
        uploadPlaceholder.classList.remove('hidden');
        imagePreview.classList.add('hidden');
        previewImage.src = '';
        analyzeBtn.disabled = true;
    }

    // Perform AI analysis (simulated)
    function performAnalysis() {
        showNotification('🔬 Analyzing soil...', 'info');

        // Disable analyze button
        analyzeBtn.disabled = true;
        analyzeBtn.querySelector('.btn-text').textContent = 'Analyzing...';

        // Simulate API call
        setTimeout(() => {
            // Show results
            displayResults();

            // Reset analyze button
            analyzeBtn.disabled = false;
            analyzeBtn.querySelector('.btn-text').textContent = 'Analyze Soil';

            showNotification('✓ Analysis complete!', 'success');

            // Scroll to results
            setTimeout(() => {
                resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        }, 3000);
    }

    // Display analysis results
    function displayResults() {
        // Simulated soil data (in production, this would come from AI API)
        const soilTypes = [
            {
                name: 'Loamy Soil',
                health: 'healthy',
                healthText: 'Healthy स्वस्थ',
                moisture: '65%',
                ph: '6.5',
                fertility: 'High',
                efficiency: '85%',
                crops: [
                    { name: 'Wheat', emoji: '🌾', season: 'Rabi (Winter)', yield: 'High' },
                    { name: 'Rice', emoji: '🌾', season: 'Kharif (Monsoon)', yield: 'High' },
                    { name: 'Vegetables', emoji: '🥬', season: 'All Seasons', yield: 'Medium' },
                    { name: 'Corn', emoji: '🌽', season: 'Kharif (Monsoon)', yield: 'High' }
                ],
                seasons: [
                    { name: 'Kharif (Monsoon)', months: 'June - October', best: true },
                    { name: 'Rabi (Winter)', months: 'November - March', best: true },
                    { name: 'Zaid (Summer)', months: 'March - June', best: false }
                ],
                tips: [
                    'Maintain organic matter by adding compost regularly',
                    'Ensure proper drainage to prevent waterlogging',
                    'Rotate crops to maintain soil fertility',
                    'Test soil pH every 6 months',
                    'Add mulch to retain moisture'
                ]
            },
            {
                name: 'Clay Soil',
                health: 'moderate',
                healthText: 'Moderate मध्यम',
                moisture: '75%',
                ph: '7.2',
                fertility: 'Medium',
                efficiency: '70%',
                crops: [
                    { name: 'Rice', emoji: '🌾', season: 'Kharif (Monsoon)', yield: 'High' },
                    { name: 'Cotton', emoji: '🌿', season: 'Kharif (Monsoon)', yield: 'High' },
                    { name: 'Pulses', emoji: '🫘', season: 'Rabi (Winter)', yield: 'Medium' },
                    { name: 'Sugarcane', emoji: '🎋', season: 'All Year', yield: 'High' }
                ],
                seasons: [
                    { name: 'Kharif (Monsoon)', months: 'June - October', best: true },
                    { name: 'Rabi (Winter)', months: 'November - March', best: false },
                    { name: 'Zaid (Summer)', months: 'March - June', best: false }
                ],
                tips: [
                    'Add sand and organic matter to improve drainage',
                    'Avoid over-watering as clay retains moisture',
                    'Break up compacted soil regularly',
                    'Add gypsum to improve soil structure',
                    'Plant deep-rooted crops to aerate soil'
                ]
            },
            {
                name: 'Sandy Soil',
                health: 'moderate',
                healthText: 'Moderate मध्यम',
                moisture: '40%',
                ph: '6.0',
                fertility: 'Low',
                efficiency: '60%',
                crops: [
                    { name: 'Millets', emoji: '🌾', season: 'Kharif (Monsoon)', yield: 'Medium' },
                    { name: 'Groundnut', emoji: '🥜', season: 'Kharif (Monsoon)', yield: 'High' },
                    { name: 'Watermelon', emoji: '🍉', season: 'Zaid (Summer)', yield: 'High' },
                    { name: 'Carrots', emoji: '🥕', season: 'Rabi (Winter)', yield: 'Medium' }
                ],
                seasons: [
                    { name: 'Kharif (Monsoon)', months: 'June - October', best: true },
                    { name: 'Rabi (Winter)', months: 'November - March', best: false },
                    { name: 'Zaid (Summer)', months: 'March - June', best: true }
                ],
                tips: [
                    'Add organic compost to increase water retention',
                    'Use mulch heavily to prevent moisture loss',
                    'Water frequently as sand drains quickly',
                    'Add clay to improve nutrient retention',
                    'Choose drought-resistant crops'
                ]
            }
        ];

        // Randomly select soil type for demo (in production, AI would determine this)
        const selectedSoil = soilTypes[Math.floor(Math.random() * soilTypes.length)];

        // Update soil type and health
        document.getElementById('soilTypeName').textContent = selectedSoil.name;
        const healthIndicator = document.getElementById('soilHealth');
        const healthDot = healthIndicator.querySelector('.health-dot');
        const healthText = healthIndicator.querySelector('.health-text');
        
        healthIndicator.className = `soil-health-indicator ${selectedSoil.health}`;
        healthText.textContent = selectedSoil.healthText;

        // Update metrics
        document.getElementById('moistureLevel').textContent = selectedSoil.moisture;
        document.getElementById('phLevel').textContent = selectedSoil.ph;
        document.getElementById('fertilityLevel').textContent = selectedSoil.fertility;
        document.getElementById('efficiencyScore').textContent = selectedSoil.efficiency;

        // Load recommended crops
        const cropsGrid = document.getElementById('cropsGrid');
        cropsGrid.innerHTML = selectedSoil.crops.map(crop => `
            <div class="crop-card">
                <div class="crop-emoji">${crop.emoji}</div>
                <h4 class="crop-name">${crop.name}</h4>
                <div class="crop-details">
                    <div class="crop-detail">
                        <span class="detail-label">Season:</span>
                        <span class="detail-value">${crop.season}</span>
                    </div>
                    <div class="crop-detail">
                        <span class="detail-label">Expected Yield:</span>
                        <span class="detail-value yield-${crop.yield.toLowerCase()}">${crop.yield}</span>
                    </div>
                </div>
            </div>
        `).join('');

        // Load seasons
        const seasonCards = document.getElementById('seasonCards');
        seasonCards.innerHTML = selectedSoil.seasons.map(season => `
            <div class="season-card ${season.best ? 'best-season' : ''}">
                ${season.best ? '<div class="best-badge">⭐ Best Season</div>' : ''}
                <h4 class="season-name">${season.name}</h4>
                <p class="season-months">${season.months}</p>
            </div>
        `).join('');

        // Load tips
        const tipsList = document.getElementById('tipsList');
        tipsList.innerHTML = selectedSoil.tips.map(tip => `
            <li>${tip}</li>
        `).join('');

        // Show results section
        resultsSection.classList.remove('hidden');
        actionButtons.classList.remove('hidden');
    }
});

// Notification System
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '16px 24px',
        borderRadius: '12px',
        color: '#ffffff',
        fontWeight: '600',
        fontSize: '14px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        zIndex: '1000',
        maxWidth: '90%',
        textAlign: 'center',
        animation: 'slideUp 0.3s ease-out'
    });

    const colors = {
        info: '#3b82f6',
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444'
    };
    notification.style.backgroundColor = colors[type] || colors.info;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}
