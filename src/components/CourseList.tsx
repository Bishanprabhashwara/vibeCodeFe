"use client";

import useSWR from 'swr'
import Link from 'next/link'
import { api } from '@/lib/api'
import { Icons } from '@/components/ui/icons'

type Course = {
  _id: string;
  title: string;
  syllabus?: string;
  createdAt?: string;
  students?: string[];
}

export default function CourseList() {
  const { data, error, isLoading, mutate } = useSWR<Course[]>("/api/courses", (path: string) => api<Course[]>(path))

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card">
            <div className="card-content">
              <div className="flex items-center justify-between">
                <div className="space-y-2 flex-1">
                  <div className="skeleton h-5 w-3/4"></div>
                  <div className="skeleton h-4 w-1/2"></div>
                </div>
                <div className="skeleton h-8 w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="card">
        <div className="card-content">
          <div className="flex items-center gap-3 text-destructive">
            <Icons.x className="h-5 w-5" />
            <div>
              <div className="font-medium">Error loading courses</div>
              <div className="text-sm text-muted-foreground">{String(error.message)}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const courses = data ?? [];

  if (courses.length === 0) {
    return (
      <div className="card">
        <div className="card-content">
          <div className="text-center py-8">
            <Icons.courses className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <div className="text-lg font-medium mb-2">No courses found</div>
            <div className="text-muted-foreground mb-4">Get started by creating your first course</div>
            <Link href="/courses/new" className="btn-primary">
              <Icons.plus className="h-4 w-4" />
              Create Course
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {courses.length} course{courses.length !== 1 ? 's' : ''} found
        </div>
        <button className="btn-outline btn-sm" onClick={() => mutate()}>
          <Icons.search className="h-4 w-4" />
          Refresh
        </button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div key={course._id} className="card hover:shadow-md transition-shadow">
            <div className="card-header">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icons.courses className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="card-title text-base">{course.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {course.students?.length || 0} students enrolled
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {course.syllabus && (
              <div className="card-content">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {course.syllabus}
                </p>
              </div>
            )}
            
            <div className="card-footer">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Icons.calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {course.createdAt ? new Date(course.createdAt).toLocaleDateString() : 'No date'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/courses/${course._id}`} className="btn-outline btn-sm">
                    <Icons.eye className="h-4 w-4" />
                    View
                  </Link>
                  <Link href={`/courses/${course._id}/edit`} className="btn-ghost btn-sm">
                    <Icons.edit className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
