// lista_productos.js

document.addEventListener('DOMContentLoaded', () => {
  const listaProductosTbody = document.getElementById('lista-productos');

  function obtenerProductos() {
    return JSON.parse(localStorage.getItem('productos')) || [];
  }

  function guardarProductos(productos) {
    localStorage.setItem('productos', JSON.stringify(productos));
  }

  function renderizarProductos() {
    const productos = obtenerProductos();
    listaProductosTbody.innerHTML = '';

    productos.forEach((prod, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${ prod.imagen ? `<img src="${prod.imagen}" alt="${prod.nombre}" style="width: 60px; height: auto; border-radius: 4px;">` : 'Sin imagen' }</td>
        <td>${prod.nombre}</td>
        <td>${prod.descripcion || ''}</td>
        <td>${prod.categoria || ''}</td>
        <td>${prod.precio}</td>
        <td>${prod.stock}</td>
        <td>
          <button class="btn btn-sm btn-warning btn-editar" data-id="${prod.id}">Editar</button>
          <button class="btn btn-sm btn-danger btn-eliminar" data-id="${prod.id}">Eliminar</button>
        </td>
      `;
      listaProductosTbody.appendChild(tr);
    });
  }

  // manejadores de botones eliminar / editar si ya tienes
  listaProductosTbody.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-eliminar')) {
      const id = e.target.getAttribute('data-id');
      let productos = obtenerProductos();
      productos = productos.filter(p => p.id !== id);
      guardarProductos(productos);
      renderizarProductos();
    }
    if (e.target.classList.contains('btn-editar')) {
      const id = e.target.getAttribute('data-id');
      const productos = obtenerProductos();
      const prod = productos.find(p => p.id === id);
      if (!prod) return;
      // Aquí puedes usar un prompt o formulario para editar. Y si editas imagen,
      // pedir inputImagen.files[0] de nuevo etc.
      const nuevoNombre = prompt('Editar nombre:', prod.nombre);
      if (nuevoNombre !== null) {
        prod.nombre = nuevoNombre;
        guardarProductos(productos);
        renderizarProductos();
      }
    }
  });

  renderizarProductos();

  // Hacer que el otro script pueda refrescar
  window.listaProductosRefrescar = renderizarProductos;
});
