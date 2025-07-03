import * as yup from 'yup';

const SUPPORTED_FORMATS = ['image/jpeg'];

export const patientFormSchema = yup.object().shape({
  fullName: yup
    .string()
    .matches(/^[a-zA-Z\s]*$/, 'Full name can only contain letters and spaces.')
    .required('Full name is required.'),
  email: yup
    .string()
    .email('Must be a valid email.')
    .matches(/@gmail\.com$/, 'Email address must be a @gmail.com address.')
    .required('Email is required.'),
  phoneCountryCode: yup
    .string()
    .matches(/^\+[0-9]+$/, 'Must be a valid country code (e.g., +504).')
    .required('Country code is required.'),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, 'Phone number must only contain digits.')
    .required('Phone number is required.'),
  documentPhoto: yup
    .mixed<File>()
    .required('A document photo is required.')
    .test(
      'fileFormat',
      'Only .jpg images are accepted.',
      (value) => !!value && SUPPORTED_FORMATS.includes(value.type)
    ),
});
