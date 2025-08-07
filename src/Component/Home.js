import React from 'react';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <div className="overlay d-flex align-items-center justify-content-center text-center text-white">
        <div className="content">
          <h1 className="display-4 fw-bold fade-in">Welcome to Challenge App 🚀</h1>
          <p className="lead fade-in-delay">
            Track your monthly challenges, stay motivated, and achieve your goals!
          </p>
          <a href="/add" className="btn btn-warning btn-lg mt-3 fade-in-delay">
            Add Your First Challenge
          </a>
        </div>
      </div>
    </div>
  );
}
