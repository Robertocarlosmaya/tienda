// Función para autenticar al usuario
function authenticateUser(username, password) {
    return username === "20699" && password === "20699";
}

// Obtener elementos del DOM
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const messageDiv = document.getElementById('message');

// Agregar evento de envío al formulario
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    const username = usernameInput.value;
    const password = passwordInput.value;

    // Autenticar usuario
    if (authenticateUser(username, password)) {
        // Usuario autenticado
        messageDiv.textContent = '¡Inicio de sesión exitoso!';
        messageDiv.style.color = 'green';
        
        // Redireccionar a index.html
        window.location.href = 'index.html';
    } else {
        // Autenticación fallida
        messageDiv.textContent = 'Nombre de usuario o contraseña incorrectos.';
        messageDiv.style.color = 'red';
        
        // Limpiar campos de entrada
        usernameInput.value = '';
        passwordInput.value = '';
        
        // Enfocar el campo de nombre de usuario
        usernameInput.focus();
    }
});

// Agregar eventos para mejorar la experiencia del usuario
usernameInput.addEventListener('input', function() {
    messageDiv.textContent = '';
});

passwordInput.addEventListener('input', function() {
    messageDiv.textContent = '';
});s