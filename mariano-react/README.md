🎮 Tienda Gamer
¡Bienvenido a la Tienda Gamer! Esta es una aplicación web moderna construida con React que simula una tienda de videojuegos, consolas y accesorios. Permite a los usuarios explorar productos, usar un carrito de compras, y ofrece un panel de administración para gestionar el catálogo.

🚀 Características Principales
Catálogo de Productos Dinámico: Explora una amplia variedad de videojuegos, consolas y accesorios. Los productos se cargan desde una MockAPI externa y un archivo JSON local.

Búsqueda y Filtrado: Encuentra fácilmente productos por nombre o categoría con una barra de búsqueda eficiente.

Paginación: Navega a través del catálogo de productos dividido en páginas para una mejor experiencia de usuario.

Carrito de Compras: Añade, elimina y gestiona productos en tu carrito de compras, con persistencia de datos.

Autenticación de Usuarios: Sistema de inicio y cierre de sesión con roles de usuario (administrador/usuario normal).

Panel de Administración (CRUD): Los usuarios con rol de admin pueden acceder a un panel para crear, leer, actualizar y eliminar productos del catálogo a través de la MockAPI.

Diseño Responsivo: Interfaz de usuario adaptada para una visualización óptima en dispositivos móviles, tablets y escritorios, utilizando react-bootstrap.

Notificaciones: Retroalimentación al usuario mediante mensajes "toast" para acciones del carrito y autenticación.

SEO Básico: Optimización de títulos y meta descripciones de las páginas con react-helmet-async.

🛠️ Tecnologías Utilizadas
React.js: Biblioteca principal para la construcción de la interfaz de usuario.

React Router DOM: Para la gestión de rutas y navegación en la aplicación.

React Bootstrap: Componentes de Bootstrap adaptados para React, facilitando un diseño responsivo y moderno.

React Icons: Librería de iconos (react-icons/fa para Font Awesome).

React Toastify: Para notificaciones "toast" personalizables.

SweetAlert2: Para alertas y confirmaciones más atractivas en el panel de administración.

react-helmet-async: Para la gestión de meta tags y títulos de página dinámicos (SEO).

MockAPI: Una API REST simulada para la gestión de productos y usuarios (ej. https://68588753138a18086dfb2a51.mockapi.io/).

LocalStorage: Para persistir el estado del carrito y la autenticación del usuario en el navegador.

⚙️ Instalación y Uso
Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local:

Requisitos Previos
Asegúrate de tener Node.js y npm (o Yarn) instalados en tu sistema.

Node.js (versión LTS recomendada)

npm (viene con Node.js) o Yarn

Pasos de Instalación
Clona el repositorio (si aplica) o descarga el código fuente:

git clone <URL_DEL_REPOSITORIO>
cd nombre-del-proyecto

(Reemplaza <URL_DEL_REPOSITORIO> con la URL real de tu repositorio si lo tienes en Git.)

Instala las dependencias:

npm install
# o si usas Yarn
yarn install

Configuración de la MockAPI (opcional, si no está configurada por defecto):
La aplicación está configurada para usar la siguiente MockAPI de productos y usuarios:

Productos: https://68588753138a18086dfb2a51.mockapi.io/product

Usuarios: https://68588753138a18086dfb2a51.mockapi.io/users

Asegúrate de que estas URLs sean accesibles. Si deseas usar tu propia MockAPI, edita las URLs en los archivos src/context/CartContext.jsx y src/context/AdminContext.jsx.

Para la autenticación de admin, el sistema usa credenciales fijas de ejemplo para el rol de administrador (se cargan desde public/data/users.json o la MockAPI de usuarios):

Usuario Admin: admin@example.com

Contraseña Admin: password

Ejecuta la aplicación en modo desarrollo:

npm run dev
# o si usas Yarn
yarn dev

Esto iniciará el servidor de desarrollo y la aplicación se abrirá en tu navegador en http://localhost:5173 (o un puerto similar).

📄 Estructura del Proyecto
/
├── public/                 # Archivos estáticos (index.html, data/users.json, data/products.json)
│   ├── data/
│   │   ├── products.json   # Datos de productos locales
│   │   └── users.json      # Datos de usuarios locales (para autenticación)
│   └── favicon.ico
├── src/
│   ├── assets/             # Imágenes y otros recursos estáticos
│   │   └── loading.gif
│   ├── components/         # Componentes reutilizables
│   │   ├── admin/          # Componentes específicos del panel de administración
│   │   │   ├── FormularioEdicion.jsx
│   │   │   └── FormularioProducto.jsx
│   │   ├── estaticos/      # Componentes de layout (Header, Footer)
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   ├── ProductList.jsx # Lista de tarjetas de productos
│   │   ├── Productos.jsx   # Tarjeta de producto individual (ProductCard)
│   │   ├── DetallesDeProductos.jsx # Página de detalle de producto
│   │   ├── Cart.jsx        # Componente del carrito (Offcanvas)
│   │   └── Paginador.jsx   # Componente para la paginación
│   ├── context/            # Contextos de React para gestión global del estado
│   │   ├── AdminContext.jsx
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── pages/              # Páginas principales de la aplicación
│   │   ├── Home.jsx
│   │   ├── AcercaDe.jsx
│   │   ├── Contactos.jsx
│   │   ├── GaleriaDeProductos.jsx
│   │   ├── Login.jsx
│   │   ├── Admin.jsx
│   │   └── NotFound.jsx
│   ├── rutas/              # Rutas protegidas
│   │   └── RutasProtegidas.jsx
│   ├── utils/              # Utilidades y datos auxiliares
│   │   └── data2.js        # Lista de productos de juegos, consolas, accesorios
│   ├── App.css             # Estilos CSS globales (si tienes)
│   ├── App.jsx             # Componente principal de la aplicación con configuración de rutas
│   └── main.jsx            # Punto de entrada de la aplicación
├── .gitignore              # Archivos y directorios a ignorar por Git
├── index.html              # Archivo HTML principal
├── package.json            # Metadatos del proyecto y dependencias
├── vite.config.js          # Configuración de Vite
└── README.md               # Este archivo

🤝 Contribuciones
Las contribuciones son bienvenidas. Si encuentras un error o tienes una mejora, por favor, abre un "issue" o envía un "pull request".

📜 Licencia
[Aquí puedes especificar la licencia de tu proyecto, por ejemplo, MIT, Apache, etc.]

Desarrollado por Mariano Fort.