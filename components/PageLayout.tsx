'use client'

import React from 'react'
import NavBar from './NavBar'
import Footer, { footerHeight } from './Footer'
import { Box, useTheme } from '@mui/material'

interface PageLayoutProps {
  setActiveTheme: (newMode: 'light' | 'dark') => void
  children?: React.ReactNode
}

export default function PageLayout(props: PageLayoutProps) {
  const theme = useTheme()

  return (
    <Box sx={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <NavBar setActiveTheme={props.setActiveTheme} />
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          p: theme.spacing(2),
          pb: theme.spacing(2 + footerHeight / 8), // add the footer height in spacing units to bottom padding, 1 spacing unit == 8px
        }}
      >
        {props.children}
      </Box>
      <Footer />
    </Box>
  )
}
