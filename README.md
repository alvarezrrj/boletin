# Boletin

## TO DO

- Replace local installation of firepad-x with npm package once PRs are closed.
- Upload images to WP
- Upload web version to WP

## Tech stack

- [**Vue**](https://vuejs.org/)
- [**Github pages**](https://pages.github.com/): para servir la aplicación, disponible en https://alvarezrrj.github.io/boletin.constructor/
- [**Firebase**](https://firebase.google.com/products/hosting/): para autenticación y colaboración en tiempo real.
- [**API Wordpress**](https://developer.wordpress.org/rest-api/reference/): para subir imágenes.
- [**Cloudflare Workers**](https://workers.cloudflare.com/): para alojar el backend, encargado de la comunicación con la API de WordPress.

El código fuente del frontend está almacenado en github como proyecto público y la aplicación es servida por github pages. El frontend no contiene información sensible acerca de vipassana.

Para poder acceder al constructor de boletines el usuario necesita loguearse en la app firebase con usuario y contraseña. Una vez logueado, puede usar la UI para subir imágenes a la web y redactar el boletín. El contenido del boletín se almacena en firebase, protegido por usuario y contraseña. Y las imágenes se almacenan en la aplicación wordpress que contiene la web.

Las rutinas que suben las imagenes a wordpress son Cloudflare Workers e implementan la [autenticación](#autenticación) descrita abajo.

## Autenticación

1. Generar un [token criptograficamente seguro](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html#secure-random-number-generation).
   - Almacenar el token en firebase.
   - Almacenar un hash del token en cloudflare KV.
2. Loguerase en la app de firebase con usuario y contraseña.
3. Descargar el token.
4. Enviar el token en encabezado `Authentication: Bearer ` en llamadas al Worker.
5. En Worker: autenticar las peticiones comparando el hash del token del encabezado `Authentication: Bearer ` con el almacenado en KV
6. [Rotar el token](#rotación-de-token) con frecuencia.
7. Implementar rate limiting en worker.

### Rotación de token

0. Generar usuario en firebase y almacenar credenciales como variables de entorno encriptadas en el worker.

En un cron worker que corra una vez al dia:

1. Generar token.
2. Empujar el token a firebase.
3. Guardar un hash del token en KV
