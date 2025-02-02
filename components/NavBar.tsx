'use client'

import React from 'react'
import { AppBar, IconButton, Tab, Tabs, Box, useTheme, Menu, MenuItem, Typography } from '@mui/material'
import { useRouter, usePathname } from 'next/navigation'
import { Brightness4, Brightness7, Menu as MenuIcon } from '@mui/icons-material'

import LanguageSelector from './LanguageSelector'

interface NavBarProps {
  setActiveTheme: (newMode: 'light' | 'dark') => void
}

interface LinkTabProps {
  value: string
  disabled?: boolean
  label: string
  href: string
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component={'a'}
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault()
      }}
      {...props}
    />
  )
}

const TABS = [
  {
    label: 'Home',
    pathname: '/',
  },
  {
    label: 'Blank Page',
    pathname: '/blank',
  },
]

const validatePath = (path: string | null) => {
  const tabPaths = TABS.map((tab) => tab.pathname)
  const pathWithoutLocale = '/' + path?.split('/').slice(2).join('/')
  return pathWithoutLocale && tabPaths.includes(pathWithoutLocale) ? pathWithoutLocale : false
}

export default function NavBar(props: NavBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const theme = useTheme()
  const [activeTab, setActiveTab] = React.useState<string | false>(false)
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleNavigateFromMenu = (path: string) => {
    router.push(path)
    handleCloseNavMenu()
  }

  React.useEffect(() => {
    const path = validatePath(pathname)
    setActiveTab(path)
  }, [pathname])

  const handleChange = async (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue)
    router.push(newValue)
  }

  const handleChangeTheme = () => {
    props.setActiveTheme(theme.palette.mode === 'dark' ? 'light' : 'dark')
    window.localStorage.setItem('themeMode', theme.palette.mode === 'dark' ? 'light' : 'dark')
  }

  const a11yProps = (pathname: string) => {
    return {
      id: `simple-tab-${pathname}`,
      'aria-controls': `tab-to-${pathname}`,
    }
  }

  return (
    <>
      {pathname !== '/_error' && (
        <AppBar
          position={'sticky'}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.palette.background.default,
          }}
        >
          {/* responsive menu for mobile devices or small windows */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size={'large'}
              aria-controls={'menu-appbar'}
              aria-haspopup={'true'}
              onClick={handleOpenNavMenu}
              color={'inherit'}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id={'menu-appbar'}
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {TABS.map((tab, index) => (
                <MenuItem key={index} onClick={() => handleNavigateFromMenu(tab.pathname)}>
                  <Typography>{tab.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* standard tabs menu for larger screens */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Tabs value={activeTab} onChange={handleChange} aria-label="navigation bar">
              {TABS.map((tab, index) => (
                <LinkTab
                  key={index}
                  value={tab.pathname}
                  label={tab.label}
                  href={tab.pathname}
                  {...a11yProps(tab.pathname)}
                />
              ))}
            </Tabs>
          </Box>

          {/* language selector and theme mode toggle */}
          <Box sx={{ ml: 'auto', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Box sx={{ mr: 2 }}>
              <LanguageSelector />
            </Box>
            <IconButton sx={{ mr: 1 }} onClick={handleChangeTheme} aria-controls={'switch-theme-mode'}>
              {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>
        </AppBar>
      )}
    </>
  )
}
