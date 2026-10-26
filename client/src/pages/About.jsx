import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="py-5">
      <div className="container">
        {/* Hero Banner */}
        <div className="text-center mb-5">
          <span className="text-uppercase fw-bold small text-muted" style={{ letterSpacing: '2px' }}>
            Heritage & Distinction &bull; अतिथि देवो भव:
          </span>
          <h1 className="display-4 fw-bold font-serif mt-1">The Story of HotelPro Palaces</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '740px' }}>
            Born from a deep devotion to Rajputana architectural majesty, Kerala Ayurvedic serenity, and the timeless Indian ethos of treating every guest as a divine presence.
          </p>
          <div className="royal-divider"></div>
        </div>

        {/* Story Section */}
        <div className="row align-items-center g-5 mb-5 pb-4">
          <div className="col-lg-6">
            <div className="position-relative">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
                alt="Udaipur Palace resort"
                className="rounded-4 shadow-lg w-100 object-fit-cover"
                style={{ height: '420px' }}
              />
              <div
                className="position-absolute bottom-0 start-0 m-4 p-3 bg-white rounded-3 shadow-md border"
                style={{ maxWidth: '260px' }}
              >
                <div className="fw-bold font-serif text-navy">Founded in 2018</div>
                <small className="text-muted">Over 8 years of authentic Indian royal hospitality</small>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <h3 className="fw-bold font-serif mb-3">A Celebration of Indian Architectural Splendor</h3>
            <p className="text-muted mb-3" style={{ lineHeight: '1.8' }}>
              At HotelPro, our vision is to revive the regal splendor of Indian royal courts while providing contemporary five-star eco-luxury. Drawing inspiration from Mewar palaces, Jaipur havelis, and tranquil Malabar backwaters, our suites feature hand-chiseled jharokhas, brass lanterns, fresco murals, and Italian marble courtyards.
            </p>
            <p className="text-muted mb-4" style={{ lineHeight: '1.8' }}>
              Every guest is welcomed with traditional marigold garlands and sandalwood tilak. Whether you are visiting for a destination wedding, an executive strategy summit, or an Ayurvedic Panchakarma retreat, our devoted Khidmatgars orchestrate each moment with grace.
            </p>

            <div className="row g-3">
              <div className="col-sm-6">
                <div className="p-3 bg-white rounded-3 border">
                  <h4 className="fw-bold text-navy font-serif mb-1">99.2%</h4>
                  <small className="text-muted">Indian & Global Guest Approval</small>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="p-3 bg-white rounded-3 border">
                  <h4 className="fw-bold text-navy font-serif mb-1">45+</h4>
                  <small className="text-muted">Heritage Tourism & Hospitality Awards</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="card border-0 bg-white rounded-4 shadow-sm p-4 p-md-5 mb-5 border">
          <div className="text-center mb-5">
            <h3 className="fw-bold font-serif">Pillars of Indian Hospitality</h3>
            <p className="text-muted small">Honoring centuries of cultural reverence and mindful care</p>
            <div className="royal-divider"></div>
          </div>

          <div className="row g-4">
            <div className="col-md-4 text-center">
              <div className="badge bg-navy p-3 rounded-circle mb-3" style={{ background: 'var(--hotel-navy)' }}>
                <i className="bi bi-heart-pulse fs-3 text-white"></i>
              </div>
              <h5 className="fw-bold font-serif mb-2">Atithi Devo Bhava</h5>
              <p className="text-muted small">
                The guest is sacred. Anticipating your wishes with heartfelt warmth, from authentic Sattvik and Jain dietary preparations to evening tea ceremonies.
              </p>
            </div>

            <div className="col-md-4 text-center">
              <div className="badge bg-gold p-3 rounded-circle mb-3" style={{ background: 'var(--hotel-gold)' }}>
                <i className="bi bi-tree fs-3 text-white"></i>
              </div>
              <h5 className="fw-bold font-serif mb-2">Sustainable Heritage</h5>
              <p className="text-muted small">
                100% solar-assisted resort operations, rainwater harvesting, organic local farm partnerships, and zero single-use plastics.
              </p>
            </div>

            <div className="col-md-4 text-center">
              <div className="badge bg-navy p-3 rounded-circle mb-3" style={{ background: 'var(--hotel-navy)' }}>
                <i className="bi bi-shield-lock fs-3 text-white"></i>
              </div>
              <h5 className="fw-bold font-serif mb-2">Ayurveda & Rejuvenation</h5>
              <p className="text-muted small">
                Authentic Vaidya consultations, Kerala herbal therapies, morning hatha yoga, and pranayama sessions by lake waters.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div
          className="rounded-4 p-5 text-center text-white position-relative overflow-hidden shadow"
          style={{
            background: 'linear-gradient(135deg, var(--hotel-navy) 0%, var(--hotel-royal) 100%)',
          }}
        >
          <h2 className="display-6 fw-bold font-serif mb-3 text-white">Your Royal Journey Awaits</h2>
          <p className="text-light opacity-90 mx-auto mb-4" style={{ maxWidth: '620px' }}>
            Allow our palace concierges to prepare your sanctuary. Reserve your stay at our signature suites today.
          </p>
          <Link to="/rooms" className="btn btn-gold btn-lg px-4 shadow">
            Explore Royal Suites & Tariffs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
