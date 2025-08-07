import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChallengeList from './Component/ChallengeList';
import AddChallenge from './Component/AddChallenge';
import Home from './Component/Home';
import Navbar from './Component/NavBar';
import MonthChallenge from './Component/MonthChallenge';
import Update from './Component/Update';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-container" style={{ paddingTop: '60px' }}>
        <Routes>
          {/* Default Page */}
          <Route path="/" element={<Home />} />

          {/* Add Challenge Page */}
          <Route path="/add" element={<AddChallenge />} />

          {/* All Challenges Page */}
          <Route path="/list" element={<ChallengeList />} />

          {/* Monthly Challenges Page */}
          <Route path="/month" element={<MonthChallenge/>} />
        <Route path="/update/:id" element={<Update />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;


