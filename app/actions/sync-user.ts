'use server';

import { auth, currentUser } from '@clerk/nextjs/server';
import { createUser, userExists } from '@/db/users';

/**
 * Server action to sync the current user to the database
 * This is called automatically when the user signs in
 */
export async function syncUser() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: 'Not authenticated' };
    }

    // Check if user already exists
    const exists = await userExists(userId);
    if (exists) {
      return { success: true, message: 'User already exists' };
    }

    // Get user data from Clerk
    const user = await currentUser();
    if (!user) {
      return { success: false, error: 'Could not fetch user from Clerk' };
    }

    // Get the primary email
    const primaryEmail = user.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId
    );
    const email = primaryEmail?.emailAddress || user.emailAddresses[0]?.emailAddress || '';

    // Get the user's name
    const name = user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.firstName || user.lastName || email.split('@')[0] || 'User';

    // Create user in database
    const newUser = await createUser({
      clerkId: userId,
      email,
      name,
      image: user.imageUrl || '',
      profilePicture: user.imageUrl || '',
    });

    return { success: true, message: 'User synced successfully', userId: newUser.id };
  } catch (error) {
    console.error('[Sync Action] Error syncing user:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
