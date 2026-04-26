'use server'

import { db } from '@/db'
import { issues } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function deleteIssue(id) {
  try {
    await db.delete(issues).where(eq(issues.id, id))

    revalidatePath('/dashboard')
    return { success: true, message: 'Deleted successfully' }
  } catch (error) {
    console.error('Error:', error)
    return { success: false, error: 'Failed to delete issue' }
  }
}
