export const integerInputValidator = (value) =>
  Number.isInteger(Number(value)) && Number(value) >= 0;

export const minLengthValidator = (str, minChars = 3) => str.length >= minChars;
export const maxLengthValidator = (str, maxChars = 20) =>
  str.length <= maxChars;
export const fullNameValidator = (fullName) => {
  const minLength = 2;
  const maxLength = 50;
  const allowedCharacters = /^[A-Za-z\s\-']+$/;

  if (fullName.length < minLength || fullName.length > maxLength) {
    return false;
  }

  if (!allowedCharacters.test(fullName)) {
    return false;
  }

  const names = fullName.split(' ');
  if (names.length < 2) {
    return false;
  }

  return true;
};

export const urlValidator = (value) => {
  const pattern = /^(https?:\/\/)?[a-zA-Z0-9-.]+\.[a-zA-Z]{2,}(\/\S*)?$/;
  return pattern.test(value);
};

export const emailValidator = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

export const passwordValidator = (password) => {
  const minLength = 6;
  const maxLength = 20;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);

  if (password.length < minLength || password.length > maxLength) {
    return false;
  }

  if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
    return false;
  }

  return true;
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
