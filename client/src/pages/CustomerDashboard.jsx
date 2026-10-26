import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import * as bookingService from '../services/bookingService';
import LoadingSpinner from '../components/common/LoadingSpinner';
import AlertMessage from '../components/common/AlertMessage';

const CustomerDashboard = () => {
  const { user, updateUser } = useAuth();

  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  const [feedback, setFeedback] = useState({ variant: '', message: '' });

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await bookingService.getMyBookings();
      if (res.success) {
        setBookings(res.bookings || []);
      }
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
      setFeedback({
        variant: 'danger',
        message: err.response?.data?.message || 'Could not load your reservations',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you wish to cancel this reservation? This cannot be undone.')) {
      return;
    }

    try {
      setActionLoading(true);
      const res = await bookingService.cancelBooking(bookingId);
      if (res.success) {
        setFeedback({
          variant: 'success',
          message: 'Your reservation was successfully cancelled and the suite released.',
        });
        setBookings((prev) =>
          prev.map((b) => (b._id === bookingId ? res.booking : b))
        );
      }
    } catch (err) {
      console.error('Cancellation failed:', err);
      setFeedback({
        variant: 'danger',
        message: err.response?.data?.message || 'Unable to cancel this reservation.',
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ variant: '', message: '' });

    if (profileForm.newPassword) {
      if (profileForm.newPassword !== profileForm.confirmPassword) {
        setFeedback({
          variant: 'danger',
          message: 'New password and confirmation do not match',
        });
        return;
      }
      if (!profileForm.currentPassword) {
        setFeedback({
          variant: 'danger',
          message: 'Please provide your current password to set a new password',
        });
        return;
      }
    }

    try {
      setActionLoading(true);
      const payload = {
        name: profileForm.name,
        phone: profileForm.phone,
      };
      if (profileForm.newPassword) {
        payload.currentPassword = profileForm.currentPassword;
        payload.newPassword = profileForm.newPassword;
      }

      const res = await updateUser(payload);
      if (res.success) {
        setFeedback({
          variant: 'success',
          message: 'Profile information updated successfully!',
        });
        setProfileForm({
          ...profileForm,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      }
    } catch (err) {
      console.error('Profile update failed:', err);
      setFeedback({
        variant: 'danger',
        message: err.response?.data?.message || 'Failed to update profile.',
      });
    } finally {
      setActionLoading(false);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (statusFilter === 'All') return true;
    return b.bookingStatus === statusFilter;
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isEligibleForCancellation = (booking) => {
    if (booking.bookingStatus === 'Cancelled') return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(booking.checkIn) >= today;
  };

  return (
    <div className="py-5">
      <div className="container">
        {/* Dashboard Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
          <div>
            <span className="badge badge-gold mb-1">🙏 Namaste &bull; Guest Portal</span>
            <h1 className="display-6 fw-bold font-serif mb-0">
              Welcome, {user?.name}
            </h1>
            <p className="text-muted small mb-0 mt-1">
              Manage your HotelPro royal reservations and guest profile.
            </p>
          </div>
          <Link to="/rooms" className="btn btn-navy shadow-sm">
            <i className="bi bi-plus-lg me-1"></i> Book Another Suite
          </Link>
        </div>

        {/* Global Alert */}
        {feedback.message && (
          <AlertMessage
            variant={feedback.variant}
            message={feedback.message}
            onClose={() => setFeedback({ variant: '', message: '' })}
          />
        )}

        {/* Navigation Tabs */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4 bg-white border">
          <div className="card-header bg-white border-bottom p-0">
            <ul className="nav nav-tabs border-0 px-3 pt-2">
              <li className="nav-item">
                <button
                  className={`nav-link border-0 py-3 px-4 fw-semibold ${
                    activeTab === 'bookings'
                      ? 'active text-primary border-bottom border-primary border-3'
                      : 'text-muted'
                  }`}
                  onClick={() => setActiveTab('bookings')}
                >
                  <i className="bi bi-calendar-check me-2"></i> My Reservations ({bookings.length})
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link border-0 py-3 px-4 fw-semibold ${
                    activeTab === 'profile'
                      ? 'active text-primary border-bottom border-primary border-3'
                      : 'text-muted'
                  }`}
                  onClick={() => setActiveTab('profile')}
                >
                  <i className="bi bi-person-gear me-2"></i> Profile & Security
                </button>
              </li>
            </ul>
          </div>

          <div className="card-body p-4">
            {/* BOOKINGS TAB */}
            {activeTab === 'bookings' && (
              <div>
                {/* Filter Sub-bar */}
                <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
                  <div className="btn-group btn-group-sm" role="group">
                    {['All', 'Confirmed', 'Pending', 'Cancelled'].map((status) => (
                      <button
                        key={status}
                        type="button"
                        className={`btn ${
                          statusFilter === status ? 'btn-navy' : 'btn-outline-secondary'
                        }`}
                        onClick={() => setStatusFilter(status)}
                      >
                        {status}
                      </button>
                    ))}
                  </div>

                  <span className="text-muted small">
                    Showing <strong>{filteredBookings.length}</strong> reservation{filteredBookings.length === 1 ? '' : 's'}
                  </span>
                </div>

                {loading ? (
                  <LoadingSpinner text="Retrieving your reservation history..." />
                ) : filteredBookings.length === 0 ? (
                  <div className="text-center py-5 border rounded-4 bg-light p-4">
                    <i className="bi bi-calendar-x fs-1 text-muted mb-3 d-block"></i>
                    <h5 className="fw-bold font-serif mb-2">No Reservations Found</h5>
                    <p className="text-muted small mb-3">
                      {statusFilter === 'All'
                        ? "You haven't reserved any royal suites yet."
                        : `No ${statusFilter.toLowerCase()} reservations to display.`}
                    </p>
                    <Link to="/rooms" className="btn btn-gold btn-sm px-3 py-2">
                      Explore Royal Suites
                    </Link>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover hotel-table align-middle">
                      <thead>
                        <tr>
                          <th>Suite / Palace</th>
                          <th>Stay Dates</th>
                          <th>Guests</th>
                          <th>Total Tariff</th>
                          <th>Status</th>
                          <th>Payment</th>
                          <th className="text-end">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBookings.map((b) => {
                          const room = b.room || {};
                          return (
                            <tr key={b._id}>
                              <td>
                                <div className="d-flex align-items-center gap-3">
                                  <img
                                    src={
                                      room.images?.[0] ||
                                      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
                                    }
                                    alt={room.title}
                                    className="rounded-3 object-fit-cover shadow-sm"
                                    style={{ width: '60px', height: '48px' }}
                                  />
                                  <div>
                                    <div className="fw-bold text-dark">{room.title || 'Royal Suite'}</div>
                                    <small className="text-muted">
                                      Suite #{room.roomNumber} &bull; {room.type}
                                    </small>
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className="small fw-semibold text-dark">
                                  {formatDate(b.checkIn)} &rarr; {formatDate(b.checkOut)}
                                </div>
                                <small className="text-muted">{b.nights} Night(s)</small>
                              </td>
                              <td className="small">{b.guests} Guest(s)</td>
                              <td>
                                <span className="fw-bold text-navy font-serif fs-6">
                                  ₹{Number(b.totalPrice || 0).toLocaleString('en-IN')}
                                </span>
                              </td>
                              <td>
                                <span
                                  className={`badge ${
                                    b.bookingStatus === 'Confirmed'
                                      ? 'bg-success'
                                      : b.bookingStatus === 'Cancelled'
                                      ? 'bg-danger'
                                      : 'bg-warning text-dark'
                                  }`}
                                >
                                  {b.bookingStatus}
                                </span>
                              </td>
                              <td>
                                <span
                                  className={`badge ${
                                    b.paymentStatus === 'Paid'
                                      ? 'bg-success'
                                      : b.paymentStatus === 'Refunded'
                                      ? 'bg-secondary'
                                      : 'bg-light text-dark border'
                                  }`}
                                >
                                  {b.paymentStatus}
                                </span>
                              </td>
                              <td className="text-end">
                                <div className="d-flex justify-content-end gap-2">
                                  <Link
                                    to={`/booking/confirmation/${b._id}`}
                                    className="btn btn-sm btn-outline-primary"
                                    title="View Voucher"
                                  >
                                    <i className="bi bi-receipt"></i>
                                  </Link>
                                  {isEligibleForCancellation(b) && (
                                    <button
                                      disabled={actionLoading}
                                      onClick={() => handleCancelBooking(b._id)}
                                      className="btn btn-sm btn-outline-danger"
                                      title="Cancel Reservation"
                                    >
                                      <i className="bi bi-x-circle"></i> Cancel
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <form onSubmit={handleProfileSubmit}>
                    <h5 className="fw-bold font-serif mb-3">Guest Profile Details</h5>

                    <div className="row g-3 mb-4">
                      <div className="col-md-6">
                        <label className="form-label small fw-semibold text-muted">Full Name</label>
                        <input
                          type="text"
                          required
                          className="form-control"
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label small fw-semibold text-muted">Email Address (Read-only)</label>
                        <input
                          type="email"
                          disabled
                          className="form-control bg-light"
                          value={user?.email || ''}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label small fw-semibold text-muted">Mobile Number (Indian)</label>
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          className="form-control"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label small fw-semibold text-muted">Membership Tier</label>
                        <input
                          type="text"
                          disabled
                          className="form-control bg-light text-capitalize"
                          value={user?.role === 'admin' ? 'Palace Administrator' : 'Royal Circle Member'}
                        />
                      </div>
                    </div>

                    <hr className="my-4" />

                    <h5 className="fw-bold font-serif mb-3">Update Security Password</h5>
                    <p className="text-muted small mb-3">
                      Leave blank if you do not wish to update your password.
                    </p>

                    <div className="row g-3 mb-4">
                      <div className="col-md-4">
                        <label className="form-label small fw-semibold text-muted">Current Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="••••••••"
                          value={profileForm.currentPassword}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, currentPassword: e.target.value })
                          }
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label small fw-semibold text-muted">New Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Min 6 characters"
                          value={profileForm.newPassword}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, newPassword: e.target.value })
                          }
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label small fw-semibold text-muted">Confirm New Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Re-enter password"
                          value={profileForm.confirmPassword}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, confirmPassword: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-end">
                      <button
                        type="submit"
                        disabled={actionLoading}
                        className="btn btn-navy px-4 py-2 fw-semibold"
                      >
                        {actionLoading ? 'Saving...' : 'Save Profile Changes'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
