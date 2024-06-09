'use client'

import { useState, useEffect } from 'react'

const LikedJobs = () => {
  const [likedJobs, setLikedJobs] = useState<any[]>([])

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('likedJobs') || '[]')
    setLikedJobs(storedJobs)
  }, [])

  const removeJob = (id: string) => {
    const updatedJobs = likedJobs.filter(job => job.job_id !== id)
    setLikedJobs(updatedJobs)
    localStorage.setItem('likedJobs', JSON.stringify(updatedJobs))
  }

  if (likedJobs.length === 0) return <div>No liked jobs.</div>

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Liked Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {likedJobs.map((job: any) => (
          <div key={job.job_id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-bold">{job.job_title}</h2>
            <p className="text-gray-600 mb-6">{job.employeer_name}</p>
            <button onClick={() => removeJob(job.job_id)} className="bg-red-500 text-white px-4 py-2 rounded">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LikedJobs
