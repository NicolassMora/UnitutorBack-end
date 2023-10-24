// Importa el módulo 'mysql2/promise' y la configuración de conexión desde otro archivo.
import mysql2 from 'mysql2/promise';
import connectionConfig from '../database/connection.js';

/**
 * La función crea una conexión a una base de datos MySQL utilizando la configuración proporcionada.
 * @returns una promesa que resuelve a un objeto de conexión de MySQL.
 */
const createConnection = async () => {
    return await mysql2.createConnection(connectionConfig);
}

/**
 * Esta función JavaScript crea un usuario insertando su nombre y correo en una tabla de la base de datos.
 * @param req - El parámetro 'req' es el objeto de solicitud que contiene información sobre la solicitud HTTP entrante.
 *                Incluye propiedades como 'body', 'query' y 'params'.
 * @param res - El parámetro 'res' es el objeto de respuesta que se utiliza para enviar la respuesta al cliente.
 *                Contiene métodos y propiedades que te permiten controlar la respuesta, como establecer el código de estado, las cabeceras y enviar el cuerpo de respuesta.
 * @returns una respuesta JSON con un código de estado 200 y un mensaje que indica que el usuario ha sido creado con éxito.
 */
const crearUsuario = async (req, res) => {
    try {
        const usuario = req.body; // En el cuerpo de la solicitud se envía data 'POST PUT'

        const connection = await createConnection();
        await connection.execute('INSERT INTO Usuarios (nombre, correo) VALUES (?, ?)', [usuario.nombre, usuario.correo]);
        await connection.end();

        return res.status(200).json({
            status: true,
            message: "Usuario creado"
        });
        
    } catch (error) {
        return res.status(500).json({
            status: false,
            error: "Problemas al crear el usuario",
            code: error
        });
    };
};

/**
 * La función `getUsuarios` es una función asincrónica que obtiene todos los usuarios de una base de datos y
 * los devuelve como una respuesta JSON.
 * @param req - El parámetro 'req' es el objeto de solicitud que contiene información sobre la solicitud HTTP realizada por el cliente.
 * @param res - El parámetro 'res' es el objeto de respuesta que se utiliza para enviar la respuesta HTTP al cliente.
 * @returns una respuesta con un código de estado 200 y un objeto JSON que contiene el estado de éxito y la lista de usuarios obtenida de la base de datos.
 */
const getUsuarios = async (req, res) => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.execute('SELECT * from usuarios');
        await connection.end();

        return res.status(200).json({
            success: true,
            usuarios: rows
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            error: "Problemas al traer el usuario",
            code: error
        });
    }
}

/* La declaración 'export' se utiliza para exportar funciones, objetos o valores desde un módulo
 * para que puedan ser importados y utilizados en otros módulos. En este caso, la declaración 'export'
 * exporta las funciones 'getUsuarios' y 'crearUsuario' desde el módulo actual.
 * Esto permite que otros módulos las importen y las utilicen. */
export {
    getUsuarios,
    crearUsuario,
}
