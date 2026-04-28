'use client'

import { useActionState } from 'react'
import { useRouter } from 'next/navigation'
import { ISSUE_STATUS, ISSUE_PRIORITY } from '@/db/schema'
import Button from './ui/Button'
import {
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  FormSelect,
  FormError,
} from './ui/Form'
import { createIssue, updateIssue } from '@/app/actions/issues'

const initialState = {
  success: false,
  message: '',
  errors: undefined,
}

export default function IssueForm({ issue, userId, isEditing = false }) {
  const router = useRouter()

  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const data = {
        title: formData.get('title'),
        description: formData.get('description'),
        status: formData.get('status'),
        priority: formData.get('priority'),
        userId,
      }

      try {
        const result = isEditing
          ? await updateIssue(Number(issue.id), data)
          : await createIssue(data)

        if (result.success) {
          router.refresh()
          if (!isEditing) {
            router.push('/dashboard')
          }
        }

        return result
      } catch (err) {
        return {
          success: false,
          message: err.message || 'An error occurred',
          errors: undefined,
        }
      }
    },
    initialState,
  )

  const statusOptions = Object.values(ISSUE_STATUS).map(({ label, value }) => ({
    label,
    value,
  }))

  const priorityOptions = Object.values(ISSUE_PRIORITY).map(
    ({ label, value }) => ({
      label,
      value,
    }),
  )

  return (
    <Form action={formAction}>
      {state?.message && (
        <FormError
          className={`mb-4 ${
            state.success ? 'bg-green-100 text-green-800 border-green-300' : ''
          }`}
        >
          {state.message}
        </FormError>
      )}

      <FormGroup>
        <FormLabel htmlFor="title">Title</FormLabel>
        <FormInput
          id="title"
          name="title"
          placeholder="Issue title"
          defaultValue={issue?.title || ''}
          required
          minLength={3}
          maxLength={100}
          disabled={isPending}
          className={state?.errors?.title ? 'border-red-500' : ''}
        />
        {state?.errors?.title && (
          <p className="text-sm text-red-500">{state.errors.title[0]}</p>
        )}
      </FormGroup>

      <FormGroup>
        <FormLabel htmlFor="description">Description</FormLabel>
        <FormTextarea
          id="description"
          name="description"
          placeholder="Describe the issue..."
          rows={4}
          defaultValue={issue?.description || ''}
          disabled={isPending}
          className={state?.errors?.description ? 'border-red-500' : ''}
        />
        {state?.errors?.description && (
          <p className="text-sm text-red-500">{state.errors.description[0]}</p>
        )}
      </FormGroup>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormGroup>
          <FormLabel htmlFor="status">Status</FormLabel>
          <FormSelect
            id="status"
            name="status"
            defaultValue={issue?.status || 'backlog'}
            options={statusOptions}
            disabled={isPending}
            required
            className={state?.errors?.status ? 'border-red-500' : ''}
          />
          {state?.errors?.status && (
            <p className="text-sm text-red-500">{state.errors.status[0]}</p>
          )}
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="priority">Priority</FormLabel>
          <FormSelect
            id="priority"
            name="priority"
            defaultValue={issue?.priority || 'medium'}
            options={priorityOptions}
            disabled={isPending}
            required
            className={state?.errors?.priority ? 'border-red-500' : ''}
          />
          {state?.errors?.priority && (
            <p className="text-sm text-red-500">{state.errors.priority[0]}</p>
          )}
        </FormGroup>
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button type="submit" isLoading={isPending}>
          {isEditing ? 'Update Issue' : 'Create Issue'}
        </Button>
      </div>
    </Form>
  )
}
