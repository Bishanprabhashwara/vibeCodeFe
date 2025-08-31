"use client";

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import useSWR from 'swr'
import Link from 'next/link'
import { api } from '@/lib/api'
import { Icons } from '@/components/ui/icons'

type Course = {
  _id: string;
  title: string;
  syllabus?: string;
  createdAt?: string;
  updatedAt?: string;
  students?: string[];
  schedule?: {
    startDate?: string;
    endDate?: string;
    days?: string[];
    startTime?: string;
    endTime?: string;
  };
}

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deleting, setDeleting] = useState(false)
  
  const { data: course, error, isLoading } = useSWR<Course>(
    `/api/courses/${params.id}`, 
    (path: string) => api<Course>(path)
  )

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await api(`/api/courses/${params.id}`, { method: 'DELETE' })
      router.push('/courses')
    } catch (err) {
      console.error('Failed to delete course:', err)
      setDeleting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="skeleton h-8 w-64"></div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <div className="card-content">
                <div className="skeleton h-32 w-full"></div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="card">
              <div className="card-content">
                <div className="skeleton h-24 w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="card">
          <div className="card-content">
            <div className="text-center py-8">
              <Icons.x className="h-12 w-12 text-destructive mx-auto mb-4" />
              <div className="text-lg font-medium mb-2">Course not found</div>
              <div className="text-muted-foreground mb-4">
                The course you're looking for doesn't exist or has been removed.
              </div>
              <Link href="/courses" className="btn-primary">
                <Icons.chevronRight className="h-4 w-4 rotate-180" />
                Back to Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/courses" className="btn-ghost btn-sm">
            <Icons.chevronRight className="h-4 w-4 rotate-180" />
            Back
          </Link>
          <div>
            <h1 className="page-title">{course.title}</h1>
            <p className="page-description">Course details and management</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/courses/${course._id}/edit`} className="btn-outline">
            <Icons.edit className="h-4 w-4" />
            Edit
          </Link>
          <button 
            onClick={() => setShowDeleteDialog(true)}
            className="btn-destructive"
          >
            <Icons.trash className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Course Information</div>
            </div>
            <div className="card-content">
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Title</div>
                  <div className="text-lg font-semibold">{course.title}</div>
                </div>
                
                {course.syllabus && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Syllabus</div>
                    <div className="prose prose-sm max-w-none">
                      <p className="whitespace-pre-wrap">{course.syllabus}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {course.schedule && (
            <div className="card">
              <div className="card-header">
                <div className="card-title">Schedule</div>
              </div>
              <div className="card-content">
                <div className="grid gap-4 md:grid-cols-2">
                  {course.schedule.startDate && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">Start Date</div>
                      <div className="flex items-center gap-2">
                        <Icons.calendar className="h-4 w-4 text-muted-foreground" />
                        {new Date(course.schedule.startDate).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                  
                  {course.schedule.endDate && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">End Date</div>
                      <div className="flex items-center gap-2">
                        <Icons.calendar className="h-4 w-4 text-muted-foreground" />
                        {new Date(course.schedule.endDate).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                  
                  {course.schedule.days && course.schedule.days.length > 0 && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">Meeting Days</div>
                      <div className="flex flex-wrap gap-1">
                        {course.schedule.days.map(day => (
                          <span key={day} className="badge badge-secondary">
                            {day.slice(0, 3)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {course.schedule.startTime && course.schedule.endTime && (
                    <div>
                      <div className="text-sm font-medium text-muted-foreground mb-1">Time</div>
                      <div className="flex items-center gap-2">
                        <Icons.clock className="h-4 w-4 text-muted-foreground" />
                        {course.schedule.startTime} - {course.schedule.endTime}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="card">
            <div className="card-header">
              <div className="card-title">Students</div>
              <div className="card-description">Enrolled students in this course</div>
            </div>
            <div className="card-content">
              {course.students && course.students.length > 0 ? (
                <div className="text-center py-4">
                  <div className="text-2xl font-bold">{course.students.length}</div>
                  <div className="text-sm text-muted-foreground">students enrolled</div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Icons.users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <div className="text-lg font-medium mb-2">No students enrolled</div>
                  <div className="text-muted-foreground">Students will appear here once they enroll</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Quick Actions</div>
            </div>
            <div className="card-content">
              <div className="space-y-3">
                <Link href={`/courses/${course._id}/edit`} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                  <Icons.edit className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Edit Course</div>
                    <div className="text-sm text-muted-foreground">Update course details</div>
                  </div>
                </Link>
                
                <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors w-full">
                  <Icons.users className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <div className="font-medium">Manage Students</div>
                    <div className="text-sm text-muted-foreground">Add or remove students</div>
                  </div>
                </button>
                
                <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors w-full">
                  <Icons.calendar className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <div className="font-medium">View Schedule</div>
                    <div className="text-sm text-muted-foreground">See full course calendar</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title">Course Stats</div>
            </div>
            <div className="card-content">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Created</span>
                  <span className="text-sm font-medium">
                    {course.createdAt ? new Date(course.createdAt).toLocaleDateString() : 'Unknown'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Last Updated</span>
                  <span className="text-sm font-medium">
                    {course.updatedAt ? new Date(course.updatedAt).toLocaleDateString() : 'Never'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Course ID</span>
                  <span className="text-sm font-mono">{course._id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="card max-w-md w-full mx-4">
            <div className="card-header">
              <div className="card-title text-destructive">Delete Course</div>
              <div className="card-description">
                Are you sure you want to delete "{course.title}"? This action cannot be undone.
              </div>
            </div>
            <div className="card-footer">
              <div className="flex items-center gap-3 w-full">
                <button 
                  onClick={() => setShowDeleteDialog(false)}
                  className="btn-outline flex-1"
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDelete}
                  className="btn-destructive flex-1"
                  disabled={deleting}
                >
                  {deleting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Icons.trash className="h-4 w-4" />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
