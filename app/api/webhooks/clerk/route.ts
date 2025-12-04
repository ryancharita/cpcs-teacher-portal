import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { createUser, userExists, updateUserByClerkId } from '@/db/users';

interface EmailAddress {
  id: string;
  email_address: string;
}

interface ClerkWebhookEvent {
  type: string;
  data: {
    id: string;
    email_addresses: EmailAddress[];
    primary_email_address_id: string;
    first_name: string | null;
    last_name: string | null;
    image_url: string | null;
  };
}

export async function POST(req: Request) {
  console.log('[Webhook] Received request');

  // Get the Svix headers for verification
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('[Webhook] Missing svix headers');
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Get the webhook secret
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  // Create a new Svix instance with your secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: ClerkWebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as ClerkWebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred', {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;
  console.log('[Webhook] Event type:', eventType);

  if (eventType === 'user.created') {
    console.log('[Webhook] Processing user.created event');
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    // Check if user already exists
    const exists = await userExists(id);
    if (exists) {
      return new Response('User already exists', { status: 200 });
    }

    // Get the primary email
    const primaryEmail = email_addresses.find((email) => email.id === evt.data.primary_email_address_id);
    const email = primaryEmail?.email_address || email_addresses[0]?.email_address || '';

    // Get the user's name
    const name = first_name && last_name
      ? `${first_name} ${last_name}`
      : first_name || last_name || email.split('@')[0] || 'User';

    // Create user in database
    try {
      const newUser = await createUser({
        clerkId: id,
        email,
        name,
        image: image_url || '',
        profilePicture: image_url || '',
      });
      console.log('[Webhook] User created successfully:', newUser.id);
      return new Response('User created successfully', { status: 200 });
    } catch (error) {
      console.error('[Webhook] Error creating user:', error);
      return new Response(`Error creating user: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 });
    }
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    // Get the primary email
    const primaryEmail = email_addresses.find((email) => email.id === evt.data.primary_email_address_id);
    const email = primaryEmail?.email_address || email_addresses[0]?.email_address || '';

    // Get the user's name
    const name = first_name && last_name
      ? `${first_name} ${last_name}`
      : first_name || last_name || email.split('@')[0] || 'User';

    // Update user in database
    try {
      await updateUserByClerkId(id, {
        email,
        name,
        image: image_url || '',
        profilePicture: image_url || '',
      });

      return new Response('User updated successfully', { status: 200 });
    } catch (error) {
      console.error('Error updating user:', error);
      return new Response('Error updating user', { status: 500 });
    }
  }

  return new Response('', { status: 200 });
}
