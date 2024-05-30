'use client'

import React from 'react'

import PageLayout from '@/components/PageLayout'
import '@/app/globals.css'

import ThemeRegistry from '../app/ThemeRegistry'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const [activeTheme, setActiveTheme] = React.useState<'light' | 'dark'>('light')

  React.useEffect(() => {
    // initialize theme on first page visit
    if (window !== undefined) {
      let newMode: 'light' | 'dark' = 'light'
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        newMode = 'dark'
      }
      const fromLocalStorage = window.localStorage.getItem('themeMode')
      if (fromLocalStorage && (fromLocalStorage === 'dark' || fromLocalStorage === 'light')) {
        newMode = fromLocalStorage
      }
      setActiveTheme(newMode)
    }
  }, [])

  return (
    <ThemeRegistry activeTheme={activeTheme}>
      <PageLayout setActiveTheme={setActiveTheme}>{children}</PageLayout>
    </ThemeRegistry>
  )
}
