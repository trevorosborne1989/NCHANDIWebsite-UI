import * as yup from 'yup';

export const yupSchema = yup.object().shape({
  rsmNumber: yup.string()
  .when('requestStatus', {
    is: 'APPROVED',
    then: schema => schema.test(
      'rsmNumber validation',
      'Required',
      rsmNumber => {
        if (!rsmNumber) {
          return new yup.ValidationError(
            'Required',
            rsmNumber,
            'rsmNumber'
          );
        } else {
          return true;
        }
      }
    )
  }).nullable(),
  dueDate: yup.date().required('Required').typeError('Required'),
  description: yup.string().required('Required').typeError('Required'),
  certifiedMail: yup.boolean(),
  approvers: yup.array().min(1, 'Must include at least one approver'),
  subject: yup.string()
    .when('requestStatus', {
      is: 'APPROVED',
      then: schema => schema.test(
        'subject validation',
        'Required',
        subject => {
          if (!subject) {
            return new yup.ValidationError(
              'Required',
              subject,
              'subject'
            );
          } else {
            return true;
          }
        }
      )
    }).nullable(),
  mailTrackingNumber: yup.string()
    .max(5)
    .when(['requestStatus', 'certifiedMail'], {
      is: (requestStatus, certifiedMail) => (requestStatus === 'APPROVED') && certifiedMail,
      then: schema => schema.test(
        'mailTrackingNumber validation',
        'Required',
        mailTrackingNumber => {
          if (!mailTrackingNumber) {
            return new yup.ValidationError(
              'Required',
              mailTrackingNumber,
              'mailTrackingNumber'
            );
          } else {
            return true;
          }
        }
      )
    }).nullable(),
  requestStatus: yup.string().nullable(),
  documentNumber: yup.string()
    .when(['requestStatus', 'rtmSubmit'], {
      is: (requestStatus, rtmSubmit) => (requestStatus === 'APPROVED') && rtmSubmit,
      then: schema => schema.test(
        'documentNumber validation',
        'Required',
        documentNumber => {
          if (!documentNumber) {
            return new yup.ValidationError(
              'Required',
              documentNumber,
              'documentNumber'
            );
          } else {
            return true;
          }
        }
      )
    }).nullable(),
  revisionNumber: yup.string()
    .max(5)
    .when(['requestStatus', 'rtmSubmit'], {
      is: (requestStatus, rtmSubmit) => (requestStatus === 'APPROVED') && rtmSubmit,
      then: schema => schema.test(
        'revisionNumber validation',
        'Required',
        revisionNumber => {
          if (!revisionNumber) {
            return new yup.ValidationError(
              'Required',
              revisionNumber,
              'revisionNumber'
            );
          } else {
            return true;
          }
        }
      )
    }).nullable(),
  attachments: yup.array()
    .when('requestStatus', {
      is: 'APPROVED',
      then: schema => schema.test(
        'final attachment validation',
        'Final Attachment is Required.',
        attachments => {
          const finalAttachments = attachments?.filter(attachment => attachment.attachmentType === 'FINAL');
          if (finalAttachments.length > 1) {
            return new yup.ValidationError(
              'There can be only one Final Attachment.',
              attachments,
              'attachments'
            );
          } else if (finalAttachments.length < 1) {
            return new yup.ValidationError(
              'You must include one Final Attachment.',
              attachments,
              'attachments'
            );
          } else {
            return true;
          }
        }
      ),
      otherwise: schema => schema.test(
        'attachment validation',
        'Attachment is Required.',
        attachments => {
          if (attachments.length < 1) {
            return new yup.ValidationError(
              'You must include at least one Attachment.',
              attachments,
              'attachments'
            );
          } else {
            return true;
          }
        }
      )
    })
});
