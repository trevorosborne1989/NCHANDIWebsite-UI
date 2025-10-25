import * as yup from 'yup';

export const yupSchema = yup.object().shape({
  name: yup.string().required('Required').typeError('Required'),
  body: yup.string().nullable(),
  addUrl: yup.boolean().nullable(),
  urlTitle: yup.string()
  .when('addUrl', {
    is: true,
    then: schema => schema.test(
      'urlTitle validation',
      'Required',
      urlTitle => {
        if (!urlTitle) {
          return new yup.ValidationError(
            'Required',
            urlTitle,
            'urlTitle'
          );
        } else {
          return true;
        }
      }
    )
  }).nullable(),
  url: yup.string()
  .when('addUrl', {
    is: true,
    then: schema => schema.test(
      'url validation',
      'Required',
      url => {
        if (!url) {
          return new yup.ValidationError(
            'Required',
            url,
            'url'
          );
        } else {
          return true;
        }
      }
    )
  }).nullable(),
});