const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (email) => typeof email === "string" && EMAIL_REGEX.test(email);
