interface DividerProps {
  variant?: 'dark' | 'light'
}

export default function Divider({ variant = 'dark' }: DividerProps) {
  return (
    <div className={`w-full h-px ${variant === 'dark' ? 'bg-gray-800' : 'bg-gray-300'}`} />
  )
}
