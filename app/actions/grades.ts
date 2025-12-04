'use server';

import { db } from '@/db/index';
import { grades } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';
import type { InferInsertModel } from 'drizzle-orm';

export async function getGrades() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: 'Unauthorized' };
    }

    const allGrades = await db.select().from(grades);
    return { success: true, data: allGrades };
  } catch (error) {
    console.error('Error fetching grades:', error);
    return { success: false, error: 'Failed to fetch grades' };
  }
}

export async function createGrade(formData: {
  classId: number;
  subjectId: number;
  teacherId?: number | null;
  gradeLevelId?: number | null;
  q1?: number | null;
  q2?: number | null;
  q3?: number | null;
  q4?: number | null;
  remarks?: string | null;
}) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: 'Unauthorized' };
    }

    const { classId, subjectId, teacherId, gradeLevelId, q1, q2, q3, q4, remarks } = formData;

    if (!classId || !subjectId) {
      return { success: false, error: 'Class ID and Subject ID are required' };
    }

    // Calculate average if quarters are provided
    let average = null;
    const quarters = [q1, q2, q3, q4].filter(q => q !== null && q !== undefined);
    if (quarters.length > 0) {
      const sum = quarters.reduce((acc, q) => acc + parseFloat(String(q)), 0);
      average = parseFloat((sum / quarters.length).toFixed(2));
    }

    const insertData: InferInsertModel<typeof grades> = {
      gradeLevelId: gradeLevelId || null,
      subjectId,
      classId,
      teacherId: teacherId || null,
      q1: q1 ? String(parseFloat(String(q1))) : null,
      q2: q2 ? String(parseFloat(String(q2))) : null,
      q3: q3 ? String(parseFloat(String(q3))) : null,
      q4: q4 ? String(parseFloat(String(q4))) : null,
      average: average ? String(average) : null,
      remarks: remarks || null,
    };

    const [newGrade] = await db
      .insert(grades)
      .values(insertData)
      .returning();

    return { success: true, data: newGrade };
  } catch (error) {
    console.error('Error creating grade:', error);
    return { success: false, error: 'Failed to create grade' };
  }
}
