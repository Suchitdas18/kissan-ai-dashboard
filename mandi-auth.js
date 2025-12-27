// Mandi/Wholesaler Authentication System

// Switch between Login/Register tabs
function switchTab(tab) {
    // Update tabs
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    // Update forms
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    if (tab === 'login') {
        document.getElementById('loginForm').classList.add('active');
    } else {
        document.getElementById('registerForm').classList.add('active');
    }
    
    // Clear messages
    hideMessages();
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Get stored users
    const users = JSON.parse(localStorage.getItem('mandiUsers') || '[]');
    
    // Find user
    const user = users.find(u => 
        (u.email === email || u.mandiId === email) && u.password === password
    );
    
    if (user) {
        // Set current user
        localStorage.setItem('currentMandiUser', JSON.stringify(user));
        localStorage.setItem('userRole', user.businessType);
        
        showSuccess('✅ Login successful! Redirecting to shop...');
        
        setTimeout(() => {
            window.location.href = 'shop.html';
        }, 1500);
    } else {
        showError('❌ Invalid credentials. Please check your email and password.');
    }
}

// Handle Registration
function handleRegister(event) {
    event.preventDefault();
    
    const businessType = document.getElementById('businessType').value;
    const businessName = document.getElementById('businessName').value;
    const ownerName = document.getElementById('ownerName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('phone').value;
    const gstNumber = document.getElementById('gstNumber').value;
    const password = document.getElementById('registerPassword').value;
    const dodoBusinessId = document.getElementById('dodoBusinessId').value;
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem('mandiUsers') || '[]');
    
    // Check if email exists
    if (users.find(u => u.email === email)) {
        showError('❌ Email already registered. Please login instead.');
        return;
    }
    
    // Create new user
    const newUser = {
        mandiId: 'MND' + Date.now(),
        businessType,
        businessName,
        ownerName,
        email,
        phone,
        gstNumber,
        password,
        dodoBusinessId,
        dodoRegistered: !!dodoBusinessId,
        registeredAt: new Date().toISOString(),
        status: 'active'
    };
    
    // Save user
    users.push(newUser);
    localStorage.setItem('mandiUsers', JSON.stringify(users));
    
    // Show success with instructions
    if (!dodoBusinessId) {
        showWarning(`
            ✅ Account Created! Mandi ID: ${newUser.mandiId}<br><br>
            ⚠️ <strong>Important Next Step:</strong><br>
            To complete payments, you need to:<br>
            1. Register at <a href="https://app.dodopayments.com/signup" target="_blank">Dodo Payments</a><br>
            2. Get your Business ID<br>
            3. Add it to your profile<br><br>
            Redirecting to login...
        `);
    } else {
        showSuccess(`
            ✅ Account Created Successfully!<br>
            Mandi ID: ${newUser.mandiId}<br>
            Dodo Payment ID verified!<br><br>
            Redirecting to login...
        `);
    }
    
    // Auto-login after 3 seconds
    setTimeout(() => {
        // Set current user
        localStorage.setItem('currentMandiUser', JSON.stringify(newUser));
        localStorage.setItem('userRole', newUser.businessType);
        
        window.location.href = 'shop.html';
    }, 3000);
}

// Show success message
function showSuccess(message) {
    hideMessages();
    const successDiv = document.getElementById('successMessage');
    successDiv.innerHTML = message;
    successDiv.style.display = 'block';
    scrollToTop();
}

// Show error message
function showError(message) {
    hideMessages();
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.innerHTML = message;
    errorDiv.style.display = 'block';
    scrollToTop();
}

// Show warning message
function showWarning(message) {
    hideMessages();
    const successDiv = document.getElementById('successMessage');
    successDiv.innerHTML = message;
    successDiv.style.display = 'block';
    successDiv.style.background = '#fef3c7';
    successDiv.style.borderColor = '#f59e0b';
    scrollToTop();
}

// Hide all messages
function hideMessages() {
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Check if already logged in
window.addEventListener('DOMContentLoaded', function() {
    const currentUser = localStorage.getItem('currentMandiUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        showSuccess(`Already logged in as ${user.businessName}. Redirecting...`);
        setTimeout(() => {
            window.location.href = 'shop.html';
        }, 1500);
    }
});
