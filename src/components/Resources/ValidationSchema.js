import * as yup from 'yup';

export const yupSchema = yup.object().shape({
  firstName: yup.string().required('Required').typeError('Required'),
  commitments: yup.string().required('Required').typeError('Required'),
  facility: yup.string().required('Required').typeError('Required'),
  email: yup.string().required('Required').typeError('Required'),
  phonenumber: yup.string().required('Required').typeError('Required'),
  livingSober: yup.boolean().nullable(),
  livingSoberQty: yup.number().typeError('Required')
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
  stepsAndTraditions12x12Qty: yup.number().typeError('Required')
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
  aaPaperbackQty: yup.number().typeError('Required')
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
  aaPocketSize: yup.boolean().nullable(),
  aaPocketSizeQty: yup.number().typeError('Required')
  .when('aaPocketSize', {
    is: true,
    then: schema => schema.test(
      'aaPocketSizeQty validation',
      'Required',
      aaPocketSizeQty => {
        if (!aaPocketSizeQty) {
          return new yup.ValidationError(
            'Required',
            aaPocketSizeQty,
            'aaPocketSizeQty'
          );
        } else {
          return true;
        }
      }
    )
  }).nullable(),
  grapevine: yup.boolean().nullable(),
  grapevineQty: yup.number().typeError('Required')
  .when('grapevine', {
    is: true,
    then: schema => schema.test(
      'grapevineQty validation',
      'Required',
      grapevineQty => {
        if (!grapevineQty) {
          return new yup.ValidationError(
            'Required',
            grapevineQty,
            'grapevineQty'
          );
        } else {
          return true;
        }
      }
    )
  }).nullable(),
  laVina: yup.boolean().nullable(),
  laVinaQty: yup.number().typeError('Required')
  .when('laVina', {
    is: true,
    then: schema => schema.test(
      'laVinaQty validation',
      'Required',
      laVinaQty => {
        if (!laVinaQty) {
          return new yup.ValidationError(
            'Required',
            laVinaQty,
            'laVinaQty'
          );
        } else {
          return true;
        }
      }
    )
  }).nullable(),
  newcomerPackets: yup.boolean().nullable(),
  newcomerPacketsQty: yup.number().typeError('Required')
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
  literatureRackWithPamphlets: yup.boolean().nullable(),
  literatureRackWithPamphletsQty: yup.number().typeError('Required')
  .when('literatureRackWithPamphlets', {
    is: true,
    then: schema => schema.test(
      'literatureRackWithPamphletsQty validation',
      'Required',
      literatureRackWithPamphletsQty => {
        if (!literatureRackWithPamphletsQty) {
          return new yup.ValidationError(
            'Required',
            literatureRackWithPamphletsQty,
            'literatureRackWithPamphletsQty'
          );
        } else {
          return true;
        }
      }
    )
  }).nullable(),
  other: yup.boolean().nullable(),
  otherQty: yup.number().typeError('Required')
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
  }).nullable(),
});
