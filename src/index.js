/* El código importa los módulos y valores necesarios para ejecutar un servidor en una aplicación JavaScript. */
import 'dotenv/config.js'; // Importa la configuración de dotenv para cargar variables de entorno.
import app from './app.js'; // Importa el módulo de la aplicación del servidor.

import value from './const/const.js'; // Importa un valor desde un archivo de constantes.

/* El código define una función llamada `main` utilizando una expresión de función invocada inmediatamente (IIFE).
   Dentro de la función, crea un servidor utilizando el método `app.listen()`, que escucha las solicitudes entrantes en un puerto específico.
   El número de puerto se determina a partir del valor de `value.RUN_PORT` o se establece en 5000 por defecto si `value.RUN_PORT` no está definido. */
const main = (() => {
    const server = app.listen(value.RUN_PORT || 5000); // Instancia el servidor.
    console.log("Servidor activo", value.RUN_PORT || 5000); // Imprime un mensaje indicando que el servidor está activo y muestra el número de puerto.
    server.timeout = 600000; // Establece el tiempo de espera del servidor en 600,000 milisegundos (10 minutos).
})();
