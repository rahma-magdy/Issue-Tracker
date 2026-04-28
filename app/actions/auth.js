'use server'

import { z } from 'zod'
import {
  verifyPassword,
  createSession,
  createUser,
  deleteSession,
} from '@/lib/auth'
import { getUserByEmail } from '@/lib/dal'

import { redirect } from 'next/navigation'

const SignInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
})

const SignUpSchema = z
  .object({
    email: z.string().min(1, 'Email is required').email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export const signIn = async (formData) => {
  try {
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    }

    const validationResult = SignInSchema.safeParse(data)

    if (!validationResult.success) {
      return {
        success: false,
        // message: 'Validation failed',
        errors: validationResult.error.flatten().fieldErrors,
      }
    }

    const user = await getUserByEmail(data.email)

    if (!user) {
      return {
        success: false,
        message: 'Invalid email or password',
        errors: {
          email: ['Invalid email or password'],
        },
      }
    }

    const isPasswordValid = await verifyPassword(data.password, user.password)

    if (!isPasswordValid) {
      return {
        success: false,
        message: 'Invalid email or password',
        errors: {
          password: ['Invalid email or password'],
        },
      }
    }

    await createSession(user.id)

    return {
      success: true,
      message: 'Signed in successfully',
    }
  } catch (e) {
    console.error(e)
    return {
      success: false,
      error: 'something went wrong',
      message: 'something went wrong',
    }
  }
}

export const signUp = async (formData) => {
  try {
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    }

    const validationResult = SignUpSchema.safeParse(data)

    if (!validationResult.success) {
      return {
        success: false,
        // message: '',
        errors: validationResult.error.flatten().fieldErrors,
      }
    }

    const existingUser = await getUserByEmail(data.email)
    if (existingUser) {
      return {
        success: false,
        message: 'Email already in use',
        errors: ['Email already in use'],
      }
    }

    const user = await createUser(data.email, data.password)

    if (!user) {
      return {
        success: false,
        message: 'try again',
        errors: ['account could not be created'],
      }
    }

    await createSession(user.id)

    return {
      success: true,
      message: 'Account created',
    }
  } catch (e) {
    console.error(e)
    return {
      success: false,
      message: 'something went wrong',
      error: 'something went wrong',
    }
  }
}

export const signOut = async () => {
  try {
    await deleteSession()
  } catch (e) {
    console.error(e)
    throw e
  } finally {
    redirect('/signin')
  }
}
