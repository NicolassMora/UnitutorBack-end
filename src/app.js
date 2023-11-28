/* El código proporcionado configura un servidor Express.js con varios middleware y configuraciones. */
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import express from 'express';

import value from './const/const.js';
// Archivo de la configuración de la base de datos 
import './database/connection.js';

const app = express(); // Crear instancia de la aplicación Express

/* El objeto `corsOptions` es un objeto de configuración para el middleware CORS (Cross-Origin Resource Sharing).
CORS es un mecanismo que permite que los recursos (por ejemplo, fuentes, JavaScript, etc.) en una página web
sean solicitados desde otro dominio fuera del dominio desde el cual se originó el recurso. */
const corsOptions = {
    credentiasl: true,
    optionSuccessStatus: 200,
    methods: "GET, PUT, POST, DELETE",
    origin: '*'
};

/* El código `app.set('env', value.NODE_ENV)` establece la variable de entorno para la aplicación Express.js.
El valor de `value.NODE_ENV` se asigna a la configuración `env`. Esto se utiliza típicamente para determinar
el comportamiento de la aplicación según el entorno en el que se esté ejecutando, como desarrollo, producción o prueba. */
app.set('env', value.NODE_ENV);
app.set('port', value.RUN_PORT);

/* El código `app.use(morgan('dev'))` configura el middleware Morgan, que es un middleware de registro
para Express.js. Registra las solicitudes HTTP en la consola en un formato amigable para el desarrollo. */
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json({ limit: '500MB' }));
app.use(express.urlencoded({ extended: true }));

// Carpeta estática
app.use(express.static(path.join(path.resolve(), value.STATIC_PATH)));

// ENDPOINTS
import routerUser from './routes/user.js';

/* `app.use('/user', routerUser)` configura un middleware para la aplicación Express.js.
Especifica que cualquier solicitud con una URL que comience con '/user' debe ser manejada por el enrutador `routerUser`. */
app.use('/user', routerUser);

export default app;
