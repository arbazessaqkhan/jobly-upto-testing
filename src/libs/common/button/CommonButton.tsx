import React, { use, useEffect } from 'react'
import { Button } from '@/libs/shadcn/components/ui/button'
import CommonIcon, { CommonIconProps } from '@/libs/common/icon/CommonIcon'

type ButtonProps = Parameters<typeof Button>[0]

export interface CommonButtonProps extends ButtonProps {
  icon?: CommonIconProps['name']
  iconPosition?: 'left' | 'right'
  loading?: boolean
  iconClassName?: string
  iconProps?: Omit<CommonIconProps, 'name'>
}

const CommonButton = ({
  children,
  loading,
  iconPosition = 'left',
  iconProps,
  ...props
}: CommonButtonProps) => {
  const [variant, setVariant] = React.useState(props?.variant)
  const [size, setSize] = React.useState(props?.size)
  const [disabled, setDisabled] = React.useState(props?.disabled)

  const [icon, setIcon] = React.useState(props?.icon)
  const [iconClassName, setIconClassName] = React.useState(props?.iconClassName)

  useEffect(() => {
    if (icon && !variant && !children) {
      setVariant('outline')
      if (!size) {
        setSize('icon')
      }
    }

    if (loading) {
      setDisabled(true)
      setIcon('loader-2')
      setIconClassName('animate-spin')
    } else {
      setDisabled(false)
      setIcon(props?.icon)
      setIconClassName(props?.iconClassName)
    }
  }, [icon, variant])

  const CommonIconComponent = icon && (
    <CommonIcon name={icon} className={iconClassName} {...iconProps} />
  )

  return (
    <Button variant={variant} size={size} disabled={disabled} {...props}>
      {icon && iconPosition === 'left' && CommonIconComponent}
      {children}

      {icon && iconPosition === 'right' && CommonIconComponent}
    </Button>
  )
}

export default CommonButton