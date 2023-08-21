import * as yup from 'yup';

export const yupSchema = yup.object().shape({
  firstName: yup.string().required('Required').typeError('Required'),
  lastName: yup.string().required('Required').typeError('Required'),
  contactMethod: yup.string().required('Required').typeError('Required'),
  email: yup.string().required('Required').typeError('Required'),
  phoneNumber: yup.string().required('Required').typeError('Required'),
});
