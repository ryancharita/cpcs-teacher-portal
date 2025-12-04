'use client';

import { useState } from 'react';
import { createStudent } from '@/app/actions/students';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AddStudentRecord() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    address: '',
    dateOfBirth: '',
    gender: '' as '' | 'Male' | 'Female' | 'Other',
    lrn: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const result = await createStudent({
      firstName: formData.firstName,
      middleName: formData.middleName || undefined,
      lastName: formData.lastName,
      address: formData.address || undefined,
      dateOfBirth: formData.dateOfBirth || undefined,
      gender: formData.gender || null,
      lrn: formData.lrn || undefined,
    });

    if (result.success) {
      setShowForm(false);
      setFormData({
        firstName: '',
        middleName: '',
        lastName: '',
        address: '',
        dateOfBirth: '',
        gender: '',
        lrn: '',
      });
      alert('Student record added successfully!');
    } else {
      alert(result.error || 'Failed to add student');
    }

    setSubmitting(false);
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={() => setShowForm(!showForm)}
        variant={showForm ? 'outline' : 'default'}
      >
        {showForm ? 'Cancel' : '+ Add New Student'}
      </Button>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add Student Record</CardTitle>
            <CardDescription>Enter student information to add a new record</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="middleName">Middle Name</Label>
                  <Input
                    id="middleName"
                    type="text"
                    value={formData.middleName}
                    onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => setFormData({ ...formData, gender: value as 'Male' | 'Female' | 'Other' })}
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lrn">LRN (Learner Reference Number)</Label>
                <Input
                  id="lrn"
                  type="text"
                  value={formData.lrn}
                  onChange={(e) => setFormData({ ...formData, lrn: e.target.value })}
                />
              </div>

              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? 'Adding...' : 'Add Student'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
