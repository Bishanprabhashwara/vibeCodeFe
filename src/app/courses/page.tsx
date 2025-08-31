import CourseList from '@/components/CourseList'
import { Icons } from '@/components/ui/icons'
import Link from 'next/link'

export default function CoursesPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Courses</h1>
          <p className="page-description">Manage and organize your institution's courses</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/courses/import" className="btn-outline">
            <Icons.plus className="h-4 w-4" />
            Import
          </Link>
          <Link href="/courses/new" className="btn-primary">
            <Icons.plus className="h-4 w-4" />
            New Course
          </Link>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="card">
        <div className="card-content">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Icons.search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="input pl-9"
                />
              </div>
            </div>
            <select className="input w-auto">
              <option>All Status</option>
              <option>Active</option>
              <option>Draft</option>
              <option>Archived</option>
            </select>
            <select className="input w-auto">
              <option>All Instructors</option>
              <option>Dr. Sarah Chen</option>
              <option>Prof. Michael Johnson</option>
            </select>
          </div>
        </div>
      </div>

      <CourseList />
    </div>
  )
}
