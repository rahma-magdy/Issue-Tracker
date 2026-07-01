import React from 'react'

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Terms of Service</h1>
      <div className="prose dark:prose-invert space-y-6 text-gray-700 dark:text-gray-300">
        <p>
          Welcome to Mode! By using our service, you agree to these terms. Please read them carefully.
        </p>
        <h2 className="text-xl font-semibold mt-6 text-gray-900 dark:text-white">1. Using our Services</h2>
        <p>
          You must follow any policies made available to you within the Services. Do not misuse our Services, for example, do not interfere with our Services or try to access them using a method other than the interface and the instructions that we provide.
        </p>
        <h2 className="text-xl font-semibold mt-6 text-gray-900 dark:text-white">2. Your Account</h2>
        <p>
          You may need an account in order to use some of our Services. You are responsible for maintaining the confidentiality of your account password and for all activities that occur under your account.
        </p>
        <h2 className="text-xl font-semibold mt-6 text-gray-900 dark:text-white">3. Privacy and Copyright Protection</h2>
        <p>
          Our privacy policies explain how we treat your personal data and protect your privacy when you use our Services. By using our Services, you agree that we can use such data in accordance with our privacy policies.
        </p>
      </div>
    </div>
  )
}
