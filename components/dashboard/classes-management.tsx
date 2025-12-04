'use client';

import { useState, useEffect } from 'react';
import { getClasses, createClass } from '@/app/actions/classes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Class {
  id: number;
  name: string;
  schoolYear: string;
  gradeLevelId: number | null;
  teacherId: number | null;
}

export default function ClassesManagement() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    schoolYear: new Date().getFullYear().toString(),
    gradeLevelId: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    setLoading(true);
    const result = await getClasses();
    if (result.success && result.data) {
      setClasses(result.data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const result = await createClass({
      name: formData.name,
      schoolYear: formData.schoolYear,
      gradeLevelId: formData.gradeLevelId ? parseInt(formData.gradeLevelId) : null,
    });

    if (result.success) {
      setShowForm(false);
      setFormData({
        name: '',
        schoolYear: new Date().getFullYear().toString(),
        gradeLevelId: '',
      });
      loadClasses();
    } else {
      alert(result.error || 'Failed to create class');
    }

    setSubmitting(false);
  };

  if (loading) {
    return <div className="text-muted-foreground">Loading classes...</div>;
  }

  return (
    <div className="space-y-4">
      <Button
        onClick={() => setShowForm(!showForm)}
        variant={showForm ? 'outline' : 'default'}
      >
        {showForm ? 'Cancel' : '+ Add New Class'}
      </Button>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Class</CardTitle>
            <CardDescription>Add a new class to your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Class Name *</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="schoolYear">School Year *</Label>
                <Input
                  id="schoolYear"
                  type="text"
                  value={formData.schoolYear}
                  onChange={(e) => setFormData({ ...formData, schoolYear: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? 'Creating...' : 'Create Class'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        {classes.length === 0 ? (
          <p className="text-sm text-muted-foreground">No classes yet. Create your first class!</p>
        ) : (
          classes.map((classItem) => (
            <Card key={classItem.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="font-medium">{classItem.name}</div>
                <div className="text-sm text-muted-foreground">School Year: {classItem.schoolYear}</div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
