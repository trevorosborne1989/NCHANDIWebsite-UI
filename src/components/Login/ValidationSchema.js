import * as yup from 'yup';

export const yupSchema = yup.object().shape({
  usernameParameter: yup.string().required('Required').typeError('Required'),
  passwordParameter: yup.string().required('Required').typeError('Required')
});