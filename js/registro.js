document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.querySelector('.formulario');

  formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener valores del formulario
    const nombre = this.querySelector('input[type="text"]').value.trim();
    const email = this.querySelector('input[type="email"]').value.trim();
    const emailConfirm = this.querySelectorAll('input[type="email"]')[1].value.trim();
    const password = this.querySelectorAll('input[type="password"]')[0].value.trim();
    const passwordConfirm = this.querySelectorAll('input[type="password"]')[1].value.trim();
    const telefono = this.querySelector('input[type="tel"]').value.trim();
    const region = this.querySelector('#region').value;
    const comuna = this.querySelector('#comuna').value;

    // Validaciones básicas
    if (email !== emailConfirm) {
      alert('Los correos electrónicos no coinciden');
      return;
    }
    if (password !== passwordConfirm) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Obtener usuarios previos o crear arreglo vacío
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Validar si el email ya está registrado
    const existeUsuario = usuarios.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (existeUsuario) {
      alert('Este correo electrónico ya está registrado.');
      return;
    }

    // Crear objeto usuario
    const usuario = {
      nombre,
      email,
      password,
      telefono,
      region,
      comuna
    };

    // Agregar nuevo usuario
    usuarios.push(usuario);

    // Guardar de nuevo en localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Registro exitoso!');

    // Redirigir automáticamente después del registro
    window.location.href = 'home.html';
  });
});

