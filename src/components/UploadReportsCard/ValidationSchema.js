import * as yup from 'yup';

const FILE_SIZE = 102400; //100KB

const SUPPORTED_FORMATS = ['jpg', 'gif', 'png', 'jpeg', 'doc', 'pdf', 'txt'];

export const yupSchema = yup.object().shape({
  isFinancialReport: yup.boolean(),
  isMinutes: yup.boolean(),
  monthOfYear: yup.string().required('Required').typeError('Required'),
  file: yup.mixed().required('A file is required')
    .test('fileSize', "File Size is too large", value => value.size <= FILE_SIZE)
    .test('fileType', `Unsupported File Format. Accepted formats include: ${SUPPORTED_FORMATS}`, value => {
      if (value) {
        return SUPPORTED_FORMATS.includes(value.name.split('.').pop());
      }
    }),
}).test(
  'reportTypeTest',
  null,
  (obj) => {
    if ( obj.isFinancialReport || obj.isMinutes ) {
      return true;
    }
    return new yup.ValidationError(
      'Please check one checkbox',
      null,
      'checkboxValidation'
    );
  }
);