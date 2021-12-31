import * as Yup from 'yup';

export const RegisterValidate = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email must be required'),
  name: Yup.string().required('Username must be required'),
  password: Yup.string().required('Password must be required'),
  passwordConfirmation: Yup.string()
  .oneOf([Yup.ref('password'), null], 'Passwords must match')
});