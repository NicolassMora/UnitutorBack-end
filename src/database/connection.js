// Importa el módulo 'mysql2' y un objeto 'values' desde archivos separados.
import mysql2 from 'mysql2';
import values from '../const/const.js';

/* El objeto `connectionConfig` almacena la configuración necesaria para conectar a una base de datos MySQL.
   Incluye las siguientes propiedades: */
const connectionConfig = {
    host: values.HOST,  // Dirección del servidor de la base de datos.
    user: values.USER,  // Nombre de usuario para la conexión.
    password: '',  // Contraseña de la base de datos
    database: values.DATABASE  // Nombre de la base de datos.
};

/* El código está creando una conexión a una base de datos MySQL utilizando la biblioteca 'mysql2'. */
const connection = mysql2.createConnection({
    host: connectionConfig.host,
    user: connectionConfig.user,
    password: connectionConfig.password
});

/* El código ejecuta una consulta SQL para crear una base de datos si aún no existe. */
connection.query(`CREATE DATABASE IF NOT EXISTS ${connectionConfig.database}`, (error) => {
    if (error) {
      console.error('Error al crear la base de datos: ', error);
      return;
    }
  
    console.log('Base de datos creada o ya existente');
  
    // Conectar a la base de datos recién creada o existente.
    connectionConfig.database = connectionConfig.database;
  
    // Cierra la conexión temporal.
    connection.end();
});

// Exporta el objeto 'connectionConfig' que contiene la configuración de la base de datos.
export default connectionConfig;
