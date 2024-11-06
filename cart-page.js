document.addEventListener('DOMContentLoaded', () => {
    loadCartItems();
    updateCartSummary();

    document.getElementById('clear-cart-btn').addEventListener('click', clearCart);
    document.getElementById('checkout-btn').addEventListener('click', finalizePurchase);
});

function loadCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const savedCart = localStorage.getItem('cart');

    if (savedCart && savedCart !== "undefined") {
        const cart = JSON.parse(savedCart);
        cartItemsContainer.innerHTML = '';

        cart.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <img src="imagenes/${item.name.replace(/\s+/g, '-').toLowerCase()}.jpg" alt="${item.name}" onerror="this.onerror=null; this.src='imagenes/placeholder.jpg';">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Cantidad: <span class="item-quantity">${item.quantity}</span></p>
                    <p>Precio Unitario: $${item.price.toFixed(2)} MXN</p>
                </div>
                <div class="cart-item-actions">
                    <button class="increase-quantity" data-index="${index}">+</button>
                    <button class="decrease-quantity" data-index="${index}">-</button>
                    <button class="remove-item" data-index="${index}">Eliminar</button>
                </div>
                <div class="cart-item-price">
                    <p>$${(item.price * item.quantity).toFixed(2)} MXN</p>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });

        // Asignar eventos de botones de cantidad y eliminar
        assignButtonEvents();
    } else {
        cartItemsContainer.innerHTML = '<p>Tu carrito está vacío</p>';
    }
}

function assignButtonEvents() {
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', () => updateQuantity(button.dataset.index, 1));
    });
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', () => updateQuantity(button.dataset.index, -1));
    });
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', () => removeItem(button.dataset.index));
    });
}

// ... (el resto del código permanece igual)

function updateCartSummary() {
    const savedCart = localStorage.getItem('cart');
    let cart = savedCart ? JSON.parse(savedCart) : [];
    let totalItems = 0;
    let totalAmount = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
        totalAmount += item.price * item.quantity;
    });

    document.getElementById('total-items').textContent = totalItems;
    document.getElementById('total-amount').textContent = `$${totalAmount.toFixed(2)} MXN`;
}

function updateQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
        updateCartSummary();
    } else {
        removeItem(index);
    }
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCartItems();
    updateCartSummary();
}

function clearCart() {
    localStorage.removeItem('cart');
    loadCartItems();
    updateCartSummary();
    alert('Tu carrito ha sido vaciado.');
}

function finalizePurchase() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart && savedCart !== "[]") {
        localStorage.removeItem('cart');
        loadCartItems();
        updateCartSummary();
        alert('Compra realizada con éxito. ¡Gracias por tu compra!');
    } else {
        alert('El carrito está vacío. Agrega productos antes de finalizar la compra.');
    }
}