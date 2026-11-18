// Envío del formulario de contacto.
//
// Por defecto el envío está SIMULADO: cada mensaje se guarda en el
// navegador (localStorage) tras una pequeña espera, como si fuera un servidor.
// Si defines la variable de entorno VITE_FORM_ENDPOINT (por ejemplo, la URL
// de un formulario de Formspree), los mensajes se envían de verdad a esa URL.

const STORAGE_KEY = "cafe-la-esquina:mensajes";
const ENDPOINT = import.meta.env?.VITE_FORM_ENDPOINT;

export const SAMPLE_MESSAGES = [
  {
    id: "ejemplo-1",
    name: "Lucía Pérez",
    email: "lucia@ejemplo.com",
    message: "¿Puedo reservar mesa para 6 el sábado a las 10?",
    createdAt: "2026-11-01T10:00:00.000Z",
  },
  {
    id: "ejemplo-2",
    name: "Marcos Gil",
    email: "marcos@ejemplo.com",
    message: "Quería encargar una tarta de zanahoria para el viernes.",
    createdAt: "2026-11-02T16:30:00.000Z",
  },
];

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [...SAMPLE_MESSAGES];
  } catch {
    return [...SAMPLE_MESSAGES];
  }
}

function write(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    /* almacenamiento no disponible: se ignora */
  }
}

export function getMessages() {
  return read();
}

export function resetMessages() {
  write([...SAMPLE_MESSAGES]);
  return read();
}

export async function sendContactMessage({ name, email, message }) {
  if (ENDPOINT) {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ name, email, message }),
    });
    if (!res.ok) throw new Error("No se pudo enviar el mensaje.");
    return { mode: "real" };
  }

  // Simulación de servidor
  await new Promise((r) => setTimeout(r, 700));
  const entry = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
  };
  write([...read(), entry]);
  return { mode: "simulado", entry };
}
