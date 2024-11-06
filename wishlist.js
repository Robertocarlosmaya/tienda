document.addEventListener('DOMContentLoaded', () => {
    const wishlistItemsContainer = document.getElementById('wishlist-items');
    const clearWishlistButton = document.getElementById('clear-wishlist');
    const addToCartButton = document.getElementById('add-to-cart');

    // Añadir event listeners a los botones de la lista de deseos en la página principal
    document.querySelectorAll('.wishlist-btn').forEach(button => {
        button.addEventListener('click', toggleWishlistItem);
    });

    if (wishlistItemsContainer) {
        loadWishlistItems();
    }

    if (clearWishlistButton) {
        clearWishlistButton.addEventListener('click', clearWishlist);
    }

    if (addToCartButton) {
        addToCartButton.addEventListener('click', addAllToCart);
    }

    updateWishlistButtonsState();
});

function toggleWishlistItem(event) {
    event.preventDefault();
    const button = event.currentTarget;
    const card = button.closest('.card');
    const productName = card.getAttribute('data-product');
    const productPrice = parseFloat(card.getAttribute('data-price'));

    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const index = wishlist.findIndex(item => item.name === productName);

    if (index === -1) {
        // Añadir a la lista de deseos
        wishlist.push({ name: productName, price: productPrice });
        button.classList.add('active');
        button.querySelector('i').classList.replace('far', 'fas');
    } else {
        // Remover de la lista de deseos
        wishlist.splice(index, 1);
        button.classList.remove('active');
        button.querySelector('i').classList.replace('fas', 'far');
    }

    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistButtonsState();
}

function updateWishlistButtonsState() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    document.querySelectorAll('.wishlist-btn').forEach(button => {
        const card = button.closest('.card');
        const productName = card.getAttribute('data-product');
        const isInWishlist = wishlist.some(item => item.name === productName);
        
        button.classList.toggle('active', isInWishlist);
        const icon = button.querySelector('i');
        if (isInWishlist) {
            icon.classList.replace('far', 'fas');
        } else {
            icon.classList.replace('fas', 'far');
        }
    });
}

function loadWishlistItems() {
    const wishlistItemsContainer = document.getElementById('wishlist-items');
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    wishlistItemsContainer.innerHTML = '';

    if (wishlist.length === 0) {
        wishlistItemsContainer.innerHTML = '<li>Tu lista de deseos está vacía.</li>';
    } else {
        wishlist.forEach((product, index) => {
            const listItem = document.createElement('li');
            listItem.classList.add('wishlist-item');
            listItem.innerHTML = `
                <div class="wishlist-item-details">
                    <h3>${product.name}</h3>
                    <p>Precio: $${product.price ? product.price.toFixed(2) : '0.00'} MXN</p>
                </div>
                <div class="wishlist-item-actions">
                    <button class="remove-item" data-index="${index}">Eliminar</button>
                    <button class="add-to-cart" data-index="${index}">Añadir al carrito</button>
                </div>
            `;
            wishlistItemsContainer.appendChild(listItem);
        });

        // Añadir event listeners a los botones
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => removeFromWishlistByIndex(e.target.dataset.index));
        });
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => addToCartFromWishlist(e.target.dataset.index));
        });
    }
}

function clearWishlist() {
    if (confirm('¿Estás seguro de que quieres vaciar tu lista de deseos?')) {
        localStorage.removeItem('wishlist');
        loadWishlistItems();
        updateWishlistButtonsState();
    }
}

function removeFromWishlistByIndex(index) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist.splice(index, 1);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    loadWishlistItems();
    updateWishlistButtonsState();
}

function addToCartFromWishlist(index) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = wishlist[index];

    if (product) {
        const existingProductIndex = cart.findIndex(item => item.name === product.name);
        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        removeFromWishlistByIndex(index);
        alert(`${product.name} ha sido añadido al carrito.`);
        updateCartIcon();
    }
}

function addAllToCart() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    wishlist.forEach(product => {
        const existingProductIndex = cart.findIndex(item => item.name === product.name);
        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.removeItem('wishlist');
    loadWishlistItems();
    updateWishlistButtonsState();
    alert('Todos los productos de la lista de deseos han sido añadidos al carrito.');
    updateCartIcon();
}

function updateCartIcon() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}