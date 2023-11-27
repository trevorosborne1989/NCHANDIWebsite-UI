import * as yup from 'yup';

const FILE_SIZE = 102400; //100KB

const SUPPORTED_FORMATS = ['jpg', 'gif', 'png', 'jpeg', 'doc', 'pdf'];

export const yupSchema = yup.object().shape({
  resourceTitle: yup.string().required('Required').typeError('Required'),
  file: yup.mixed().required(``).test('fileSize', "File Size is too large", value => value.size <= FILE_SIZE).test('fileType', "Unsupported File Format", value => SUPPORTED_FORMATS.includes(value.type) )
});