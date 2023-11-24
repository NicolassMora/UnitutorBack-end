// routes/user.js

import express from 'express';
import {
  crearUsuario,
  getUsuarios,
  actualizarUsuario,
  eliminarUsuario,

} from '../controllers/user.js';

const router = express.Router();

// Middleware para validar los campos del usuario en la solicitud
function validarCamposUsuario(req, res, next) {
  const usuario = req.body;

  // Verifica si los campos obligatorios están presentes
  if (!usuario.nombre || !usuario.apellido || !usuario.correo || !usuario.contrasena || !usuario.confirmContrasena || !usuario.id) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  // Verifica si las contraseñas coinciden
  if (usuario.contrasena !== usuario.confirmContrasena) {
    return res.status(400).json({ error: 'Las contraseñas no coinciden' });
  }

  next(); // Llama a la siguiente función en la cadena de middleware
}

// Ruta para crear un nuevo usuario
router.post('/create', validarCamposUsuario, async (req, res) => {
  try {
    const usuario = req.body;
    await crearUsuario(usuario);
    return res.status(201).json({ mensaje: 'Usuario creado exitosamente', usuario });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return res.status(500).json({ error: 'Problemas al crear el usuario' });
  }
});

// Ruta para obtener todos los usuarios
router.get('/get-all', async (req, res) => {
  try {
    const usuarios = await getUsuarios();
    console.log('Usuarios obtenidos:', usuarios);
    return res.status(200).json({ usuarios });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return res.status(500).json({ error: 'Problemas al obtener usuarios' });
  }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    // Lógica para verificar las credenciales en la base de datos
    // Aquí debes comparar el correo y la contraseña con los registros en tu base de datos

    // Supongamos que obtienes el usuario de la base de datos
    const usuario = await obtenerUsuarioPorCorreo(correo);

    if (!usuario || usuario.contrasena !== contrasena) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Si las credenciales son válidas, puedes enviar algún tipo de token de sesión o simplemente confirmar el inicio de sesión
    return res.status(200).json({ mensaje: 'Inicio de sesión exitoso', usuario });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return res.status(500).json({ error: 'Problemas al iniciar sesión' });
  }
});

// Ruta para actualizar un usuario por ID
router.put('/update/:id', validarCamposUsuario, async (req, res) => {
  try {
    const usuarioId = req.params.id;
    const nuevoUsuario = req.body;
    await actualizarUsuario(usuarioId, nuevoUsuario);
    return res.status(200).json({ mensaje: 'Usuario actualizado exitosamente', usuario: nuevoUsuario });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    return res.status(500).json({ error: 'Problemas al actualizar el usuario' });
  }
});

// Ruta para eliminar un usuario por ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const usuarioId = req.params.id;
    await eliminarUsuario(usuarioId);
    return res.status(200).json({ mensaje: 'Usuario eliminado exitosamente', usuarioId });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    return res.status(500).json({ error: 'Problemas al eliminar el usuario' });
  }
});

// Middleware de manejo de errores
function manejarErrores(err, req, res, next) {
  console.error('Error:', err);
  return res.status(500).json({ error: 'Error interno del servidor' });
}

// Agregar el middleware de manejo de errores al final de las rutas
router.use(manejarErrores);

export default router;
