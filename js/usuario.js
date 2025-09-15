document.addEventListener('DOMContentLoaded', () => {
    const listaUsuarios = document.getElementById('lista-usuarios');

    const obtenerUsuarios = () => {
        const usuarios = localStorage.getItem('usuarios');
        return usuarios ? JSON.parse(usuarios) : [];
    };

    const renderizarUsuarios = () => {
        const usuarios = obtenerUsuarios();
        listaUsuarios.innerHTML = "";

        if (usuarios.length === 0) {
            listaUsuarios.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center">No hay usuarios registrados</td>
                </tr>
            `;
            return;
        }

        usuarios.forEach((user, index) => {
            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${index + 1}</td>
                <td>${user.nombre}</td>
                <td>${user.email}</td>
                <td>${user.rol}</td>
                <td>
                    <button class="btn btn-warning btn-sm">Editar</button>
                    <button class="btn btn-danger btn-sm">Eliminar</button>
                </td>
            `;

            listaUsuarios.appendChild(fila);
        });
    };

    renderizarUsuarios();
});
