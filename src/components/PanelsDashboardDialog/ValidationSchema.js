import * as yup from 'yup';

export const yupSchema = yup.object().shape({
  dayOfWeek: yup.string().required('Required').typeError('Required'),
  weekOfMonth: yup.number().max(5, "Week of Month must be less than or equal to 5").typeError('Numbers only'),
  time: yup.string().required('Required').typeError('Required'),
  facility: yup.object().shape({
    name:yup.string().required('Required').typeError('Required'),
  }),
  gender: yup.string().required('Required').typeError('Required'),
  membersAreNeeded: yup.boolean().nullable(),
  numberNeeded: yup.number().max(5, "# Needed must be less than or equal to 5").typeError('Numbers only')
  .when('membersAreNeeded', {
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
  boardChampion: yup.string().nullable(),
  panelCoordinator: yup.string().nullable(),
  panelLeader: yup.string().nullable(),
  panelMember1: yup.string().nullable(),
  panelMember2: yup.string().nullable(),
  panelMember3: yup.string().nullable(),
  panelMember4: yup.string().nullable(),
  panelMember5: yup.string().nullable(),
});