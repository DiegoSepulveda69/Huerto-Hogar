document.addEventListener('DOMContentLoaded', () => {
  const loginArea = document.getElementById('login-area');

  if (!loginArea) {
    console.error('Elemento #login-area no encontrado.');
    return;
  }

  // Obtener el usuario desde localStorage
  const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
  console.log(usuario); // Verificar el contenido del usuario

  if (usuario) {
    loginArea.innerHTML = `
      <span class="nav-link text-white">Bienvenido/a, ${usuario.nombre}</span>
      <button id="logoutBtn" class="btn btn-outline-light btn-sm ms-3">Cerrar sesión</button>
    `;

    document.getElementById('logoutBtn').addEventListener('click', () => {
      // Eliminar usuario de localStorage
      localStorage.removeItem('usuarioLogueado');
      // Recargar la página
      location.reload();
    });
  } else {
    loginArea.innerHTML = `
      <a class="nav-link" href="iniciar_sesion.html">Iniciar sesión</a>
      <a class="nav-link ms-3" href="registro_usuario.html">Registrar usuario</a>
    `;
  }
});


