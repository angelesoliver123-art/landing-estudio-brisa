import { useEffect, useState } from "react";
import { getMessages, resetMessages, sendContactMessage } from "./contactService.js";

const SERVICES = [
  {
    icon: "◐",
    title: "Diseño web",
    text: "Webs rápidas y claras que se ven perfectas en el móvil y convierten visitas en clientes.",
  },
  {
    icon: "✦",
    title: "Branding",
    text: "Logotipo, colores y tipografías con personalidad, coherentes en todos tus canales.",
  },
  {
    icon: "↗",
    title: "SEO",
    text: "Que te encuentren en Google: contenidos, velocidad y ficha de negocio optimizados.",
  },
];

const EMPTY = { name: "", email: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_MESSAGE = 1000;

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = "Escribe tu nombre.";
  else if (v.name.trim().length > 100) e.name = "Máximo 100 caracteres.";
  if (!v.email.trim()) e.email = "Escribe tu email.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Ese email no parece válido.";
  if (!v.message.trim()) e.message = "Cuéntanos algo sobre tu proyecto.";
  else if (v.message.length > MAX_MESSAGE) e.message = `Máximo ${MAX_MESSAGE} caracteres.`;
  return e;
}

export default function App() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null);
  const [messages, setMessages] = useState(() => getMessages());

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;
    setSending(true);
    try {
      await sendContactMessage({
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      });
      setValues(EMPTY);
      setMessages(getMessages());
      setToast({ type: "ok", text: "¡Mensaje enviado! Te responderemos en menos de 24 h." });
    } catch {
      setToast({ type: "error", text: "No se pudo enviar el mensaje. Inténtalo de nuevo." });
    } finally {
      setSending(false);
    }
  };

  const onReset = () => {
    setMessages(resetMessages());
    setToast({ type: "ok", text: "Datos de ejemplo reiniciados." });
  };

  return (
    <>
      <header className="header">
        <div className="container header__inner">
          <a href="#inicio" className="logo">
            Estudio <span>Brisa</span>
          </a>
          <a href="#contacto" className="btn btn--small">
            Contacto
          </a>
        </div>
      </header>

      <main>
        <section id="inicio" className="hero">
          <div className="container">
            <p className="eyebrow">Estudio de diseño web</p>
            <h1>Tu negocio, con una web que trabaja por ti.</h1>
            <p className="hero__lead">
              Diseñamos webs, marcas y estrategias SEO para pequeños negocios que quieren crecer
              sin complicarse.
            </p>
            <div className="hero__actions">
              <a href="#contacto" className="btn">
                Pide tu presupuesto
              </a>
              <a href="#servicios" className="btn btn--ghost">
                Ver servicios
              </a>
            </div>
          </div>
        </section>

        <section id="servicios" className="section">
          <div className="container">
            <h2>Qué hacemos</h2>
            <div className="cards">
              {SERVICES.map((s) => (
                <article key={s.title} className="card">
                  <span className="card__icon" aria-hidden="true">
                    {s.icon}
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contacto" className="section section--alt">
          <div className="container contact">
            <div>
              <h2>Hablemos</h2>
              <p className="muted">
                Cuéntanos tu idea y te enviamos una propuesta sin compromiso.
              </p>
            </div>

            <form className="form" onSubmit={onSubmit} noValidate aria-label="Formulario de contacto">
              <Field label="Nombre" error={errors.name} id="name">
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={values.name}
                  onChange={onChange}
                  aria-invalid={!!errors.name}
                />
              </Field>
              <Field label="Email" error={errors.email} id="email">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={values.email}
                  onChange={onChange}
                  aria-invalid={!!errors.email}
                />
              </Field>
              <Field
                label="Mensaje"
                error={errors.message}
                id="message"
                hint={`${values.message.length}/${MAX_MESSAGE}`}
              >
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={onChange}
                  aria-invalid={!!errors.message}
                />
              </Field>
              <button type="submit" className="btn btn--block" disabled={sending}>
                {sending ? "Enviando…" : "Enviar mensaje"}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <p>© {new Date().getFullYear()} Estudio Brisa · Marca ficticia (encargo de práctica)</p>
          <p className="demo">
            Demo: <strong data-testid="message-count">{messages.length}</strong> mensajes guardados ·{" "}
            <button type="button" className="link" onClick={onReset}>
              Reiniciar datos de ejemplo
            </button>
          </p>
        </div>
      </footer>

      {toast && (
        <div className={`toast toast--${toast.type}`} role="status" aria-live="polite">
          {toast.text}
        </div>
      )}
    </>
  );
}

function Field({ label, error, id, hint, children }) {
  return (
    <div className="field">
      <div className="field__top">
        <label htmlFor={id}>{label}</label>
        {hint && <span className="field__hint">{hint}</span>}
      </div>
      {children}
      {error && (
        <p className="field__error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
