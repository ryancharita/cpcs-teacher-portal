'use server';

import { db } from '@/db/index';
import { students } from '@/db/schema';
import { auth } from '@clerk/nextjs/server';

export async function getStudents() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: 'Unauthorized' };
    }

    const allStudents = await db.select().from(students);
    return { success: true, data: allStudents };
  } catch (error) {
    console.error('Error fetching students:', error);
    return { success: false, error: 'Failed to fetch students' };
  }
}

export async function createStudent(formData: {
  firstName: string;
  middleName?: string;
  lastName: string;
  address?: string;
  dateOfBirth?: string;
  gender?: 'Male' | 'Female' | 'Other' | null;
  lrn?: string;
}) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: 'Unauthorized' };
    }

    const { firstName, middleName, lastName, address, dateOfBirth, gender, lrn } = formData;

    if (!firstName || !lastName) {
      return { success: false, error: 'First name and last name are required' };
    }

    const [newStudent] = await db
      .insert(students)
      .values({
        firstName,
        middleName: middleName || null,
        lastName,
        address: address || null,
        dateOfBirth: dateOfBirth || null,
        gender: gender || null,
        lrn: lrn || null,
      })
      .returning();

    return { success: true, data: newStudent };
  } catch (error) {
    console.error('Error creating student:', error);
    return { success: false, error: 'Failed to create student' };
  }
}
