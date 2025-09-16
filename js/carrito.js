$(document).ready(function(){
  let cart = [];

  // Función para actualizar carrito visualmente
  function updateCart() {
    $("#cart-items").empty();
    let total = 0;
    cart.forEach((item, index) => {
      const subtotal = item.price * item.quantity;
      total += subtotal;

      $("#cart-items").append(`
        <div class="cart-item d-flex align-items-center mb-2">
          <img src="${item.img}" alt="${item.name}" style="width:50px; height:50px; object-fit:cover; margin-right:10px; border-radius:5px;" />
          <div class="flex-grow-1">
            <div><strong>${item.name}</strong></div>
            <div>Cantidad: ${item.quantity}</div>
            <div>Precio unitario: $${item.price.toLocaleString('es-CL')}</div>
            <div>Subtotal: $${subtotal.toLocaleString('es-CL')}</div>
          </div>
          <button class="btn btn-sm btn-outline-danger remove-item" data-index="${index}">x</button>
        </div>
      `);
    });
    $("#cart-total").text(total.toLocaleString('es-CL'));
    $("#cart-count").text(cart.reduce((acc, item) => acc + item.quantity, 0));
  }

  // Añadir producto al carrito
  $(".add-to-cart").click(function(){
    const name = $(this).data("name");
    const price = parseInt($(this).data("price"));
    const img = $(this).closest('.product-card').find('img').attr('src');

    const existingProduct = cart.find(item => item.name === name);

    if(existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({name, price, quantity: 1, img});
    }
    updateCart();
  });

  // Remover producto completo
  $(document).on("click", ".remove-item", function(){
    const index = $(this).data("index");
    cart.splice(index, 1);
    updateCart();
  });

  // Vaciar carrito
  $("#clear-cart").click(function(){
    cart = [];
    updateCart();
  });

  // Mostrar/ocultar carrito
  $("#cart-btn").click(function(){
    $("#cart").toggle();
  });

  // Inicializar el carrito vacío
  updateCart();
});

