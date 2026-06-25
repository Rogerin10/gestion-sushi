// =============================================
// SCRIPT DEL PANEL DE ADMINISTRACIÓN
// =============================================
// Este archivo maneja la lógica del panel admin:
// - Login con contraseña (almacenada en sessionStorage)
// - CRUD de productos (Crear, Leer, Actualizar, Eliminar)
// - Formateo de precios y descripciones

// =============================================
// VARIABLES GLOBALES
// =============================================

// Guarda el ID del producto que se está editando (null si es nuevo)
let productoEditando = null;

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

    // Manejar el formulario de agregar/editar producto
    document.getElementById('formProducto').addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que el formulario recargue la página

        // Obtener valores del formulario
        const nombre = document.getElementById('nombre').value;
        const tipo = document.getElementById('tipo').value;
        const descripcion = document.getElementById('descripcion').value;
        const imagen = document.getElementById('imagen').value;
        const precio = document.getElementById('precio').value;

        try {
            if (productoEditando) {
                // MODO EDICIÓN: Actualizar producto existente
                await fetch(`/productos/${productoEditando}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre, tipo, descripcion, imagen, precio })
                });
                // Limpiar modo edición
                productoEditando = null;
                document.getElementById('formTitle').textContent = '➕ Agregar Producto';
                document.getElementById('btnCancelar').style.display = 'none';
            } else {
                // MODO CREACIÓN: Agregar producto nuevo
                await fetch('/productos', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre, tipo, descripcion, imagen, precio })
                });
            }

            // Limpiar formulario y recargar lista
            document.getElementById('formProducto').reset();
            cargarProductos();
        } catch (error) {
            console.error('Error guardando producto:', error);
        }
    });

    // Si ya está autenticado, carga los productos
    if (sessionStorage.getItem('adminAuth')) {
        cargarProductos();
    }
});

// =============================================
// AUTENTICACIÓN
// =============================================

// Cancela el modo edición y vuelve al formulario de agregar
function cancelarEdicion() {
    productoEditando = null;
    document.getElementById('formProducto').reset();
    document.getElementById('formTitle').textContent = '➕ Agregar Producto';
    document.getElementById('btnCancelar').style.display = 'none';
}

// =============================================
// CRUD DE PRODUCTOS
// =============================================

// Carga todos los productos desde la API y los muestra
async function cargarProductos() {
    try {
        const respuesta = await fetch('/productos');
        const productos = await respuesta.json();

        // Actualizar contador de productos
        document.getElementById('totalProductos').textContent = productos.length;

        const contenedor = document.getElementById('productos');
        contenedor.innerHTML = '';

        if (productos.length === 0) {
            contenedor.innerHTML = '<p class="vacio">No hay productos</p>';
            return;
        }

        // Generar tarjeta de cada producto con sus acciones
        for (const producto of productos) {
            const imagenHtml = producto.imagen
                ? `<img src="${producto.imagen}" alt="${producto.nombre}" class="card-imagen">`
                : `<div class="card-imagen-placeholder">🍣</div>`;

            contenedor.innerHTML += `
                <div class="card-admin">
                    ${imagenHtml}
                    <div class="card-admin-body">
                        <span class="card-tipo-badge">${producto.tipo}</span>
                        <h3>${producto.nombre}</h3>
                        ${producto.descripcion ? `<p class="card-descripcion">${formatoDescripcion(producto.descripcion)}</p>` : ''}
                        <p class="card-precio">${formatoPrecio(producto.precio)}</p>
                        <div class="acciones">
                            <button onclick='editarProducto(${producto.id_producto}, ${JSON.stringify(producto.nombre).slice(1,-1)}, ${JSON.stringify(producto.tipo).slice(1,-1)}, ${JSON.stringify(producto.descripcion || '').slice(1,-1)}, ${JSON.stringify(producto.imagen || '').slice(1,-1)}, ${producto.precio})'>✏️ Editar</button>
                            <button onclick="eliminarProducto(${producto.id_producto})">🗑️ Eliminar</button>
                        </div>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error cargando productos:', error);
    }
}

// Carga los datos de un producto en el formulario para editarlo
function editarProducto(id, nombre, tipo, descripcion, imagen, precio) {
    productoEditando = id; // Marca que estamos en modo edición
    document.getElementById('nombre').value = nombre;
    document.getElementById('tipo').value = tipo;
    document.getElementById('descripcion').value = descripcion;
    document.getElementById('imagen').value = imagen;
    document.getElementById('precio').value = precio;
    document.getElementById('formTitle').textContent = '✏️ Editar Producto';
    document.getElementById('btnCancelar').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Sube al inicio de la página
}

// Elimina un producto después de confirmar
async function eliminarProducto(id) {
    if (!confirm('¿Eliminar este producto?')) return;
    try {
        await fetch(`/productos/${id}`, { method: 'DELETE' });
        cargarProductos(); // Recargar la lista
    } catch (error) {
        console.error('Error eliminando producto:', error);
    }
}
