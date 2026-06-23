-- ========= FUNCIONES Y TRIGGERS PARA AUTOMATIZACION =========

CREATE OR REPLACE FUNCTION calcular_subtotal()
RETURNS TRIGGER AS $$
BEGIN
    NEW.subtotal := (SELECT precio FROM productos WHERE id_producto = NEW.id_producto) * NEW.cantidad;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_calcular_subtotal
BEFORE INSERT ON detalle_pedido
FOR EACH ROW
EXECUTE FUNCTION calcular_subtotal();

CREATE OR REPLACE FUNCTION actualizar_total_pedido()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE pedidos
    SET total = (SELECT SUM(subtotal) FROM detalle_pedido WHERE id_pedido = NEW.id_pedido)
    WHERE id_pedido = NEW.id_pedido;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_actualizar_total
AFTER INSERT OR UPDATE OR DELETE ON detalle_pedido
FOR EACH ROW
EXECUTE FUNCTION actualizar_total_pedido();


-- ========= INSERCIONES DE PRUEBA =========

INSERT INTO pedidos (id_cliente, estado) VALUES (1, 'Pendiente');

INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad)
VALUES
(1, 1, 2),
(1, 3, 1);

-- ========= CONSULTAS PARA VERIFICAR =========

SELECT
    p.id_pedido,
    c.nombre AS cliente,
    pr.nombre AS producto,
    dp.cantidad,
    dp.subtotal,
    p.estado
FROM pedidos p
JOIN clientes c ON p.id_cliente = c.id_cliente
JOIN detalle_pedido dp ON p.id_pedido = dp.id_pedido
JOIN productos pr ON dp.id_producto = pr.id_producto;

SELECT * FROM pedidos;
