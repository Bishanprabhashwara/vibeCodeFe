"use client";

import { useState } from 'react'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { Icons } from '@/components/ui/icons'
import Link from 'next/link'

export default function NewCoursePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    syllabus: '',
    description: '',
    credits: 3,
    department: '',
    instructor: '',
    capacity: 30,
    startDate: '',
    endDate: '',
    schedule: {
      days: [] as string[],
      startTime: '',
      endTime: '',
    }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleScheduleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      schedule: { ...prev.schedule, [field]: value }
    }))
  }

  const toggleDay = (day: string) => {
    const days = formData.schedule.days.includes(day)
      ? formData.schedule.days.filter(d => d !== day)
      : [...formData.schedule.days, day]
    handleScheduleChange('days', days)
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const payload = {
        title: formData.title,
        syllabus: formData.syllabus,
        schedule: {
          startDate: formData.startDate,
          endDate: formData.endDate,
          days: formData.schedule.days,
          startTime: formData.schedule.startTime,
          endTime: formData.schedule.endTime,
        }
      }
      
      await api<{ _id: string }>("/api/courses", {
        method: 'POST',
        body: JSON.stringify(payload)
      })
      router.push('/courses')
    } catch (err: any) {
      setError(err?.message ?? 'Failed to create course')
    } finally {
      setLoading(false)
    }
  }

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Create New Course</h1>
          <p className="page-description">Add a new course to your institution's catalog</p>
        </div>
        <Link href="/courses" className="btn-outline">
          <Icons.x className="h-4 w-4" />
          Cancel
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <form className="space-y-6" onSubmit={submit}>
            <div className="card">
              <div className="card-header">
                <div className="card-title">Basic Information</div>
                <div className="card-description">Essential course details and description</div>
              </div>
              <div className="card-content space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="label">Course Title *</label>
                    <input 
                      className="input" 
                      value={formData.title} 
                      onChange={e => handleInputChange('title', e.target.value)} 
                      placeholder="e.g., Advanced Machine Learning"
                      required 
                    />
                  </div>
                  <div>
                    <label className="label">Department</label>
                    <select 
                      className="input"
                      value={formData.department}
                      onChange={e => handleInputChange('department', e.target.value)}
                    >
                      <option value="">Select Department</option>
                      <option value="computer-science">Computer Science</option>
                      <option value="mathematics">Mathematics</option>
                      <option value="physics">Physics</option>
                      <option value="engineering">Engineering</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="label">Course Description</label>
                  <textarea 
                    className="textarea" 
                    rows={3}
                    value={formData.description}
                    onChange={e => handleInputChange('description', e.target.value)}
                    placeholder="Brief description of the course content and objectives"
                  />
                </div>

                <div>
                  <label className="label">Syllabus</label>
                  <textarea 
                    className="textarea" 
                    rows={6}
                    value={formData.syllabus} 
                    onChange={e => handleInputChange('syllabus', e.target.value)}
                    placeholder="Detailed course syllabus, topics, and learning outcomes"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <label className="label">Credits</label>
                    <input 
                      type="number" 
                      className="input" 
                      value={formData.credits}
                      onChange={e => handleInputChange('credits', parseInt(e.target.value))}
                      min="1" 
                      max="6"
                    />
                  </div>
                  <div>
                    <label className="label">Capacity</label>
                    <input 
                      type="number" 
                      className="input" 
                      value={formData.capacity}
                      onChange={e => handleInputChange('capacity', parseInt(e.target.value))}
                      min="1"
                      placeholder="Max students"
                    />
                  </div>
                  <div>
                    <label className="label">Instructor</label>
                    <input 
                      className="input" 
                      value={formData.instructor}
                      onChange={e => handleInputChange('instructor', e.target.value)}
                      placeholder="Instructor name"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div className="card-title">Schedule</div>
                <div className="card-description">Set course dates and weekly schedule</div>
              </div>
              <div className="card-content space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="label">Start Date</label>
                    <input 
                      type="date" 
                      className="input"
                      value={formData.startDate}
                      onChange={e => handleInputChange('startDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="label">End Date</label>
                    <input 
                      type="date" 
                      className="input"
                      value={formData.endDate}
                      onChange={e => handleInputChange('endDate', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Meeting Days</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {weekDays.map(day => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={`px-3 py-1 text-sm rounded-md border transition-colors ${
                          formData.schedule.days.includes(day)
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-background hover:bg-accent'
                        }`}
                      >
                        {day.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="label">Start Time</label>
                    <input 
                      type="time" 
                      className="input"
                      value={formData.schedule.startTime}
                      onChange={e => handleScheduleChange('startTime', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="label">End Time</label>
                    <input 
                      type="time" 
                      className="input"
                      value={formData.schedule.endTime}
                      onChange={e => handleScheduleChange('endTime', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="card border-destructive">
                <div className="card-content">
                  <div className="flex items-center gap-3 text-destructive">
                    <Icons.x className="h-5 w-5" />
                    <div>
                      <div className="font-medium">Error creating course</div>
                      <div className="text-sm">{error}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <button 
                type="submit" 
                className="btn-primary" 
                disabled={loading || !formData.title}
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Icons.plus className="h-4 w-4" />
                    Create Course
                  </>
                )}
              </button>
              <Link href="/courses" className="btn-outline">
                Cancel
              </Link>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <div className="card">
            <div className="card-header">
              <div className="card-title">Preview</div>
            </div>
            <div className="card-content">
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-muted-foreground">Title</div>
                  <div className="font-medium">{formData.title || 'Course Title'}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Credits</div>
                  <div>{formData.credits} credits</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Capacity</div>
                  <div>{formData.capacity} students</div>
                </div>
                {formData.schedule.days.length > 0 && (
                  <div>
                    <div className="text-sm text-muted-foreground">Schedule</div>
                    <div className="text-sm">
                      {formData.schedule.days.join(', ')}
                      {formData.schedule.startTime && formData.schedule.endTime && (
                        <div>{formData.schedule.startTime} - {formData.schedule.endTime}</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title">Tips</div>
            </div>
            <div className="card-content">
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Use clear, descriptive course titles</li>
                <li>• Include detailed learning objectives in syllabus</li>
                <li>• Set realistic capacity based on classroom size</li>
                <li>• Consider time zones for online courses</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
