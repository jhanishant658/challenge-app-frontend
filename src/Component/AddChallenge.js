import React, { useState } from 'react';
import axios from 'axios';

export default function AddChallenge() {
  const [month, setMonth] = useState('');
  const [description, setDescription] = useState('');
  const [toast, setToast] = useState({ show: false, type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/postChallenges', {
        month,
        description,
      });

      setToast({
        show: true,
        type: 'success',
        message: '✅ Challenge added successfully!',
      });
      setMonth('');
      setDescription('');

      setTimeout(() => setToast({ ...toast, show: false }), 3000);
    } catch (error) {
      console.error('Error adding challenge:', error);
      setToast({
        show: true,
        type: 'danger',
        message: '❌ Failed to add challenge. Please try again.',
      });
      setTimeout(() => setToast({ ...toast, show: false }), 3000);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #dbeafe, #ffffff)',
        padding: '20px',
      }}
    >
      {/* Top-Center Toast */}
      {toast.show && (
        <div
          className={`position-fixed top-0 start-50 translate-middle-x alert alert-${toast.type} shadow`}
          style={{
            minWidth: '300px',
            zIndex: 1050,
            textAlign: 'center',
            animation: 'slideDown 0.4s ease',
            marginTop: '80px', // navbar ke niche shift
          }}
        >
          {toast.message}
        </div>
      )}

      <div
        className="card shadow-lg border-0 rounded-4 p-4"
        style={{
          width: '100%',
          maxWidth: '550px',
          backgroundColor: '#ffffff',
          borderTop: '6px solid #0d6efd',
          animation: 'fadeIn 0.5s ease-in-out',
        }}
      >
        <h2
          className="text-center mb-4 fw-bold"
          style={{
            color: '#0d6efd',
            textShadow: '1px 1px 4px rgba(0,0,0,0.2)',
          }}
        >
          📝 Add New Challenge
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="month" className="form-label fw-bold">
              Month
            </label>
            <input
              type="text"
              id="month"
              className="form-control shadow-sm"
              placeholder="Enter month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              required
              style={{ borderRadius: '8px' }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-bold">
              Challenge
            </label>
            <textarea
              id="description"
              className="form-control shadow-sm"
              placeholder="Enter challenge briefly"
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{ borderRadius: '8px' }}
            ></textarea>
          </div>

          <div className="d-flex justify-content-between">
            <button
              type="submit"
              className="btn btn-primary px-4 fw-bold"
              style={{
                borderRadius: '25px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = '#084298')
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = '#0d6efd')
              }
            >
              Add Challenge
            </button>
            <button
              type="reset"
              className="btn btn-secondary px-4 fw-bold"
              style={{ borderRadius: '25px' }}
              onClick={() => {
                setMonth('');
                setDescription('');
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-50px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}
