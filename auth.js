// Objeto global para almacenar la información del usuario actual
let currentUser = null;

document.addEventListener('DOMContentLoaded', () => {
    initializeTestUsers();

    const loginForm = document.getElementById('login');
    const registerForm = document.getElementById('register');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    const forgotPasswordLink = document.getElementById('forgot-password');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', toggleForms);
    }

    if (showLoginLink) {
        showLoginLink.addEventListener('click', toggleForms);
    }

    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', showForgotPasswordForm);
    }

    // Solo verificamos el estado de autenticación si no estamos en la página de login
    if (!window.location.pathname.includes('login.html')) {
        checkAuthStatus();
    }
});

function initializeTestUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.length === 0) {
        users.push(
            { username: 'usuario1', password: 'Password1', role: 'user' },
            { username: 'usuario2', password: 'Password2', role: 'user' }
        );
        localStorage.setItem('users', JSON.stringify(users));
    }
}

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const errorElement = document.getElementById('login-error');

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        currentUser = {
            username: user.username,
            role: user.role,
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = user.role === 'admin' ? 'admin.html' : 'index.html';
    } else if (username === 'admin' && password === 'admin123') {
        currentUser = {
            username: 'admin',
            role: 'admin',
        };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'admin.html';
    } else {
        errorElement.textContent = 'Usuario o contraseña incorrectos';
    }
}

function handleRegister(event) {
    event.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const errorElement = document.getElementById('register-error');

    if (!validatePassword(password)) {
        errorElement.textContent = 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula y un número.';
        return;
    }

    if (password !== confirmPassword) {
        errorElement.textContent = 'Las contraseñas no coinciden';
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.username === username)) {
        errorElement.textContent = 'El nombre de usuario ya existe';
        return;
    }

    const newUser = {
        username,
        password,
        role: 'user'
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    currentUser = {
        username: newUser.username,
        role: newUser.role,
    };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'index.html';
}

function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);
}

function toggleForms(event) {
    event.preventDefault();
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
    registerForm.style.display = registerForm.style.display === 'none' ? 'block' : 'none';
}

function showForgotPasswordForm(event) {
    event.preventDefault();
    window.location.href = 'forgot-password.html';
}

function checkAuthStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn && currentUser) {
        if (window.location.pathname.includes('admin.html') && currentUser.role !== 'admin') {
            window.location.href = 'index.html';
        } else if (!window.location.pathname.includes('admin.html') && currentUser.role === 'admin') {
            window.location.href = 'admin.html';
        }
    } else if (window.location.pathname.includes('admin.html')) {
        window.location.href = 'login.html';
    }
}

function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

function requireAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!isLoggedIn || !currentUser) {
        window.location.href = 'login.html';
    }
}

function requireAdminAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!isLoggedIn || !currentUser || currentUser.role !== 'admin') {
        window.location.href = 'login.html';
    }
}

function userExists(username) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(u => u.username === username);
}

function changePassword(username, newPassword) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.username === username);
    
    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }
    return false;
}