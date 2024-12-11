export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const phoneRegex = /^\+?[1-9]\d{1,14}$/;

export const validators = {
  required: (value: any) => !!value || 'This field is required',
  email: (value: string) => emailRegex.test(value) || 'Invalid email format',
  phone: (value: string) => phoneRegex.test(value) || 'Invalid phone number format',
  minLength: (min: number) => (value: string) =>
    value.length >= min || `Must be at least ${min} characters`,
};

export default validators;