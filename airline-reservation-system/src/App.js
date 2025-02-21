// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Flights from './pages/Flights';
import AddFlight from './pages/AddFlight';

const App = () => (
  <Router>
    <nav>
      <Link to="/">Home</Link> | <Link to="/flights">View Flights</Link> | <Link to="/add-flight">Add Flight</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/flights" element={<Flights />} />
      <Route path="/add-flight" element={<AddFlight />} />
    </Routes>
  </Router>
);

export default App;
