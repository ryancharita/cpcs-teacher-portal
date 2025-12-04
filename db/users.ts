import { db } from './index';
import { users } from './schema';
import { eq } from 'drizzle-orm';

export interface CreateUserData {
  clerkId: string;
  email: string;
  name: string;
  image: string;
  profilePicture: string;
}

export interface UpdateUserData {
  email?: string;
  name?: string;
  image?: string;
  profilePicture?: string;
}

/**
 * Creates a new user in the database
 */
export async function createUser(data: CreateUserData) {
  const [user] = await db
    .insert(users)
    .values({
      clerkId: data.clerkId,
      email: data.email,
      name: data.name,
      image: data.image,
      profilePicture: data.profilePicture,
    })
    .returning();

  return user;
}

/**
 * Gets a user by Clerk ID
 */
export async function getUserByClerkId(clerkId: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, clerkId))
    .limit(1);

  return user;
}

/**
 * Updates a user by Clerk ID
 */
export async function updateUserByClerkId(clerkId: string, data: UpdateUserData) {
  const [user] = await db
    .update(users)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(users.clerkId, clerkId))
    .returning();

  return user;
}

/**
 * Checks if a user exists by Clerk ID
 */
export async function userExists(clerkId: string): Promise<boolean> {
  const user = await getUserByClerkId(clerkId);
  return !!user;
}
