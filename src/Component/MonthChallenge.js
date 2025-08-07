import React, { useState } from "react";
import axios from "axios";
import DeleteConfirmation from "./DeleteConfirmation";

export default function MonthChallenge() {
  const [month, setMonth] = useState("");
  const [loading, setLoading] = useState(false);
  const [challenges, setChallenges] = useState([]);
  const [searched, setSearched] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [showMotivation, setShowMotivation] = useState(false);
  const [motivationMessage, setMotivationMessage] = useState("");

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSearched(true);
      setLoading(true);

      try {
        const res = await axios.get(
          `http://localhost:8080/getChallenge/${month}`
        );
        setChallenges(res.data);

        if (res.data.length > 0) {
          if (res.data.length < 5) {
            setMotivationMessage(
              `You have only ${res.data.length} tasks this month! 💪\nEasy win! Knock them out and make this month count. 🚀`
            );
          } else {
            setMotivationMessage(
              `You have ${res.data.length} tasks this month! 🔥\nBig goals need big energy — stay focused and crush them one by one! 💯`
            );
          }
          setShowMotivation(true);
          setTimeout(() => setShowMotivation(false), 5000);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`http://localhost:8080/deleteChallenge/${deleteId}`);
      setChallenges(challenges.filter((c) => c.id !== deleteId));
      setShowModal(false);
    } catch (error) {
      console.error(error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="container mt-4">
      {/* Search Box - Premium UI */}
      <div
        className={`transition-all ${
          searched
            ? "mt-3"
            : "d-flex flex-column justify-content-center align-items-center"
        }`}
        style={{
          height: searched ? "auto" : "80vh",
          transition: "all 0.4s ease",
        }}
      >
        {!searched && (
          <h1
            className="fw-bold mb-4 text-center"
            style={{
              fontSize: "2.5rem",
              color: "#0d6efd",
              textShadow: "1px 1px 4px rgba(0,0,0,0.2)",
            }}
          >
            🔍 Find Your Monthly Challenge
          </h1>
        )}

        <input
          type="text"
          className="form-control mb-3 shadow-lg"
          style={{
            width: searched ? "100%" : "400px",
            borderRadius: "50px",
            padding: "14px 20px",
            fontSize: "1.2rem",
            border: "2px solid #0d6efd",
            boxShadow: "0 4px 15px rgba(13, 110, 253, 0.3)",
          }}
          placeholder="Type month name & press Enter..."
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      {/* Loader */}
      {loading && (
        <div className="text-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Results */}
      {!loading && challenges.length > 0 && (
        <ul className="list-group">
          {challenges.map((challenge) => (
            <li
              key={challenge.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <span className="fw-bold text-primary">{challenge.month}</span>
                <br />
                <small className="text-secondary">Your Task this Month</small>
                <p className="mb-1 fw-bold">
                  {challenge.description} 🚀 Do it fast!
                </p>
              </div>
              <div className="d-flex gap-2">
                <a
                  href={`/update/${challenge.id}`}
                  className="btn btn-primary btn-sm"
                >
                  Update
                </a>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => confirmDelete(challenge.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* No challenges full-screen message */}
      {!loading && searched && challenges.length === 0 && (
        <div
          className="d-flex flex-column justify-content-center align-items-center text-center"
          style={{ height: "60vh" }}
        >
          <h2 className="text-success fw-bold">🎉 Enjoy your month!</h2>
          <p className="text-muted fs-5">
            You have no challenges this month. Relax, recharge, and be ready for
            the next one! 🌟
          </p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        loading={deleting}
      />

      {/* Motivational Popup */}
      {showMotivation && (
        <div
          className="position-fixed top-0 end-0 m-3 p-3 bg-success text-white rounded shadow-lg"
          style={{
            width: "280px",
            zIndex: 1055,
            animation: "slideIn 0.5s ease-out",
            whiteSpace: "pre-line",
          }}
        >
          <div className="d-flex justify-content-between align-items-start">
            <strong>🔥 Keep Going!</strong>
            <button
              className="btn-close btn-close-white btn-sm"
              onClick={() => setShowMotivation(false)}
            ></button>
          </div>
          <small>{motivationMessage}</small>
        </div>
      )}

      <style>
        {`
          @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

