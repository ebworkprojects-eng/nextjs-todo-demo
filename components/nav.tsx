'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Nav() {
  const pathname = usePathname()

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <div className="flex gap-2">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg font-medium transition ${
                pathname === '/'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All Tasks
            </Link>
            <Link
              href="/today"
              className={`px-4 py-2 rounded-lg font-medium transition ${
                pathname === '/today'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Today
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
