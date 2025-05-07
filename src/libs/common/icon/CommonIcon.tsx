import React from 'react'
import { DynamicIcon, IconName } from 'lucide-react/dynamic'
import { LucideProps } from 'lucide-react'

export interface CommonIconProps extends LucideProps {
  name: IconName
  size?: number | string | '24' | '32' | '48' | '64'
  color?: string | 'currentColor' | 'red' | 'blue' | 'green' | 'yellow'
  strokeWidth?: number
  absoluteStrokeWidth?: boolean
}

const CommonIcon = ({
  name,
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  absoluteStrokeWidth = false,
  ...props
}: CommonIconProps) => {
  return (
    <DynamicIcon
      name={name}
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      absoluteStrokeWidth={absoluteStrokeWidth}
      {...props}
    />
  )
}

export default CommonIcon