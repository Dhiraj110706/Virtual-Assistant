import React from 'react';
import './index.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { userDataContext } from './context/UserContext.jsx';

import SignUp from './pages/SignUp.jsx';
import LogIn from './pages/LogIn.jsx';
import Customize from './pages/Customize.jsx';
import Home from './pages/Home.jsx';
import Customize2 from './pages/Customize2.jsx';

const App = () => {
  const { userData, loading } = useContext(userDataContext);

  if (loading) {
    return (
      <div className='w-full h-screen flex items-center justify-center text-white'>
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      {/* Signup/Login → agar already logged-in ho to Home */}
      <Route
        path='/signup'
        element={!userData ? <SignUp /> : <Navigate to='/' replace />}
      />
      <Route
        path='/login'
        element={!userData ? <LogIn /> : <Navigate to='/' replace />}
      />

      {/* Home: bas itna hi check ki login hai ya nahi */}
      <Route
        path='/'
        element={
          userData ? <Home /> : <Navigate to='/login' replace />
        }
      />

      {/* Customize pages: sirf logged-in users */}
      <Route
        path='/customize'
        element={userData ? <Customize /> : <Navigate to='/login' replace />}
      />
      <Route
        path='/customize2'
        element={userData ? <Customize2 /> : <Navigate to='/login' replace />}
      />

      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default App;
