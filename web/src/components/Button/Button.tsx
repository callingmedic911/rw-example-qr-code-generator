const Button = ({
  as,
  children,
  ...props
}: {
  as?: React.ElementType
  children: React.ReactChild
  [key: string]: React.ComponentProps<React.ElementType>
}) => {
  const CustomButton = as ? as : 'button'
  return (
    <CustomButton
      data-testid="custom-button"
      className="inline-flex items-center px-4 py-2
        text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      {...props}
    >
      {children}
    </CustomButton>
  )
}

export default Button
