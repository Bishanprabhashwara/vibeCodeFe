import { Icons } from '@/components/ui/icons'
import Link from 'next/link'

export default function UsersPage() {
  const users = [
    { id: '1', name: 'Dr. Sarah Chen', email: 'sarah.chen@university.edu', role: 'faculty', department: 'Computer Science', courses: 3 },
    { id: '2', name: 'Prof. Michael Johnson', email: 'michael.j@university.edu', role: 'faculty', department: 'Mathematics', courses: 2 },
    { id: '3', name: 'Emily Rodriguez', email: 'emily.r@student.edu', role: 'student', department: 'Computer Science', courses: 5 },
    { id: '4', name: 'David Kim', email: 'david.k@student.edu', role: 'student', department: 'Engineering', courses: 4 },
    { id: '5', name: 'Admin User', email: 'admin@university.edu', role: 'admin', department: 'Administration', courses: 0 },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Users</h1>
          <p className="page-description">Manage students, faculty, and administrators</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/users/import" className="btn-outline">
            <Icons.plus className="h-4 w-4" />
            Import
          </Link>
          <Link href="/users/new" className="btn-primary">
            <Icons.plus className="h-4 w-4" />
            Add User
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
                  placeholder="Search users..."
                  className="input pl-9"
                />
              </div>
            </div>
            <select className="input w-auto">
              <option>All Roles</option>
              <option>Students</option>
              <option>Faculty</option>
              <option>Administrators</option>
            </select>
            <select className="input w-auto">
              <option>All Departments</option>
              <option>Computer Science</option>
              <option>Mathematics</option>
              <option>Engineering</option>
              <option>Physics</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">1,247</div>
                <div className="text-sm text-muted-foreground">Total Students</div>
              </div>
              <Icons.users className="h-8 w-8 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">89</div>
                <div className="text-sm text-muted-foreground">Faculty Members</div>
              </div>
              <Icons.user className="h-8 w-8 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Administrators</div>
              </div>
              <Icons.settings className="h-8 w-8 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-content">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">94.2%</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <Icons.bell className="h-8 w-8 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">All Users</div>
          <div className="card-description">Manage user accounts and permissions</div>
        </div>
        <div className="card-content">
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="table-header">
                <tr className="table-row">
                  <th className="table-head">User</th>
                  <th className="table-head">Role</th>
                  <th className="table-head">Department</th>
                  <th className="table-head">Courses</th>
                  <th className="table-head">Actions</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {users.map((user) => (
                  <tr key={user.id} className="table-row">
                    <td className="table-cell">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icons.user className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className={`badge ${
                        user.role === 'admin' ? 'badge-destructive' :
                        user.role === 'faculty' ? 'badge-default' : 'badge-secondary'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="table-cell">
                      <div className="text-sm">{user.department}</div>
                    </td>
                    <td className="table-cell">
                      <div className="text-sm">{user.courses} courses</div>
                    </td>
                    <td className="table-cell">
                      <div className="flex items-center gap-2">
                        <Link href={`/users/${user.id}`} className="btn-ghost btn-sm">
                          <Icons.eye className="h-4 w-4" />
                        </Link>
                        <Link href={`/users/${user.id}/edit`} className="btn-ghost btn-sm">
                          <Icons.edit className="h-4 w-4" />
                        </Link>
                        <button className="btn-ghost btn-sm text-destructive">
                          <Icons.trash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
