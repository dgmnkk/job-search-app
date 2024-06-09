import Link from "next/link";
import RootLayout from "./layout";

export default function Home() {
    return (
      <main className="container mx-auto py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Job Search Helper</h1>
        <p className="text-gray-600 mb-4">Find your dream job easily and efficiently with our job search helper.</p>
        <div className="flex justify-center gap-4 mt-8">
          <Link href="/create-profile">
            <span className="bg-blue-500 text-white px-4 py-2 rounded">Create Profile</span>
          </Link>
          <Link href="/jobs">
            <span className="bg-green-500 text-white px-4 py-2 rounded">View Jobs</span>
          </Link>
        </div>
      </div>
    </main>
    );
}