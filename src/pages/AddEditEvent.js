import React from 'react';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import eventValidationSchema from '../utils/validationSchema';

const AddEditEvent = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const savedEvents = JSON.parse(localStorage.getItem('events')) || [];
  const existing = id ? savedEvents[parseInt(id)] : null;

  const formik = useFormik({
    initialValues: {
      name: existing?.name || '',
      description: existing?.description || '',
      location: existing?.location || '',
      startDateTime: existing?.startDateTime || '',
      endDateTime: existing?.endDateTime || '',
      organizer: existing?.organizer || '',
      eventType: existing?.eventType || 'Online',
      maxAttendees: existing?.maxAttendees || '',
      tags: existing?.tags?.join(', ') || '',
    },
    validationSchema: eventValidationSchema,
    onSubmit: (values) => {
      const updated = [...savedEvents];
      const newEntry = {
        ...values,
        tags: values.tags.split(',').map(tag => tag.trim()),
      };

      if (id) {
        updated[parseInt(id)] = newEntry;
      } else {
        updated.push(newEntry);
      }

      localStorage.setItem('events', JSON.stringify(updated));

      const toast = document.getElementById('eventToast');
      if (toast) {
        new window.bootstrap.Toast(toast).show();
      }

      setTimeout(() => navigate('/'), 1500);
    },
  });

  return (
    <div className="container py-1">
      <div className="card shadow-sm border-0 p-2 rounded-4 w-100 mx-auto" style={{ maxWidth: '750px' }}>
        <h4 className="text-center text-primary fw-semibold mb-3">
          {id ? '✏️ Edit Event' : '📅 Add New Event'}
        </h4>

        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            {[
              { label: 'Event Name', name: 'name', type: 'text' },
              { label: 'Location', name: 'location', type: 'text' },
              { label: 'Start Date & Time', name: 'startDateTime', type: 'datetime-local' },
              { label: 'End Date & Time', name: 'endDateTime', type: 'datetime-local' },
              { label: 'Organizer', name: 'organizer', type: 'text' },
              { label: 'Max Attendees', name: 'maxAttendees', type: 'number' },
              { label: 'Tags (comma separated)', name: 'tags', type: 'text' },
            ].map((field, idx) => (
              <div className="col-md-6 mb-1" key={idx}>
                <label className="form-label small fw-semibold">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  className={`form-control form-control-sm shadow-sm p-1 ${
                    formik.touched[field.name] && formik.errors[field.name] ? 'is-invalid' : ''
                  }`}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                />
                <div className="invalid-feedback small">{formik.errors[field.name]}</div>
              </div>
            ))}

            <div className="col-12 mb-1">
              <label className="form-label small fw-semibold">Description</label>
              <textarea
                name="description"
                rows="2"
                className={`form-control form-control-sm shadow-sm ${
                  formik.touched.description && formik.errors.description ? 'is-invalid' : ''
                }`}
                value={formik.values.description}
                onChange={formik.handleChange}
              ></textarea>
              <div className="invalid-feedback small">{formik.errors.description}</div>
            </div>

            <div className="col-12 mb-2">
              <label className="form-label small fw-semibold">Event Type</label>
              <select
                name="eventType"
                className={`form-select form-select-sm shadow-sm p-1 ${
                  formik.touched.eventType && formik.errors.eventType ? 'is-invalid' : ''
                }`}
                value={formik.values.eventType}
                onChange={formik.handleChange}
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
              <div className="invalid-feedback small">{formik.errors.eventType}</div>
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button type="submit" className="btn btn-success btn-sm rounded-pill px-4 shadow-sm">Save</button>
            <button type="button" className="btn btn-secondary btn-sm rounded-pill px-4 shadow-sm" onClick={() => navigate('/')}>
              Cancel
            </button>
          </div>
        </form>

        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1055 }}>
          <div
            id="eventToast"
            className="toast align-items-center text-bg-success border-0"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            data-bs-delay="2000"
          >
            <div className="d-flex">
              <div className="toast-body">
                ✅ Event {id ? 'updated' : 'added'} successfully!
              </div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditEvent;
