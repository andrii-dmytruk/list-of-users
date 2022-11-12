import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PeoplePage } from './pages/PeoplePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PeoplePage />} />
      <Route path="home" element={<Navigate to="/" replace/>} />
    </Routes>
  );
}

export default App;
