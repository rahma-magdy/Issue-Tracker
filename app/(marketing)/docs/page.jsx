import React from 'react'

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Documentation</h1>
      <div className="prose dark:prose-invert space-y-6 text-gray-700 dark:text-gray-300">
        <p>
          Welcome to the Mode Documentation. Mode is a modern project and issue management application designed for speed and simplicity.
        </p>
        <h2 className="text-xl font-semibold mt-6 text-gray-900 dark:text-white">Getting Started</h2>
        <p>
          To get started with Mode, create an account using the Sign Up button. Once registered, you will be redirected to your dashboard where you can create, update, and manage issues.
        </p>
        <h2 className="text-xl font-semibold mt-6 text-gray-900 dark:text-white">Features</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Create new issues with titles, descriptions, status, and priority.</li>
          <li>A workspace with collapsible navigation and persistent sidebar states.</li>
          <li>Detailed view of issues including assignee, status, priority, and creation time.</li>
        </ul>
      </div>
    </div>
  )
}
