import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Profile, UserRole } from '../types/database.types';

export interface UserSession {
  user: any | null;
  profile: Profile | null;
  role: UserRole;
  isAdmin: boolean;
}

export const authService = {
  async getCurrentSession(): Promise<UserSession> {
    if (!isSupabaseConfigured) {
      // Local fallback session
      const stored = localStorage.getItem('agri_demo_user');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          return {
            user: { id: parsed.id, email: parsed.email },
            profile: parsed,
            role: parsed.role || 'farmer',
            isAdmin: parsed.role === 'admin'
          };
        } catch {
          // ignore
        }
      }
      return {
        user: null,
        profile: null,
        role: 'farmer',
        isAdmin: false
      };
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return { user: null, profile: null, role: 'farmer', isAdmin: false };
      }

      // Fetch profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      const role = (profile?.role as UserRole) || 'farmer';

      return {
        user,
        profile: profile || {
          id: user.id,
          role,
          display_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Farmer',
          phone: null,
          state: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        role,
        isAdmin: role === 'admin'
      };
    } catch (err) {
      console.warn('Auth session check failed:', err);
      return { user: null, profile: null, role: 'farmer', isAdmin: false };
    }
  },

  async signIn(email: string, password: string): Promise<UserSession> {
    if (!isSupabaseConfigured) {
      // Fallback demo auth
      const mockProfile: Profile = {
        id: 'demo-user-id',
        role: email.includes('admin') ? 'admin' : 'farmer',
        display_name: email.split('@')[0],
        phone: null,
        state: 'Maharashtra',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      localStorage.setItem('agri_demo_user', JSON.stringify(mockProfile));
      return {
        user: { id: mockProfile.id, email },
        profile: mockProfile,
        role: mockProfile.role,
        isAdmin: mockProfile.role === 'admin'
      };
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    return this.getCurrentSession();
  },

  async signUp(email: string, password: string, displayName: string, role: UserRole = 'farmer'): Promise<UserSession> {
    if (!isSupabaseConfigured) {
      const mockProfile: Profile = {
        id: 'demo-' + Date.now(),
        role,
        display_name: displayName || email.split('@')[0],
        phone: null,
        state: 'Maharashtra',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      localStorage.setItem('agri_demo_user', JSON.stringify(mockProfile));
      return {
        user: { id: mockProfile.id, email },
        profile: mockProfile,
        role: mockProfile.role,
        isAdmin: mockProfile.role === 'admin'
      };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: displayName,
          role
        }
      }
    });

    if (error) throw error;

    if (data.user) {
      // Create profile row
      await supabase.from('profiles').upsert([
        {
          id: data.user.id,
          role,
          display_name: displayName,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ]);
    }

    return this.getCurrentSession();
  },

  async signOut(): Promise<void> {
    localStorage.removeItem('agri_demo_user');
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
  },

  async setDemoRole(role: UserRole): Promise<UserSession> {
    const current = await this.getCurrentSession();
    const updated: Profile = {
      id: current.user?.id || 'demo-user-id',
      role,
      display_name: current.profile?.display_name || (role === 'admin' ? 'Demo Admin' : 'Farmer'),
      phone: null,
      state: 'Maharashtra',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    localStorage.setItem('agri_demo_user', JSON.stringify(updated));

    if (isSupabaseConfigured && current.user) {
      try {
        await supabase.from('profiles').update({ role }).eq('id', current.user.id);
      } catch (e) {
        console.warn('Could not update remote role:', e);
      }
    }

    return {
      user: current.user || { id: updated.id, email: `${role}@agri-intelligence.app` },
      profile: updated,
      role,
      isAdmin: role === 'admin'
    };
  }
};
