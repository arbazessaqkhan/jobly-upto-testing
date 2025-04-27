import React from 'react'
import { Control, FieldPath, FieldValues } from 'react-hook-form'

import { FormFieldWrapper } from './../FormFieldWrapper/FormFieldWrapper'
import { Input } from '@/libs/shadcn/components/ui/input'

interface FormTextEditorProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label?: string
  placeholder?: string
  type?: 'text' | 'email' | 'number' | 'file'
  className?: string
}

export function FormTextEditor<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  className,
}: FormTextEditorProps<TFieldValues>) {
  return (
    <FormFieldWrapper
      control={control}
      name={name}
      label={label}
      renderInput={(field) => (
        <>
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            className={' ' + className}
            onChange={(e) => field.onChange(e.target.value)}
          />
        </>
      )}
    />
  )
}