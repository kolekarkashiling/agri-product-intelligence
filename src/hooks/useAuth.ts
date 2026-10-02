import { useState, useEffect, useCallback } from 'react';
import { authService, UserSession } from '../services/auth.service';
import { UserRole } from '../types/database.types';

export function useAuth() {
  const [session, setSession] = useState<UserSession>({
    user: null,
    profile: null,
    role: 'farmer',
    isAdmin: false
  });
  const [loading, setLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    try {
      setLoading(true);
      const s = await authService.getCurrentSession();
      setSession(s);
    } catch (err) {
      console.warn('Failed to refresh auth session:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  const switchRole = async (role: UserRole) => {
    const updated = await authService.setDemoRole(role);
    setSession(updated);
  };

  const signOut = async () => {
    await authService.signOut();
    await refreshSession();
  };

  return {
    ...session,
    loading,
    refreshSession,
    switchRole,
    signOut
  };
}
