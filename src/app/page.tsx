import { Icons } from '@/components/ui/icons'
import Link from 'next/link'

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-description">Welcome back! Here's what's happening at your institution.</p>
        </div>
        <Link href="/courses/new" className="btn-primary">
          <Icons.plus className="h-4 w-4" />
          New Course
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <div className="card-header flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="card-title text-sm font-medium">Total Courses</div>
            <Icons.courses className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="card-content">
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </div>
        </div>
        
        <div className="card">
          <div className="card-header flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="card-title text-sm font-medium">Active Students</div>
            <Icons.users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="card-content">
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+180 from last month</p>
          </div>
        </div>
        
        <div className="card">
          <div className="card-header flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="card-title text-sm font-medium">Faculty Members</div>
            <Icons.user className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="card-content">
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </div>
        </div>
        
        <div className="card">
          <div className="card-header flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="card-title text-sm font-medium">Completion Rate</div>
            <Icons.calendar className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="card-content">
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="card col-span-4">
          <div className="card-header">
            <div className="card-title">Recent Courses</div>
            <div className="card-description">Latest courses added to the system</div>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              {[
                { title: 'Advanced Machine Learning', instructor: 'Dr. Sarah Chen', students: 45, status: 'Active' },
                { title: 'Data Structures & Algorithms', instructor: 'Prof. Michael Johnson', students: 78, status: 'Active' },
                { title: 'Web Development Fundamentals', instructor: 'Dr. Emily Rodriguez', students: 62, status: 'Draft' },
                { title: 'Database Systems', instructor: 'Prof. David Kim', students: 34, status: 'Active' },
              ].map((course, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icons.courses className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{course.title}</div>
                      <div className="text-sm text-muted-foreground">{course.instructor}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm text-muted-foreground">{course.students} students</div>
                    <span className={`badge ${
                      course.status === 'Active' ? 'badge-default' : 'badge-secondary'
                    }`}>
                      {course.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="card col-span-3">
          <div className="card-header">
            <div className="card-title">Quick Actions</div>
            <div className="card-description">Common tasks and shortcuts</div>
          </div>
          <div className="card-content">
            <div className="space-y-3">
              <Link href="/courses/new" className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                <Icons.plus className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Create Course</div>
                  <div className="text-sm text-muted-foreground">Add a new course to the system</div>
                </div>
              </Link>
              
              <Link href="/users" className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                <Icons.users className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Manage Users</div>
                  <div className="text-sm text-muted-foreground">Add or edit student and faculty accounts</div>
                </div>
              </Link>
              
              <Link href="/settings" className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                <Icons.settings className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">System Settings</div>
                  <div className="text-sm text-muted-foreground">Configure platform preferences</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
