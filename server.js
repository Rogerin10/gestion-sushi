const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

function detectarTipo(nombre) {
    const n = nombre.toLowerCase();
    if (n.includes('hand roll')) return 'Hand Roll';
    if (n.includes('sushi')) return 'Sushi';
    return 'General';
}

// ==================== PRODUCTOS ====================

app.get('/productos', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM productos ORDER BY id_producto');
        res.json(resultado.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obteniendo productos' });
    }
});

app.post('/productos', async (req, res) => {
    try {
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

app.put('/productos/:id', async (req, res) => {
    try {
        const { id } = req.params;
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

// ==================== CLIENTES ====================

app.get('/clientes', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM clientes ORDER BY id_cliente');
        res.json(resultado.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error obteniendo clientes' });
    }
});

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

// ==================== PEDIDOS ====================

app.get('/pedidos', async (req, res) => {
    try {
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

app.post('/pedidos', async (req, res) => {
    try {
        const { id_cliente, estado } = req.body;
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

app.delete('/pedidos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM detalle_pedido WHERE id_pedido = $1', [id]);
        await pool.query('DELETE FROM pedidos WHERE id_pedido = $1', [id]);
        res.json({ mensaje: 'Pedido eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error eliminando pedido' });
    }
});

// ==================== DETALLE PEDIDO ====================

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
});
