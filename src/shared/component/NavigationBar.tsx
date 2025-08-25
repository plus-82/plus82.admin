import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import React, { MouseEvent } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { removeCookie } from 'typescript-cookie'

// 페이지 타입 정의
interface Page {
  name: string
  path: string
}

const NavigationBar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [anchorElNav, setAnchorElNav] = React.useState<HTMLElement | null>(null)

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const pages: Page[] = [
    { name: '학원 관리', path: '/academy' },
    { name: '채용공고', path: '/job-post' },
    { name: '지원자 관리', path: '/resume' },
  ]

  const handleNavigation = (path: string) => {
    navigate(path)
    handleCloseNavMenu()
  }

  const onLogout = () => {
    removeCookie('Authorization')
    navigate('/')
    toast.success('로그아웃 되었습니다')
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* 로고 (데스크톱) */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              cursor: 'pointer',
            }}
            // onClick={() => navigate('/')}
            onClick={() => handleNavigation(pages[0].path)}
          >
            Plus82
          </Typography>

          {/* 모바일 메뉴 */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
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
              {pages.map(page => (
                <MenuItem
                  key={page.name}
                  onClick={() => handleNavigation(page.path)}
                  selected={location.pathname === page.path}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* 로고 (모바일) */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            Plus82
          </Typography>

          {/* 데스크톱 메뉴 */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(page => (
              <Button
                key={page.name}
                onClick={() => handleNavigation(page.path)}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  backgroundColor:
                    location.pathname === page.path
                      ? 'rgba(255, 255, 255, 0.15)'
                      : 'transparent',
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* 로그인/로그아웃 버튼 */}
          <Box sx={{ flexGrow: 0 }}>
            <Button color="inherit" onClick={onLogout}>
              로그아웃
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavigationBar
