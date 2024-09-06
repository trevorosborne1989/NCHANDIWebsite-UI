import * as yup from 'yup';

export const yupSchema = yup.object().shape({
  name: yup.string().required('Required').typeError('Required'),
  type: yup.string().required('Required').typeError('Required'),
  address: yup.string().required('Required').typeError('Required'),
  city: yup.string().required('Required').typeError('Required'),
  state: yup.string().required('Required').typeError('Required'),
  website: yup.string().required('Required').typeError('Required'),
  primaryContactName: yup.string().required('Required').typeError('Required'),
  primaryContactEmail: yup.string().required('Required').typeError('Required'),
  primaryContactPhone: yup.string().required('Required').typeError('Required').test('number must be 11 digits', val => val.length === 11),
  alternateContactName: yup.string().required('Required').typeError('Required'),
  alternateContactEmail: yup.string().required('Required').typeError('Required'),
  alternateContactPhone: yup.string().required('Required').typeError('Required').test('number must be 11 digits', val => val.length === 11),
  active: yup.string().required('Required').typeError('Required'),
});