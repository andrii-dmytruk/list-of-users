import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PageNotFound } from './pages/PageNotFound';
import { PeoplePage } from './pages/PeoplePage';
import { PersonPage } from './pages/PersonPage';

function App() {
  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<PeoplePage />} />
        <Route path="home" element={<Navigate to="/" replace/>} />

        <Route path="new-person" element={<PersonPage />} />

        <Route path="edit-person/:id" element={<PersonPage />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
