import { Icons } from '@/components/ui/icons'

export default function SettingsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-description">Configure your LMS platform preferences</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">General Settings</div>
              <div className="card-description">Basic platform configuration</div>
            </div>
            <div className="card-content space-y-4">
              <div>
                <label className="label">Institution Name</label>
                <input className="input" defaultValue="University of Excellence" />
              </div>
              <div>
                <label className="label">Academic Year</label>
                <select className="input">
                  <option>2024-2025</option>
                  <option>2023-2024</option>
                  <option>2022-2023</option>
                </select>
              </div>
              <div>
                <label className="label">Default Course Duration (weeks)</label>
                <input type="number" className="input" defaultValue="16" min="1" max="52" />
              </div>
              <div>
                <label className="label">Time Zone</label>
                <select className="input">
                  <option>UTC-5 (Eastern Time)</option>
                  <option>UTC-6 (Central Time)</option>
                  <option>UTC-7 (Mountain Time)</option>
                  <option>UTC-8 (Pacific Time)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title">Enrollment Settings</div>
              <div className="card-description">Configure student enrollment policies</div>
            </div>
            <div className="card-content space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Allow Self-Enrollment</div>
                  <div className="text-sm text-muted-foreground">Students can enroll in courses without approval</div>
                </div>
                <input type="checkbox" className="h-4 w-4" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Require Prerequisites</div>
                  <div className="text-sm text-muted-foreground">Enforce prerequisite requirements</div>
                </div>
                <input type="checkbox" className="h-4 w-4" defaultChecked />
              </div>
              <div>
                <label className="label">Maximum Courses per Student</label>
                <input type="number" className="input" defaultValue="8" min="1" max="20" />
              </div>
              <div>
                <label className="label">Enrollment Deadline (days before start)</label>
                <input type="number" className="input" defaultValue="7" min="0" max="30" />
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title">Notification Settings</div>
              <div className="card-description">Configure system notifications</div>
            </div>
            <div className="card-content space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Email Notifications</div>
                  <div className="text-sm text-muted-foreground">Send email updates to users</div>
                </div>
                <input type="checkbox" className="h-4 w-4" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Course Reminders</div>
                  <div className="text-sm text-muted-foreground">Remind students of upcoming classes</div>
                </div>
                <input type="checkbox" className="h-4 w-4" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Assignment Notifications</div>
                  <div className="text-sm text-muted-foreground">Notify about new assignments</div>
                </div>
                <input type="checkbox" className="h-4 w-4" defaultChecked />
              </div>
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
                <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors w-full">
                  <Icons.settings className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <div className="font-medium">Backup Data</div>
                    <div className="text-sm text-muted-foreground">Export system data</div>
                  </div>
                </button>
                
                <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors w-full">
                  <Icons.users className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <div className="font-medium">User Management</div>
                    <div className="text-sm text-muted-foreground">Manage user roles</div>
                  </div>
                </button>
                
                <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent transition-colors w-full">
                  <Icons.bell className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <div className="font-medium">System Logs</div>
                    <div className="text-sm text-muted-foreground">View activity logs</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title">System Status</div>
            </div>
            <div className="card-content">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Database</span>
                  <span className="badge badge-default">Online</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Email Service</span>
                  <span className="badge badge-default">Online</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">File Storage</span>
                  <span className="badge badge-default">Online</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">API Status</span>
                  <span className="badge badge-default">Healthy</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title">Version Info</div>
            </div>
            <div className="card-content">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">LMS Version</span>
                  <span>v2.1.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Update</span>
                  <span>Dec 15, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">License</span>
                  <span>Enterprise</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="btn-primary">
          <Icons.settings className="h-4 w-4" />
          Save Settings
        </button>
      </div>
    </div>
  )
}
