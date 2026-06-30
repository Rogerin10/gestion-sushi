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
// VARIABLES PARA TABS DE IMAGEN
// =============================================
let tabImagenActual = 'archivo'; // 'archivo' o 'url'

// Cambia entre tab de archivo y URL
function cambiarTabImagen(tab) {
    tabImagenActual = tab;
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.style.display = 'none');

    if (tab === 'archivo') {
        document.querySelector('.tab-btn:first-child').classList.add('active');
        document.getElementById('tabArchivo').style.display = 'block';
    } else {
        document.querySelector('.tab-btn:last-child').classList.add('active');
        document.getElementById('tabUrl').style.display = 'block';
    }
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
        const precio = document.getElementById('precio').value;

        // Verificar si hay imagen (archivo o URL)
        const imagenArchivo = document.getElementById('imagenArchivo').files[0];
        const imagenUrl = document.getElementById('imagen').value;
        const usarArchivo = tabImagenActual === 'archivo' && imagenArchivo;

        try {
            if (usarArchivo) {
                // USAR ARCHIVO: Crear FormData para enviar archivo
                const formData = new FormData();
                formData.append('nombre', nombre);
                formData.append('tipo', tipo || 'General');
                formData.append('descripcion', descripcion);
                formData.append('imagen', imagenArchivo);
                formData.append('precio', precio);

                if (productoEditando) {
                    // Edición con nuevo archivo
                    await fetch(`/productos/upload/${productoEditando}`, {
                        method: 'PUT',
                        body: formData
                    });
                } else {
                    // Creación con archivo
                    await fetch('/productos/upload', {
                        method: 'POST',
                        body: formData
                    });
                }
            } else {
                // USAR URL: Enviar como JSON
                const imagen = imagenUrl || null;

                if (productoEditando) {
                    // MODO EDICIÓN: Actualizar producto existente
                    await fetch(`/productos/${productoEditando}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ nombre, tipo, descripcion, imagen, precio })
                    });
                } else {
                    // MODO CREACIÓN: Agregar producto nuevo
                    await fetch('/productos', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ nombre, tipo, descripcion, imagen, precio })
                    });
                }
            }

            // Limpiar modo edición
            productoEditando = null;
            document.getElementById('formTitle').textContent = '➕ Agregar Producto';
            document.getElementById('btnCancelar').style.display = 'none';

            // Limpiar formulario y recargar lista
            document.getElementById('formProducto').reset();
            cambiarTabImagen('archivo'); // Volver a tab de archivo
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
    cambiarTabImagen('archivo'); // Volver a tab de archivo
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
    document.getElementById('precio').value = precio;

    // Si tiene imagen, mostrarla en el tab de URL
    if (imagen) {
        document.getElementById('imagen').value = imagen;
        cambiarTabImagen('url');
    } else {
        cambiarTabImagen('archivo');
    }

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
