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

//  Dodo Payments Integration
function proceedToCheckout() {
    if (cart.items.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const amount = cart.getTotal();
    const orderId = 'KAI' + Date.now();
    
    // Create Dodo Payments checkout
    initiateDodoPayment(amount, orderId);
}

function initiateDodoPayment(amount, orderId) {
    // Dodo Payments configuration
    const DODO_BUSINESS_ID = 'your_business_id_here'; // Get from https://app.dodopayments.com
    
    // Create checkout session
    const checkoutData = {
        amount: amount,
        currency: 'INR',
        orderId: orderId,
        description: 'Agricultural Medicines - Kissan AI',
        customerEmail: 'customer@example.com', // Can be dynamic
        successUrl: window.location.href + '?payment=success',
        cancelUrl: window.location.href + '?payment=cancel',
        items: cart.items.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            size: item.packSize
        }))
    };
    
    // Show Dodo Payments modal
    showDodoPaymentModal(checkoutData);
}

function showDodoPaymentModal(checkoutData) {
    const modal = document.createElement('div');
    modal.className = 'payment-modal show';
    modal.id = 'paymentModal';
    modal.innerHTML = `
        <div class="payment-modal-content" style="max-width: 600px;">
            <div class="payment-header">
             <h2>💳 Complete Your Purchase</h2>
                <button class="close-modal-btn" onclick="closePaymentModal()">✕</button>
            </div>
            
            <div class="dodo-payment-container">
                <div class="order-summary">
                    <h3>Order Summary</h3>
                    <div class="order-items">
                        ${checkoutData.items.map(item => `
                            <div class="order-item">
                                <span>${item.name} (${item.size})</span>
                                <span>₹${item.price} × ${item.quantity}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="order-total">
                        <strong>Total:</strong>
                        <strong>₹${checkoutData.amount}</strong>
                    </div>
                </div>
                
                <div class="payment-message">
                    <div class="info-box">
                        <h4>🎉 Dodo Payments - Secure Checkout</h4>
                        <p>✅ Multiple payment methods</p>
                        <p>✅ UPI, Cards, Net Banking, Wallets</p>
                        <p>✅ Secure & encrypted</p>
                        <p>✅ Instant confirmation</p>
                    </div>
                    
                    <div class="demo-notice">
                        <p><strong>📌 Demo Mode:</strong></p>
                        <p>To use Dodo Payments:</p>
                        <ol style="text-align: left; margin: 12px 20px;">
                            <li>Sign up at <a href="https://app.dodopayments.com/signup" target="_blank">app.dodopayments.com</a></li>
                            <li>Get your Business ID</li>
                            <li>Add it to <code>shop-payment.js</code> (line 119)</li>
                            <li>Integrate Dodo SDK for live payments</li>
                        </ol>
                    </div>
                    
                    <div class="payment-actions" style="margin-top: 24px;">
                        <button class="payment-done-btn" onclick="simulateDodoPayment('${checkoutData.orderId}')">
                            ✅ Continue to Payment
                        </button>
                        <button class="payment-cancel-btn" onclick="closePaymentModal()">
                            ❌ Cancel
                        </button>
                    </div>
                    
                    <div style="margin-top: 16px; font-size: 0.75rem; color: #6b7280;">
                        <p>Powered by <strong>Dodo Payments</strong></p>
                        <p>Accepts: UPI, Cards, Net Banking, Wallets</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="payment-overlay" onclick="closePaymentModal()"></div>
    `;
    
    document.body.appendChild(modal);
}

function simulateDodoPayment(orderId) {
    // In production, this would call Dodo Payments API
    // For demo, we simulate success
    
    closePaymentModal();
    
    // Show success message
    setTimeout(() => {
        alert(`✅ Payment Successful!\n\nOrder ID: ${orderId}\n\nThank you for your purchase!\n\n💡 To enable real payments, integrate Dodo Payments SDK from:\nhttps://docs.dodopayments.com`);
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
