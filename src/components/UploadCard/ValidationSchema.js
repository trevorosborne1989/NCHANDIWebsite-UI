import * as yup from 'yup';

const FILE_SIZE = 1000; //1MB

const SUPPORTED_FORMATS = ['jpg', 'gif', 'png', 'jpeg', 'txt', 'pdf'];

export const yupSchema = yup.object().shape({
  file: yup.mixed().required('A file is required')
    .test('fileSize', "File size cannot exceed 1MB and must be a pdf, txt, jpg, gif, png, or jpeg", value => value?.size <= FILE_SIZE)
    .test('fileType', `Unsupported File Format. Accepted formats include: ${SUPPORTED_FORMATS}`, value => {
      if (value) {
        return SUPPORTED_FORMATS.includes(value.name.split('.').pop());
      }
    })
});