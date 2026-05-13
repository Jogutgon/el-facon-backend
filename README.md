# el-facon-backend
Backend del sistema de reservas del restaurante "El Facon" desarrollado con Node.js y Express.js

## descripcion
Este proyecto consiste en el desarrollo del backend de una aplicación web para la gestion de reservas de mesas en un restaurante.

La API permite gestionar usuarios y reservas dentro del sistema.
Los usuarios podrán registrarse e iniciar sesión para realizar las reservas en fechas y horarios especificos.
Los administradores tendrán acceso a funcionalidades que les permitirán gestionar los usuarios y las reservas registradas en la aplicación.

### Funcionalidades principales
- Registro de usuarios
- Inicio de sesión
- Creación de reservas
- Visualización de reservas
- Gestión de usuarios
- Gestión de reservas
- Autenticación mediante JWT
- API REST para consumo desde el frontend

### Tecnologías
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- dotenv

### Instalacion 
- Clonar el repositorio:
  git clone https://github.com/Jogutgon/el-facon-backend.git

- Instalar dependencias:
  npm install

- Ejecutar el proyecto en modo desarrollo:
  npm run dev

- El servidor se ejecutará por defecto en:
	http://localhost:7000

### Conexión con el frontend
- Este backend provee una API REST que es consumida por el frontend desarrollado con React.


### Variables de entorno:
- El proyecto utiliza variables de entorno para la configuración del servidor y la base de datos.
- Crear un archivo .env en la raíz del proyecto con las siguientes variables:

	MONGO_URI=tu_uri_de_mongodb
	JWT_SECRET=tu_clave_secreta

### Autor 
- Josefina Gutierrez Gonzalez
- Proyecto desarrollado como trabajo final para la práctica de desarrollo web utlizando React y Node.js
