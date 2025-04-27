import { Control, FieldPath, FieldValues } from 'react-hook-form'
import { FormControl } from '@/libs/shadcn/components/ui/form'
import { FormFieldWrapper } from './../FormFieldWrapper/FormFieldWrapper'
import { Checkbox } from '@/libs/shadcn/components/ui/checkbox'

interface FormRadioGroupProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label?: string
  className?: string
}

export function FormCheckbox<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  className = '',
}: FormRadioGroupProps<TFieldValues>) {
  return (
    <FormFieldWrapper
      control={control}
      name={name}
      label={label}
      className={className}
      renderInput={(field) => (
        <FormControl>
          <Checkbox className="ml-3" checked={field.value} onCheckedChange={field.onChange} />
        </FormControl>
      )}
    />
  )
}