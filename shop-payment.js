// Load and display products
function loadProducts(category = 'all', searchQuery = '') {
    const grid = document.getElementById('productsGrid');
    let products = [];
    
    if (category === 'all') {
        products = getAllMedicines();
    } else {
        products = medicineDatabase[category] || [];
    }
    
    // Filter by search
    if (searchQuery) {
        products = searchMedicines(searchQuery);
    }
    
    if (products.length === 0) {
        grid.innerHTML = '<p class="no-products">No products found</p>';
        return;
    }
    
    grid.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-icon">${product.image}</div>
            <div class="product-badge ${product.organic ? 'organic-badge' : ''}">${product.organic ? '🌿 Organic' : ''}</div>
            <h3 class="product-name">${product.brand}</h3>
            <p class="product-generic">${product.name}</p>
            ${product.disease ? `<p class="product-use">For: ${product.disease.slice(0, 2).join(', ')}</p>` : ''}
            ${product.pest ? `<p class="product-use">For: ${product.pest.slice(0, 2).join(', ')}</p>` : ''}
            <div class="product-rating">⭐ ${product.rating}/5</div>
            <div class="product-dosage">📏 ${product.dosage}</div>
            
            <div class="pack-selector">
                ${product.packSize.map(size => `
                    <label class="pack-option">
                        <input type="radio" name="pack_${product.id}" value="${size}" ${size === product.packSize[0] ? 'checked' : ''}>
                        <span class="pack-label">
                            <span class="pack-size">${size}</span>
                            <span class="pack-price">₹${product.price[size]}</span>
                        </span>
                    </label>
                `).join('')}
            </div>
            
            <button class="add-to-cart-btn" onclick="addToCart('${product.id}')">
                <span>🛒 Add to Cart</span>
            </button>
        </div>
    `).join('');
}

// Add to cart
function addToCart(medicineId) {
    const radio = document.querySelector(`input[name="pack_${medicineId}"]:checked`);
    const packSize = radio ? radio.value : null;
    
    if (!packSize) {
        alert('Please select a pack size');
        return;
    }
    
    cart.addItem(medicineId, packSize, 1);
    updateCartDisplay();
}

// Open cart
function openCart() {
    document.getElementById('cartSidebar').classList.remove('hidden');
    document.getElementById('cartOverlay').classList.remove('hidden');
    updateCartDisplay();
}

// Close cart
function closeCart() {
    document.getElementById('cartSidebar').classList.add('hidden');
    document.getElementById('cartOverlay').classList.add('hidden');
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    
    if (cart.items.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        totalPrice.textContent = '₹0';
        return;
    }
    
    cartItems.innerHTML = cart.items.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${item.packSize}</p>
                <p class="cart-item-price">₹${item.price} × ${item.quantity}</p>
            </div>
            <div class="cart-item-controls">
                <button onclick="cart.updateQuantity(${index}, ${item.quantity - 1}); updateCartDisplay();">−</button>
                <span>${item.quantity}</span>
                <button onclick="cart.updateQuantity(${index}, ${item.quantity + 1}); updateCartDisplay();">+</button>
                <button class="remove-btn" onclick="cart.removeItem(${index}); updateCartDisplay();">🗑️</button>
            </div>
        </div>
    `).join('');
    
    totalPrice.textContent = '₹' + cart.getTotal();
}

// Role-Based Payment System
function proceedToCheckout() {
    if (cart.items.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const amount = cart.getTotal();
    const orderId = 'KAI' + Date.now();
    
    // Check user role from localStorage or URL
    const userRole = getUserRole();
    
    if (userRole === 'mandi' || userRole === 'wholesaler') {
        // Mandi/Wholesaler: MUST use Dodo Payments
        showDodoPaymentRequired(amount, orderId);
    } else {
        // Farmer: Simple UPI Scanner
        showSimpleUPIPayment(amount, orderId);
    }
}

function getUserRole() {
    // Check if Mandi user is logged in
    const currentUser = localStorage.getItem('currentMandiUser');
    if (currentUser) {
        const user = JSON.parse(currentUser);
        return user.businessType; // mandi, wholesaler, distributor, retailer
    }
    
    // Check if coming from mandi page (but not logged in)
    const referrer = document.referrer;
    if (referrer.includes('mandi')) {
        return 'mandi_unauth'; // Special flag for unauthenticated mandi
    }
    
    // Check localStorage for general role
    const role = localStorage.getItem('userRole');
    if (role && (role === 'mandi' || role === 'wholesaler')) {
        return role;
    }
    
    // Default to farmer
    return 'farmer';
}

// Check authentication before allowing Mandi purchase
function checkMandiAuth(userRole) {
    if (userRole === 'mandi' || userRole === 'wholesaler' || userRole === 'retailer' || userRole === 'distributor') {
        // Check if actually logged in
        const currentUser = localStorage.getItem('currentMandiUser');
        if (!currentUser) {
            // Not logged in - redirect to auth page
            showAuthRequired();
            return false;
        }
        return true;
    }
    return true; // Farmers don't need auth
}

function showAuthRequired() {
    const modal = document.createElement('div');
    modal.className = 'payment-modal show';
    modal.id = 'paymentModal';
    modal.innerHTML = `
        <div class="payment-modal-content" style="max-width: 450px; text-align: center;">
            <div class="payment-header">
                <h2>🔒 Login Required</h2>
                <button class="close-modal-btn" onclick="closePaymentModal()">✕</button>
            </div>
            
            <div style="padding: 32px;">
                <div style="font-size: 4rem; margin: 20px 0;">🏪</div>
                
                <h3 style="margin: 20px 0;">Mandi/Wholesaler Login</h3>
                
                <p style="color: #6b7280; margin-bottom: 24px; line-height: 1.6;">
                    To make wholesale purchases, you need to login with your Mandi/Wholesaler account.
                </p>
                
                <div style="background: #f9fafb; padding: 20px; border-radius: 12px; margin-bottom: 24px; text-align: left;">
                    <h4 style="margin: 0 0 12px 0;">✅ Benefits:</h4>
                    <ul style="color: #374151; margin: 0; padding-left: 20px;">
                        <li>Wholesale prices</li>
                        <li>Bulk order discounts</li>
                        <li>Business invoices</li>
                        <li>GST compliance</li>
                        <li>Credit terms</li>
                    </ul>
                </div>
                
                <div class="payment-actions">
                    <a href="mandi-auth.html" class="payment-done-btn" style="text-decoration: none; display: block; text-align: center;">
                        🔓 Login / Register
                    </a>
                    <button class="payment-cancel-btn" onclick="closePaymentModal()">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
        <div class="payment-overlay" onclick="closePaymentModal()"></div>
    `;
    
    document.body.appendChild(modal);
}

// FARMER PAYMENT: Simple UPI Scanner
function showSimpleUPIPayment(amount, orderId) {
    const upiId = 'kissanai@paytm'; // Your UPI ID
    const upiUrl = `upi://pay?pa=${upiId}&pn=Kissan AI&am=${amount}&tn=Order ${orderId}&cu=INR`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(upiUrl)}`;
    
    const modal = document.createElement('div');
    modal.className = 'payment-modal show';
    modal.id = 'paymentModal';
    modal.innerHTML = `
        <div class="payment-modal-content" style="max-width: 450px; text-align: center;">
            <div class="payment-header">
                <h2>📱 Simple Payment</h2>
                <button class="close-modal-btn" onclick="closePaymentModal()">✕</button>
            </div>
            
            <div style="padding: 24px;">
                <div class="amount-display" style="font-size: 2.5rem; font-weight: 700; color: #7cb342; margin: 20px 0;">
                    ₹${amount}
                </div>
                
                <h3 style="margin: 20px 0;">Scan & Pay</h3>
                <p style="color: #6b7280; margin-bottom: 20px;">Use any UPI app to scan</p>
                
                <div style="background: white; padding: 20px; border-radius: 12px; display: inline-block; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                    <img src="${qrCodeUrl}" alt="UPI QR Code" style="width: 300px; height: 300px; display: block;">
                </div>
                
                <div style="margin: 24px 0;">
                    <p style="font-weight: 600; margin: 8px 0;">Or pay with:</p>
                    <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                        <button onclick="openUPIApp('phonepe', '${upiUrl}')" style="padding: 12px 20px; border: 2px solid #5f259f; background: white; border-radius: 8px; cursor: pointer; font-weight: 600;">
                            📱 PhonePe
                        </button>
                        <button onclick="openUPIApp('gpay', '${upiUrl}')" style="padding: 12px 20px; border: 2px solid #4285f4; background: white; border-radius: 8px; cursor: pointer; font-weight: 600;">
                            🔵 GPay
                        </button>
                        <button onclick="openUPIApp('paytm', '${upiUrl}')" style="padding: 12px 20px; border: 2px solid #00baf2; background: white; border-radius: 8px; cursor: pointer; font-weight: 600;">
                            💙 Paytm
                        </button>
                    </div>
                </div>
                
                <div style="background: #f3f4f6; padding: 16px; border-radius: 8px; margin: 20px 0;">
                    <p style="font-size: 0.875rem; color: #374151; margin: 4px 0;">UPI ID: <strong>${upiId}</strong></p>
                    <p style="font-size: 0.875rem; color: #374151; margin: 4px 0;">Order: <strong>${orderId}</strong></p>
                </div>
                
                <div class="payment-actions">
                    <button class="payment-done-btn" onclick="confirmFarmerPayment('${orderId}')">
                        ✅ Payment Done
                    </button>
                    <button class="payment-cancel-btn" onclick="closePaymentModal()">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
        <div class="payment-overlay" onclick="closePaymentModal()"></div>
    `;
    
    document.body.appendChild(modal);
}

function openUPIApp(app, upiUrl) {
    let appUrl = upiUrl;
    
    if (app === 'phonepe') {
        appUrl = upiUrl.replace('upi://', 'phonepe://');
    } else if (app === 'gpay') {
        appUrl = upiUrl.replace('upi://', 'gpay://upi/');
    } else if (app === 'paytm') {
        appUrl = upiUrl.replace('upi://', 'paytmmp://');
    }
    
    window.location.href = appUrl;
}

function confirmFarmerPayment(orderId) {
    closePaymentModal();
    alert(`✅ Order Placed!\n\nOrder ID: ${orderId}\n\nYour medicines will be delivered soon.\n\nThank you for using Kissan AI! 🌾`);
    cart.clear();
    closeCart();
    updateCartDisplay();
}

// MANDI/WHOLESALER PAYMENT: Dodo Payments Required
function showDodoPaymentRequired(amount, orderId) {
    const currentUser = JSON.parse(localStorage.getItem('currentMandiUser'));
    
    // If user has Dodo Business ID, show actual payment
    if (currentUser && currentUser.dodoBusinessId && currentUser.dodoRegistered) {
        showDodoPaymentCheckout(amount, orderId, currentUser);
    } else {
        // Show Dodo registration required
        showDodoRegistrationRequired(amount, orderId, currentUser);
    }
}

// Show actual Dodo payment checkout (user has Business ID)
function showDodoPaymentCheckout(amount, orderId, user) {
    const modal = document.createElement('div');
    modal.className = 'payment-modal show';
    modal.id = 'paymentModal';
    modal.innerHTML = `
        <div class="payment-modal-content" style="max-width: 500px;">
            <div class="payment-header">
                <h2>💳 Dodo Payments Checkout</h2>
                <button class="close-modal-btn" onclick="closePaymentModal()">✕</button>
            </div>
            
            <div style="padding: 24px;">
                <div style="background: #f0f9ff; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
                    <p style="margin: 0; font-size: 0.875rem; color: #374151;">
                        <strong>${user.businessName}</strong><br>
                        Business ID: ${user.dodoBusinessId}
                    </p>
                </div>
                
                <div class="amount-display" style="font-size: 2rem; font-weight: 700; color: #7cb342; margin: 20px 0; text-align: center;">
                    Total: ₹${amount}
                </div>
                
                <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 20px; border-radius: 12px; margin: 20px 0; text-align: center;">
                    <h3 style="margin: 0 0 12px 0;">✅ Ready to Pay</h3>
                    <p style="margin: 0; font-size: 0.9rem;">Your Dodo Payment account is linked</p>
                </div>
                
                <div style="background: #fff7ed; border: 2px solid #fb923c; padding: 16px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 0; font-size: 0.875rem; color: #78350f;">
                        <strong>📌 Demo Mode:</strong> In production, this would redirect to Dodo's secure checkout. For now, click "Process Payment" to simulate.
                    </p>
                </div>
                
                <div class="payment-actions">
                    <button class="payment-done-btn" onclick="processDodoPayment('${orderId}', '${user.businessName}')">
                        💳 Process Payment
                    </button>
                    <button class="payment-cancel-btn" onclick="closePaymentModal()">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
        <div class="payment-overlay" onclick="closePaymentModal()"></div>
    `;
    
    document.body.appendChild(modal);
}

// Show Dodo registration required (user doesn't have Business ID)
function showDodoRegistrationRequired(amount, orderId, user) {
    const modal = document.createElement('div');
    modal.className = 'payment-modal show';
    modal.id = 'paymentModal';
    modal.innerHTML = `
        <div class="payment-modal-content" style="max-width: 500px;">
            <div class="payment-header">
                <h2>🏪 Business Payment</h2>
                <button class="close-modal-btn" onclick="closePaymentModal()">✕</button>
            </div>
            
            <div style="padding: 24px;">
                <div class="amount-display" style="font-size: 2rem; font-weight: 700; color: #7cb342; margin: 20px 0; text-align: center;">
                    Amount: ₹${amount}
                </div>
                
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 12px; margin: 20px 0;">
                    <h3 style="margin: 0 0 12px 0;">✅ Dodo Payments Required</h3>
                    <p style="margin: 8px 0; font-size: 0.9rem;">For wholesale purchases, professional payment gateway is mandatory.</p>
                </div>
                
                <div style="background: #f9fafb; padding: 20px; border-radius: 12px; margin: 20px 0;">
                    <h4 style="margin: 0 0 12px 0;">📋 Why Dodo Payments?</h4>
                    <ul style="text-align: left; color: #374151; margin: 8px 0; padding-left: 20px;">
                        <li>✅ Business invoices & records</li>
                        <li>✅ Bulk order management</li>
                        <li>✅ GST compliance</li>
                        <li>✅ Credit/debit transactions</li>
                        <li>✅ Multiple payment methods</li>
                        <li>✅ Secure business account</li>
                    </ul>
                </div>
                
                <div style="background: #fef3c7; border: 2px solid #f59e0b; padding: 16px; border-radius: 8px; margin: 20px 0;">
                    <h4 style="margin: 0 0 12px 0; color: #92400e;">⚠️ Registration Required</h4>
                    <p style="margin: 8px 0; color: #78350f; font-size: 0.9rem;">You must complete Dodo Payments registration to proceed with wholesale purchases.</p>
                </div>
                
                <div style="margin: 24px 0;">
                    <h4 style="margin: 0 0 12px 0;">🚀 Quick Setup (2 minutes):</h4>
                    <ol style="text-align: left; color: #374151; margin: 8px 0; padding-left: 20px; line-height: 1.8;">
                        <li>Go to <a href="https://app.dodopayments.com/signup" target="_blank" style="color: #7cb342; font-weight: 600;">app.dodopayments.com</a></li>
                        <li>Sign up with: <strong>${user ? user.email : 'your business email'}</strong></li>
                        <li>Verify your account</li>
                        <li>Get Business ID</li>
                        <li>Update your profile with Business ID</li>
                        <li>Return here to complete payment</li>
                    </ol>
                </div>
                
                <div class="payment-actions" style="gap: 12px;">
                    <a href="https://app.dodopayments.com/signup" target="_blank" class="payment-done-btn" style="text-decoration: none; display: block; text-align: center;">
                        🚀 Register with Dodo
                    </a>
                    <button class="payment-cancel-btn" onclick="closePaymentModal()">
                        Cancel Order
                    </button>
                </div>
                
                <p style="font-size: 0.75rem; color: #6b7280; margin-top: 16px; text-align: center;">
                    After registration, update your Business ID in your profile settings.
                </p>
            </div>
        </div>
        <div class="payment-overlay" onclick="closePaymentModal()"></div>
    `;
    
    document.body.appendChild(modal);
}

// Process Dodo Payment
function processDodoPayment(orderId, businessName) {
    closePaymentModal();
    
    setTimeout(() => {
        alert(`✅ Payment Successful via Dodo Payments!\n\nOrder ID: ${orderId}\nBusiness: ${businessName}\n\nInvoice will be sent to your registered email.\n\nThank you for your wholesale order!`);
        cart.clear();
        closeCart();
        updateCartDisplay();
    }, 500);
}

function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    cart.updateCartIcon();
    
    // Filter tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            loadProducts(this.getAttribute('data-category'));
        });
    });
    
    // Search
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function() {
        loadProducts('all', this.value);
    });
});
