import React from "react";

export default function DeleteConfirmation({ show, onClose, onConfirm, loading }) {
  if (!show) return null; // Agar modal ka show false hai to render na ho

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Delete</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {loading ? (
              <div className="text-center">
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Deleting...</span>
                </div>
                <p className="mt-2">Deleting challenge...</p>
              </div>
            ) : (
              <p>Are you sure you want to delete this challenge?</p>
            )}
          </div>
          {!loading && (
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={onClose}
              >
                No
              </button>
              <button
                className="btn btn-danger"
                onClick={onConfirm}
              >
                Yes, Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
