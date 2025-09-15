document.addEventListener('DOMContentLoaded', () => {

    const listaUsuarios = document.getElementById('lista-usuarios');
    const btnNuevoUsuario = document.getElementById('btn-nuevo-usuario');
    
    // Función para obtener los usuarios de localStorage
    const obtenerUsuarios = () => {
        const usuarios = localStorage.getItem('usuarios');
        return usuarios ? JSON.parse(usuarios) : [];
    };

    // Función para guardar los usuarios en localStorage
    const guardarUsuarios = (usuarios) => {
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    };

    // Función para renderizar la tabla con los usuarios
    const renderizarTabla = () => {
        const usuarios = obtenerUsuarios();
        listaUsuarios.innerHTML = ''; // Limpia la tabla
        
        usuarios.forEach((usuario, index) => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${index + 1}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.email}</td>
                <td>${usuario.rol}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-2 btn-editar" data-id="${usuario.id}"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-outline-danger btn-eliminar" data-id="${usuario.id}"><i class="fas fa-trash-alt"></i></button>
                </td>
            `;
            listaUsuarios.appendChild(fila);
        });
    };

    // Función para agregar un nuevo usuario
    const agregarUsuario = () => {
        const nombre = prompt('Ingrese el nombre del usuario:');
        const email = prompt('Ingrese el email del usuario:');
        const rol = prompt('Ingrese el rol (Admin, Empleado, Cliente):');
        
        if (nombre && email && rol) {
            const usuarios = obtenerUsuarios();
            const nuevoUsuario = {
                id: Date.now(), // Un ID único
                nombre: nombre,
                email: email,
                rol: rol
            };
            usuarios.push(nuevoUsuario);
            guardarUsuarios(usuarios);
            renderizarTabla();
        }
    };

    // Función para eliminar un usuario
    const eliminarUsuario = (e) => {
        if (e.target.closest('.btn-eliminar')) {
            const id = e.target.closest('.btn-eliminar').dataset.id;
            const usuarios = obtenerUsuarios();
            const usuariosActualizados = usuarios.filter(usuario => usuario.id != id);
            guardarUsuarios(usuariosActualizados);
            renderizarTabla();
        }
    };

    // Función para editar un usuario
    const editarUsuario = (e) => {
        if (e.target.closest('.btn-editar')) {
            const id = e.target.closest('.btn-editar').dataset.id;
            const usuarios = obtenerUsuarios();
            const usuarioAEditar = usuarios.find(usuario => usuario.id == id);
            
            if (usuarioAEditar) {
                const nuevoNombre = prompt('Editar nombre:', usuarioAEditar.nombre);
                const nuevoEmail = prompt('Editar email:', usuarioAEditar.email);
                const nuevoRol = prompt('Editar rol:', usuarioAEditar.rol);
                
                if (nuevoNombre && nuevoEmail && nuevoRol) {
                    usuarioAEditar.nombre = nuevoNombre;
                    usuarioAEditar.email = nuevoEmail;
                    usuarioAEditar.rol = nuevoRol;
                    guardarUsuarios(usuarios);
                    renderizarTabla();
                }
            }
        }
    };

    // Event Listeners
    btnNuevoUsuario.addEventListener('click', agregarUsuario);
    listaUsuarios.addEventListener('click', eliminarUsuario);
    listaUsuarios.addEventListener('click', editarUsuario);

    // Carga los usuarios cuando la página se abre
    renderizarTabla();
});