import * as yup from 'yup';

// const FILE_SIZE = 1024000; //1MB

// const SUPPORTED_FORMATS = ['jpg', 'gif', 'png', 'jpeg', 'txt', 'pdf'];

export const yupSchema = yup.object().shape({
  monthOfYear: yup.string().required('Required').typeError('Required')
    // .test('fileSize', "File size cannot exceed 1MB and must be a pdf, txt, jpg, gif, png, or jpeg", value => value?.size <= FILE_SIZE)
    // .test('fileType', `Unsupported File Format. Accepted formats include: ${SUPPORTED_FORMATS}`, value => {
    //   if (value) {
    //     return SUPPORTED_FORMATS.includes(value.name.split('.').pop());
    //   }
    // }),
}).test(
  'reportTypeTest',
  null,
  (obj) => {
    if ( obj.isFinancial || obj.isMinutes ) {
      return true;
    }
    return new yup.ValidationError(
      'Please check one checkbox',
      null,
      'checkboxValidation'
    );
  }
);