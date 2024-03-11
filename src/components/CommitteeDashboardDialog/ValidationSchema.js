import * as yup from 'yup';

export const yupSchema = yup.object().shape({
  firstName: yup.string().required('Required').typeError('Required'),
  lastName: yup.string().required('Required').typeError('Required'),
  email: yup.string().required('Required').typeError('Required'),
  phone: yup.string().required('Required').typeError('Required'),
  preferredContactMethod: yup.string().required('Required').typeError('Required'),
});
