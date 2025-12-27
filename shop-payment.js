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

//  FREE UPI Payment Integration
function proceedToCheckout() {
    if (cart.items.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const amount = cart.getTotal();
    const orderId = 'KAI' + Date.now();
    
    showPaymentModal(amount, orderId);
}

function showPaymentModal(amount, orderId) {
    const modal = document.createElement('div');
    modal.className = 'payment-modal';
    modal.id = 'paymentModal';
    modal.innerHTML = `
        <div class="payment-modal-content">
            <div class="payment-header">
                <h2>💳 Choose Payment Method</h2>
                <button class="close-modal-btn" onclick="closePaymentModal()">✕</button>
            </div>
            
            <div class="payment-amount">
                <span>Total Amount:</span>
                <span class="amount">₹${amount}</span>
            </div>
            
            <div class="payment-methods">
                <button class="payment-method-btn phonepe" onclick="payWithUPI('phonepe', ${amount}, '${orderId}')">
                    <span class="payment-icon">📱</span>
                    <span class="payment-name">PhonePe</span>
                    <span class="payment-tag">FREE</span>
                </button>
                
                <button class="payment-method-btn gpay" onclick="payWithUPI('gpay', ${amount}, '${orderId}')">
                    <span class="payment-icon">🔵</span>
                    <span class="payment-name">Google Pay</span>
                    <span class="payment-tag">FREE</span>
                </button>
                
                <button class="payment-method-btn paytm" onclick="payWithUPI('paytm', ${amount}, '${orderId}')">
                    <span class="payment-icon">💙</span>
                    <span class="payment-name">Paytm</span>
                    <span class="payment-tag">FREE</span>
                </button>
                
                <button class="payment-method-btn upi" onclick="payWithUPI('upi', ${amount}, '${orderId}')">
                    <span class="payment-icon">💰</span>
                    <span class="payment-name">Any UPI App</span>
                    <span class="payment-tag">FREE</span>
                </button>
            </div>
            
            <div class="payment-note">
                ✅ Zero transaction fees<br>
                ✅ Instant payment confirmation<br>
                ✅ Secure UPI payment
            </div>
        </div>
        <div class="payment-overlay" onclick="closePaymentModal()"></div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
}

function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

function payWithUPI(app, amount, orderId) {
    const upiId = 'kissanai@paytm'; // Replace with your UPI ID
    const merchantName = 'Kissan AI';
    const transactionNote = `Order ${orderId}`;
    
    // Create UPI intent URL
    let upiUrl = '';
    
    switch(app) {
        case 'phonepe':
            upiUrl = `phonepe://pay?pa=${upiId}&pn=${merchantName}&am=${amount}&tn=${transactionNote}&cu=INR`;
            break;
        case 'gpay':
            upiUrl = `gpay://upi/pay?pa=${upiId}&pn=${merchantName}&am=${amount}&tn=${transactionNote}&cu=INR`;
            break;
        case 'paytm':
            upiUrl = `paytmmp://pay?pa=${upiId}&pn=${merchantName}&am=${amount}&tn=${transactionNote}&cu=INR`;
            break;
        case 'upi':
        default:
            upiUrl = `upi://pay?pa=${upiId}&pn=${merchantName}&am=${amount}&tn=${transactionNote}&cu=INR`;
            break;
    }
    
    // Create QR code as fallback (for desktop)
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(upiUrl)}`;
    
    closePaymentModal();
    
    // Show payment confirmation/QR modal
    const confirmModal = document.createElement('div');
    confirmModal.className = 'payment-modal show';
    confirmModal.id = 'paymentModal';
    confirmModal.innerHTML = `
        <div class="payment-modal-content">
            <div class="payment-header">
                <h2>💳 Complete Payment</h2>
            </div>
            
            <div class="payment-instructions">
                <p style="text-align:center; margin: 20px 0;">
                    Opening ${app.toUpperCase()}...<br>
                    Complete payment in the app
                </p>
                
                <div class="qr-section">
                    <p>Or scan this QR code:</p>
                    <img src="${qrCodeUrl}" alt="UPI QR Code" class="upi-qr-code">
                    <p class="upi-id">UPI ID: ${upiId}</p>
                    <p class="amount-display">₹${amount}</p>
                </div>
                
                <div class="payment-actions">
                    <button class="payment-done-btn" onclick="confirmPaymentDone('${orderId}')">
                        ✅ I've Completed Payment
                    </button>
                    <button class="payment-cancel-btn" onclick="closePaymentModal()">
                        ❌ Cancel
                    </button>
                </div>
            </div>
        </div>
        <div class="payment-overlay" onclick="closePaymentModal()"></div>
    `;
    
    document.body.appendChild(confirmModal);
    
    // Try to open UPI app
    window.location.href = upiUrl;
}

function confirmPaymentDone(orderId) {
    alert(`✅ Order Placed Successfully!\n\nOrder ID: ${orderId}\n\nThank you for your purchase! Your medicines will be delivered soon.`);
    cart.clear();
    closeCart();
    closePaymentModal();
    updateCartDisplay();
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
