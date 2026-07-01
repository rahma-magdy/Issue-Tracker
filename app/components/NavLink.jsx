'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavLink({ href, icon, label }) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors group',
        isActive
          ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-200'
          : 'text-gray-700 hover:bg-gray-150 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800/60 dark:hover:text-gray-100',
      )}
    >
      <span
        className={cn(
          'mr-3 transition-colors',
          isActive
            ? 'text-purple-600 dark:text-purple-400'
            : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200',
        )}
      >
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  )
}
