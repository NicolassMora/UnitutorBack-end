/* El código está creando un objeto de enrutador utilizando la clase `Router` del módulo `express`. Luego,
define dos rutas: */
import { Router } from 'express';

import { crearUsuario, getUsuarios } from '../controllers/user.js';

/* `const router = Router();` crea un nuevo objeto de enrutador utilizando la clase `Router` del
módulo `express`. Este objeto de enrutador se utilizará para definir rutas y manejar solicitudes HTTP. */
const router = Router();

/* `router.route('/create').post(crearUsuario)` define una ruta para el método POST de HTTP en el
punto final '/create'. */
router.route('/create')
    .post(crearUsuario);

/* `router.route('/get-all').get(getUsuarios)` define una ruta para el método GET de HTTP en el
punto final '/get-all'. Esto significa que cuando se realiza una solicitud GET al punto final '/get-all',
la función `getUsuarios` se llamará para manejar la solicitud. */
router.route('/get-all')
    .get( getUsuarios );

    export default router;
