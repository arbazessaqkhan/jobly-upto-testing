import React from 'react'
import { Control, ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form'
import { FormField, FormItem, FormLabel, FormMessage } from '@/libs/shadcn/components/ui/form'

interface FormFieldWrapperProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label?: string
  renderInput: (field: ControllerRenderProps<TFieldValues>) => React.ReactNode
  className?: string
}

export function FormFieldWrapper<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  renderInput,
  className,
}: FormFieldWrapperProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, formState }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          {renderInput(field)}
          {formState.errors[name]?.message && (
            <FormMessage>{String(formState.errors[name]?.message)}</FormMessage>
          )}
        </FormItem>
      )}
    />
  )
}