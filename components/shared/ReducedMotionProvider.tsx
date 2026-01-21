'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface ReducedMotionContextType {
  shouldReduceMotion: boolean
}

const ReducedMotionContext = createContext<ReducedMotionContextType>({
  shouldReduceMotion: false,
})

export function useReducedMotionContext() {
  return useContext(ReducedMotionContext)
}

interface ReducedMotionProviderProps {
  children: ReactNode
}

export function ReducedMotionProvider({ children }: ReducedMotionProviderProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <ReducedMotionContext.Provider value={{ shouldReduceMotion }}>
      {children}
    </ReducedMotionContext.Provider>
  )
}
