import { FormEvent, useState } from "react";
import { PageHero } from "../components/PageHero";
import { SectionReveal } from "../components/SectionReveal";
import { submitContact } from "../services/api";
import type { ContactPayload } from "../types/portfolio";
import { validateContactForm, type ContactErrors } from "../utils/contactValidation";

const initialValues: ContactPayload = {
  name: "",
  email: "",
  subject: "",
  message: ""
};

export default function ContactPage() {
  const [values, setValues] = useState<ContactPayload>(initialValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function updateField(field: keyof ContactPayload, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    setStatus(null);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      setSubmitting(true);
      const response = await submitContact(values);
      setStatus({ type: response.ok ? "success" : "error", message: response.message });
      if (response.ok) {
        setValues(initialValues);
      }
    } catch {
      setStatus({
        type: "error",
        message: "The message could not be sent right now. Please try again or email me directly."
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="page-main">
      <PageHero title="Contact">
        Send a message through the portfolio backend. The form validates input and reports submission status.
      </PageHero>
      <section className="section">
        <div className="container content-grid">
          <div className="section-heading">
            <h2>Get in touch</h2>
          </div>
          <SectionReveal>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <label>
                <span>Name</span>
                <input
                  value={values.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  autoComplete="name"
                />
                {errors.name ? <small id="name-error">{errors.name}</small> : null}
              </label>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  value={values.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  autoComplete="email"
                />
                {errors.email ? <small id="email-error">{errors.email}</small> : null}
              </label>
              <label>
                <span>Subject</span>
                <input
                  value={values.subject}
                  onChange={(event) => updateField("subject", event.target.value)}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                />
                {errors.subject ? <small id="subject-error">{errors.subject}</small> : null}
              </label>
              <label>
                <span>Message</span>
                <textarea
                  rows={7}
                  value={values.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message ? <small id="message-error">{errors.message}</small> : null}
              </label>
              <button className="button primary" type="submit" disabled={submitting}>
                {submitting ? "Sending..." : "Send message"}
              </button>
              {status ? (
                <p className={`form-status ${status.type}`} role={status.type === "error" ? "alert" : "status"}>
                  {status.message}
                </p>
              ) : null}
            </form>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
