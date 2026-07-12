import React from 'react';
import './Hero.css';
import heroImage from '../../assets/images/hero.png';
import { Helmet } from 'react-helmet-async';

export default function Hero() {
  return (
    <>
      <Helmet>
        <title>Localio</title>
      </Helmet>


    <div className="localio-container">
   
      {/* --- HERO CONTENT MAIN --- */}
      <main className="hero-main">
        {/* Left Column */}
        <div className="hero-left">
          <div className="badge">
            <span className="pin-icon">📍</span> Discover Businesses Around You
          </div>
          
          <h1 className="hero-title">
            Find Trusted <br />
            <span className="text-green">Local Businesses</span> <br />
            Near You
          </h1>

          <p className="hero-subtitle">
            Discover restaurants, hospitals, salons, repair shops, coaching centers 
            and hundreds of verified businesses in your city.
          </p>

          <div className="cta-container">
            {/* Google Play Button */}
            <button className="cta-google-play">
              <div className="play-logo">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                </svg>
              </div>
              <div className="cta-text">
                <span className="cta-small">Get it on GitHub</span>
                <span className="cta-main">Download App</span>
              </div>
            </button>

            {/* Register Business Button */}
            <button className="cta-register">
              <div className="building-icon">🏢</div>
              <div className="cta-text">
                <span className="cta-main-dark">Register Business</span>
                <span className="cta-small-muted">List your business for free</span>
              </div>
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="hero-right">
          {/* Replace this img src with your watermarked_img_8224037017449893632.png */}
          <img 
            src={heroImage} 
            alt="Localio Navigation Map Illustration" 
            className="hero-illustration"
          />
        </div>
      </main>

      {/* --- TRUST FOOTER FEATURES --- */}
      <footer className="features-footer">
        <div className="feature-item">
          <div className="feature-icon check-bg">✓</div>
          <div className="feature-info">
            <h4>Verified Businesses</h4>
            <p>100% Trusted</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon pin-bg">📍</div>
          <div className="feature-info">
            <h4>Easy to Find</h4>
            <p>Near You</p>
          </div>
        </div>

        <div className="feature-item">
          <div className="feature-icon star-bg">★</div>
          <div className="feature-info">
            <h4>Top Rated</h4>
            <p>Best Businesses</p>
          </div>
        </div>
      </footer>
    </div>

    </>
  );
}