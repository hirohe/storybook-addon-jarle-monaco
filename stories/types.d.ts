declare module 'your-private-lib' {
  interface ButtonProps {
    label: string
    primary?: boolean
    backgroundColor?: string
    size?: 'small' | 'medium' | 'large'
    onClick?: () => void
  }

  export const Button: React.FC<ButtonProps>
}
