/**
 * AERIS AI – Form validation utilities
 */

// ─── Individual validators ────────────────────────────────────────────────────

/**
 * Validate an email address.
 * @param {string} email
 * @returns {{ valid: boolean, message: string }}
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return { valid: false, message: 'Email is required.' };
  }
  const trimmed = email.trim();
  if (trimmed.length === 0) {
    return { valid: false, message: 'Email is required.' };
  }
  // RFC-5322-ish pattern
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!pattern.test(trimmed)) {
    return { valid: false, message: 'Please enter a valid email address.' };
  }
  return { valid: true, message: '' };
}

/**
 * Validate a password.
 * Requirements: min 8 chars, at least 1 uppercase letter, at least 1 digit.
 * @param {string} password
 * @returns {{ valid: boolean, message: string }}
 */
export function validatePassword(password) {
  if (!password || typeof password !== 'string') {
    return { valid: false, message: 'Password is required.' };
  }
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters.' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter.' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number.' };
  }
  return { valid: true, message: '' };
}

/**
 * Validate a phone number (international or local formats).
 * @param {string} phone
 * @returns {{ valid: boolean, message: string }}
 */
export function validatePhone(phone) {
  if (!phone || typeof phone !== 'string') {
    return { valid: false, message: 'Phone number is required.' };
  }
  const trimmed = phone.trim();
  if (trimmed.length === 0) {
    return { valid: false, message: 'Phone number is required.' };
  }
  // Allows +, spaces, hyphens, parentheses, digits (7–15 digits)
  const pattern = /^\+?[\d\s\-().]{7,20}$/;
  if (!pattern.test(trimmed)) {
    return { valid: false, message: 'Please enter a valid phone number.' };
  }
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length < 7 || digits.length > 15) {
    return { valid: false, message: 'Phone number must be between 7 and 15 digits.' };
  }
  return { valid: true, message: '' };
}

/**
 * Validate a name field.
 * @param {string} name
 * @returns {{ valid: boolean, message: string }}
 */
export function validateName(name) {
  if (!name || typeof name !== 'string') {
    return { valid: false, message: 'Name is required.' };
  }
  const trimmed = name.trim();
  if (trimmed.length < 2) {
    return { valid: false, message: 'Name must be at least 2 characters.' };
  }
  if (trimmed.length > 100) {
    return { valid: false, message: 'Name must be 100 characters or fewer.' };
  }
  return { valid: true, message: '' };
}

/**
 * Validate that a field has a non-empty value.
 * @param {*} value
 * @param {string} fieldName  Human-readable field label used in the error message.
 * @returns {{ valid: boolean, message: string }}
 */
export function validateRequired(value, fieldName = 'This field') {
  const isEmpty =
    value === null ||
    value === undefined ||
    (typeof value === 'string' && value.trim().length === 0) ||
    (Array.isArray(value) && value.length === 0);

  if (isEmpty) {
    return { valid: false, message: `${fieldName} is required.` };
  }
  return { valid: true, message: '' };
}

// ─── Built-in field validators map ───────────────────────────────────────────

const FIELD_VALIDATORS = {
  email: validateEmail,
  password: validatePassword,
  phone: validatePhone,
  name: validateName,
  firstName: (v) => validateName(v),
  lastName: (v) => validateName(v),
};

/**
 * Validate an entire form object.
 *
 * @param {Record<string, *>} fields  e.g. { email: 'foo@bar.com', password: 'Secret1' }
 * @param {Record<string, Function>} [customValidators]  Optional per-field overrides.
 * @returns {{ isValid: boolean, errors: Record<string, string> }}
 */
export function validateForm(fields, customValidators = {}) {
  const errors = {};

  for (const [fieldName, value] of Object.entries(fields)) {
    const validator =
      customValidators[fieldName] ?? FIELD_VALIDATORS[fieldName];

    if (validator) {
      const result = validator(value);
      if (!result.valid) {
        errors[fieldName] = result.message;
      }
    } else {
      // Generic required check for unknown fields
      const result = validateRequired(value, fieldName);
      if (!result.valid) {
        errors[fieldName] = result.message;
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
