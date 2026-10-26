import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as roomService from '../services/roomService';
import RoomCard from '../components/rooms/RoomCard';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Home = () => {
  const navigate = useNavigate();
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search Bar State
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const [searchForm, setSearchForm] = useState({
    checkIn: todayStr,
    checkOut: tomorrowStr,
    guests: '2',
    type: 'All',
  });

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await roomService.getRooms({ featured: 'true', limit: 3 });
        if (res.success && res.rooms && res.rooms.length > 0) {
          setFeaturedRooms(res.rooms);
        } else {
          const allRes = await roomService.getRooms({ limit: 3 });
          if (allRes.success) {
            setFeaturedRooms(allRes.rooms);
          }
        }
      } catch (err) {
        console.error('Failed to load featured rooms:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (searchForm.checkIn) query.append('checkIn', searchForm.checkIn);
    if (searchForm.checkOut) query.append('checkOut', searchForm.checkOut);
    if (searchForm.guests) query.append('guests', searchForm.guests);
    if (searchForm.type && searchForm.type !== 'All') query.append('type', searchForm.type);

    navigate(`/rooms?${query.toString()}`);
  };

  return (
    <div>
      {/* Royal Indian Hero Section */}
      <section className="hero-section text-center text-white d-flex align-items-center">
        <div className="container py-5">
          <span className="hero-subtitle mb-2 d-inline-block">
            🙏 नमस्ते &bull; ATITHI DEVO BHAVA &bull; ROYAL INDIAN HOSPITALITY
          </span>
          <h1 className="display-3 fw-bold font-serif mb-3 text-white">
            Experience Timeless Regal Luxury in India
          </h1>
          <p className="lead text-light opacity-90 mx-auto mb-4" style={{ maxWidth: '760px' }}>
            Immerse yourself in heritage palaces, serene backwaters, authentic royal thali dining, and devoted Khidmatgar butler service crafted for unforgettable memories.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/rooms" className="btn btn-gold btn-lg px-4 py-3 shadow">
              <i className="bi bi-compass me-2"></i> Explore Royal Suites
            </Link>
            <Link to="/about" className="btn btn-outline-light btn-lg px-4 py-3">
              Our Royal Heritage
            </Link>
          </div>
        </div>
      </section>

      {/* Floating Availability Search Bar */}
      <div className="container">
        <div className="search-bar-box">
          <form onSubmit={handleSearchSubmit} className="row g-3 align-items-end">
            <div className="col-lg-3 col-md-6">
              <label className="form-label small fw-bold text-muted d-flex align-items-center gap-1">
                <i className="bi bi-calendar-event text-warning"></i> Check-In Date
              </label>
              <input
                type="date"
                min={todayStr}
                required
                className="form-control form-control-lg fs-6"
                value={searchForm.checkIn}
                onChange={(e) => setSearchForm({ ...searchForm, checkIn: e.target.value })}
              />
            </div>

            <div className="col-lg-3 col-md-6">
              <label className="form-label small fw-bold text-muted d-flex align-items-center gap-1">
                <i className="bi bi-calendar-check text-warning"></i> Check-Out Date
              </label>
              <input
                type="date"
                min={searchForm.checkIn || todayStr}
                required
                className="form-control form-control-lg fs-6"
                value={searchForm.checkOut}
                onChange={(e) => setSearchForm({ ...searchForm, checkOut: e.target.value })}
              />
            </div>

            <div className="col-lg-2 col-md-4">
              <label className="form-label small fw-bold text-muted d-flex align-items-center gap-1">
                <i className="bi bi-people text-warning"></i> Guests
              </label>
              <select
                className="form-select form-select-lg fs-6"
                value={searchForm.guests}
                onChange={(e) => setSearchForm({ ...searchForm, guests: e.target.value })}
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
              </select>
            </div>

            <div className="col-lg-2 col-md-4">
              <label className="form-label small fw-bold text-muted d-flex align-items-center gap-1">
                <i className="bi bi-building text-warning"></i> Suite Category
              </label>
              <select
                className="form-select form-select-lg fs-6"
                value={searchForm.type}
                onChange={(e) => setSearchForm({ ...searchForm, type: e.target.value })}
              >
                <option value="All">All Suites</option>
                <option value="Single">Vedic Single</option>
                <option value="Double">Courtyard Double</option>
                <option value="Deluxe">Royal Deluxe</option>
                <option value="Suite">Backwaters Suite</option>
                <option value="Presidential">Kohinoor Penthouse</option>
              </select>
            </div>

            <div className="col-lg-2 col-md-4">
              <button
                type="submit"
                className="btn btn-navy btn-lg w-100 fs-6 fw-bold py-3 d-flex align-items-center justify-content-center gap-2"
              >
                <i className="bi bi-search"></i>
                <span>Find Suites</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Royal Heritage Pillars */}
      <section className="py-5 mt-4">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-uppercase fw-bold small text-muted" style={{ letterSpacing: '2px' }}>
              The HotelPro Standard
            </span>
            <h2 className="display-6 fw-bold font-serif mt-1">Regal Traditions & Modern Comfort</h2>
            <div className="royal-divider"></div>
          </div>

          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="card h-100 border-0 p-4 text-center rounded-4 shadow-sm bg-white">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{ width: '64px', height: '64px', background: 'var(--hotel-gold-light)', color: 'var(--hotel-gold-dark)' }}
                >
                  <i className="bi bi-gem fs-3"></i>
                </div>
                <h5 className="fw-bold mb-2 font-serif">Rajputana Havelis</h5>
                <p className="text-muted small mb-0">
                  Carved stone jaalis, hand-painted fresco ceilings, and jharokha balconies overlooking ancient waters.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="card h-100 border-0 p-4 text-center rounded-4 shadow-sm bg-white">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{ width: '64px', height: '64px', background: 'var(--hotel-gold-light)', color: 'var(--hotel-gold-dark)' }}
                >
                  <i className="bi bi-cup-hot fs-3"></i>
                </div>
                <h5 className="fw-bold mb-2 font-serif">Royal Thali & Dining</h5>
                <p className="text-muted small mb-0">
                  Secret recipes from royal kitchens, Satvik master culinary creations, and evening courtyard masala chai.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="card h-100 border-0 p-4 text-center rounded-4 shadow-sm bg-white">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{ width: '64px', height: '64px', background: 'var(--hotel-gold-light)', color: 'var(--hotel-gold-dark)' }}
                >
                  <i className="bi bi-flower1 fs-3"></i>
                </div>
                <h5 className="fw-bold mb-2 font-serif">Ayurvedic Wellness</h5>
                <p className="text-muted small mb-0">
                  Authentic Kerala Panchakarma therapies, morning yoga overlooking sunrise, and herbal rejuvenation baths.
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="card h-100 border-0 p-4 text-center rounded-4 shadow-sm bg-white">
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{ width: '64px', height: '64px', background: 'var(--hotel-gold-light)', color: 'var(--hotel-gold-dark)' }}
                >
                  <i className="bi bi-shield-check fs-3"></i>
                </div>
                <h5 className="fw-bold mb-2 font-serif">24/7 Khidmatgar</h5>
                <p className="text-muted small mb-0">
                  Traditional Aarti and garland welcome, devoted personal butlers, and bespoke royal cultural excursions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Suites Showcase */}
      <section className="py-5 bg-white border-top border-bottom">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5">
            <div>
              <span className="text-uppercase fw-bold small text-muted" style={{ letterSpacing: '2px' }}>
                Handcrafted Accommodations
              </span>
              <h2 className="display-6 fw-bold font-serif mt-1 mb-0">Signature Heritage Suites</h2>
            </div>
            <Link to="/rooms" className="btn btn-outline-gold mt-3 mt-md-0 d-inline-flex align-items-center gap-2">
              <span>View All Royal Suites</span>
              <i className="bi bi-arrow-right"></i>
            </Link>
          </div>

          {loading ? (
            <LoadingSpinner text="Presenting royal accommodations..." />
          ) : (
            <div className="row g-4">
              {featuredRooms.map((room) => (
                <div key={room._id} className="col-lg-4 col-md-6">
                  <RoomCard room={room} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Visual Experience Showcase */}
      <section className="py-5">
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="text-uppercase fw-bold small text-muted" style={{ letterSpacing: '2px' }}>
                The Udaipur Sanctuary
              </span>
              <h2 className="display-5 fw-bold font-serif mt-2 mb-4">
                A Royal Palace on the Shimmering Waters of Lake Pichola
              </h2>
              <p className="text-muted mb-4 lead">
                Surrounded by the majestic Aravalli hills, HotelPro captures the grandeur of Mewar kings with modern eco-conscious luxury.
              </p>
              <div className="d-flex flex-column gap-3 mb-4">
                <div className="d-flex align-items-start gap-3">
                  <div className="badge bg-warning text-dark rounded-circle p-2 mt-1">
                    <i className="bi bi-check2"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Traditional Aarti & Garland Welcome</h6>
                    <p className="text-muted small mb-0">With refreshing rose sherbet and fresh marigold malas upon arrival.</p>
                  </div>
                </div>
                <div className="d-flex align-items-start gap-3">
                  <div className="badge bg-warning text-dark rounded-circle p-2 mt-1">
                    <i className="bi bi-check2"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Complimentary Airport Luxury Chauffeur</h6>
                    <p className="text-muted small mb-0">Private transfer service from Maharana Pratap Airport (UDR).</p>
                  </div>
                </div>
                <div className="d-flex align-items-start gap-3">
                  <div className="badge bg-warning text-dark rounded-circle p-2 mt-1">
                    <i className="bi bi-check2"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">Authentic Rajasthani & Pan-Indian Dining</h6>
                    <p className="text-muted small mb-0">Curated multi-course Royal Thalis, Dal Baati Churma, and Satvik delicacies.</p>
                  </div>
                </div>
              </div>
              <Link to="/about" className="btn btn-navy px-4 py-2">
                Discover Our Heritage
              </Link>
            </div>
            <div className="col-lg-6">
              <div className="position-relative">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80"
                  alt="Udaipur Palace resort"
                  className="rounded-4 shadow-lg w-100 object-fit-cover"
                  style={{ height: '440px' }}
                />
                <div
                  className="position-absolute bottom-0 start-0 m-4 p-3 bg-white rounded-3 shadow-lg d-flex align-items-center gap-3 border"
                  style={{ maxWidth: '300px' }}
                >
                  <div className="fs-1 text-warning">
                    <i className="bi bi-award-fill"></i>
                  </div>
                  <div>
                    <div className="fw-bold text-navy">Five-Star Royal Excellence</div>
                    <small className="text-muted">Ranked #1 Indian Luxury Heritage Resort 2026</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guest Reviews (Indian Travelers) */}
      <section className="py-5 bg-light border-top">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-uppercase fw-bold small text-muted" style={{ letterSpacing: '2px' }}>
              Guest Experiences
            </span>
            <h2 className="display-6 fw-bold font-serif mt-1">Cherished by Guests Across India</h2>
            <div className="royal-divider"></div>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 rounded-4 p-4 shadow-sm bg-white">
                <div className="d-flex text-warning mb-3">
                  <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
                </div>
                <p className="text-muted fst-italic mb-4">
                  "Our family stay at the Maharaja Royal Heritage Suite was breathtaking. The traditional aarti welcome, the lake views from the jharokha, and the Royal Thali dinner made our 25th anniversary truly royal."
                </p>
                <div className="d-flex align-items-center gap-3 mt-auto">
                  <div className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold" style={{ width: '42px', height: '42px', background: 'var(--hotel-navy)' }}>
                    RM
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold">Rohan & Priya Mehta</h6>
                    <small className="text-muted">Mumbai, Maharashtra</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 rounded-4 p-4 shadow-sm bg-white">
                <div className="d-flex text-warning mb-3">
                  <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
                </div>
                <p className="text-muted fst-italic mb-4">
                  "The Kohinoor Presidential Suite redefines luxury. Having a private heated jacuzzi on the open terrace overlooking Lake Pichola with dedicated Khidmatgar service is unmatched in India."
                </p>
                <div className="d-flex align-items-center gap-3 mt-auto">
                  <div className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold" style={{ width: '42px', height: '42px', background: 'var(--hotel-navy)' }}>
                    VR
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold">Col. Vikramaditya Rathore</h6>
                    <small className="text-muted">Jaipur, Rajasthan</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 rounded-4 p-4 shadow-sm bg-white">
                <div className="d-flex text-warning mb-3">
                  <i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i>
                </div>
                <p className="text-muted fst-italic mb-4">
                  "From instant booking without upfront card deductions to the Ayurvedic spa treatment, HotelPro sets the gold benchmark for Indian luxury hospitality."
                </p>
                <div className="d-flex align-items-center gap-3 mt-auto">
                  <div className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold" style={{ width: '42px', height: '42px', background: 'var(--hotel-navy)' }}>
                    SK
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold">Sneha & Aditya Kulkarni</h6>
                    <small className="text-muted">Bengaluru, Karnataka</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
