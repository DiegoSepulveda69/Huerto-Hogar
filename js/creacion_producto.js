document.addEventListener('DOMContentLoaded', () => {

    const formularioProducto = document.getElementById('formulario-producto');

    // Función para obtener productos de localStorage
    const obtenerProductos = () => {
        const productos = localStorage.getItem('productos');
        return productos ? JSON.parse(productos) : [];
    };

    // Función para guardar productos en localStorage
    const guardarProductos = (productos) => {
        localStorage.setItem('productos', JSON.stringify(productos));
    };

    // Función para manejar el registro de un nuevo producto
    const registrarProducto = (e) => {
        e.preventDefault(); // Evita que el formulario se envíe de forma tradicional

        // Obtener los valores de los campos
        const nombreProducto = document.getElementById('nombreProducto').value;
        const descripcionProducto = document.getElementById('descripcionProducto').value;
        const precioProducto = document.getElementById('precioProducto').value;
        const stockProducto = document.getElementById('stockProducto').value;
        const categoriaProducto = document.getElementById('categoriaProducto').value;

        // Crear un objeto con los datos del producto
        const nuevoProducto = {
            id: Date.now(), // ID único para cada producto
            nombre: nombreProducto,
            descripcion: descripcionProducto,
            precio: precioProducto,
            stock: stockProducto,
            categoria: categoriaProducto,
        };

        // Obtener la lista de productos actual, agregar el nuevo y guardarlo
        const productos = obtenerProductos();
        productos.push(nuevoProducto);
        guardarProductos(productos);

        alert('¡Producto registrado con éxito!');
        formularioProducto.reset(); // Limpia los campos del formulario
    };

    // Agregar el evento 'submit' al formulario
    formularioProducto.addEventListener('submit', registrarProducto);

});