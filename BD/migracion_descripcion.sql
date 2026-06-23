-- Migración: Agregar campo descripcion a productos existentes
ALTER TABLE productos ADD COLUMN descripcion TEXT;
