import React, { useEffect, useState } from 'react'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'
import { FormFieldWrapper } from './../FormFieldWrapper/FormFieldWrapper'
import { Input } from '@/libs/shadcn/components/ui/input'
import { cn } from '@/libs/shadcn/lib/utils'
import { Button } from '@/libs/shadcn/components/ui/button'

interface FormUploadProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label?: string
  placeholder?: string
  className?: string
  reset?: boolean
}

export function FormUpload<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  className,
  reset
}: FormUploadProps<TFieldValues>) {
  const [fileName, setFileName] = useState<string | null>(null)

  // Using useController to get field reference
  const { field } = useController({
    name,
    control,
  })

  useEffect(() => {
    if (reset) { // Check if reset prop is true
      setFileName(null); // Reset file name state variable
    }
  }, [reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      setFileName(file.name)
      field.onChange(file)
    } else {
      setFileName(null)
      field.onChange(null)
    }
  }

  const handleFileRemove = () => {
    setFileName(null)
    field.onChange(null)
  }

  // Watch for changes in the field's value.
  // If the form is reset and the field value becomes null/undefined, reset fileName.
  useEffect(() => {
    if (!field.value) {
      setFileName(null)
    }
  }, [field.value])

  return (
    <FormFieldWrapper
      control={control}
      name={name}
      label={label}
      renderInput={() => (
        <div className="space-y-2">
          {!fileName ? (
            <Input
              type="file"
              value="" // reset value to avoid browser errors
              placeholder={placeholder}
              className={cn(
                'block w-full text-sm text-gray-500 file:mr-4 file:py-1c file:px-4 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200',
                className,
              )}
              onChange={handleFileChange}
            />
          ) : (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700 truncate">{fileName}</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:bg-red-100"
                onClick={handleFileRemove}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      )}
    />
  )
}