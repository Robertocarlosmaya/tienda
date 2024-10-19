document.addEventListener('DOMContentLoaded', function() {
    const wishlistItemsContainer = document.getElementById('wishlist-items');
    const clearWishlistButton = document.getElementById('clear-wishlist');
    const payWishlistButton = document.getElementById('pay-wishlist');

    // Obtener la lista de deseos desde Local Storage
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Mostrar los productos en la página
    wishlist.forEach(product => {
        const wishlistItem = document.createElement('li');
        wishlistItem.textContent = product;
        wishlistItemsContainer.appendChild(wishlistItem);
    });

    // Vaciar la lista de deseos
    clearWishlistButton.addEventListener('click', () => {
        localStorage.removeItem('wishlist'); // Eliminar la lista de Local Storage
        wishlistItemsContainer.innerHTML = ''; // Vaciar el contenido del HTML
        alert('Tu lista de deseos ha sido vaciada.');
    });

   // Al agregar a la lista de deseos, guarda también el precio
button.addEventListener('click', () => {
    const productName = button.parentElement.querySelector('.card-title').textContent;
    const productPrice = button.parentElement.querySelector('.card-price').textContent;

    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Verificar si el producto ya está en la lista de deseos
    if (!wishlist.some(item => item.name === productName)) {
        wishlist.push({ name: productName, price: parseFloat(productPrice.replace('$', '')) });
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert(`${productName} ha sido añadido a tu lista de deseos.`);
    } else {
        alert(`${productName} ya está en tu lista de deseos.`);
    }
});

// Al pagar desde la lista de deseos
payWishlistButton.addEventListener('click', () => {
    if (wishlist.length === 0) {
        alert('Tu lista de deseos está vacía.');
    } else {
        wishlist.forEach(productName => {
            const productPrice = getProductPrice(productName); // Ajusta esta función según corresponda
            console.log(`Producto añadido al carrito desde lista de deseos: ${productName}, precio: ${productPrice}`);
            addToCartFromWishlist(productName, productPrice);
        });

        // Verificar carrito después de añadir productos
        const savedCart = localStorage.getItem('cart');
        console.log('Carrito actualizado después de añadir desde lista de deseos:', savedCart);

        alert('Redirigiendo al carrito de compras...');
        window.location.href = 'cart-page.html'; // Asegúrate de que esta URL es correcta
    }
});

});

// Función para agregar productos al carrito desde la lista de deseos
function addToCartFromWishlist(productName, productPrice) {
    const savedCart = localStorage.getItem('cart');
    let cart = savedCart ? JSON.parse(savedCart) : [];

    // Verificar si el producto ya está en el carrito
    const productIndex = cart.findIndex(item => item.name === productName);

    if (productIndex !== -1) {
        // Si ya está en el carrito, incrementar la cantidad
        cart[productIndex].quantity += 1;
    } else {
        // Si no está en el carrito, agregarlo
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Producto añadido al carrito desde la lista de deseos:', cart); // Verifica que se guarde correctamente
}

