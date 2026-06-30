import type { ContactPayload } from "../types/portfolio";

export interface ContactErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(values: ContactPayload): ContactErrors {
  const errors: ContactErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }

  if (!emailPattern.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (values.subject.trim().length < 3) {
    errors.subject = "Please include a subject.";
  }

  if (values.message.trim().length < 10) {
    errors.message = "Please write a message of at least 10 characters.";
  }

  return errors;
}
