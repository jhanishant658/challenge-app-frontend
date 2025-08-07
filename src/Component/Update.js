import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Update() {
  const { id } = useParams();
  const [month, setMonth] = useState('');
  const [description, setDescription] = useState('');
  const [toast, setToast] = useState({ show: false, type: '', message: '' });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/challenge/${id}`)
      .then((res) => {
        setMonth(res.data.month);
        setDescription(res.data.description);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/updateChallenge/${id}`, {
        month,
        description,
      });

      setToast({
        show: true,
        type: 'success',
        message: '✅ Challenge updated successfully!',
      });

      setTimeout(() => setToast({ ...toast, show: false }), 3000);
    } catch (err) {
      console.error(err);
      setToast({
        show: true,
        type: 'danger',
        message: '❌ Failed to update challenge. Please try again.',
      });
      setTimeout(() => setToast({ ...toast, show: false }), 3000);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0f4ff, #ffffff)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      
      }}
    >
      {/* Toast at Top Center */}
      {toast.show && (
        <div
          className={`position-fixed top-0 start-50 translate-middle-x alert alert-${toast.type} shadow`}
          style={{
            minWidth: '300px',
            zIndex: 1050,
            textAlign: 'center',
            animation: 'slideDown 0.4s ease',
            marginTop: '80px', // Navbar ke niche shift
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
          ✏️ Update Challenge
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
        >
          <div className="mb-3">
            <label className="form-label fw-bold">Month</label>
            <input
              type="text"
              className="form-control shadow-sm"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              placeholder="Enter month name"
              required
              style={{ borderRadius: '8px' }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Description</label>
            <textarea
              className="form-control shadow-sm"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter challenge description"
              required
              style={{ borderRadius: '8px' }}
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-bold"
            style={{
              fontSize: '1.1rem',
              borderRadius: '25px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#084298')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#0d6efd')}
          >
            🚀 Update Challenge
          </button>
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
