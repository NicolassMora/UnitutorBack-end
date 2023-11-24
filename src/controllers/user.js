// controllers/user.js

import mysql2 from 'mysql2/promise';
import connectionConfig from '../database/connection.js';

const createConnection = async () => {
  return await mysql2.createConnection(connectionConfig);
};

const executeQuery = async (sql, values) => {
  const connection = await createConnection();

  try {
    const [rows] = await connection.execute(sql, values);
    return rows;
  } finally {
    await connection.end();
  }
};

const handleResponse = (res, success, data, error) => {
  if (!res) {
    console.error('Response object is undefined. Cannot send response.');
    return;
  }

  if (success) {
    return res.status(200).json({ success, ...data });
  } else {
    return res.status(500).json({ success, error, code: error });
  }
};

const validarCamposUsuario = (req, res, next) => {
  const usuario = req.body;

  if (!usuario.nombre || !usuario.correo || !usuario.contrasena || !usuario.confirmContrasena || !usuario.id) {
    return handleResponse(res, false, null, 'Campos obligatorios faltantes');
  }

  next();
};

const crearUsuario = async (req, res) => {
  try {
    const usuario = req.body;

    // Asegúrate de que la tabla Usuarios tenga los campos necesarios
    const sql = 'INSERT INTO Usuarios (nombre, apellido, correo, contrasena, confirmContrasena, id) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [usuario.nombre, usuario.apellido, usuario.correo, usuario.contrasena, usuario.confirmContrasena, usuario.id];

    await executeQuery(sql, values);

    return handleResponse(res, true, { message: 'Usuario creado exitosamente' });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return handleResponse(res, false, null, 'Problemas al crear el usuario');
  }
};

const getUsuarios = async (req, res) => {
  try {
    const usuarios = await executeQuery('SELECT * FROM Usuarios');
    console.log('Usuarios obtenidos:', usuarios);
    return handleResponse(res, true, { usuarios });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return handleResponse(res, false, null, 'Problemas al obtener usuarios');
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const usuarioId = req.params.id;
    const nuevoUsuario = req.body;

    await executeQuery('UPDATE Usuarios SET nombre = ?, apellido = ?, correo = ?, contrasena = ?, confirmContrasena = ? WHERE id = ?', 
      [nuevoUsuario.nombre, nuevoUsuario.apellido, nuevoUsuario.correo, nuevoUsuario.contrasena, nuevoUsuario.confirmContrasena, usuarioId]
    );

    return handleResponse(res, true, { message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    return handleResponse(res, false, null, 'Problemas al actualizar el usuario');
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const usuarioId = req.params.id;

    await executeQuery('DELETE FROM Usuarios WHERE id = ?', [usuarioId]);

    return handleResponse(res, true, { message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    return handleResponse(res, false, null, 'Problemas al eliminar el usuario');
  }
};

export { getUsuarios, crearUsuario, validarCamposUsuario, actualizarUsuario, eliminarUsuario, };
