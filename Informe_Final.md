# Implementación de Sistemas en la Nube

---

## Portada Institucional

**Institución:** [Nombre de la Institución]

**Carrera:** [Nombre de la Carrera]

**Sección:** [Sección]

**Asignatura:** Sistemas en la Nube

**Docente:** Litty

**Alumno(s):** Roger

**Fecha de Entrega:** 30-06-2026

**Título del Proyecto:** Implementación de un Sistema de Gestión de Sushi Roll en la Nube

---

## Índice de Contenido

1. Capítulo I: Aspectos Generales de los Sistemas en la Nube
   1.1. Introducción
   1.2. Objetivo General
   1.3. Objetivos Específicos

2. Capítulo II: Proveedor del Servicio en la Nube
   2.1. Introducción
   2.2. Categorías del Proveedor
   2.3. Justificación de la Elección
   2.4. Consideraciones del Proveedor
   2.5. Propuesta del Sistema en la Nube
   2.6. Modelo o Diagrama C4

3. Índice de Ilustraciones

4. Índice de Tablas

---

## Índice de Ilustraciones

| N° | Descripción | Página |
|----|-------------|--------|
| 1 | Diagrama de Contexto C4 | X |
| 2 | Diagrama de Contenedores C4 | X |
| 3 | Diagrama de Componentes C4 | X |
| 4 | Diagrama de Clases | X |
| 5 | Arquitectura del Sistema | X |

---

## Índice de Tablas

| N° | Descripción | Página |
|----|-------------|--------|
| 1 | Categorías de Servicios Cloud | X |
| 2 | Comparación de Proveedores | X |
| 3 | Matriz de Riesgos | X |
| 4 | Roles del Sistema | X |

---

# Capítulo I: Aspectos Generales de los Sistemas en la Nube

## 1.1. Introducción

Los Sistemas en la Nube representan una evolución fundamental en la forma en que las organizaciones implementan, gestionan y consumen tecnologías de la información. Esta transformación permite acceder a recursos informáticos bajo demanda a través de Internet, eliminando la necesidad de infraestructura física local y ofreciendo escalabilidad, flexibilidad y eficiencia en el uso de los recursos tecnológicos.

La implementación de Sistemas en la Nube ha revolucionado el panorama tecnológico empresarial, permitiendo que organizaciones de todos los tamaños accedan a herramientas y plataformas que anteriormente solo estaban al alcance de grandes corporaciones. Esta democratización tecnológica ha generado nuevas oportunidades para el desarrollo de aplicaciones, la gestión de datos y la optimización de procesos de negocio.

En el contexto actual, la adopción de tecnologías cloud se ha convertido en un factor estratégico para la competitividad empresarial, permitiendo la implementación de soluciones ágles, escalables y económicamente eficientes. Los sistemas de gestión de negocios, como el caso de un restaurante de sushi, pueden beneficiarse significativamente de estas tecnologías al permitir la gestión de pedidos, inventario, clientes y operaciones desde cualquier lugar y en cualquier momento.

## 1.2. Objetivo General

El objetivo general de este proyecto es implementar un Sistema de Gestión de Sushi Roll en la Nube que permita gestionar de forma eficiente las operaciones de un restaurante de sushi, incluyendo la administración de productos, procesamiento de pedidos y comunicación con clientes a través de plataformas digitales, aprovechando los beneficios de la infraestructura cloud para garantizar disponibilidad, escalabilidad y accesibilidad del sistema.

## 1.3. Objetivos Específicos

**Objetivo Específico 1:** Implementar una aplicación web accesible desde cualquier dispositivo que permita a los clientes visualizar el catálogo de productos, agregar items a un carrito de compras y realizar pedidos de forma sencilla e intuitiva.

**Objetivo Específico 2:** Desarrollar un panel de administración que permita al propietario del restaurante gestionar los productos del catálogo, incluyendo la creación, edición y eliminación de productos con sus respectivas descripciones, imágenes, categorías y precios.

**Objetivo Específico 3:** Integrar el sistema con WhatsApp Business para facilitar la comunicación directa entre el restaurante y sus clientes, permitiendo el envío automático de pedidos detallados con información de productos, cantidades, direcciones de entrega y notas adicionales.

---

# Capítulo II: Proveedor del Servicio en la Nube

## 2.1. Introducción

En este capítulo se presenta el análisis y justificación de la selección del proveedor de servicios en la nube utilizado para la implementación del Sistema de Gestión de Sushi Roll. Se evalúan las diferentes categorías de servicios cloud disponibles, las características del proveedor seleccionado y las consideraciones técnicas y económicas que fundamentan esta decisión.

La selección de un proveedor de servicios en la nube es una decisión estratégica que impacta directamente en el rendimiento, costos, seguridad y escalabilidad del sistema a implementar. Por ello, es fundamental realizar un análisis exhaustivo de las opciones disponibles y seleccionar aquella que mejor se adapte a los requerimientos específicos del proyecto.

## 2.2. Categorías del Proveedor del Servicio en la Nube

Los servicios en la nube se clasifican en diversas categorías según el nivel de control y administración que proporcionan al usuario. A continuación se describen las principales categorías:

### 2.2.1. IaaS (Infrastructure as a Service)

IaaS proporciona infraestructura virtualizada a través de Internet, incluyendo servidores, almacenamiento y redes. El usuario tiene control total sobre el sistema operativo, las aplicaciones y los datos, mientras que el proveedor manage la infraestructura física. Ejemplos incluyen Amazon EC2, Microsoft Azure Virtual Machines y Google Compute Engine.

### 2.2.2. PaaS (Platform as a Service)

PaaS ofrece una plataforma completa para el desarrollo, ejecución y gestión de aplicaciones sin la complejidad de mantener la infraestructura subyacente. Incluye sistemas operativos, middleware, entornos de ejecución y herramientas de desarrollo. Ejemplos incluyen Google App Engine, Microsoft Azure App Service y Heroku.

### 2.2.3. SaaS (Software as a Service)

SaaS entrega aplicaciones de software completas a través de Internet, eliminando la necesidad de instalación y mantenimiento por parte del usuario. El proveedor gestiona toda la infraestructura, plataforma y aplicaciones. Ejemplos incluyen Google Workspace, Microsoft 365 y Salesforce.

### 2.2.4. FaaS (Function as a Service)

FaaS, también conocido como computación serverless, permite ejecutar código sin gestionar servidores. El proveedor ejecuta el código bajo demanda y cobra únicamente por el tiempo de ejecución. Ejemplos incluyen AWS Lambda, Google Cloud Functions y Azure Functions.

**Tabla 1: Comparación de Categorías de Servicios Cloud**

| Categoría | Nivel de Control | Gestión de Infraestructura | Caso de Uso Principal |
|-----------|------------------|---------------------------|----------------------|
| IaaS | Alto | Usuario gestiona SO y apps | Servidores personalizados |
| PaaS | Medio | Proveedor gestiona infra | Desarrollo de aplicaciones |
| SaaS | Bajo | Proveedor gestiona todo | Uso de software final |
| FaaS | Bajo | Proveedor ejecuta código | Funciones específicas |

## 2.3. Por qué elegí este proveedor de la Nube y sus características que lo destacan

El proveedor seleccionado para la implementación del sistema es **Render**, una plataforma PaaS que se especializa en el despliegue y gestión de aplicaciones web modernas. Las razones principales de esta elección son:

**1. Facilidad de uso:** Render ofrece una interfaz intuitiva que simplifica el proceso de despliegue, permitiendo implementar aplicaciones con código fuente alojado en repositorios Git con configuración mínima.

**2. Plan gratuito accesible:** A diferencia de otros proveedores que requieren tarjeta de crédito o tienen límites estrictos, Render ofrece un plan gratuito funcional que permite desplegar aplicaciones web y bases de datos PostgreSQL sin costo inicial.

**3. Integración nativa con Git:** Render detecta automáticamente los cambios en el repositorio GitHub y ejecuta despliegues continuos (CI/CD), facilitando la actualización del sistema.

**4. Soporte para múltiples tecnologías:** Render es compatible con Node.js, Python, Ruby, Go, Docker y otras tecnologías, proporcionando flexibilidad en la selección del stack tecnológico.

**5. Gestión de bases de datos:** Render ofrece bases de datos PostgreSQL y Redis gestionadas, eliminando la necesidad de configurar y mantener servidores de bases de datos separados.

**6. SSL automático:** Todas las aplicaciones desplegadas en Render obtienen certificados SSL automáticamente, garantizando comunicaciones seguras sin configuración adicional.

**7. Infraestructura escalable:** Render permite escalar recursos vertical y horizontalmente según la demanda del sistema.

## 2.4. Consideraciones del Proveedor de la Nube

### 2.4.1. Seguridad y Cumplimiento

Render implementa múltiples capas de seguridad para proteger los datos y aplicaciones de los usuarios:

- **Cifrado en tránsito:** Todas las comunicaciones se realizan mediante protocolo TLS/SSL.
- **Cifrado en reposo:** Los datos almacenados en bases de datos están cifrados.
- **Aislamiento de aplicaciones:** Cada aplicación se ejecuta en un entorno aislado.
- **Acceso basado en roles (RBAC):** Render utiliza un sistema de control de acceso que permite gestionar permisos por usuario.
- **Autenticación multifactor (MFA):** Se puede habilitar MFA para cuentas de administración.
- **Cumplimiento SOC 2 Type II:** Render cumple con estándares de seguridad reconocidos internacionalmente.

### 2.4.2. Rendimiento y Disponibilidad

- **Tiempo de actividad garantizado:** Render ofrece un SLA del 99.9% para servicios pagos.
- **Plan gratuito con limitaciones:** En el plan gratuito, las aplicaciones se suspenden después de 15 minutos de inactividad, requiriendo un tiempo de "despertar" de aproximadamente 30 segundos.
- **Red global:** Render utiliza infraestructura distribuida geográficamente para reducir latencia.
- **Auto-escalabilidad:** Los servicios pueden configurarse para escalar automáticamente según la demanda.

### 2.4.3. Costos

**Tabla 2: Estructura de Costos de Render**

| Componente | Plan Gratuito | Plan Pago |
|------------|---------------|-----------|
| Servicio Web | $0/mes (se duerme) | $7/mes |
| Base de datos PostgreSQL | $0/mes (limitada) | $7/mes |
| Ancho de banda | 100 GB/mes | $0.10/GB |
| Almacenamiento | 100 MB | $0.25/GB |

**Costo estimado para este proyecto:**
- Servicio Web (Plan Gratuito): $0
- Base de datos PostgreSQL (Plan Gratuito): $0
- **Costo Total Mensual: $0**

### 2.4.4. Flexibilidad y Soporte Técnico

- **Despliegue desde Git:** Integración directa con GitHub, GitLab y Bitbucket.
- **Múltiples runtime:** Soporte para Node.js, Python, Ruby, Go, Rust, Docker.
- **Variables de entorno:** Gestión segura de configuración y secretos.
- **Logs y monitoreo:** Acceso a logs en tiempo real y métricas de rendimiento.
- **Documentación:** Amplia documentación técnica y guías de inicio rápido.
- **Soporte comunitario:** Foro de discusión y soporte por correo electrónico.

### 2.4.5. Matriz de Riesgos

**Tabla 3: Matriz de Riesgos del Proyecto**

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Caída del servicio en momento de presentación | Media | Alto | Iniciar servicio 1 minuto antes de presentar |
| Pérdida de datos en base de datos | Baja | Alto | Respaldos automáticos de Render |
| Inseguridad en credenciales | Media | Alto | Uso de variables de entorno, no código hardcodeado |
| Latencia en la aplicación | Baja | Medio | Optimización de consultas y uso de índices |
| Incompatibilidad con dispositivos móviles | Baja | Medio | Diseño responsive mobile-first |
| Interrupción del servicio de Render | Baja | Alto | Plan gratuito con reconexión automática |
| Ataques de seguridad | Baja | Alto | SSL automático, autenticación de sesión |

## 2.5. Propuesta del Sistema en la Nube

### 2.5.1. Descripción del Sistema

El proyecto consiste en la implementación de un **Sistema de Gestión de Sushi Roll** alojado en la plataforma Render, compuesto por dos módulos principales:

**Módulo de Catálogo Público:** Una aplicación web responsive que permite a los clientes visualizar el menú del restaurante, filtrar productos por categorías (Hand Rolls, Sushi), agregar productos a un carrito de compras y enviar pedidos completos a través de WhatsApp.

**Módulo de Administración:** Un panel de control seguro protegido por contraseña que permite al propietario del restaurante gestionar los productos del catálogo, incluyendo operaciones CRUD (Crear, Leer, Actualizar, Eliminar) con campos de nombre, categoría, descripción, imagen y precio.

### 2.5.2. Ventajas del Sistema

- **Accesibilidad:** Disponible desde cualquier dispositivo con navegador web (computadora, tableta, teléfono móvil).
- **Sin instalación:** No requiere instalación de software por parte de los clientes.
- **Costo mínimo:** Implementado completamente en el plan gratuito de Render.
- **Escalabilidad:** Puede crecer añadiendo funcionalidades y usuarios sin modificar la infraestructura.
- **Mantenimiento reducido:** La plataforma Render gestiona la infraestructura, actualizaciones de seguridad y respaldos.
- **Integración con WhatsApp:** Facilita la comunicación directa con clientes usando la plataforma que ya conocen.
- **Diseño intuitivo:** Interfaz fácil de usar que no requiere capacitación para clientes ni administrador.

### 2.5.3. Tiempo de Implementación

| Fase | Duración | Actividades |
|------|----------|-------------|
| Análisis y Diseño | 1 semana | Definición de requisitos, diseño de base de datos, arquitectura |
| Desarrollo Backend | 2 semanas | API REST, lógica de negocio, conexión a base de datos |
| Desarrollo Frontend | 2 semanas | Catálogo, panel admin, carrito, responsive design |
| Integración | 1 semana | WhatsApp API, testing, ajustes |
| Despliegue | 1 día | Configuración de Render, base de datos, dominio |
| **Total** | **~6 semanas** | |

### 2.5.4. Costos Asociados

**Tabla 4: Desglose de Costos**

| Componente | Costo Mensual | Costo Anual |
|------------|---------------|-------------|
| Hosting (Render Free) | $0 | $0 |
| Base de datos (Render Free) | $0 | $0 |
| Dominio (opcional) | ~$10 | ~$120 |
| Desarrollo | N/A (proyecto académico) | N/A |
| **Total Implementación** | **$0** | **$0 - $120** |

### 2.5.5. Roles del Sistema

| Rol | Descripción | Permisos |
|-----|-------------|----------|
| Cliente | Usuario final que accede al catálogo | Ver productos, agregar al carrito, enviar pedido por WhatsApp |
| Administrador | Propietario del restaurante | CRUD de productos, acceso al panel admin |

## 2.6. Modelo o Diagrama C4

### 2.6.1. Diagrama de Contexto (Nivel 1)

```
┌─────────────────────────────────────────────────────────┐
│                    SISTEMA                               │
│          Sistema de Gestión Sushi Roll                   │
│              (Aplicación Web)                            │
└──────────┬──────────────────┬───────────────────────────┘
           │                  │
           │                  │
    ┌──────▼──────┐    ┌──────▼──────┐
    │   Cliente   │    │   Dueño /   │
    │             │    │   Admin     │
    │  ( Usuario  │    │  ( Usuario  │
    │   final )   │    │   admin )   │
    └──────┬──────┘    └──────┬──────┘
           │                  │
           │   Visualiza      │  Gestiona
           │   catálogo       │  productos
           │                  │
           │                  │
    ┌──────▼──────────────────▼──────┐
    │         WhatsApp API           │
    │    (Envío de pedidos)          │
    └────────────────────────────────┘
```

**Descripción:** Este diagrama muestra el sistema en su contexto más amplio. Los actores principales son el Cliente (que visualiza el catálogo y envía pedidos) y el Dueño/Administrador (que gestiona los productos). El sistema se comunica con WhatsApp API para el envío de pedidos.

### 2.6.2. Diagrama de Contenedores (Nivel 2)

```
┌─────────────────────────────────────────────────────────────┐
│                    SISTEMA                                  │
│              Sistema de Gestión Sushi Roll                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐         ┌─────────────────┐           │
│  │   Frontend      │         │    Backend      │           │
│  │  (HTML/CSS/JS)  │◄───────►│   (Node.js +    │           │
│  │                 │  HTTP   │    Express)     │           │
│  │  - index.html   │         │                 │           │
│  │  - admin.html   │         │  - API REST     │           │
│  │  - styles.css   │         │  - Lógica de    │           │
│  │  - script-*.js  │         │    negocio      │           │
│  └────────┬────────┘         └────────┬────────┘           │
│           │                           │                     │
│           │                           │                     │
│  ┌────────▼───────────────────────────▼────────┐           │
│  │              Base de Datos                   │           │
│  │          PostgreSQL (Render)                 │           │
│  │                                              │           │
│  │  - Tabla: productos                         │           │
│  │  - Tabla: clientes                          │           │
│  │  - Tabla: pedidos                           │           │
│  │  - Tabla: detalle_pedido                    │           │
│  └──────────────────────────────────────────────┘           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Descripción:** El sistema está compuesto por tres contenedores principales:
1. **Frontend:** Aplicación HTML/CSS/JavaScript que se ejecuta en el navegador del usuario.
2. **Backend:** Servidor Node.js con framework Express que expone una API REST.
3. **Base de Datos:** PostgreSQL gestionada por Render que almacena productos, clientes y pedidos.

### 2.6.3. Diagrama de Componentes (Nivel 3)

```
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND                                   │
│                  Node.js + Express                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────┐    ┌─────────────────┐                 │
│  │   Express.js    │    │   PostgreSQL    │                 │
│  │   (Framework)   │    │   Driver (pg)   │                 │
│  └────────┬────────┘    └────────┬────────┘                 │
│           │                      │                           │
│  ┌────────▼──────────────────────▼────────┐                 │
│  │         Módulo de Rutas                │                 │
│  │                                         │                 │
│  │  GET /productos - Listar productos     │                 │
│  │  POST /productos - Crear producto      │                 │
│  │  PUT /productos/:id - Actualizar       │                 │
│  │  DELETE /productos/:id - Eliminar      │                 │
│  │  POST /clientes - Crear cliente        │                 │
│  │  POST /pedidos - Crear pedido          │                 │
│  │  POST /detalle_pedido - Agregar ítem   │                 │
│  └────────┬───────────────────────────────┘                 │
│           │                                                  │
│  ┌────────▼────────────────────────────────┐                │
│  │      Módulo de Utilidades               │                │
│  │                                          │                │
│  │  - detectarTipo(): Clasifica producto   │                │
│  │  - Formateo de precios CLP              │                │
│  │  - Validación de datos                  │                │
│  └─────────────────────────────────────────┘                │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Descripción:** El backend está compuesto por:
1. **Express.js:** Framework web para Node.js que maneja rutas HTTP.
2. **PostgreSQL Driver:** Conector para la base de datos.
3. **Módulo de Rutas:** Endpoints REST para operaciones CRUD.
4. **Módulo de Utilidades:** Funciones auxiliares como detección de tipo y formateo.

### 2.6.4. Diagrama de Clases

```
┌─────────────────────────────────────────┐
│              Producto                    │
├─────────────────────────────────────────┤
│ - id_producto: INTEGER (PK)            │
│ - nombre: VARCHAR(100)                 │
│ - tipo: VARCHAR(30)                    │
│ - descripcion: TEXT                     │
│ - imagen: VARCHAR(500)                 │
│ - precio: DECIMAL(10,2)                │
├─────────────────────────────────────────┤
│ + crear(): void                        │
│ + actualizar(): void                   │
│ + eliminar(): void                     │
│ + listar(): Producto[]                 │
└─────────────────────────────────────────┘
           │
           │ 1
           │
           │ *
┌──────────▼──────────────────────────────┐
│              Cliente                     │
├─────────────────────────────────────────┤
│ - id_cliente: INTEGER (PK)             │
│ - nombre: VARCHAR(100)                 │
│ - telefono: VARCHAR(20)                │
│ - direccion: VARCHAR(200)              │
├─────────────────────────────────────────┤
│ + crear(): void                        │
│ + listar(): Cliente[]                  │
└─────────────────────────────────────────┘
           │
           │ 1
           │
           │ *
┌──────────▼──────────────────────────────┐
│              Pedido                     │
├─────────────────────────────────────────┤
│ - id_pedido: INTEGER (PK)             │
│ - id_cliente: INTEGER (FK)            │
│ - fecha: TIMESTAMP                    │
│ - estado: VARCHAR(30)                 │
│ - total: DECIMAL(10,2)                │
├─────────────────────────────────────────┤
│ + crear(): void                        │
│ + actualizarEstado(): void             │
│ + listar(): Pedido[]                  │
└─────────────────────────────────────────┘
           │
           │ 1
           │
           │ *
┌──────────▼──────────────────────────────┐
│           DetallePedido                 │
├─────────────────────────────────────────┤
│ - id_detalle: INTEGER (PK)            │
│ - id_pedido: INTEGER (FK)             │
│ - id_producto: INTEGER (FK)           │
│ - cantidad: INTEGER                   │
│ - subtotal: DECIMAL(10,2)             │
├─────────────────────────────────────────┤
│ + crear(): void                        │
│ + calcularSubtotal(): decimal          │
└─────────────────────────────────────────┘
```

**Descripción:** Las clases del sistema representan las entidades principales:
1. **Producto:** Representa un ítem del menú con nombre, categoría, descripción, imagen y precio.
2. **Cliente:** Almacena información del cliente que realiza el pedido.
3. **Pedido:** Registra la transacción de compra con fecha, estado y total.
4. **DetallePedido:** Relaciona productos con pedidos, indicando cantidad y subtotal.

---

## Conclusión

La implementación del Sistema de Gestión de Sushi Roll en la plataforma Render demuestra la viabilidad y beneficios de utilizar tecnologías cloud para el desarrollo de aplicaciones web modernas. El sistema permite gestionar eficientemente las operaciones de un restaurante de sushi, proporcionando accesibilidad, escalabilidad y costo mínimo de implementación.

La elección de Render como proveedor cloud se fundamenta en su facilidad de uso, plan gratuito accesible e integración nativa con herramientas de desarrollo. El sistema implementado cumple con los objetivos planteados y está preparado para ser utilizado en un entorno productivo real.

---

## Referencias

1. Render Documentation. (2024). Render: Cloud Application Hosting. https://render.com/docs

2. Amazon Web Services. (2024). What is Cloud Computing? https://aws.amazon.com/what-is-cloud-computing/

3. Microsoft Azure. (2024). What is Azure? https://azure.microsoft.com/en-us/what-is-azure/

4. Node.js Documentation. (2024). Node.js v20 Documentation. https://nodejs.org/docs/latest/

5. Express.js Documentation. (2024). Express.js Guide. https://expressjs.com/

6. PostgreSQL Documentation. (2024). PostgreSQL 16 Documentation. https://www.postgresql.org/docs/16/

7. WhatsApp Business API. (2024). WhatsApp Business Platform. https://business.whatsapp.com/

---

**Fecha de entrega:** 30 de junio de 2026

**Alumno:** Roger

**Asignatura:** Sistemas en la Nube

**Docente:** Litty
