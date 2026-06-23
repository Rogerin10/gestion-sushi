let productoEditando = null;

function formatoPrecio(precio) {
    const num = parseInt(precio);
    return '$' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function formatoDescripcion(texto) {
    if (!texto) return '';
    return texto.replace(/\n/g, '<br>');
}

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('formProducto').addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const tipo = document.getElementById('tipo').value;
        const descripcion = document.getElementById('descripcion').value;
        const imagen = document.getElementById('imagen').value;
        const precio = document.getElementById('precio').value;

        try {
            if (productoEditando) {
                await fetch(`/productos/${productoEditando}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre, tipo, descripcion, imagen, precio })
                });
                productoEditando = null;
                document.getElementById('formTitle').textContent = '➕ Agregar Producto';
                document.getElementById('btnCancelar').style.display = 'none';
            } else {
                await fetch('/productos', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre, tipo, descripcion, imagen, precio })
                });
            }
            document.getElementById('formProducto').reset();
            cargarProductos();
        } catch (error) {
            console.error('Error guardando producto:', error);
        }
    });

    if (sessionStorage.getItem('adminAuth')) {
        cargarProductos();
    }
});

function cancelarEdicion() {
    productoEditando = null;
    document.getElementById('formProducto').reset();
    document.getElementById('formTitle').textContent = '➕ Agregar Producto';
    document.getElementById('btnCancelar').style.display = 'none';
}

async function cargarProductos() {
    try {
        const respuesta = await fetch('/productos');
        const productos = await respuesta.json();
        document.getElementById('totalProductos').textContent = productos.length;

        const contenedor = document.getElementById('productos');
        contenedor.innerHTML = '';

        if (productos.length === 0) {
            contenedor.innerHTML = '<p class="vacio">No hay productos</p>';
            return;
        }

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

function editarProducto(id, nombre, tipo, descripcion, imagen, precio) {
    productoEditando = id;
    document.getElementById('nombre').value = nombre;
    document.getElementById('tipo').value = tipo;
    document.getElementById('descripcion').value = descripcion;
    document.getElementById('imagen').value = imagen;
    document.getElementById('precio').value = precio;
    document.getElementById('formTitle').textContent = '✏️ Editar Producto';
    document.getElementById('btnCancelar').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function eliminarProducto(id) {
    if (!confirm('¿Eliminar este producto?')) return;
    try {
        await fetch(`/productos/${id}`, { method: 'DELETE' });
        cargarProductos();
    } catch (error) {
        console.error('Error eliminando producto:', error);
    }
}
