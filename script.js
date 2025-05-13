// Cart functionality
class ShoppingCart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartCount();
    }

    addToCart(item) {
        this.cart.push(item);
        this.saveCart();
        this.updateCartCount();
        this.showNotification('Item added to cart!');
    }

    removeFromCart(itemId) {
        this.cart = this.cart.filter(item => item.id !== itemId);
        this.saveCart();
        this.updateCartCount();
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    updateCartCount() {
        const cartCount = this.cart.length;
        const cartIcon = document.querySelector('.icon-container[href="/cart"]');
        
        // Update or create cart count badge
        let badge = cartIcon.querySelector('.cart-badge');
        if (!badge) {
            badge = document.createElement('div');
            badge.className = 'cart-badge';
            cartIcon.appendChild(badge);
        }
        
        badge.textContent = cartCount;
        badge.style.display = cartCount > 0 ? 'block' : 'none';
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    getCartItems() {
        return this.cart;
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Function to create Add to Cart button
function createAddToCartButton(product) {
    const button = document.createElement('button');
    button.className = 'add-to-cart-btn';
    button.textContent = 'Add to Cart';
    button.onclick = () => {
        cart.addToCart(product);
    };
    return button;
}

// Add styles for cart elements
const styles = document.createElement('style');
styles.textContent = `
    .cart-badge {
        position: absolute;
        top: -8px;
        right: -8px;
        background-color: #ff4444;
        color: white;
        border-radius: 50%;
        padding: 2px 6px;
        font-size: 12px;
        min-width: 18px;
        text-align: center;
    }

    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #333;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        animation: slideIn 0.3s ease-out;
        z-index: 1000;
    }

    .add-to-cart-btn {
        background-color: #1f1f1f;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .add-to-cart-btn:hover {
        background-color: #333;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;

document.head.appendChild(styles);

// Make cart available globally
window.cart = cart; 