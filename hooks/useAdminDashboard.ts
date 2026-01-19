import { useState, useEffect } from 'react';
import { fetchAdminDashboardData, AdminDashboardData } from '../lib/firebase-admin';

interface UseAdminDashboardResult {
  data: AdminDashboardData | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useAdminDashboard = (): UseAdminDashboardResult => {
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const dashboardData = await fetchAdminDashboardData();
      setData(dashboardData);
    } catch (err) {
      console.error('Error fetching admin dashboard data:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch dashboard data'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
};
