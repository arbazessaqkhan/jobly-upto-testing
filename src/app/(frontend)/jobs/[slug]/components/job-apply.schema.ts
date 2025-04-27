import { z } from 'zod'
import JOB_LOCATIONS from './locations'

const allowedLocationValues = JOB_LOCATIONS.map((location) => location.value)

const MAX_FILE_SIZE = 3 * 1024 * 1024 // 3MB
const ACCEPTED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

const isClient = typeof window !== 'undefined'

const clientFileSchema = z
  .any()
  .refine((val) => !!val, {
    message: 'Resume is required',
  })
  .refine((val): val is File => val instanceof File, {
    message: 'Resume is not a file',
  })
  .refine((file) => file && ACCEPTED_MIME_TYPES.includes(file.type), {
    message: 'Resume must be a PDF or Word document',
  })
  .refine((file) => file && file.size <= MAX_FILE_SIZE, {
    message: 'Resume size must not exceed 3MB',
  })

const serverFileSchema = z.object({
  mimetype: z.string().refine((type) => ACCEPTED_MIME_TYPES.includes(type), {
    message: 'Resume must be a PDF or Word document',
  }),
  size: z.number().refine((size) => size <= MAX_FILE_SIZE, {
    message: 'Resume size must not exceed 3MB',
  }),
})

const resumeSchema = isClient ? clientFileSchema : serverFileSchema

export const JobApplyFormSchema = z.object({
  name: z.string().nonempty('Name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z
    .string()
    .nonempty('Phone is required')
    .regex(/^\d{10}$/, 'Phone must be exactly 10 digits'),
  location: z.string().refine((val) => allowedLocationValues.includes(val), {
    message: 'Please select a valid location',
  }),
  job_id: z.string().nonempty('Please select a valid job'),
  resume: resumeSchema,
})

export type JobApplyFormSchemaType = z.infer<typeof JobApplyFormSchema>