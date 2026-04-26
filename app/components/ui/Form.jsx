import { cn } from '@/lib/utils'
import React, { forwardRef } from 'react'

export function Form({ className, children, ...props }) {
  return (
    <form className={cn('space-y-6', className)} {...props}>
      {children}
    </form>
  )
}

export function FormGroup({ className, children, ...props }) {
  return (
    <div className={cn('space-y-2', className)} {...props}>
      {children}
    </div>
  )
}

export function FormLabel({ className, children, ...props }) {
  return (
    <label
      className={cn(
        'text-sm font-medium text-gray-700 dark:text-gray-300',
        className,
      )}
      {...props}
    >
      {children}
    </label>
  )
}

export const FormInput = forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-border-medium dark:bg-[#222222] dark:text-gray-100 dark:placeholder:text-gray-500',
        className,
      )}
      {...props}
    />
  )
})
FormInput.displayName = 'FormInput'

export const FormTextarea = forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-border-medium dark:bg-[#222222] dark:text-gray-100 dark:placeholder:text-gray-500',
        className,
      )}
      {...props}
    />
  )
})
FormTextarea.displayName = 'FormTextarea'

export const FormSelect = forwardRef(
  ({ className, children, options, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-border-medium dark:bg-[#222222] dark:text-gray-100',
          className,
        )}
        {...props}
      >
        {options
          ? options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          : children}
      </select>
    )
  },
)
FormSelect.displayName = 'FormSelect'

export function FormError({ className, children, ...props }) {
  return (
    <p className={cn('text-xs font-medium text-red-500', className)} {...props}>
      {children}
    </p>
  )
}

export function FormDescription({ className, children, ...props }) {
  return (
    <p
      className={cn('text-xs text-gray-500 dark:text-gray-400', className)}
      {...props}
    >
      {children}
    </p>
  )
}
