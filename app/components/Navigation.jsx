import Link from 'next/link'
import { HomeIcon, PlusIcon, LogInIcon } from 'lucide-react'
import UserEmail from './UserEmail'
import { Suspense } from 'react'
import NavLink from './NavLink'

export default function Navigation() {
  return (
    <div className="flex-1 flex flex-col py-4 px-4 h-full select-none">
      <div className="flex items-center justify-start mb-8 px-2">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-gray-905 dark:text-white hover:opacity-85 transition-opacity"
        >
          <span>Mode</span>
        </Link>
      </div>

      <nav className="flex-1 flex flex-col space-y-1">
        <NavLink
          href="/dashboard"
          icon={<HomeIcon size={20} />}
          label="Dashboard"
        />
        <NavLink
          href="/issues/new"
          icon={<PlusIcon size={20} />}
          label="New Issue"
        />
      </nav>

      <div className="pt-4 border-t border-gray-250 dark:border-dark-border-subtle">
        <Suspense
          fallback={
            <NavLink
              href="/signin"
              icon={<LogInIcon size={20} />}
              label="Sign In"
            />
          }
        >
          <UserEmail />
        </Suspense>
      </div>
    </div>
  )
}
