import * as yup from 'yup';

const FILE_SIZE = 102400; //100KB

const SUPPORTED_FORMATS = ['jpg', 'gif', 'png', 'jpeg', 'doc', 'pdf', 'txt'];

export const yupSchema = yup.object().shape({
  resourceTitle: yup.string().required('Required').typeError('Required'),
  file: yup.mixed().required('A file is required.')
    .test('fileSize', "File Size is too large", value => value.size <= FILE_SIZE)
    .test('fileType', `Unsupported File Format. Accepted formats include: ${SUPPORTED_FORMATS}`, value => {
      if (value) {
        return SUPPORTED_FORMATS.includes(value.name.split('.').pop());
      }
    }),
    livingSober: yup.boolean().nullable(),
    livingSoberQty: yup.number().typeError('Numbers only')
    .when('livingSober', {
      is: true,
      then: schema => schema.test(
        'livingSoberQty validation',
        'Required',
        livingSoberQty => {
          if (!livingSoberQty) {
            return new yup.ValidationError(
              'Required',
              livingSoberQty,
              'livingSoberQty'
            );
          } else {
            return true;
          }
        }
      )
    }).nullable()
});