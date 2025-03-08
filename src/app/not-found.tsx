import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">404 - Page Not Found</h2>
        <p className="text-slate-600 dark:text-slate-300 mb-8">Could not find the requested resource</p>
        <Link 
          href="/" 
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
} 