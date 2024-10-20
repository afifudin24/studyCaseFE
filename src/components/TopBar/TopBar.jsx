import React, { useState } from 'react'
import { Sheet, Typography, Button, Badge } from '@mui/joy'
import Box from '@mui/joy/Box'
import List from '@mui/joy/List'
import ListDivider from '@mui/joy/ListDivider'
import ListItem from '@mui/joy/ListItem'
import ListItemButton from '@mui/joy/ListItemButton'
import Home from '@mui/icons-material/Home'
import Person from '@mui/icons-material/Person';
import { ShoppingCart } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import '@fontsource/inter' // This ensures the font is imported
const TopBar = () => {
  const isLogin = useSelector(state => state.auth.isLogin)
  // const [isLogin, setIsLogin] = useState(false);
  return (
    <Sheet
      sx={{
        width: '100%',
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: '100',
        backgroundColor: 'slategray'
      }}
    >
      <Sheet
        sx={{
          display: 'flex',

          width: '90%',
          margin: '0 auto',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'Inter, sans-serif',
          padding: '10px 0',
          backgroundColor: 'slategray', // You can change the color here
          color: 'white'
        }}
      >
        {/* Left section: Brand/Logo */}
        <Typography level='h4' sx={{ fontWeight: 'normal', color: 'white' }}>
          POS
        </Typography>

        <Box
          component='nav'
          aria-label='My site'
          sx={{ flexGrow: 1, color: 'white' }}
        >
          <List role='menubar' orientation='horizontal'>
            <ListItem role='none'>
              <ListItemButton
                role='menuitem'
                component='a'
                href='/'
                aria-label='Home'
                sx={{ color: 'white' }} // Setel warna teks menjadi putih
              >
                <Home />
              </ListItemButton>
            </ListItem>

            {isLogin ? (
              <ListItem role='none' sx={{ marginInlineStart: 'auto' }}>
                <Button
                  role='menuitem'
                                  component='a'
                                  variant='plain'
                  href='/profile'
                  aria-label='Profile'
                  sx={{
                    color: 'white', // Set warna teks menjadi putih
                      '&:hover': {
                      backgroundColor: 'neutral', // Ubah warna background saat hover
                      color : 'grey'
                   
                    },
                    transition: 'background-color 0.3s ease' // Berikan efek transisi yang smooth
                  }}
                >
                  <Person />
                </Button>
                <Button
                  role='menuitem'
                                  component='a'
                                  variant='plain'
                  href='/profile'
                  aria-label='Profile'
                  sx={{
                    color: 'white', // Set warna teks menjadi putih
                      '&:hover': {
                      backgroundColor: 'neutral', // Ubah warna background saat hover
                      color : 'grey'
                   
                    },
                    transition: 'background-color 0.3s ease' // Berikan efek transisi yang smooth
                  }}
                >
                <Badge color='neutral' badgeContent={3}>
 <ShoppingCart />
</Badge>
                </Button>
              </ListItem>
            ) : (
              <ListItem role='none' sx={{ marginInlineStart: 'auto' }}>
                <Button
                  sx={{
                    backgroundColor: 'white',
                    color: 'slategrey',
                    '&:hover': {
                      backgroundColor: 'slategrey', // Ganti warna latar belakang saat di-hover
                      color: 'white' // Ganti warna teks saat di-hover
                    }
                  }}
                >
                  Login
                </Button>
              </ListItem>
            )}
          </List>
        </Box>
      </Sheet>
    </Sheet>
  )
}

export default TopBar
