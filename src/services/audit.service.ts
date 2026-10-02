import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { AuditLogRecord } from '../types/database.types';

export const auditService = {
  async logAction(entry: Omit<AuditLogRecord, 'id' | 'created_at'>): Promise<void> {
    const record: AuditLogRecord = {
      id: 'log-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      user_id: entry.user_id || null,
      user_email: entry.user_email || 'admin@agri-intelligence.app',
      action: entry.action,
      entity: entry.entity,
      entity_id: entry.entity_id,
      old_data: entry.old_data || null,
      new_data: entry.new_data || null,
      created_at: new Date().toISOString()
    };

    // Save locally
    try {
      const stored = localStorage.getItem('agri_audit_logs');
      const logs: AuditLogRecord[] = stored ? JSON.parse(stored) : [];
      localStorage.setItem('agri_audit_logs', JSON.stringify([record, ...logs.slice(0, 100)]));
    } catch (e) {
      console.warn('Local audit log storage error:', e);
    }

    // Save to Supabase
    if (isSupabaseConfigured) {
      try {
        await supabase.from('audit_logs').insert([record]);
      } catch (err) {
        console.warn('Remote audit log save failed:', err);
      }
    }
  },

  async getAuditLogs(limit: number = 50): Promise<AuditLogRecord[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('audit_logs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(limit);

        if (!error && data && data.length > 0) {
          return data;
        }
      } catch (err) {
        console.warn('Supabase audit logs fetch failed:', err);
      }
    }

    try {
      const stored = localStorage.getItem('agri_audit_logs');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }
};
