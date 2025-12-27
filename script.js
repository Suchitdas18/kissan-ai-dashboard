// ===========================
// KISSAN AI - INTERACTIVE FEATURES
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Kissan AI Dashboard Loaded');
    
    // Initialize based on page type
    if (document.querySelector('.farmer-page')) {
        initFarmerDashboard();
    } else if (document.querySelector('.mandi-page')) {
        initMandiDashboard();
    }
});

// ===========================
// FARMER DASHBOARD FUNCTIONS
// ===========================

function initFarmerDashboard() {
    console.log('Initializing Farmer Dashboard');
    
    // Crop Selection functionality
    initCropSelection();
    
    // Upload Crop Image functionality
    const uploadBtn = document.getElementById('uploadCropBtn');
    const fileInput = document.getElementById('cropImageInput');
    
    if (uploadBtn && fileInput) {
        uploadBtn.addEventListener('click', function() {
            fileInput.click();
        });
        
        fileInput.addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                handleImageUpload(e.target.files[0]);
            }
        });
    }
    
    // Find Buyers Button
    const findBuyersBtn = document.querySelector('.find-buyers-btn');
    if (findBuyersBtn) {
        findBuyersBtn.addEventListener('click', function() {
            showNotification('🔍 Searching for nearby buyers...', 'info');
            // Simulate loading
            setTimeout(() => {
                showNotification('✓ Found 2 buyers near you!', 'success');
            }, 1500);
        });
    }
    
    // Contact buttons
    const contactBtns = document.querySelectorAll('.contact-btn');
    contactBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('📞 Opening phone dialer...', 'info');
        });
    });
}

// Crop Selection System
function initCropSelection() {
    const cropTabs = document.querySelectorAll('.crop-tab');
    const cropOptionBtns = document.querySelectorAll('.crop-option-btn');
    const selectedCropName = document.getElementById('selectedCropName');
    const searchInput = document.getElementById('cropSearchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const confirmBtn = document.getElementById('confirmCropBtn');
    
    let selectedCrop = null;
    let selectedCropData = null;
    let currentTab = 'plants';
    
    // Map crop names to emojis
    const cropEmojis = {
        wheat: '🌾', rice: '🌾', corn: '🌽', sugarcane: '🎋', cotton: '☁️', mustard: '🌻',
        tomato: '🍅', potato: '🥔', onion: '🧅', cabbage: '🥬', cauliflower: '🥦', eggplant: '🍆'
    };
    
    // Handle tab switching
    cropTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            currentTab = type;
            
            // Remove active class from all tabs
            cropTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show/hide appropriate crop options
            if (type === 'plants') {
                document.getElementById('plantsOptions').classList.remove('hidden');
                document.getElementById('vegetablesOptions').classList.add('hidden');
            } else {
                document.getElementById('plantsOptions').classList.add('hidden');
                document.getElementById('vegetablesOptions').classList.remove('hidden');
            }
            
            // Reset search when switching tabs
            if (searchInput) {
                searchInput.value = '';
                filterCrops('');
                clearSearchBtn.style.display = 'none';
            }
            
            showNotification(`Switched to ${type}`, 'info');
        });
    });
    
    // Handle crop selection
    cropOptionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const cropName = this.getAttribute('data-crop');
            const cropDisplayName = this.querySelector('.option-name').textContent.split('\n')[0];
            
            // Remove selected class from all buttons
            cropOptionBtns.forEach(b => b.classList.remove('selected'));
            
            // Add selected class to clicked button
            this.classList.add('selected');
            
            // Update selected crop
            selectedCrop = cropName;
            selectedCropData = {
                id: cropName,
                name: cropDisplayName,
                emoji: cropEmojis[cropName] || '🌱',
                type: currentTab
            };
            selectedCropName.textContent = cropDisplayName;
            
            // Enable confirm button
            if (confirmBtn) {
                confirmBtn.disabled = false;
            }
            
            // Show notification
            showNotification(`✓ Selected: ${cropDisplayName}`, 'success');
        });
    });
    
    // Confirm button handler
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            if (selectedCropData) {
                // Store crop data in localStorage
                localStorage.setItem('selectedCrop', JSON.stringify(selectedCropData));
                
                // Navigate to analysis page
                window.location.href = 'crop-analysis.html';
            }
        });
    }
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.trim();
            
            // Show/hide clear button
            clearSearchBtn.style.display = searchTerm ? 'flex' : 'none';
            
            // Filter crops
            filterCrops(searchTerm);
        });
    }
    
    // Clear search button
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', function() {
            searchInput.value = '';
            searchInput.focus();
            clearSearchBtn.style.display = 'none';
            filterCrops('');
        });
    }
    
    // Filter crops based on search term
    function filterCrops(searchTerm) {
        const activeContainer = currentTab === 'plants' 
            ? document.getElementById('plantsOptions') 
            : document.getElementById('vegetablesOptions');
        
        const cropButtons = activeContainer.querySelectorAll('.crop-option-btn');
        let visibleCount = 0;
        
        cropButtons.forEach(btn => {
            const cropText = btn.textContent.toLowerCase();
            const matches = cropText.includes(searchTerm.toLowerCase());
            
            if (matches) {
                btn.classList.remove('hidden-by-search');
                visibleCount++;
            } else {
                btn.classList.add('hidden-by-search');
            }
        });
        
        // Show "no results" message if needed
        let noResultsMsg = activeContainer.querySelector('.no-results-message');
        
        if (visibleCount === 0 && searchTerm) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.className = 'no-results-message';
                noResultsMsg.textContent = 'No crops found / कोई फसल नहीं मिली';
                activeContainer.appendChild(noResultsMsg);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }
}


// Handle image upload
function handleImageUpload(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        showNotification('📸 Image uploaded! Analyzing...', 'info');
        
        // Simulate AI analysis
        setTimeout(() => {
            showNotification('✓ Analysis complete! Check disease detection results.', 'success');
            // In a real app, you would send the image to an AI model here
        }, 2000);
    };
    
    reader.readAsDataURL(file);
}

// ===========================
// MANDI DASHBOARD FUNCTIONS
// ===========================

function initMandiDashboard() {
    console.log('Initializing Mandi Dashboard');
    
    // Filter button
    const filterBtn = document.querySelector('.filter-btn');
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            showNotification('🔍 Filter options coming soon!', 'info');
        });
    }
    
    // Call Farmer buttons
    const callBtns = document.querySelectorAll('.call-btn');
    callBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const cropItem = this.closest('.crop-item');
            const cropType = cropItem.querySelector('.crop-type').textContent;
            showNotification(`📞 Calling farmer for ${cropType}...`, 'info');
        });
    });
    
    // Message buttons
    const messageBtns = document.querySelectorAll('.message-btn');
    messageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const cropItem = this.closest('.crop-item');
            const cropType = cropItem.querySelector('.crop-type').textContent;
            showNotification(`💬 Opening chat for ${cropType}...`, 'info');
        });
    });
    
    // Animate chart on load
    animateChart();
}

// Animate earnings chart
function animateChart() {
    const chartFill = document.querySelector('.chart-fill');
    if (chartFill) {
        const targetWidth = chartFill.style.width;
        chartFill.style.width = '0%';
        setTimeout(() => {
            chartFill.style.width = targetWidth;
        }, 500);
    }
}

// ===========================
// NOTIFICATION SYSTEM
// ===========================

function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
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
    
    // Set background color based on type
    const colors = {
        info: '#3b82f6',
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes slideDown {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
    }
`;
document.head.appendChild(style);

// ===========================
// UTILITY FUNCTIONS
// ===========================

// Smooth scroll utility
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Format number to Indian currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}

// Get current location (for future use)
function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                position => resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }),
                error => reject(error)
            );
        } else {
            reject(new Error('Geolocation not supported'));
        }
    });
}

// ===========================
// SERVICE WORKER (for PWA capability)
// ===========================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker registration can be added here for offline functionality
        console.log('Service Worker support available');
    });
}

// ===========================
// PERFORMANCE MONITORING
// ===========================

// Log page load time
window.addEventListener('load', () => {
    const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
});
