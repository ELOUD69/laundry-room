'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'

interface Props {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right'
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: Props) {
  const { ref, isVisible } = useScrollAnimation()

  const initialTransform =
    direction === 'left'
      ? 'translateX(-24px)'
      : direction === 'right'
      ? 'translateX(24px)'
      : 'translateY(24px)'

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity 0.7s ease, transform 0.7s ease`,
        transitionDelay: `${delay}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : initialTransform,
      }}
    >
      {children}
    </div>
  )
}
