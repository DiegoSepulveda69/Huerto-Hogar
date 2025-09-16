// creacion_producto.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formulario-producto');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // recoger valores
    const nombre = document.getElementById('nombreProducto').value.trim();
    const descripcion = document.getElementById('descripcionProducto').value.trim();
    const categoria = document.getElementById('categoriaProducto').value;
    const precio = parseFloat(document.getElementById('precioProducto').value);
    const stock = parseInt(document.getElementById('stockProducto').value, 10);
    const inputImagen = document.getElementById('imagenProducto');
    const file = inputImagen.files[0];

    // Leer imagen como Base64
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const imagenBase64 = event.target.result; // string data:image/...base64,...

        guardarProducto({ nombre, descripcion, categoria, precio, stock, imagen: imagenBase64 });
      };

      reader.readAsDataURL(file);
    } else {
      // si no se seleccionó imagen, guardar sin imagen
      guardarProducto({ nombre, descripcion, categoria, precio, stock, imagen: null });
    }

    // limpiar formulario si quieres
    form.reset();
  });

  function guardarProducto(datos) {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const id = Date.now().toString();
    const nuevo = { id, ...datos };
    productos.push(nuevo);
    localStorage.setItem('productos', JSON.stringify(productos));

    // luego si quieres refrescar la lista si estás en la misma página
    if (window.listaProductosRefrescar) {
      window.listaProductosRefrescar();
    }
  }
});
