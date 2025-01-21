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
  alternateContact: yup.boolean().nullable(),
  alternateContactName: yup.string()
    .when('alternateContact', {
      is: true,
      then: schema => schema.test(
        'alternateContactName validation',
        'Required',
        alternateContactName => {
          if (!alternateContactName) {
            return new yup.ValidationError(
              'Required',
              alternateContactName,
              'alternateContactName'
            );
          } else {
            return true;
          }
        }
      )
    }).nullable(),
  alternateContactEmail: yup.string()
    .when('alternateContact', {
      is: true,
      then: schema => schema.test(
        'alternateContactEmail validation',
        'Required',
        alternateContactEmail => {
          if (!alternateContactEmail) {
            return new yup.ValidationError(
              'Required',
              alternateContactEmail,
              'alternateContactEmail'
            );
          } else {
            return true;
          }
        }
      )
    }).nullable(),
  alternateContactPhone: yup.string()
    .when('alternateContact', {
      is: true,
      then: schema => schema.test('number must be 11 digits', val => val?.length === 11)
    }).nullable(),
  active: yup.string().required('Required').typeError('Required'),
});