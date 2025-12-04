'use client';

import { useState, useEffect } from 'react';
import { getGrades, createGrade } from '@/app/actions/grades';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ClassRecord {
  id: number;
  classId: number | null;
  subjectId: number | null;
  gradeLevelId: number | null;
  teacherId: number | null;
  q1: string | null;
  q2: string | null;
  q3: string | null;
  q4: string | null;
  average: string | null;
  remarks: string | null;
}

export default function ClassRecords() {
  const [records, setRecords] = useState<ClassRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    classId: '',
    subjectId: '',
    gradeLevelId: '',
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    remarks: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    setLoading(true);
    const result = await getGrades();
    if (result.success && result.data) {
      setRecords(result.data as ClassRecord[]);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const result = await createGrade({
      classId: parseInt(formData.classId),
      subjectId: parseInt(formData.subjectId),
      gradeLevelId: formData.gradeLevelId ? parseInt(formData.gradeLevelId) : null,
      q1: formData.q1 ? parseFloat(formData.q1) : null,
      q2: formData.q2 ? parseFloat(formData.q2) : null,
      q3: formData.q3 ? parseFloat(formData.q3) : null,
      q4: formData.q4 ? parseFloat(formData.q4) : null,
      remarks: formData.remarks || null,
    });

    if (result.success) {
      setShowForm(false);
      setFormData({
        classId: '',
        subjectId: '',
        gradeLevelId: '',
        q1: '',
        q2: '',
        q3: '',
        q4: '',
        remarks: '',
      });
      loadRecords();
    } else {
      alert(result.error || 'Failed to create record');
    }

    setSubmitting(false);
  };

  if (loading) {
    return <div className="text-muted-foreground">Loading records...</div>;
  }

  return (
    <div className="space-y-4">
      <Button
        onClick={() => setShowForm(!showForm)}
        variant={showForm ? 'outline' : 'default'}
      >
        {showForm ? 'Cancel' : '+ Add New Record'}
      </Button>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add Class Record</CardTitle>
            <CardDescription>Enter grade information for a class record</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="classId">Class ID *</Label>
                  <Input
                    id="classId"
                    type="number"
                    value={formData.classId}
                    onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subjectId">Subject ID *</Label>
                  <Input
                    id="subjectId"
                    type="number"
                    value={formData.subjectId}
                    onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gradeLevelId">Grade Level ID</Label>
                  <Input
                    id="gradeLevelId"
                    type="number"
                    value={formData.gradeLevelId}
                    onChange={(e) => setFormData({ ...formData, gradeLevelId: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="q1">Q1</Label>
                  <Input
                    id="q1"
                    type="number"
                    step="0.01"
                    value={formData.q1}
                    onChange={(e) => setFormData({ ...formData, q1: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="q2">Q2</Label>
                  <Input
                    id="q2"
                    type="number"
                    step="0.01"
                    value={formData.q2}
                    onChange={(e) => setFormData({ ...formData, q2: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="q3">Q3</Label>
                  <Input
                    id="q3"
                    type="number"
                    step="0.01"
                    value={formData.q3}
                    onChange={(e) => setFormData({ ...formData, q3: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="q4">Q4</Label>
                  <Input
                    id="q4"
                    type="number"
                    step="0.01"
                    value={formData.q4}
                    onChange={(e) => setFormData({ ...formData, q4: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="remarks">Remarks</Label>
                <Input
                  id="remarks"
                  type="text"
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                />
              </div>

              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? 'Adding...' : 'Add Record'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {records.length === 0 ? (
        <p className="text-sm text-muted-foreground">No records yet. Add your first record!</p>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class ID</TableHead>
                <TableHead>Subject ID</TableHead>
                <TableHead>Grade Level ID</TableHead>
                <TableHead>Q1</TableHead>
                <TableHead>Q2</TableHead>
                <TableHead>Q3</TableHead>
                <TableHead>Q4</TableHead>
                <TableHead>Average</TableHead>
                <TableHead>Remarks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.classId ?? '-'}</TableCell>
                  <TableCell>{record.subjectId ?? '-'}</TableCell>
                  <TableCell>{record.gradeLevelId ?? '-'}</TableCell>
                  <TableCell>{record.q1 ? parseFloat(record.q1).toFixed(2) : '-'}</TableCell>
                  <TableCell>{record.q2 ? parseFloat(record.q2).toFixed(2) : '-'}</TableCell>
                  <TableCell>{record.q3 ? parseFloat(record.q3).toFixed(2) : '-'}</TableCell>
                  <TableCell>{record.q4 ? parseFloat(record.q4).toFixed(2) : '-'}</TableCell>
                  <TableCell className="font-medium">{record.average ? parseFloat(record.average).toFixed(2) : '-'}</TableCell>
                  <TableCell>{record.remarks ?? '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
