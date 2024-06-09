'use client'

import { useJobs } from '@/utils/api'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const Jobs = () => {
    const searchParams = useSearchParams()
    const searchTermFromURL = searchParams.get('search') || ''
    const [searchTerm, setSearchTerm] = useState(searchTermFromURL)

    useEffect(() => {
        const profile = JSON.parse(localStorage.getItem('profile') || '{}')
        if (profile.desiredJobTitle && !searchTermFromURL) {
            setSearchTerm(profile.desiredJobTitle)
        }
    }, [searchTermFromURL])

    const { jobs, isLoading, isError } = useJobs(searchTerm)

    if (isLoading) return <div className="text-center"><h1 className="text-4xl font-bold mt-10">Loading...</h1></div>;
    if (isError) return <div className="text-center"><h1 className="text-4xl font-bold mt-10">Job not found</h1></div>;

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job: any) => (
                    <div key={job.job_id} className="border p-4 rounded-lg">
                        <h2 className="text-xl font-bold">{job.job_title}</h2>
                        <p className="text-gray-600 mb-6">{job.employer_name}</p>
                        <Link href={`/job-details/${job.job_id}`}>
                            <span className="bg-green-500 text-white px-4 py-2 rounded">Details</span>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Jobs
