'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from '@/components/layouts/header';
import ClassesManagement from '@/components/dashboard/classes-management';
import ClassRecords from '@/components/dashboard/class-records';
import AddStudentRecord from '@/components/dashboard/add-student-record';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/');
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Teacher Dashboard</h1>
          <p className="text-muted-foreground">Manage your classes, records, and students</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Classes Management */}
          <Card>
            <CardHeader>
              <CardTitle>Manage Classes</CardTitle>
              <CardDescription>Create and manage your classes</CardDescription>
            </CardHeader>
            <CardContent>
              <ClassesManagement />
            </CardContent>
          </Card>

          {/* Add Student Record */}
          <Card>
            <CardHeader>
              <CardTitle>Add Student Record</CardTitle>
              <CardDescription>Add new student records to the system</CardDescription>
            </CardHeader>
            <CardContent>
              <AddStudentRecord />
            </CardContent>
          </Card>
        </div>

        {/* Class Records */}
        <Card>
          <CardHeader>
            <CardTitle>Class Records</CardTitle>
            <CardDescription>View and manage class records and grades</CardDescription>
          </CardHeader>
          <CardContent>
            <ClassRecords />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
