document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.querySelector('.formulario');
  const inputEmail = formulario.querySelector('input[type="email"]');
  const inputPassword = formulario.querySelector('input[type="password"]');
  const labelEmail = formulario.querySelector('.label-email');
  const labelPassword = formulario.querySelector('.label-contraseña');
  const mostrarPass = formulario.querySelector('.mostrar-contraseña');

  // Crear botón para admin
  const btnAdmin = document.createElement('button');
  btnAdmin.type = 'button';
  btnAdmin.textContent = 'Entrar como Administrador';
  btnAdmin.classList.add('btn', 'btn-secondary', 'mb-3', 'w-100');
  formulario.querySelector('.seccion-botones').insertBefore(btnAdmin, formulario.querySelector('.button'));

  // Mostrar/ocultar contraseña
  mostrarPass.addEventListener('click', () => {
    if (inputPassword.type === 'password') {
      inputPassword.type = 'text';
      mostrarPass.textContent = 'Ocultar contraseña';
    } else {
      inputPassword.type = 'password';
      mostrarPass.textContent = 'Mostrar contraseña';
    }
  });

  function validarAdmin(email, password) {
    const adminEmail = localStorage.getItem('adminEmail');
    const adminPass = localStorage.getItem('adminPassword');
    return email === adminEmail && password === adminPass;
  }

  // Login usuario normal
  formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    labelEmail.textContent = '';
    labelPassword.textContent = '';

    const email = inputEmail.value.trim().toLowerCase();
    const password = inputPassword.value;

    if (!email || !password) {
      if (!email) labelEmail.textContent = 'Por favor ingresa tu correo.';
      if (!password) labelPassword.textContent = 'Por favor ingresa tu contraseña.';
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioEncontrado = usuarios.find(u => u.email.toLowerCase() === email);

    if (!usuarioEncontrado) {
      labelEmail.textContent = 'Usuario no encontrado.';
      return;
    }
    if (usuarioEncontrado.password !== password) {
      labelPassword.textContent = 'Contraseña incorrecta.';
      return;
    }

    localStorage.setItem('usuarioLogueado', JSON.stringify({
      nombre: usuarioEncontrado.nombre,
      email: usuarioEncontrado.email,
      rol: 'user'
    }));

    alert(`¡Bienvenido ${usuarioEncontrado.nombre}!`);
    window.location.href = 'home.html';
  });

  // Login administrador
  btnAdmin.addEventListener('click', () => {
    labelEmail.textContent = '';
    labelPassword.textContent = '';

    const email = inputEmail.value.trim().toLowerCase();
    const password = inputPassword.value;

    if (!email || !password) {
      if (!email) labelEmail.textContent = 'Por favor ingresa tu correo.';
      if (!password) labelPassword.textContent = 'Por favor ingresa tu contraseña.';
      return;
    }

    if (validarAdmin(email, password)) {
      localStorage.setItem('usuarioLogueado', JSON.stringify({
        nombre: 'Administrador',
        email,
        rol: 'admin'
      }));

      alert('¡Bienvenido Administrador!');
      window.location.href = '../Administrador/home.html';
    } else {
      labelEmail.textContent = 'Credenciales incorrectas para administrador.';
    }
  });

  // Inicializar admin (solo una vez)
  if (!localStorage.getItem('adminEmail')) {
    localStorage.setItem('adminEmail', 'admin@huertohogar.com');
    localStorage.setItem('adminPassword', 'admin123');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logout-btn');

  logoutBtn.addEventListener('click', () => {
    // Eliminar datos de sesión del almacenamiento local
    localStorage.removeItem('usuarioLogueado');
    localStorage.removeItem('usuarios');

    // Redirigir al usuario a la página principal
    window.location.href = '../Tienda/home.html';
  });
});



