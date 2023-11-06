import * as yup from 'yup';

export const yupSchema = yup.object().shape({
  resourceTitle: yup.string().required('Required').typeError('Required'),
});