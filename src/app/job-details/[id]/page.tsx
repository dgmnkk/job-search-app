'use client'

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getJobDetails } from '@/utils/api';

const JobDetails = () => {
  const searchParams = useSearchParams();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const id = searchParams.get('id');

  useEffect(() => {
    if (!id) return;

    const fetchJobDetails = async () => {
      try {
        const jobData = await getJobDetails(id);
        setJob(jobData);
      } catch (error) {
        console.error('Error fetching job details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const likeJob = () => {
    const likedJobs = JSON.parse(localStorage.getItem('likedJobs') || '[]');
    likedJobs.push(job);
    localStorage.setItem('likedJobs', JSON.stringify(likedJobs));
  };

  if (loading) return <div className="text-center"><h1 className="text-4xl font-bold mt-10">Loading...</h1></div>;
  if (!job) return <div className="text-center"><h1 className="text-4xl font-bold mt-10">Job not found</h1></div>;

  return (
    <div className='container mx-auto py-8'>
      <h1 className='text-3xl font-bold mb-6'>{job.job_title}</h1>
      <p className="text-gray-600 mb-4">{job.job_publisher}</p>
      <div dangerouslySetInnerHTML={{ __html: job.job_description }} />
      <p>Location: {job.job_city}, {job.job_country}</p>
      <button onClick={likeJob} className="bg-blue-500 text-white p-2 rounded mt-4">
        Like Job
      </button>
    </div>
  );
};

export default JobDetails;
