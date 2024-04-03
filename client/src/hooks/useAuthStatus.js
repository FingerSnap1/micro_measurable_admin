import { useState, useEffect } from 'react';

import { auth } from '../firebaseConfig'; // Firebase 설정 파일의 경로를 조정해 주세요

export const useAuthStatus = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { isAuthenticated, loading };
};
