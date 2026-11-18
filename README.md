# Café La Esquina · Landing de práctica

Landing de una sola página para una **cafetería de barrio ficticia** (Café La Esquina), hecha como encargo de práctica. No hay cliente real ni datos de cliente.

- **Stack:** React 19 + Vite 6, con CSS propio (sin librerías de UI).
- **Secciones:**
  - Cabecera fija con botón de contacto.
  - Portada.
  - Carta (café, desayunos y repostería).
  - Horario y dirección.
  - Formulario de reservas y encargos.
- **Diseño mobile-first:**
  - En móvil todo va en una columna, sin scroll horizontal.
  - Los botones miden 48 px de alto.
  - Los campos usan letra de 16 px, para que iOS no haga zoom.
  - Desde 720 px de ancho, la carta pasa a 3 columnas.

## Estructura

Todos los archivos están en la raíz del repositorio:

| Archivo | Qué contiene |
| --- | --- |
| `index.html` | Página base. Carga `main.jsx`. |
| `main.jsx` | Arranque de React. |
| `App.jsx` | La landing completa y el formulario. |
| `contactService.js` | Envío del formulario (simulado o real). |
| `styles.css` | Estilos. |
| `vite.config.js`, `package.json` | Configuración de Vite y dependencias. |

## Cómo arrancar el proyecto

Necesitas Node.js 18 o superior.

```bash
npm install
npm run dev        # servidor de desarrollo en http://localhost:5173
npm run build      # genera la versión final en dist/
npm run preview    # sirve dist/ para comprobarla
```

La URL de previsualización está desplegada en Vercel y conectada a este repositorio. Cada cambio que se sube a `main` se publica solo.

## Formulario de contacto

- **Validación en el navegador:**
  - Nombre, email y mensaje son obligatorios.
  - El email tiene que ser válido.
  - El mensaje admite 1000 caracteres como máximo.
- **Mientras envía:** el botón se desactiva y muestra «Enviando…».
- **Al terminar:** si todo va bien, sale un aviso de éxito y los campos se vacían. Si algo falla, sale un aviso de error.

## Qué está simulado

- **El envío del formulario.** No hay servidor. Cada mensaje se guarda en el `localStorage` del navegador después de una espera de 0,7 s, como si fuera una petición real (ver `contactService.js`). No se manda ningún email.
- **Los datos de ejemplo.** La primera vez hay 2 mensajes inventados: una reserva y un encargo de tarta. El pie de página muestra cuántos mensajes hay guardados, para que se pueda comprobar que el envío funciona.
- **La dirección y el horario.** Son inventados.
- **Envío real (opcional).** Si defines la variable de entorno `VITE_FORM_ENDPOINT` (por ejemplo, la URL de un formulario de Formspree), el formulario envía los datos de verdad a esa URL con un `POST` en JSON.

## Cómo reiniciar los datos de ejemplo

Hay dos formas:

1. Pulsar **«Reiniciar datos de ejemplo»** en el pie de página. Vuelven a quedar solo los 2 mensajes de ejemplo.
2. Borrar la clave `cafe-la-esquina:mensajes` del `localStorage`. Se puede hacer desde DevTools → Application → Local Storage, o con este código en la consola:

   ```js
   localStorage.removeItem("cafe-la-esquina:mensajes")
   ```
