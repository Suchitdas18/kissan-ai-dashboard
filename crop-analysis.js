// ===========================
// CROP ANALYSIS PAGE - JAVASCRIPT
// ===========================

document.addEventListener('DOMContentLoaded', function () {
    console.log('Crop Analysis Page Loaded');

    // Get selected crop from localStorage
    const cropData = JSON.parse(localStorage.getItem('selectedCrop'));

    if (!cropData) {
        // No crop selected, redirect back
        showNotification('⚠️ Please select a crop first', 'warning');
        setTimeout(() => {
            window.location.href = 'farmer.html';
        }, 2000);
        return;
    }

    // Display selected crop info
    document.getElementById('selectedCropEmoji').textContent = cropData.emoji;
    document.getElementById('displayCropName').textContent = cropData.name;

    // Initialize upload functionality
    const uploadTriggerBtn = document.getElementById('uploadTriggerBtn');
    const cropImageInput = document.getElementById('cropImageInput');
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
        cropImageInput.click();
    });

    // Handle file selection
    cropImageInput.addEventListener('change', function (e) {
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
        cropImageInput.value = '';
        uploadPlaceholder.classList.remove('hidden');
        imagePreview.classList.add('hidden');
        previewImage.src = '';
        analyzeBtn.disabled = true;
    }

    // Perform AI analysis (simulated)
    function performAnalysis() {
        showNotification('🔬 Analyzing image...', 'info');

        // Disable analyze button
        analyzeBtn.disabled = true;
        analyzeBtn.querySelector('.btn-text').textContent = 'Analyzing...';

        // Simulate API call
        setTimeout(() => {
            // Show results
            displayResults();

            // Reset analyze button
            analyzeBtn.disabled = false;
            analyzeBtn.querySelector('.btn-text').textContent = 'Analyze Crop';

            showNotification('✓ Analysis complete!', 'success');

            // Scroll to results
            setTimeout(() => {
                resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        }, 3000);
    }

    // Display analysis results
    function displayResults() {
        // Simulated disease data (in production, this would come from AI API)
        const diseaseData = {
            wheat: {
                name: 'Leaf Rust Detected',
                severity: 'medium',
                severityText: 'Medium तीव्रता',
                treatment: [
                    'Apply fungicide containing tebuconazole or propiconazole',
                    'Remove and destroy infected leaves immediately',
                    'Ensure proper plant spacing for air circulation',
                    'Apply foliar spray early morning or evening'
                ],
                prevention: [
                    'Use resistant wheat varieties',
                    'Crop rotation with non-host crops',
                    'Monitor fields regularly for early detection',
                    'Avoid excessive nitrogen fertilization'
                ]
            },
            rice: {
                name: 'Blast Disease Detected',
                severity: 'high',
                severityText: 'High गंभीर',
                treatment: [
                    'Apply tricyclazole or carbendazim fungicide',
                    'Drain field for 2-3 days',
                    'Remove severely infected plants',
                    'Apply balanced fertilizer'
                ],
                prevention: [
                    'Use disease-resistant varieties',
                    'Avoid excessive nitrogen',
                    'Maintain proper water management',
                    'Remove crop residues after harvest'
                ]
            },
            tomato: {
                name: 'Early Blight Detected',
                severity: 'medium',
                severityText: 'Medium मध्यम',
                treatment: [
                    'Apply copper-based fungicides',
                    'Remove lower infected leaves',
                    'Mulch around plants to prevent soil splash',
                    'Water at base of plants, not foliage'
                ],
                prevention: [
                    'Practice crop rotation (3-4 years)',
                    'Use disease-resistant varieties',
                    'Stake plants for better air circulation',
                    'Remove plant debris at season end'
                ]
            },
            default: {
                name: 'Healthy Crop ✓',
                severity: 'low',
                severityText: 'Healthy स्वस्थ',
                treatment: [
                    'Continue regular monitoring',
                    'Maintain current care practices',
                    'Ensure adequate nutrition and water'
                ],
                prevention: [
                    'Regular field inspection',
                    'Proper crop rotation',
                    'Balanced fertilization'
                ]
            }
        };

        // Get disease data forselected crop
        const data = diseaseData[cropData.id] || diseaseData.default;

        // Update disease name
        document.getElementById('diseaseName').textContent = data.name;

        // Update severity
        const severityIndicator = document.getElementById('severityIndicator');
        const severityText = document.getElementById('severityText');
        
        severityIndicator.className = 'severity-indicator';
        if (data.severity === 'low') {
            severityIndicator.classList.add('severity-low');
        } else if (data.severity === 'medium') {
            severityIndicator.classList.add('severity-medium');
        } else {
            severityIndicator.classList.add('severity-high');
        }
        severityText.textContent = data.severityText;

        // Update treatment advice
        const adviceList = document.getElementById('adviceList');
        adviceList.innerHTML = '';
        data.treatment.forEach(advice => {
            const li = document.createElement('li');
            li.textContent = advice;
            adviceList.appendChild(li);
        });

        // Update prevention tips
        const preventionList = document.getElementById('preventionList');
        preventionList.innerHTML = '';
        data.prevention.forEach(tip => {
            const li = document.createElement('li');
            li.textContent = tip;
            preventionList.appendChild(li);
        });

        // Load Medicine Recommendations (sorted by price)
        loadMedicineRecommendations(data.name);

        // Show results section
        resultsSection.classList.remove('hidden');
        actionButtons.classList.remove('hidden');
    }
});

// Notification System (same as main dashboard)
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

// Load Medicine Recommendations based on detected disease
function loadMedicineRecommendations(diseaseName) {
    const medicineGrid = document.getElementById('medicineGrid');
    
    if (!window.getAllMedicines) {
        medicineGrid.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 20px;">Loading medicines...</p>';
        return;
    }
    
    // Extract disease keyword from disease name
    let diseaseKeyword = '';
    if (diseaseName.includes('Rust')) diseaseKeyword = 'Rust';
    else if (diseaseName.includes('Blast')) diseaseKeyword = 'Blast';
    else if (diseaseName.includes('Blight')) diseaseKeyword = 'Blight';
    else {
        medicineGrid.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 20px;">No specific medicines found</p>';
        return;
    }
    
    // Get all medicines
    const allMedicines = getAllMedicines();
    
    // Filter medicines for this disease
    const matchedMedicines = allMedicines.filter(med => {
        if (med.disease) {
            return med.disease.some(d => d.toLowerCase().includes(diseaseKeyword.toLowerCase()));
        }
        return false;
    });
    
    if (matchedMedicines.length === 0) {
        medicineGrid.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 20px;">No medicines available for this disease</p>';
        return;
    }
    
    // Sort by lowest price
    matchedMedicines.sort((a, b) => {
        const minPriceA = Math.min(...Object.values(a.price));
        const minPriceB = Math.min(...Object.values(b.price));
        return minPriceA - minPriceB;
    });
    
    // Show top 3 medicines
    const topMedicines = matchedMedicines.slice(0, 3);
    
    medicineGrid.innerHTML = topMedicines.map((med, index) => {
        const minPrice = Math.min(...Object.values(med.price));
        const maxPrice = Math.min(...Object.values(med.price));
        const priceRange = minPrice === maxPrice ? `₹${minPrice}` : `₹${minPrice} - ₹${maxPrice}`;
        
        return `
            <div class="medicine-card">
                <div class="med-rank">#${index + 1}</div>
                ${index === 0 ? '<div class="best-price">💰 Best Price</div>' : ''}
                <div class="med-icon">${med.image}</div>
                <h4 class="med-name">${med.brand}</h4>
                <p class="med-generic">${med.name}</p>
                <div class="med-price">${priceRange}</div>
                <div class="med-rating">⭐ ${med.rating}/5</div>
                <a href="shop.html?disease=${diseaseKeyword}" class="buy-now-btn">
                    🛒 Buy Now
                </a>
            </div>
        `;
    }).join('');
}
