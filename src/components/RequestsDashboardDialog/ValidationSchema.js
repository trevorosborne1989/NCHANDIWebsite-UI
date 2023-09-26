import * as yup from 'yup';

export const yupSchema = yup.object().shape({
  facilityName: yup.string().required('Required').typeError('Required'),
  facilityType: yup.string().required('Required').typeError('Required'),
  address: yup.string().required('Required').typeError('Required'),
  city: yup.string().required('Required').typeError('Required'),
  state: yup.string().required('Required').typeError('Required'),
  website: yup.string().required('Required').typeError('Required'),
  primaryContactName: yup.string().required('Required').typeError('Required'),
  primaryContactEmail: yup.string().required('Required').typeError('Required'),
  primaryPhoneNumber: yup.string().required('Required').typeError('Required'),
  altContactName: yup.string().required('Required').typeError('Required'),
  altContactEmail: yup.string().required('Required').typeError('Required'),
  altPhoneNumber: yup.string().required('Required').typeError('Required'),
  active: yup.string().required('Required').typeError('Required'),
});
