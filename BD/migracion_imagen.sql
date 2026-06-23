-- Migración: Agregar campo imagen a productos existentes
ALTER TABLE productos ADD COLUMN imagen VARCHAR(500);
