import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const { loginWithToken } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    const errorMsg = searchParams.get('error');

    if (errorMsg) {
      setError(decodeURIComponent(errorMsg));
      setTimeout(() => navigate('/login'), 3000);
      return;
    }

    if (token) {
      const name = decodeURIComponent(searchParams.get('name') || '');
      const email = decodeURIComponent(searchParams.get('email') || '');
      const role = searchParams.get('role') || 'user';
      loginWithToken(token, { name, email, role });
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✕</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Anmeldung fehlgeschlagen</h2>
          <p className="text-red-400 mb-4">{error}</p>
          <p className="text-gray-500 text-sm">Du wirst weitergeleitet…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500 mx-auto mb-4" />
        <p className="text-gray-400">Anmeldung wird verarbeitet…</p>
      </div>
    </div>
  );
};

export default OAuthCallback;
