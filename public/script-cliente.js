// =============================================
// SCRIPT DEL CATÁLOGO CLIENTE
// =============================================
// Este archivo maneja toda la lógica del lado del cliente:
// - Cargar productos desde la API
// - Filtrar por categorías
// - Agregar/quitar productos del carrito
// - Enviar pedido por WhatsApp

// =============================================
// VARIABLES GLOBALES
// =============================================

// Número de WhatsApp del restaurante (formato internacional sin +)
const WHATSAPP_NUMERO = '56945323000';

// Arreglo que almacena los productos del carrito de compras
let carrito = [];

// Arreglo con todos los productos cargados desde la API
let productosGlobal = [];

// Filtro activo actualmente (Todos, Hand Roll, Sushi)
let filtroActual = 'Todos';

// =============================================
// FUNCIONES AUXILIARES
// =============================================

// Formatea un precio a formato chileno: 5000 → $5.000
function formatoPrecio(precio) {
    const num = parseInt(precio);
    return '$' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Convierte saltos de línea en <br> para mostrar descripciones con formato HTML
function formatoDescripcion(texto) {
    if (!texto) return '';
    return texto.replace(/\n/g, '<br>');
}

// =============================================
// INICIALIZACIÓN
// =============================================
// Se ejecuta cuando la página carga completamente
document.addEventListener('DOMContentLoaded', () => {
    cargarCatalogo(); // Carga los productos desde la API

    // Conecta el botón de WhatsApp con su función
    document.getElementById('btnWhatsApp').addEventListener('click', enviarWhatsApp);
});

// =============================================
// FUNCIONES DEL CARRITO (Abrir/Cerrar)
// =============================================

// Abre el panel lateral del carrito (en móvil)
function abrirCarrito() {
    document.getElementById('carritoPanel').classList.add('carrito-open');
}

// Cierra el panel lateral del carrito
function cerrarCarrito() {
    document.getElementById('carritoPanel').classList.remove('carrito-open');
}

// =============================================
// CARGAR Y FILTRAR PRODUCTOS
// =============================================

// Obtiene todos los productos desde la API y los muestra
async function cargarCatalogo() {
    try {
        const respuesta = await fetch('/productos');
        productosGlobal = await respuesta.json();
        renderizarProductos(productosGlobal);
    } catch (error) {
        console.error('Error cargando catálogo:', error);
    }
}

// Filtra productos por categoría (Todos, Hand Roll, Sushi)
function filtrarProductos(categoria) {
    filtroActual = categoria;

    // Actualiza el botón activo visualmente
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.includes(categoria) || (categoria === 'Todos' && btn.textContent === 'Todos')) {
            btn.classList.add('active');
        }
    });

    // Muestra todos o solo los filtrados
    if (categoria === 'Todos') {
        renderizarProductos(productosGlobal);
    } else {
        const filtrados = productosGlobal.filter(p => p.tipo === categoria);
        renderizarProductos(filtrados);
    }
}

// =============================================
// RENDERIZAR PRODUCTOS EN PANTALLA
// =============================================
// Genera el HTML de cada tarjeta de producto
function renderizarProductos(productos) {
    const contenedor = document.getElementById('catalogo');
    contenedor.innerHTML = '';

    if (productos.length === 0) {
        contenedor.innerHTML = '<p class="vacio-grid">No hay productos en esta categoría</p>';
        return;
    }

    for (const producto of productos) {
        // Si tiene imagen, la muestra; si no, muestra un emoji placeholder
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

// =============================================
// GESTIÓN DEL CARRITO DE COMPRAS
// =============================================

// Agrega un producto al carrito (o incrementa cantidad si ya existe)
function agregarAlCarrito(id, nombre, precio) {
    const existente = carrito.find(item => item.id === id);

    if (existente) {
        existente.cantidad++; // Ya está en el carrito, suma 1
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 }); // Nuevo producto
    }

    actualizarCarrito();

    // Animación visual al agregar
    const panel = document.getElementById('carritoPanel');
    panel.classList.add('carrito-animar');
    setTimeout(() => panel.classList.remove('carrito-animar'), 300);
}

// Elimina un producto del carrito completamente
function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
}

// Cambia la cantidad de un producto (+1 o -1)
function cambiarCantidad(id, delta) {
    const item = carrito.find(item => item.id === id);
    if (!item) return;

    item.cantidad += delta;
    if (item.cantidad <= 0) {
        eliminarDelCarrito(id); // Si llega a 0, lo elimina
        return;
    }

    actualizarCarrito();
}

// =============================================
// ACTUALIZAR VISUALIZACIÓN DEL CARRITO
// =============================================
// Redibuja el contenido del carrito con los datos actuales
function actualizarCarrito() {
    const contenedor = document.getElementById('carritoItems');
    const resumen = document.getElementById('carritoResumen');
    const totalEl = document.getElementById('carritoTotal');
    const countEl = document.getElementById('carritoCount');
    const floatBtn = document.getElementById('whatsappFloat');

    // Calcular totales
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const totalPrecio = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

    // Actualizar contador del badge y botón flotante
    if (countEl) countEl.textContent = totalItems;
    if (floatBtn) floatBtn.style.display = totalItems > 0 ? 'flex' : 'none';

    // Si el carrito está vacío, muestra mensaje
    if (carrito.length === 0) {
        contenedor.innerHTML = '<p class="vacio">Agrega productos desde el catálogo</p>';
        resumen.style.display = 'none';
        return;
    }

    // Generar HTML de cada item del carrito
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

// =============================================
// ENVIAR PEDIDO POR WHATSAPP
// =============================================
// Construye el mensaje formateado y abre WhatsApp con el mensaje
function enviarWhatsApp() {
    if (carrito.length === 0) {
        alert('Agrega productos al pedido primero');
        return;
    }

    const notas = document.getElementById('notasPedido').value;
    const direccion = document.getElementById('direccionPedido').value;

    // Calcular total
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

    // Construir el mensaje con formato de WhatsApp (negrita con asteriscos)
    let mensaje = '🍣 *Pedido Sushi Roll*\n\n';

    for (const item of carrito) {
        mensaje += `• *${item.nombre}* x${item.cantidad} - ${formatoPrecio(item.precio * item.cantidad)}\n`;
    }

    mensaje += `\n💰 *Total: ${formatoPrecio(total)}*`;

    // Dirección es opcional
    if (direccion.trim()) {
        mensaje += `\n\n📍 *Dirección:* ${direccion}`;
    }

    // Notas también son opcionales
    if (notas.trim()) {
        mensaje += `\n📝 *Notas:* ${notas}`;
    }

    mensaje += '\n\n¡Hola! Quiero hacer este pedido 🍣';

    // Abrir WhatsApp con el mensaje prellenado
    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}
