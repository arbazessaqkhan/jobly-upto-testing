'use client'
import React, { useState } from 'react'
import { Job } from '@/payload-types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Form } from '@/libs/shadcn/components/ui/form'
import { Button } from '@/libs/shadcn/components/ui/button'
import { JobApplyFormSchema, JobApplyFormSchemaType } from './job-apply.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { FormTextEditor } from '@/libs/form/FormTextEditor/FormTextEditor'
import { FormDropdown } from '@/libs/form/FormDropdown/FormDropdown'
import { FormUpload } from '@/libs/form/FormUpload/FormUpload'
import JOB_LOCATIONS from '@/app/(frontend)/jobs/[slug]/components/locations'
import { Loader2 } from 'lucide-react'

export interface ApplyJobProps {
  job: Job
  onSuccess?: (data: any) => void
  onError?: (data: any) => void
}

const ApplyJob = ({ job, onSuccess, onError }: ApplyJobProps) => {

  const [formSubmitted, setFormSubmitted] = useState(false)

  const [loading, setLoading] = useState(false)

  const form = useForm<JobApplyFormSchemaType>({
    resolver: zodResolver(JobApplyFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      location: '',
      job_id: job.id,
      resume: undefined,
    },
  })

  const onSubmit: SubmitHandler<JobApplyFormSchemaType> = async (data) => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('email', data.email)
      formData.append('phone', data.phone)
      formData.append('location', data.location)
      formData.append('job_id', job.id)
      if (data.resume) {
        formData.append('resume', data.resume as File)
      }

      const response = await fetch(`/api/jobs/apply`, {
        method: 'POST',
        body: formData,
      })

      setLoading(false)
      if (response.ok) {
        const responseData = await response.json()
        console.log(responseData)
        toast('Application submitted successfully', {
          position: 'bottom-right',
        })

        form.reset();
        setFormSubmitted(true)
        onSuccess?.(responseData)
      } else {
        const errorData = await response.json()
        if (response.status === 422 && errorData.issues) {
          // Handle validation errors from server
          errorData.issues.forEach((issue: { path: string[]; message: string }) => {
            form.setError(issue.path[0] as keyof JobApplyFormSchemaType, {
              type: 'server',
              message: issue.message,
            })
          })
        } else if (errorData.error) {
          toast('Error', {
            description: errorData.error,
          })
        }
      }
    } catch (error) {
      console.error('Unexpected error occurred:', error)
      setLoading(false)
      toast('Unexpected error occurred', {
        position: 'bottom-right',
      })
    }
  }

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-screen-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
          <FormTextEditor
            control={form.control}
            name="name"
            label="Name"
            placeholder="Enter your name"
          />
          <FormTextEditor
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
          />
          <FormTextEditor
            control={form.control}
            name="phone"
            label="Phone"
            placeholder="Enter your phone number"
          />
          <FormDropdown
            control={form.control}
            name="location"
            label="Location"
            options={JOB_LOCATIONS}
            placeholder="Select a location"
          />
          <FormUpload control={form.control} name="resume" label="Resume" 
          reset={formSubmitted}/>

          <div className="text-sm text-gray-600">
            By clicking submit, you agree to our{' '}
            <a href="#" className="text-blue-500 underline">
              terms and conditions
            </a>
            .
          </div>
          <Button disabled={loading} type="submit" className="w-full">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Submit'}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ApplyJob