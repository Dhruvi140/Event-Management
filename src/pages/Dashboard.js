import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BsPlusCircle, BsBoxArrowRight, BsPencil, BsTrash } from 'react-icons/bs';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(saved);
    setFilteredEvents(saved);
  }, []);

  useEffect(() => {
    let filtered = [...events];

    if (searchTerm.trim()) {
      filtered = filtered.filter(
        event =>
          event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType) {
      filtered = filtered.filter(event => event.eventType === filterType);
    }

    setFilteredEvents(filtered);
  }, [searchTerm, filterType, events]);

  const handleDelete = (index) => {
    const updated = [...events];
    updated.splice(index, 1);
    setEvents(updated);
    localStorage.setItem('events', JSON.stringify(updated));
    setShowModal(false);

    const toast = document.getElementById('deleteToast');
    if (toast) {
      new window.bootstrap.Toast(toast).show();
    }
  };

  return (
    <div className="container-fluid px-3 px-md-5 py-4 min-vh-100">
      <h1 className="text-center text-primary fw-bold display-5 mb-4">🎉 Event Management</h1>

      <div className="card shadow-lg border-0 rounded-4 p-4 mx-auto" style={{ maxWidth: '1200px' }}>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
          <p className="text-muted">Search, filter, and manage your events seamlessly.</p>
          <div className="d-flex flex-column flex-sm-row gap-2 mt-3 mt-md-0">
            <button
              className="btn btn-sm btn-success d-flex align-items-center gap-1 px-3 py-2 rounded-pill shadow-sm"
              onClick={() => navigate('/add')}
            >
              <BsPlusCircle className="me-2" /> Add Event
            </button>
            <button
              className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1 px-3 py-2 rounded-pill shadow-sm"
              onClick={logout}
            >
              <BsBoxArrowRight className="me-2" /> Logout
            </button>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-lg-6 mb-2">
            <input
              type="text"
              className="form-control shadow-sm border-primary"
              placeholder="Search by event name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-lg-4 mb-2">
            <select
              className="form-select shadow-sm border-primary"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>
          <div className="col-lg-2 mb-2">
            <button
              className="btn btn-secondary w-100"
              onClick={() => {
                setSearchTerm('');
                setFilterType('');
              }}
            >
              Reset
            </button>
          </div>
        </div>

        <div className="table-responsive-lg overflow-auto">
          <table className="table table-striped table-hover table-bordered align-middle text-center" style={{ minWidth: '900px' }}>
            <thead className="table-primary">
              <tr>
                <th>Event Name</th>
                <th>Description</th>
                <th>Location</th>
                <th>Start</th>
                <th>End</th>
                <th>Organizer</th>
                <th>Type</th>
                <th>Max</th>
                <th>Tags</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event, index) => (
                  <tr key={index}>
                    <td>{event.name}</td>
                    <td>{event.description}</td>
                    <td>{event.location}</td>
                    <td>{event.startDateTime}</td>
                    <td>{event.endDateTime}</td>
                    <td>{event.organizer}</td>
                    <td>
                      <span className={`badge ${event.eventType === 'Online' ? 'bg-success' : 'bg-primary'}`}>
                        {event.eventType}
                      </span>
                    </td>
                    <td>{event.maxAttendees}</td>
                    <td>
                      {event.tags.map((tag, i) => (
                        <span key={i} className="badge bg-info rounded-pill me-1 px-2 py-1 small">
                          {tag}
                        </span>
                      ))}
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-3">
                        <button
                          className="btn btn-sm text-warning border-0 bg-transparent p-0"
                          title="Edit"
                          onClick={() => navigate(`/edit/${index}`)}
                        >
                          <BsPencil size={20} />
                        </button>
                        <button
                          className="btn btn-sm text-danger border-0 bg-transparent p-0"
                          title="Delete"
                          onClick={() => {
                            setSelectedIndex(index);
                            setShowModal(true);
                          }}
                        >
                          <BsTrash size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-muted text-center">
                    No events found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow rounded-4">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this event? This action cannot be undone.
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(selectedIndex)}>
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1055 }}>
        <div
          id="deleteToast"
          className="toast align-items-center text-bg-success border-0"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">✅ Event deleted successfully!</div>
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
  );
};

export default Dashboard;
