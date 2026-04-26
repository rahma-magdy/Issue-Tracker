import React from 'react'

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12 text-white">
      <h2 className="text-2xl font-bold mb-8 text-center text-white">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        <FAQItem
          question="What is Mode?"
          answer="Mode is a project management tool inspired by modern workflows. It helps teams organize, track, and manage their projects and issues in a simple and efficient way."
        />

        <FAQItem
          question="How do I create an account?"
          answer="You can create an account by clicking the 'Sign Up' button in the top navigation bar. You'll need to provide an email address and create a password."
        />

        <FAQItem
          question="Is it free to use?"
          answer="Yes, Mode is completely free to use. It's designed to be lightweight and accessible for developers and teams."
        />

        <FAQItem
          question="Can I contribute to the project?"
          answer="Absolutely! Mode is open-source and contributions are welcome. Check out our GitHub repository to get started."
        />

        <FAQItem
          question="How do I report bugs or request features?"
          answer="You can report bugs or request features by opening an issue on our GitHub repository. We appreciate your feedback and contributions!"
        />

        <FAQItem
          question="What technologies does Mode use?"
          answer="Mode is built with Next.js, JavaScript, Tailwind CSS, and uses a PostgreSQL database with Drizzle ORM hosted on Neon. It leverages the latest features of Next.js App Router for optimal performance."
        />
      </div>
    </div>
  )
}

function FAQItem({ question, answer }) {
  return (
    <div className="border-b border-gray-700 pb-4">
      <h4 className="text-lg font-semibold mb-2 text-white">{question}</h4>
      <p className="text-gray-400 dark:text-gray-300">{answer}</p>
    </div>
  )
}
