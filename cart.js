// Inicializamos el carrito como un array vacío
let cart = [];

// Función para actualizar el ícono del carrito y el contador
function updateCartIcon() {
    const cartCountElement = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);
    cartCountElement.textContent = totalItems;
}

// Función para agregar un producto al carrito
function addToCart(productName, productPrice) {
    const existingProductIndex = cart.findIndex(product => product.name === productName);

    if (existingProductIndex !== -1) {
        // Si el producto ya está en el carrito, incrementamos la cantidad
        cart[existingProductIndex].quantity += 1;
    } else {
        // Si no está en el carrito, lo agregamos como nuevo
        const product = {
            name: productName,
            price: productPrice,
            quantity: 1
        };
        cart.push(product);
    }

    // Actualizamos el ícono del carrito
    updateCartIcon();

    // Guardamos el carrito en el almacenamiento local
    saveCart();
}

// Función para guardar el carrito en el almacenamiento local
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para cargar el carrito desde el almacenamiento local
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartIcon();
    }
}

// Función para manejar el evento de agregar al carrito
function handleAddToCart(event) {
    const cardElement = event.target.closest('.card');
    const productName = cardElement.getAttribute('data-product');
    const productPrice = parseFloat(cardElement.getAttribute('data-price'));

    addToCart(productName, productPrice);
}

// Cargar el carrito al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    loadCart();

    // Seleccionamos todos los botones de "Agregar al carrito"
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    // Asignamos el evento de click a cada botón
    addToCartButtons.forEach(button => {
        button.addEventListener('click', handleAddToCart);
    });
});