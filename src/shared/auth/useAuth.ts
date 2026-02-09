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
          setClaims(null);
        }
      } finally {
        setAuthPending(false);
      }
    };

    void getClaims();

    supabase.auth.onAuthStateChange(async () => {
      await getClaims();
    });
  }, []);

  return { claims, authPending, authError };
};
