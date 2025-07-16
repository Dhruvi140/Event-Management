import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import AddEditEvent from './pages/AddEditEvent';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';         
import 'bootstrap/dist/js/bootstrap.bundle.min.js';    



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={<PrivateRoute><Dashboard /></PrivateRoute>}
          />
          <Route
            path="/add"
            element={<PrivateRoute><AddEditEvent /></PrivateRoute>}
          />
          <Route
            path="/edit/:id"
            element={<PrivateRoute><AddEditEvent /></PrivateRoute>}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
