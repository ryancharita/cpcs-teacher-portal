'use server';

import { db } from '@/db/index';
import { classes } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';

export async function getClasses() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: 'Unauthorized' };
    }

    const allClasses = await db.select().from(classes);
    return { success: true, data: allClasses };
  } catch (error) {
    console.error('Error fetching classes:', error);
    return { success: false, error: 'Failed to fetch classes' };
  }
}

export async function createClass(formData: {
  name: string;
  schoolYear: string;
  gradeLevelId?: number | null;
  teacherId?: number | null;
}) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: 'Unauthorized' };
    }

    const { name, schoolYear, gradeLevelId, teacherId } = formData;

    if (!name || !schoolYear) {
      return { success: false, error: 'Name and school year are required' };
    }

    const [newClass] = await db
      .insert(classes)
      .values({
        name,
        schoolYear,
        gradeLevelId: gradeLevelId || null,
        teacherId: teacherId || null,
      })
      .returning();

    return { success: true, data: newClass };
  } catch (error) {
    console.error('Error creating class:', error);
    return { success: false, error: 'Failed to create class' };
  }
}
