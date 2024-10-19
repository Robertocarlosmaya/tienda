// Cargar los productos del carrito al abrir la página
document.addEventListener('DOMContentLoaded', () => {
    loadCartItems();
    updateCartSummary();
});

function loadCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const savedCart = localStorage.getItem('cart');
    
    if (savedCart) {
        const cart = JSON.parse(savedCart);
        
        cartItemsContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar los elementos
        
        cart.forEach((item, index) => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <img src="imagenes/${item.name}.jpg" alt="${item.name}">
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
    } else {
        cartItemsContainer.innerHTML = '<p>Tu carrito está vacío</p>';
    }
}

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

// Función para guardar el carrito en Local Storage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Evento para manejar el clic en el botón de "Finalizar Compra"
document.getElementById('checkout-btn').addEventListener('click', () => {
    const savedCart = localStorage.getItem('cart');
    const cart = JSON.parse(savedCart) || [];

    if (cart.length === 0) {
        alert('Tu carrito está vacío, no puedes finalizar la compra.');
    } else {
        alert('Compra finalizada. ¡Gracias por tu pedido!');
        localStorage.removeItem('cart');
        window.location.reload();
    }
});

// Evento para vaciar el carrito
document.getElementById('clear-cart-btn').addEventListener('click', function() {
    localStorage.removeItem('cart');
    document.getElementById('cart-items').innerHTML = '';
    document.getElementById('total-items').textContent = '0';
    document.getElementById('total-amount').textContent = '$0.00 MXN';
    alert('El carrito ha sido vaciado.');
});

// Manejar eventos para los botones de sumar, restar y eliminar
document.getElementById('cart-items').addEventListener('click', function(event) {
    const savedCart = localStorage.getItem('cart');
    let cart = JSON.parse(savedCart) || [];

    // Sumar cantidad
    if (event.target.classList.contains('increase-quantity')) {
        const index = event.target.dataset.index;
        cart[index].quantity += 1;
        saveCart(cart);
        loadCartItems(); // Recargar los productos
        updateCartSummary();
    }

    // Restar cantidad
    if (event.target.classList.contains('decrease-quantity')) {
        const index = event.target.dataset.index;
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
            saveCart(cart);
            loadCartItems();
            updateCartSummary();
        } else {
            alert('La cantidad no puede ser menor a 1. Si deseas eliminar el producto, usa el botón "Eliminar".');
        }
    }

    // Eliminar producto
    if (event.target.classList.contains('remove-item')) {
        const index = event.target.dataset.index;
        cart.splice(index, 1);
        saveCart(cart);
        loadCartItems();
        updateCartSummary();
    }
});
