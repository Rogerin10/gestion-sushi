// =============================================
// SERVIDOR PRINCIPAL - Sistema de Gestión Sushi Roll
// =============================================
// Este archivo contiene el servidor Express que expone
// la API REST para gestionar productos, clientes y pedidos.
// Se conecta a una base de datos PostgreSQL (local o en la nube).

// Importar dependencias
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pool = require('./db');

const app = express();

// =============================================
// MIDDLEWARE (Configuración general del servidor)
// =============================================
app.use(cors());                  // Permite peticiones desde otros dominios (navegador)
app.use(express.json());          // Permite recibir datos en formato JSON
app.use(express.static('public')); // Sirve archivos estáticos (HTML, CSS, JS) desde /public

// =============================================
// CONFIGURACIÓN DE MULTER (Subida de archivos)
// =============================================
// Crear carpeta uploads si no existe (necesario en Render porque el disco es efímero)
const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer maneja la subida de archivos desde el formulario
const storage = multer.diskStorage({
    // Carpeta donde se guardan las imágenes
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public', 'uploads'));
    },
    // Nombre único para cada archivo (timestamp + extensión original)
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueName + path.extname(file.originalname));
    }
});

// Filtro: solo permitir imágenes (jpg, png, gif, webp)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Solo se permiten imágenes (jpg, png, gif, webp)'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Máximo 5MB
    fileFilter: fileFilter
});

// =============================================
// FUNCIÓN AUXILIAR - Detectar tipo de producto
// =============================================
// Clasifica el producto según su nombre:
// - Si contiene "hand roll" → Hand Roll
// - Si contiene "sushi" → Sushi
// - Si no matchea ninguno → General
function detectarTipo(nombre) {
    const n = nombre.toLowerCase();
    if (n.includes('hand roll')) return 'Hand Roll';
    if (n.includes('sushi')) return 'Sushi';
    return 'General';
}

// =============================================
// RUTAS DE PRODUCTOS (CRUD)
// =============================================
// CRUD = Create, Read, Update, Delete

// GET /productos → Listar todos los productos
app.get('/productos', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM productos ORDER BY id_producto');
        res.json(resultado.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obteniendo productos' });
    }
});

// POST /productos/upload → Crear producto con imagen subida
app.post('/productos/upload', upload.single('imagen'), async (req, res) => {
    try {
        const { nombre, tipo, descripcion, precio } = req.body;
        // Si se subió una imagen, usar su ruta; si no, usar null
        const imagen = req.file ? `/uploads/${req.file.filename}` : null;
        await pool.query(
            'INSERT INTO productos (nombre, tipo, descripcion, imagen, precio) VALUES ($1, $2, $3, $4, $5)',
            [nombre, tipo || 'General', descripcion, imagen, precio]
        );
        res.json({ mensaje: 'Producto agregado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error agregando producto' });
    }
});

// POST /productos → Crear un nuevo producto (con URL de imagen)
app.post('/productos', async (req, res) => {
    try {
        // req.body contiene los datos enviados desde el frontend
        const { nombre, tipo, descripcion, imagen, precio } = req.body;
        await pool.query(
            'INSERT INTO productos (nombre, tipo, descripcion, imagen, precio) VALUES ($1, $2, $3, $4, $5)',
            [nombre, tipo || 'General', descripcion, imagen, precio]
        );
        res.json({ mensaje: 'Producto agregado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error agregando producto' });
    }
});

// PUT /productos/upload/:id → Actualizar producto con imagen subida
app.put('/productos/upload/:id', upload.single('imagen'), async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, tipo, descripcion, precio } = req.body;
        // Solo actualizar imagen si se subió una nueva
        const imagen = req.file ? `/uploads/${req.file.filename}` : req.body.imagenExistente;
        await pool.query(
            'UPDATE productos SET nombre = $1, tipo = $2, descripcion = $3, imagen = $4, precio = $5 WHERE id_producto = $6',
            [nombre, tipo || 'General', descripcion, imagen, precio, id]
        );
        res.json({ mensaje: 'Producto actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error actualizando producto' });
    }
});

// PUT /productos/:id → Actualizar un producto existente (con URL de imagen)
app.put('/productos/:id', async (req, res) => {
    try {
        const { id } = req.params;       // Obtiene el ID de la URL
        const { nombre, tipo, descripcion, imagen, precio } = req.body;
        await pool.query(
            'UPDATE productos SET nombre = $1, tipo = $2, descripcion = $3, imagen = $4, precio = $5 WHERE id_producto = $6',
            [nombre, tipo || 'General', descripcion, imagen, precio, id]
        );
        res.json({ mensaje: 'Producto actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error actualizando producto' });
    }
});

// DELETE /productos/:id → Eliminar un producto
app.delete('/productos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM productos WHERE id_producto = $1', [id]);
        res.json({ mensaje: 'Producto eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error eliminando producto' });
    }
});

// =============================================
// RUTAS DE CLIENTES (CRUD)
// =============================================

// GET /clientes → Listar todos los clientes
app.get('/clientes', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM clientes ORDER BY id_cliente');
        res.json(resultado.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obteniendo clientes' });
    }
});

// POST /clientes → Crear un nuevo cliente
app.post('/clientes', async (req, res) => {
    try {
        const { nombre, telefono, direccion } = req.body;
        await pool.query(
            'INSERT INTO clientes (nombre, telefono, direccion) VALUES ($1, $2, $3)',
            [nombre, telefono, direccion]
        );
        res.json({ mensaje: 'Cliente agregado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error agregando cliente' });
    }
});

// PUT /clientes/:id → Actualizar un cliente
app.put('/clientes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, telefono, direccion } = req.body;
        await pool.query(
            'UPDATE clientes SET nombre = $1, telefono = $2, direccion = $3 WHERE id_cliente = $4',
            [nombre, telefono, direccion, id]
        );
        res.json({ mensaje: 'Cliente actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error actualizando cliente' });
    }
});

// DELETE /clientes/:id → Eliminar un cliente
app.delete('/clientes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM clientes WHERE id_cliente = $1', [id]);
        res.json({ mensaje: 'Cliente eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error eliminando cliente' });
    }
});

// =============================================
// RUTAS DE PEDIDOS (CRUD)
// =============================================

// GET /pedidos → Listar todos los pedidos con nombre del cliente
app.get('/pedidos', async (req, res) => {
    try {
        // JOIN con clientes para mostrar el nombre del cliente en cada pedido
        const resultado = await pool.query(`
            SELECT p.*, c.nombre AS nombre_cliente
            FROM pedidos p
            JOIN clientes c ON p.id_cliente = c.id_cliente
            ORDER BY p.id_pedido
        `);
        res.json(resultado.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obteniendo pedidos' });
    }
});

// POST /pedidos → Crear un nuevo pedido
app.post('/pedidos', async (req, res) => {
    try {
        const { id_cliente, estado } = req.body;
        // RETURNING id_pedido devuelve el ID generado automáticamente
        const resultado = await pool.query(
            'INSERT INTO pedidos (id_cliente, estado) VALUES ($1, $2) RETURNING id_pedido',
            [id_cliente, estado || 'Pendiente']
        );
        res.json({ mensaje: 'Pedido agregado', id_pedido: resultado.rows[0].id_pedido });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error agregando pedido' });
    }
});

// PUT /pedidos/:id → Actualizar estado de un pedido
app.put('/pedidos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { id_cliente, estado } = req.body;
        await pool.query(
            'UPDATE pedidos SET id_cliente = $1, estado = $2 WHERE id_pedido = $3',
            [id_cliente, estado, id]
        );
        res.json({ mensaje: 'Pedido actualizado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error actualizando pedido' });
    }
});

// DELETE /pedidos/:id → Eliminar un pedido y sus detalles
app.delete('/pedidos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Primero eliminar los detalles (por la foreign key)
        await pool.query('DELETE FROM detalle_pedido WHERE id_pedido = $1', [id]);
        // Luego eliminar el pedido
        await pool.query('DELETE FROM pedidos WHERE id_pedido = $1', [id]);
        res.json({ mensaje: 'Pedido eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error eliminando pedido' });
    }
});

// =============================================
// RUTAS DE DETALLE PEDIDO
// =============================================
// El detalle pedido conecta pedidos con productos (tabla intermedia)

// GET /pedidos/:id/detalle → Ver productos de un pedido
app.get('/pedidos/:id/detalle', async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pool.query(`
            SELECT dp.*, p.nombre AS nombre_producto
            FROM detalle_pedido dp
            JOIN productos p ON dp.id_producto = p.id_producto
            WHERE dp.id_pedido = $1
        `, [id]);
        res.json(resultado.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obteniendo detalle' });
    }
});

// POST /pedidos/:id/detalle → Agregar producto a un pedido
app.post('/pedidos/:id/detalle', async (req, res) => {
    try {
        const { id } = req.params;
        const { id_producto, cantidad } = req.body;
        await pool.query(
            'INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad) VALUES ($1, $2, $3)',
            [id, id_producto, cantidad]
        );
        res.json({ mensaje: 'Detalle agregado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error agregando detalle' });
    }
});

// DELETE /pedidos/:id/detalle/:detalleId → Eliminar producto de un pedido
app.delete('/pedidos/:id/detalle/:detalleId', async (req, res) => {
    try {
        const { detalleId } = req.params;
        await pool.query('DELETE FROM detalle_pedido WHERE id_detalle = $1', [detalleId]);
        res.json({ mensaje: 'Detalle eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error eliminando detalle' });
    }
});

// =============================================
// INICIAR SERVIDOR
// =============================================
// Render asigna el puerto a través de la variable de entorno PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
});
