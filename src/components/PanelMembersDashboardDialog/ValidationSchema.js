import * as yup from 'yup';

export const yupSchema = yup.object().shape({
  firstName: yup.string().required('Required').typeError('Required'),
  lastName: yup.string().required('Required').typeError('Required'),
  email: yup.string().required('Required').typeError('Required'),
  phone: yup.string().required('Required').typeError('Required').test('number must be 11 digits', val => val.length === 11),
  contactMethod: yup.string().required('Required').typeError('Required'),
});