import * as yup from 'yup';

export const yupSchema = yup.object().shape({
  firstName: yup.string().required('Required').typeError('Required'),
  lastName: yup.string().required('Required').typeError('Required'),
  commitment: yup.string().required('Required').typeError('Required'),
  facility: yup.string().required('Required').typeError('Required'),
  email: yup.string().required('Required').typeError('Required'),
  phone: yup.string().required('Required').typeError('Required'),
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
    }).nullable(),
  stepsAndTraditions12x12: yup.boolean().nullable(),
  stepsAndTraditions12x12Qty: yup.number().typeError('Numbers only')
    .when('stepsAndTraditions12x12', {
      is: true,
      then: schema => schema.test(
        'stepsAndTraditions12x12Qty validation',
        'Required',
        stepsAndTraditions12x12Qty => {
          if (!stepsAndTraditions12x12Qty) {
            return new yup.ValidationError(
              'Required',
              stepsAndTraditions12x12Qty,
              'stepsAndTraditions12x12Qty'
            );
          } else {
            return true;
          }
        }
      )
    }).nullable(),
  aaPaperback: yup.boolean().nullable(),
  aaPaperbackQty: yup.number().typeError('Numbers only')
  .when('aaPaperback', {
    is: true,
    then: schema => schema.test(
      'aaPaperbackQty validation',
      'Required',
      aaPaperbackQty => {
        if (!aaPaperbackQty) {
          return new yup.ValidationError(
            'Required',
            aaPaperbackQty,
            'aaPaperbackQty'
          );
        } else {
          return true;
        }
      }
    )
  }).nullable(),
  dailyReflections: yup.boolean().nullable(),
  dailyReflectionsQty: yup.number().typeError('Numbers only')
  .when('dailyReflections', {
    is: true,
    then: schema => schema.test(
      'dailyReflectionsQty validation',
      'Required',
      dailyReflectionsQty => {
        if (!dailyReflectionsQty) {
          return new yup.ValidationError(
            'Required',
            dailyReflectionsQty,
            'dailyReflectionsQty'
          );
        } else {
          return true;
        }
      }
    )
  }).nullable(),
  bigBookPlainEnglish: yup.boolean().nullable(),
  bigBookPlainEnglishQty: yup.number().typeError('Numbers only')
  .when('bigBookPlainEnglish', {
    is: true,
    then: schema => schema.test(
      'bigBookPlainEnglishQty validation',
      'Required',
      bigBookPlainEnglishQty => {
        if (!bigBookPlainEnglishQty) {
          return new yup.ValidationError(
            'Required',
            bigBookPlainEnglishQty,
            'bigBookPlainEnglishQty'
          );
        } else {
          return true;
        }
      }
    )
  }).nullable(),
  newcomerPackets: yup.boolean().nullable(),
  newcomerPacketsQty: yup.number().typeError('Numbers only')
  .when('newcomerPackets', {
    is: true,
    then: schema => schema.test(
      'newcomerPacketsQty validation',
      'Required',
      newcomerPacketsQty => {
        if (!newcomerPacketsQty) {
          return new yup.ValidationError(
            'Required',
            newcomerPacketsQty,
            'newcomerPacketsQty'
          );
        } else {
          return true;
        }
      }
    )
  }).nullable(),
  bigBookSpanish: yup.boolean().nullable(),
  bigBookSpanishQty: yup.number().typeError('Numbers only')
  .when('bigBookSpanish', {
    is: true,
    then: schema => schema.test(
      'bigBookSpanishQty validation',
      'Required',
      bigBookSpanishQty => {
        if (!bigBookSpanishQty) {
          return new yup.ValidationError(
            'Required',
            bigBookSpanishQty,
            'bigBookSpanishQty'
          );
        } else {
          return true;
        }
      }
    )
  }).nullable(),
  stepsAndTraditions12x12Spanish: yup.boolean().nullable(),
  stepsAndTraditions12x12SpanishQty: yup.number().typeError('Numbers only')
  .when('stepsAndTraditions12x12Spanish', {
    is: true,
    then: schema => schema.test(
      'stepsAndTraditions12x12SpanishQty validation',
      'Required',
      stepsAndTraditions12x12SpanishQty => {
        if (!stepsAndTraditions12x12SpanishQty) {
          return new yup.ValidationError(
            'Required',
            stepsAndTraditions12x12SpanishQty,
            'stepsAndTraditions12x12SpanishQty'
          );
        } else {
          return true;
        }
      }
    )
  }).nullable(),
  other: yup.boolean().nullable(),
  otherQty: yup.number().typeError('Numbers only')
  .when('other', {
    is: true,
    then: schema => schema.test(
      'otherQty validation',
      'Required',
      otherQty => {
        if (!otherQty) {
          return new yup.ValidationError(
            'Required',
            otherQty,
            'otherQty'
          );
        } else {
          return true;
        }
      }
    )
  }).nullable()
});
