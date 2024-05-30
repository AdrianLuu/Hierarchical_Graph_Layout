import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import initTranslations from '@/app/i18n'
import { PageProps } from '@/app/[locale]/page'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Responsive Design',
}

export default async function ResponsiveDesignPage({ params: { locale } }: PageProps) {
  const { options } = await initTranslations(locale, ['common'])

  return (
    <Box sx={{ p: 5 }}>
      <Typography sx={{ textAlign: 'center', pb: 5 }}>Blank</Typography>
    </Box>
  )
}
