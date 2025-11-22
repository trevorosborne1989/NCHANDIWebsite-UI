import * as yup from 'yup';

export const yupSchema = yup.object().shape({
  dayOfWeek: yup.string().required('Required').typeError('Required'),
  weekOfMonth: yup.number().max(5, "Week of Month must be less than or equal to 5").typeError('Numbers only'),
  eventTime: yup.string().required('Required').typeError('Required'),
  facility: yup.object().shape({}).required('Required').typeError('Required'),
  gender: yup.string().required('Required').typeError('Required'),
  markAsMembersNeeded: yup.boolean().nullable(),
  numberNeeded: yup.number().max(5,  "# Needed must be less than or equal to 5").typeError('Numbers only')
  .when('markAsMembersNeeded', {
    is: true,
    then: schema => schema.test(
      'numberNeeded validation',
      'Required',
      numberNeeded => {
        if (!numberNeeded) {
          return new yup.ValidationError(
            'Required',
            numberNeeded,
            'numberNeeded'
          );
        } else {
          return true;
        }
      }
    )
  }).nullable(),
  boardChampion: yup.object().shape({}).nullable(),
  panelCoordinator: yup.object().shape({}).nullable(),
  panelLeader: yup.object().shape({}).nullable(),
  panelMember1: yup.object().shape({}).nullable(),
  panelMember2: yup.object().shape({}).nullable(),
  panelMember3: yup.object().shape({}).nullable(),
  panelMember4: yup.object().shape({}).nullable(),
  panelMember5: yup.object().shape({}).nullable()
});