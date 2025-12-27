// ===========================
// SHOPPING CART SYSTEM
// ===========================

class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
        this.updateCartIcon();
    }
    
    loadCart() {
        const saved = localStorage.getItem('farmCart');
        return saved ? JSON.parse(saved) : [];
    }
    
    saveCart() {
        localStorage.setItem('farmCart', JSON.stringify(this.items));
        this.updateCartIcon();
    }
    
    addItem(medicineId, packSize, quantity = 1) {
        const medicine = getMedicineById(medicineId);
        if (!medicine) return false;
        
        // Check if item already in cart
        const existing = this.items.find(item => 
            item.medicineId === medicineId && item.packSize === packSize
        );
        
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.items.push({
                medicineId,
                packSize,
                quantity,
                price: medicine.price[packSize],
                name: medicine.brand,
                addedAt: Date.now()
            });
        }
        
        this.saveCart();
        this.showNotification(`${medicine.brand} added to cart!`);
        return true;
    }
    
    removeItem(index) {
        this.items.splice(index, 1);
        this.saveCart();
    }
    
    updateQuantity(index, quantity) {
        if (quantity <= 0) {
            this.removeItem(index);
        } else {
            this.items[index].quantity = quantity;
            this.saveCart();
        }
    }
    
    getTotal() {
        return this.items.reduce((total, item) => 
            total + (item.price * item.quantity), 0
        );
    }
    
    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }
    
    clear() {
        this.items = [];
        this.saveCart();
    }
    
    updateCartIcon() {
        const cartBadge = document.getElementById('cartBadge');
        if (cartBadge) {
            const count = this.getItemCount();
            cartBadge.textContent = count;
            cartBadge.style.display = count > 0 ? 'flex' : 'none';
        }
    }
    
    showNotification(message) {
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <span>✅ ${message}</span>
        `;
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize cart
const cart = new ShoppingCart();
window.cart = cart;
