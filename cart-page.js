// Cargar los productos del carrito al abrir la página
document.addEventListener('DOMContentLoaded', () => {
    loadCartItems();
    updateCartSummary();
});

// Función para cargar los productos del carrito en la página
function loadCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const savedCart = localStorage.getItem('cart');
    
    if (savedCart) {
        const cart = JSON.parse(savedCart);

        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <img src="imagenes/${item.name}.jpg" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Cantidad: ${item.quantity}</p>
                    <p>Precio Unitario: $${item.price.toFixed(2)} MXN</p>
                </div>
                <div class="cart-item-price">
                    <p>$${(item.price * item.quantity).toFixed(2)} MXN</p>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });
    } else {
        cartItemsContainer.innerHTML = '<p>Tu carrito está vacío</p>';
    }
}

// Función para actualizar el resumen del carrito (total de productos y monto total)
function updateCartSummary() {
    const totalItemsElement = document.getElementById('total-items');
    const totalAmountElement = document.getElementById('total-amount');
    const savedCart = localStorage.getItem('cart');

    if (savedCart) {
        const cart = JSON.parse(savedCart);
        const totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);
        const totalAmount = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

        totalItemsElement.textContent = totalItems;
        totalAmountElement.textContent = `$${totalAmount.toFixed(2)} MXN`;
    }
}

// Evento para manejar el clic en el botón de "Finalizar Compra"
document.getElementById('checkout-btn').addEventListener('click', () => {
    alert('Compra finalizada. ¡Gracias por tu pedido!');
    // Limpiamos el carrito después de la compra
    localStorage.removeItem('cart');
    window.location.reload();
});
