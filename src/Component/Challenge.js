import React, { useState } from 'react';
import axios from 'axios';

function Challenge({ challenge, onDeleteSuccess }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState({ show: false, type: '', message: '' });

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/deleteChallenge/${challenge.id}`);
      onDeleteSuccess(challenge.id);
      setToast({
        show: true,
        type: 'success',
        message: '✅ Challenge deleted successfully!',
      });
    } catch (error) {
      console.error('Error deleting challenge:', error);
      setToast({
        show: true,
        type: 'danger',
        message: '❌ Failed to delete challenge. Please try again.',
      });
    } finally {
      setShowConfirm(false);
      setTimeout(() => setToast({ ...toast, show: false }), 3000);
    }
  };

  return (
    <>
      {/* Card */}
      <div
        className="card border-0 shadow-lg mb-4 rounded-4 overflow-hidden"
        style={{
          
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        }}
      >
        {/* Gradient Header */}
        <div
          className="card-header text-white fw-bold"
          style={{
            background: 'linear-gradient(135deg, #0d6efd, #6610f2)',
            fontSize: '1.1rem',
            letterSpacing: '0.5px',
          }}
        >
          {challenge.month}
        </div>

        {/* Card Body */}
        <div className="card-body">
          <h6 className="card-title text-secondary">Your Task this Month</h6>
          <p
            className="card-text fw-bold text-dark"
            style={{ lineHeight: '1.6', fontSize: '0.95rem' }}
          >
            {challenge.description} 🚀
          </p>

          {/* Buttons */}
          <div className="d-flex gap-2">
            <a
              href={`/update/${challenge.id}`}
              className="btn btn-outline-primary btn-sm fw-bold px-3"
              style={{ borderRadius: '20px' }}
            >
              ✏ Update
            </a>
            <button
              className="btn btn-outline-danger btn-sm fw-bold px-3"
              style={{ borderRadius: '20px' }}
              onClick={() => setShowConfirm(true)}
            >
              🗑 Delete
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow rounded-4">
              <div className="modal-header bg-danger text-white rounded-top-4">
                <h5 className="modal-title">⚠ Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowConfirm(false)}
                ></button>
              </div>
              <div className="modal-body text-center">
                <p className="mb-0 fw-semibold">
                  Are you sure you want to delete this challenge?
                  <br />
                  <span className="text-danger fw-bold">This action cannot be undone.</span>
                </p>
              </div>
              <div className="modal-footer justify-content-center">
                <button
                  type="button"
                  className="btn btn-secondary px-4 rounded-pill"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger px-4 rounded-pill"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`position-fixed top-0 start-50 translate-middle-x mt-4 alert alert-${toast.type} shadow`}
          style={{ minWidth: '300px', zIndex: 1050, borderRadius: '12px' }}
        >
          {toast.message}
        </div>
      )}
    </>
  );
}

export default Challenge;

