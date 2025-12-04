import { auth, currentUser } from '@clerk/nextjs/server';
import { createUser, userExists } from '@/db/users';

/**
 * API endpoint to manually sync the current user to the database
 * This is useful if the webhook didn't fire or if the user signed up before webhooks were set up
 */
export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return Response.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Check if user already exists
    const exists = await userExists(userId);
    if (exists) {
      return Response.json({ message: 'User already exists in database', userId });
    }

    // Get user data from Clerk
    const user = await currentUser();
    if (!user) {
      return Response.json({ error: 'Could not fetch user from Clerk' }, { status: 500 });
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

    console.log('[Sync] User synced successfully:', newUser.id);
    return Response.json({
      message: 'User synced successfully',
      userId: newUser.id
    });
  } catch (error) {
    console.error('[Sync] Error syncing user:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
