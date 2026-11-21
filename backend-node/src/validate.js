'use strict';
// Small, strict validators. They trim, strip control characters and enforce length limits.
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

class ValidationError extends Error {
  constructor(message) { super(message); this.status = 400; }
}

function text(value, label, { min = 1, max = 200, optional = false, multiline = false } = {}) {
  if (value === undefined || value === null || value === '') {
    if (optional) return '';
    throw new ValidationError(`${label} is required.`);
  }
  if (typeof value !== 'string') throw new ValidationError(`${label} must be text.`);
  let v = value.replace(CONTROL, '').trim();
  if (!multiline) v = v.replace(/\s+/g, ' ');
  if (v.length < min) throw new ValidationError(`${label} is too short.`);
  if (v.length > max) throw new ValidationError(`${label} must be ${max} characters or fewer.`);
  return v;
}

function integer(value, label, { min, max }) {
  const n = typeof value === 'string' && /^-?\d+$/.test(value) ? Number(value) : value;
  if (!Number.isInteger(n) || n < min || n > max) throw new ValidationError(`${label} must be a whole number from ${min} to ${max}.`);
  return n;
}

function oneOf(value, label, allowed) {
  if (!allowed.includes(value)) throw new ValidationError(`${label} is not valid.`);
  return value;
}

function phone(value) {
  const v = text(value, 'Phone', { min: 7, max: 20 });
  if (!/^\+?[0-9][0-9 \-]{6,18}$/.test(v)) throw new ValidationError('Phone number looks wrong.');
  return v;
}

function email(value) {
  const v = text(value, 'Email', { optional: true, max: 120 });
  if (v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) throw new ValidationError('Email looks wrong.');
  return v;
}

function isoDate(value, label = 'Date') {
  const v = text(value, label, { min: 10, max: 10 });
  if (!/^\d{4}-\d{2}-\d{2}$/.test(v) || Number.isNaN(Date.parse(`${v}T00:00:00Z`)) || new Date(`${v}T00:00:00Z`).toISOString().slice(0, 10) !== v) {
    throw new ValidationError(`${label} must be a real date (YYYY-MM-DD).`);
  }
  return v;
}

module.exports = { ValidationError, text, integer, oneOf, phone, email, isoDate };
