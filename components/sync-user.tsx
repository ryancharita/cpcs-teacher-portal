'use client';

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { syncUser } from '@/app/actions/sync-user';

/**
 * Component that automatically syncs the user to the database when they sign in
 * This ensures users are created even if the webhook didn't fire
 */
export default function SyncUser() {
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      // Sync user to database
      syncUser().then((result) => {
        if (result.success) {
          console.log('[SyncUser]', result.message);
        } else {
          console.error('[SyncUser]', result.error);
        }
      });
    }
  }, [isLoaded, isSignedIn]);

  return null; // This component doesn't render anything
}
