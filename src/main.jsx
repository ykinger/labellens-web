import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports'; // Make sure this path is correct

// Configure Amplify here
Amplify.configure(awsExports);

import Home from './pages/Home';
import Callback from './pages/Callback';
import ProtectedPage from './pages/ProtectedPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/protected" element={<ProtectedPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);