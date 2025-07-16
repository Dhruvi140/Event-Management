
import * as Yup from 'yup';


const eventValidationSchema = Yup.object({
  name: Yup.string()
    
    .matches(
      /^[A-Za-z][A-Za-z0-9 ]*$/,
      'Event name must start with a letter and can only contain letters, numbers, and spaces'
    )
    .required('Event name is required'),

  description: Yup.string()
    .required('Description is required'),

  location: Yup.string()
    
    .matches(/^[A-Za-z ]+$/, 'Location must contain only letters and spaces')
    .required('Location is required'),

  startDateTime: Yup.string()
    .required('Start date and time is required'),

  endDateTime: Yup.string()
    .required('End date and time is required'),

  organizer: Yup.string()
   
    .matches(/^[A-Za-z ]+$/, 'Organizer name must contain only letters and spaces')
    .required('Organizer name is required'),

  eventType: Yup.string()
    .required('Event type is required'),

  maxAttendees: Yup.number()
    .typeError('Max attendees must be a number')
    .required('Maximum number of attendees is required'),

  tags: Yup.string()
    
    .matches(/^[A-Za-z ,]+$/, 'Tags must contain only letters and commas')
    .required('At least one tag is required'),
});

export default eventValidationSchema;
