'use client'
import React from 'react'
import Link from 'next/link'
import { BiUser } from 'react-icons/bi'
import { BsSearch } from 'react-icons/bs'
import { FiHeart } from 'react-icons/fi'
import { useRouter } from 'next/navigation'

const Header = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = React.useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/jobs?search=${searchTerm}`)
  }

  return (
    <div className='border-b border-gray-200 py-6'>
      <div className='container mx-auto flex flex-col sm:flex-row justify-between items-center text-center'>
        <div className='font-bold text-4xl text-blackish pb-4 sm:pb-0'>
          <Link href="/">Logo</Link>
        </div>
        <form onSubmit={handleSearch} className='w-full sm:w-[300px] md:w-[70%] relative flex items-center'>
          <input 
            className='border-gray-200 border p-2 px-4 rounded-lg w-full' 
            type='text' 
            placeholder='Search' 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className='absolute right-0 top-0 mr-3 mt-3 text-gray-400'>
            <BsSearch size={20} />
          </button>
        </form>
        <div className='flex gap-4 text-gray-500 text-[30px] pt-4 sm:pt-0'>
          <Link href="/create-profile"><BiUser /></Link>
          <Link href="/liked"><FiHeart /></Link>
        </div>
      </div>
    </div>
  )
}

export default Header
