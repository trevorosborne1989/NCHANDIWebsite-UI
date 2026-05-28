import * as yup from 'yup';

export const yupSchema = yup.object().shape({
  forgotPassword: yup.boolean().nullable,
  email: yup.string()
    .when('forgotPassword', {
      is: true,
      then: schema => schema.test(
        'email validation',
        'Required',
        email => {
          if (!email) {
            return new yup.ValidationError(
              'Required',
              email,
              'email'
            );
          } else {
            return true;
          }
        }
      )
    }).nullable(),
});