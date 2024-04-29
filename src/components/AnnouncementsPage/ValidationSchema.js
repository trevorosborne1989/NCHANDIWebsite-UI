import * as yup from 'yup';

export const yupSchema = yup.object().shape({
  name: yup.string().required('Required').typeError('Required'),
  body: yup.string().required('Required').typeError('Required'),
});