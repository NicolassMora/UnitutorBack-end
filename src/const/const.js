import 'dotenv/config.js';

/* Estas líneas de código asignan valores a constantes utilizando los valores de variables de entorno.
   El objeto `process.env` en Node.js proporciona acceso a las variables de entorno. */
const SECRET = process.env.SECRET; // Clave secreta obtenida de las variables de entorno.
const RUN_PORT = process.env.RUN_PORT; // Puerto de ejecución obtenido de las variables de entorno.
const NODE_ENV = process.env.NODE_ENV; // Entorno de Node obtenido de las variables de entorno.
const STATIC_PATH = process.env.STATIC_PATH; // Ruta estática obtenida de las variables de entorno.

// BD (Base de Datos)
const HOST = process.env.HOST; // Dirección del servidor de la base de datos obtenida de las variables de entorno.
const USER = process.env.USER; // Nombre de usuario de la base de datos obtenido de las variables de entorno.
const DATABASE = process.env.DATABASE; // Nombre de la base de datos obtenido de las variables de entorno.


/* El código crea un objeto llamado `object` y le asigna los valores de las constantes
   `SECRET`, `NODE_ENV`, `RUN_PORT` y `STATIC_PATH`. Estas constantes se obtienen de las variables de entorno
   utilizando `process.env`. */
const object = {
    HOST,
    USER,
    SECRET,
    NODE_ENV,
    DATABASE,
    RUN_PORT,
    STATIC_PATH,
}

Object.freeze(object); // El método estático Object.freeze() congela un objeto.

export default object;
