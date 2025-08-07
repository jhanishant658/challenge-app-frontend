import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Challenge from './Challenge';
import './ChallengeList.css';

function ChallengeList() {
  const [challenges, setChallenges] = useState([]);
  const [toast, setToast] = useState({ show: false, type: '', message: '' });

  const fetchChallenges = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getChallenges');
      setChallenges(response.data);

      // Agar challenge hai to motivational message show karo
      if (response.data.length > 0) {
        if (response.data.length < 5) {
          setToast({
            show: true,
            type: 'success',
            message: `You have only ${response.data.length} tasks! 💪 Easy win! Knock them out and enjoy your time 🚀`
          });
        } else {
          setToast({
            show: true,
            type: 'info',
            message: `You have ${response.data.length} tasks! 🔥 Big goals need big energy — stay focused 💯`
          });
        }

        // Auto hide after 3 sec
        setTimeout(() => {
          setToast({ ...toast, show: false });
        }, 3000);
      }
    } catch (error) {
      console.error('Error fetching challenges:', error);
    }
  };

  useEffect(() => {
    fetchChallenges();
    // eslint-disable-next-line
  }, []);

  const handleDeleteSuccess = (deletedId) => {
    setChallenges((prev) => prev.filter((c) => c.id !== deletedId));
  };

  return (
    <div className="challenge-list-section py-5">
      <div className="container">
        <div className="row g-4">
          {challenges.length > 0 ? (
            challenges.map((challenge) => (
              <div key={challenge.id} className="col-12 col-md-6 col-lg-4">
                <Challenge
                  challenge={challenge}
                  onDeleteSuccess={handleDeleteSuccess}
                />
              </div>
            ))
          ) : (
            <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
  <div className="text-center p-5 rounded shadow bg-white">
    <h2 className="text-success mb-3">This year, no challenges! 🎉</h2>
    <p className="lead text-secondary">
      Enjoy the peace, take a breather, or create your own adventure. 🌟
    </p>
    <p className="text-muted">
      Maybe it's time to start something new from your own imagination?
    </p>
    <button className="btn btn-outline-primary mt-4">
      Create Your Own Challenge
    </button>
  </div>
</div>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`position-fixed top-0 end-0 m-3 alert alert-${toast.type} shadow`}
          style={{
            minWidth: '300px',
            zIndex: 1050,
            animation: 'slideInRight 0.4s ease'
          }}
        >
          {toast.message}
        </div>
      )}

      <style>
        {`
          
          @keyframes slideInRight {
            from { opacity: 0; transform: translateX(100%); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}
      </style>
    </div>
  );
}

export default ChallengeList;
