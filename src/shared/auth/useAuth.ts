import { useEffect, useState } from 'react';
import type { AuthError, JwtPayload } from '@supabase/supabase-js';

import { supabase } from 'shared/api';

export const useAuth = () => {
  const [authPending, setAuthPending] = useState(true);
  const [authError, setAuthError] = useState<AuthError | null>(null);
  const [claims, setClaims] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const getClaims = async () => {
      try {
        setAuthPending(true);
        const { data, error } = await supabase.auth.getClaims();
        if (error) {
          setAuthError(error);
          console.error('Error fetching auth claims:', error);
        }

        if (data?.claims) {
          setClaims(data.claims);
        } else {
          console.warn('No claims found in auth response');
          setClaims(null);
        }
      } finally {
        setAuthPending(false);
      }
    };

    void getClaims();

    supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'SIGNED_OUT') {
        setClaims(null);
        return;
      }
      await getClaims();
    });
  }, []);

  return { claims, authPending, authError };
};
