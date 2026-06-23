const WHATSAPP_NUMERO = '56945323000';
let carrito = [];
let productosGlobal = [];
let filtroActual = 'Todos';

function formatoPrecio(precio) {
    const num = parseInt(precio);
    return '$' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function formatoDescripcion(texto) {
    if (!texto) return '';
    return texto.replace(/\n/g, '<br>');
}

document.addEventListener('DOMContentLoaded', () => {
    cargarCatalogo();

    document.getElementById('btnWhatsApp').addEventListener('click', enviarWhatsApp);
});

function abrirCarrito() {
    document.getElementById('carritoPanel').classList.add('carrito-open');
}

function cerrarCarrito() {
    document.getElementById('carritoPanel').classList.remove('carrito-open');
}

async function cargarCatalogo() {
    try {
        const respuesta = await fetch('/productos');
        productosGlobal = await respuesta.json();
        renderizarProductos(productosGlobal);
    } catch (error) {
        console.error('Error cargando catálogo:', error);
    }
}

function filtrarProductos(categoria) {
    filtroActual = categoria;

    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.includes(categoria) || (categoria === 'Todos' && btn.textContent === 'Todos')) {
            btn.classList.add('active');
        }
    });

    if (categoria === 'Todos') {
        renderizarProductos(productosGlobal);
    } else {
        const filtrados = productosGlobal.filter(p => p.tipo === categoria);
        renderizarProductos(filtrados);
    }
}

function renderizarProductos(productos) {
    const contenedor = document.getElementById('catalogo');
    contenedor.innerHTML = '';

    if (productos.length === 0) {
        contenedor.innerHTML = '<p class="vacio-grid">No hay productos en esta categoría</p>';
        return;
    }

    for (const producto of productos) {
        const imagenHtml = producto.imagen
            ? `<img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">`
            : `<div class="producto-imagen-placeholder">🍣</div>`;

        contenedor.innerHTML += `
            <div class="producto-card">
                ${imagenHtml}
                <div class="producto-info">
                    <h3>${producto.nombre}</h3>
                    ${producto.descripcion ? `<p class="producto-descripcion">${formatoDescripcion(producto.descripcion)}</p>` : ''}
                    <p class="producto-precio">${formatoPrecio(producto.precio)}</p>
                    <button onclick="agregarAlCarrito(${producto.id_producto}, '${producto.nombre.replace(/'/g, "\\'")}', ${producto.precio})" class="btn-agregar">
                        🛒 Agregar
                    </button>
                </div>
            </div>
        `;
    }
}

function agregarAlCarrito(id, nombre, precio) {
    const existente = carrito.find(item => item.id === id);

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }

    actualizarCarrito();

    const panel = document.getElementById('carritoPanel');
    panel.classList.add('carrito-animar');
    setTimeout(() => panel.classList.remove('carrito-animar'), 300);
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
}

function cambiarCantidad(id, delta) {
    const item = carrito.find(item => item.id === id);
    if (!item) return;

    item.cantidad += delta;
    if (item.cantidad <= 0) {
        eliminarDelCarrito(id);
        return;
    }

    actualizarCarrito();
}

function actualizarCarrito() {
    const contenedor = document.getElementById('carritoItems');
    const resumen = document.getElementById('carritoResumen');
    const totalEl = document.getElementById('carritoTotal');
    const countEl = document.getElementById('carritoCount');
    const floatBtn = document.getElementById('whatsappFloat');

    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const totalPrecio = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

    if (countEl) countEl.textContent = totalItems;
    if (floatBtn) floatBtn.style.display = totalItems > 0 ? 'flex' : 'none';

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p class="vacio">Agrega productos desde el catálogo</p>';
        resumen.style.display = 'none';
        return;
    }

    contenedor.innerHTML = '';
    for (const item of carrito) {
        contenedor.innerHTML += `
            <div class="carrito-item">
                <div class="carrito-item-info">
                    <span class="carrito-item-nombre">${item.nombre}</span>
                    <span class="carrito-item-precio">${formatoPrecio(item.precio * item.cantidad)}</span>
                </div>
                <div class="carrito-item-controles">
                    <button onclick="cambiarCantidad(${item.id}, -1)">-</button>
                    <span>${item.cantidad}</span>
                    <button onclick="cambiarCantidad(${item.id}, 1)">+</button>
                    <button class="btn-eliminar" onclick="eliminarDelCarrito(${item.id})">✕</button>
                </div>
            </div>
        `;
    }

    totalEl.textContent = formatoPrecio(totalPrecio);
    resumen.style.display = 'block';
}

function enviarWhatsApp() {
    if (carrito.length === 0) {
        alert('Agrega productos al pedido primero');
        return;
    }

    const notas = document.getElementById('notasPedido').value;
    const direccion = document.getElementById('direccionPedido').value;

    if (!direccion.trim()) {
        alert('Ingresa tu dirección de entrega');
        return;
    }

    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

    let mensaje = '🍣 *Pedido Sushi Roll*\n\n';

    for (const item of carrito) {
        mensaje += `• *${item.nombre}* x${item.cantidad} - ${formatoPrecio(item.precio * item.cantidad)}\n`;
    }

    mensaje += `\n💰 *Total: ${formatoPrecio(total)}*`;
    mensaje += `\n\n📍 *Dirección:* ${direccion}`;

    if (notas.trim()) {
        mensaje += `\n📝 *Notas:* ${notas}`;
    }

    mensaje += '\n\n¡Hola! Quiero hacer este pedido 🍣';

    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}
