# Estudio Brisa · Landing de práctica

Landing de una sola página para una marca **ficticia** (Estudio Brisa, estudio de diseño web), hecha como encargo de práctica. No hay cliente real ni datos de cliente.

- **Stack:** React 19 + Vite 6, CSS propio (sin librerías de UI).
- **Secciones:** cabecera fija con botón de contacto, portada (hero), servicios en tarjetas y formulario de contacto.
- **Diseño mobile-first:** en móvil todo va en una columna, sin scroll horizontal. Los botones miden 48 px de alto y los campos usan letra de 16 px para que iOS no haga zoom. Desde 720 px de ancho pasa a 3 columnas.

## Cómo arrancar el proyecto

Necesitas Node.js 18 o superior.

```bash
npm install
npm run dev        # servidor de desarrollo en http://localhost:5173
npm run build      # genera la versión final en dist/
npm run preview    # sirve dist/ para comprobarla
```

## Formulario de contacto

- Valida en el navegador: nombre, email y mensaje son obligatorios, el email tiene que ser válido y el mensaje admite como máximo 1000 caracteres.
- Mientras envía, el botón se desactiva y muestra «Enviando…».
- Al terminar, muestra un aviso de éxito y vacía los campos. Si algo falla, muestra un aviso de error.

## Qué está simulado

- **El envío del formulario.** No hay servidor. Cada mensaje se guarda en el `localStorage` del navegador tras una espera de 0,7 s, como si fuera una petición real (ver `src/contactService.js`). No se manda ningún email.
- **Los datos de ejemplo.** La primera vez hay 2 mensajes inventados. El pie de página muestra cuántos mensajes hay guardados, así se puede comprobar que el envío funciona.
- **Envío real (opcional).** Si defines la variable de entorno `VITE_FORM_ENDPOINT`, por ejemplo con la URL de un formulario de Formspree, el formulario envía los datos de verdad a esa URL con un `POST` en JSON.

## Cómo reiniciar los datos de ejemplo

Hay dos formas:

1. Pulsar **«Reiniciar datos de ejemplo»** en el pie de página. Vuelve a dejar solo los 2 mensajes de ejemplo.
2. Borrar la clave `estudio-brisa:mensajes` del `localStorage`. Se hace desde DevTools → Application → Local Storage, o con este código en la consola:
   ```js
   localStorage.removeItem("estudio-brisa:mensajes")
   ```

## URL de previsualización

El proyecto se despliega en Vercel, conectado a este repositorio. Vercel detecta Vite solo: el comando de build es `npm run build` y la carpeta de salida es `dist`.
