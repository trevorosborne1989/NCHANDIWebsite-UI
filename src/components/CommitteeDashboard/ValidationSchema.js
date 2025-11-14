import * as yup from 'yup';

export const yupSchema = yup.object().shape({
  committeeMember: yup.object().shape({}).required('Required').typeError('Required'),
  commitment: yup.string().required('Required').typeError('Required'),
});