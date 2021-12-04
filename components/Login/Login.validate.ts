import * as Yup from 'yup';

export const LoginValidate = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Password must be required'),
});