'use client'

import { useState, useLayoutEffect } from 'react'

export function Timestamp() {
  const [time, setTime] = useState(null)

  useLayoutEffect(() => {
    setTime(Date.now())
  }, [])

  if (time === null) {
    return null
  }

  return <span>{new Date(time).getFullYear()}</span>
}
