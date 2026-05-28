import * as yup from 'yup';

export const yupSchema = yup.object().shape({
  NewPasswordParameter: yup.string().required('Required').typeError('Required'),
  ConfirmNewPasswordParameter: yup.string()
    .oneOf([yup.ref('NewPasswordParameter'), null], 'New passwords must match')
    .required('Required').typeError('Required')
});