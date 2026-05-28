import * as yup from 'yup';

export const yupSchema = yup.object().shape({
  forgotPassword: yup.boolean().nullable(),
  usernameParameter: yup.string()
    .when('forgotPassword', {
      is: false,
      then: schema => schema.test(
        'usernameParameter validation',
        'Required',
        usernameParameter => {
          if (!usernameParameter) {
            return new yup.ValidationError(
              'Required',
              usernameParameter,
              'usernameParameter'
            );
          } else {
            return true;
          }
        }
      )
    }).nullable(),
    passwordParameter: yup.string()
    .when('forgotPassword', {
      is: false,
      then: schema => schema.test(
        'passwordParameter validation',
        'Required',
        passwordParameter => {
          if (!passwordParameter) {
            return new yup.ValidationError(
              'Required',
              passwordParameter,
              'passwordParameter'
            );
          } else {
            return true;
          }
        }
      )
    }).nullable(),
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