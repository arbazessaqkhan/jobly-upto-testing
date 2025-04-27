'use client'
import React, { useState } from 'react'
import { Control, FieldPath, FieldValues } from 'react-hook-form'
import {
  Button,
  // Command,
  // CommandEmpty,
  // CommandGroup,
  // CommandInput,
  // CommandItem,
  // CommandList,
  // Popover,
  // PopoverContent,
  // PopoverTrigger,
} from '@/libs/shadcn/components/ui/button'
// import { Check, ChevronsUpDown, Command } from 'lucide-react'
import { FormFieldWrapper } from './../FormFieldWrapper/FormFieldWrapper'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from 'cmdk'
import { Command } from '@/libs/shadcn/components/ui/command'
import { Check, ChevronsUpDown } from 'lucide-react'
// import { BaseDropdownOption } from '@sparkcms/common';

export interface BaseDropdownOption<ITEM> {
  label: string
  value: ITEM
  disabled?: boolean
}

interface FormDropdownProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label?: string
  options: BaseDropdownOption<any>[]
  placeholder?: string
  className?: string
  // Allow the consumer to listen to changes; when multiple is true, the value is an array
  onChange?: (value: string | string[]) => void
  // New prop to enable multiple selection. Defaults to false.
  multiple?: boolean
}

export function FormDropdown<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  options,
  placeholder,
  onChange,
  className,
  multiple = false,
}: FormDropdownProps<TFieldValues>) {
  const [open, setOpen] = useState(false)

  return (
    <FormFieldWrapper
      control={control}
      name={name}
      label={label}
      className={className}
      renderInput={(field) => {
        // When multiple is true, we expect field.value to be an array of selected values.
        const selectedOptions =
          multiple && Array.isArray(field.value)
            ? options.filter((o) => field.value.includes(o.value))
            : null
        const selectedOption = !multiple ? options.find((o) => o.value === field.value) : null

        const displayLabel = multiple
          ? selectedOptions && selectedOptions.length > 0
            ? selectedOptions.map((o) => o.label).join(', ')
            : placeholder || 'Select an option'
          : selectedOption
            ? selectedOption.label
            : placeholder || 'Select an option'

        return (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between mr-4"
              >
                {displayLabel}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command className="w-full rounded-lg border">
                <CommandInput
                  placeholder=" Search..."
                  className="custom-command-input !focus-visible:outline-none"
                />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {options.map((opt) => (
                      <CommandItem
                        key={opt.value}
                        onSelect={() => {
                          if (multiple) {
                            // Ensure the value is an array (or initialize it as an empty array)
                            let newValues: string[] = Array.isArray(field.value)
                              ? [...field.value]
                              : []
                            // Toggle selection
                            if (newValues.includes(opt.value)) {
                              newValues = newValues.filter((v) => v !== opt.value)
                            } else {
                              newValues.push(opt.value)
                            }
                            onChange?.(newValues)
                            field.onChange(newValues)
                            // For multiple selection, we typically keep the dropdown open
                          } else {
                            onChange?.(opt.value)
                            field.onChange(opt.value)
                            setOpen(false)
                          }
                        }}
                      >
                        <Check
                          className={
                            multiple
                              ? field.value &&
                                Array.isArray(field.value) &&
                                field.value.includes(opt.value)
                                ? 'mr-2 h-4 w-4 opacity-100'
                                : 'mr-2 h-4 w-4 opacity-0'
                              : selectedOption?.value === opt.value
                                ? 'mr-2 h-4 w-4 opacity-100'
                                : 'mr-2 h-4 w-4 opacity-0'
                          }
                        />
                        {opt.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )
      }}
    />
  )
}