export const integerInputValidator = (value) =>
  Number.isInteger(Number(value)) && Number(value) >= 0;

export const minLengthValidator = (str, minChars = 3) => str.length >= minChars;

export const urlValidator = (value) => {
  const pattern = /^(ftp|http|https):\/\/[^ "]+$/;
  return pattern.test(value);
};
