'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, MenuIcon } from 'lucide-react'

export default function DashboardLayoutClient({ sidebar, children }) {
  const [isPinned, setIsPinned] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const hoverTimeoutRef = useRef(null)

  // Load sidebar configuration from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('sidebar-pinned')
    if (stored !== null) {
      setIsPinned(stored === 'true')
    } else {
      setIsPinned(window.innerWidth >= 768)
    }
  }, [])

  const togglePin = () => {
    const nextState = !isPinned
    setIsPinned(nextState)
    localStorage.setItem('sidebar-pinned', String(nextState))
    if (nextState) {
      setIsHovered(false)
    }
  }

  const handleMouseEnterSidebar = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    setIsHovered(true)
  }

  const handleMouseLeaveSidebar = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false)
    }, 200) // Small delay to avoid accidental flickering
  }

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    }
  }, [])

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-white dark:bg-dark-base text-gray-900 dark:text-gray-100 font-sans">
      {/* 1. Hover peek trigger zone on the left edge (when collapsed and not hovering sidebar) */}
      {!isPinned && !isHovered && (
        <div
          onMouseEnter={handleMouseEnterSidebar}
          className="hidden md:block absolute left-0 top-0 bottom-0 w-3 z-30 cursor-pointer"
        />
      )}

      {/* 2. Desktop Sidebar */}
      <aside
        onMouseEnter={handleMouseEnterSidebar}
        onMouseLeave={handleMouseLeaveSidebar}
        className={`hidden md:block shrink-0 h-full bg-gray-50 dark:bg-[#161616] border-r border-gray-200 dark:border-dark-border-subtle transition-all duration-300 ease-in-out z-40 ${
          isPinned
            ? 'w-64 relative'
            : isHovered
            ? 'w-64 fixed inset-y-0 left-0 shadow-xl dark:shadow-2xl translate-x-0'
            : 'w-0 -translate-x-full border-r-0 pointer-events-none'
        }`}
      >
        {/* Inner wrapper of fixed width to prevent text wrapping issues during animation */}
        <div className="w-64 h-full flex flex-col relative group">
          {sidebar}

          {/* Double chevron / collapse icon inside sidebar (visible on hover) */}
          <button
            onClick={togglePin}
            className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            title="Collapse sidebar"
          >
            <ChevronLeftIcon size={18} />
          </button>
        </div>
      </aside>

      {/* 3. Mobile Sidebar Drawer */}
      <div
        className={`md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-gray-50 dark:bg-[#161616] border-r border-gray-200 dark:border-dark-border-subtle transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="w-full h-full flex flex-col relative">
          {sidebar}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <ChevronLeftIcon size={18} />
          </button>
        </div>
      </div>

      {/* 4. Backdrop overlay for mobile drawer */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity"
        />
      )}

      {/* 5. Main Pane (Scrollable content) */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        {/* Floating Toggle button on desktop (when sidebar is unpinned) */}
        {!isPinned && (
          <button
            onClick={togglePin}
            className="hidden md:flex absolute top-5 left-5 z-20 p-1.5 rounded-md border border-gray-200 dark:border-dark-border-subtle bg-white/95 dark:bg-dark-elevated/95 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 shadow-sm transition-all duration-200 backdrop-blur-sm"
            title="Expand sidebar"
          >
            <ChevronRightIcon size={18} />
          </button>
        )}

        {/* Floating Menu button on mobile */}
        <button
          onClick={() => setIsMobileOpen(true)}
          className="md:hidden absolute top-5 left-5 z-20 p-1.5 rounded-md border border-gray-200 dark:border-dark-border-subtle bg-white/95 dark:bg-dark-elevated/95 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 shadow-sm transition-all duration-200 backdrop-blur-sm"
          title="Open navigation"
        >
          <MenuIcon size={18} />
        </button>

        {/* Scrollable container for dashboard pages */}
        <main className="flex-1 overflow-y-auto scrollbar-thin h-full w-full">
          <div className="max-w-5xl mx-auto px-6 py-16 md:px-12 md:py-16">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
