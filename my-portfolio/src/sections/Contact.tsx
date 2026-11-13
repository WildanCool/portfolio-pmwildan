import { useState, type FormEvent } from "react";
import "./Contact.css";

// GANTI dengan alamat email kamu.
const CONTACT_EMAIL = "myselfwildan@gmail.com";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(
      form.subject || `Portfolio inquiry from ${form.name}`,
    );

    const body = encodeURIComponent(
      `Hello!\n\nName: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        {/* HEADER */}
        <div className="contact-heading">
          <span className="contact-eyebrow">CONTACT / 2026</span>

          <h2>
            LET'S WORK
            <br />
            <span>TOGETHER.</span>
          </h2>

          <p>
            HAVE A PROJECT IN MIND? LET'S MAKE SOMETHING
            <br className="desktop-break" />
            MEANINGFUL TOGETHER.
          </p>
        </div>

        {/* CONTENT */}
        <div className="contact-content">
          {/* LEFT SIDE */}
          <div className="contact-details">
            <span className="contact-label">GET IN TOUCH</span>

            <h3>
              Have an idea?
              <br />
              Let's talk.
            </h3>

            <p className="contact-description">
              I'm always interested in discussing new projects, creative ideas,
              and opportunities to build something great.
            </p>

            <div className="contact-email">
              <span>EMAIL ME AT</span>

              <a href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
                <span>↗</span>
              </a>
            </div>

            <div className="contact-socials">
              <span>FIND ME ON</span>

              <div className="social-links">
                <a href="https://github.com/" target="_blank" rel="noreferrer">
                  GITHUB ↗
                </a>

                <a
                  href="https://www.linkedin.com/in/perdana-muhammad-wildanumukhaladun-11a545449/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LINKEDIN ↗
                </a>

                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  INSTAGRAM ↗
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - FORM */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-heading">
              <span>01 / SEND A MESSAGE</span>
              <span>ALL FIELDS REQUIRED</span>
            </div>

            <div className="form-group">
              <label htmlFor="contact-name">YOUR NAME</label>

              <input
                id="contact-name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email">EMAIL ADDRESS</label>

              <input
                id="contact-email"
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-subject">SUBJECT</label>

              <input
                id="contact-subject"
                type="text"
                placeholder="Project collaboration"
                value={form.subject}
                onChange={(event) =>
                  setForm({ ...form, subject: event.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">YOUR MESSAGE</label>

              <textarea
                id="contact-message"
                placeholder="Tell me a little about your project..."
                rows={4}
                value={form.message}
                onChange={(event) =>
                  setForm({ ...form, message: event.target.value })
                }
                required
              />
            </div>

            <button type="submit" className="contact-submit">
              SEND MESSAGE
              <span>↗</span>
            </button>

            <p className="form-note">
              Your message will open in your default email application.
            </p>
          </form>
        </div>

        {/* FOOTER */}
        <div className="contact-footer">
          <span>© 2026 — PORTFOLIO</span>
          <span>DESIGNED & BUILT WITH PASSION</span>
          <a href="#home">BACK TO TOP ↑</a>
        </div>
      </div>
    </section>
  );
}

export default Contact;
