import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  Box,
  Typography,
  Table,
  Snackbar,
  Input,
  Button,
  Textarea,
  Select,
  Option,
  FormControl,
  FormLabel
} from '@mui/joy';
import { loginSuccess } from '../app/features/Auth/actions';
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const isLogin = useSelector(state => state.auth.isLogin); // Get login status from Redux store
  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
  const [login, setLogin] = useState({
    email: '',
    password: ''
  });
   useEffect(() => {
    if (isLogin) {
      navigate('/'); // Redirect to home if already logged in
    }
  }, [])
  const handleInputChange = e => {
    const { name, value } = e.target
    setLogin(prev => ({ ...prev, [name]: value }))
  }
  const handleSubmit = e => {
    e.preventDefault()
    console.log(login)
      if (login.email && login.password) {
      dispatch(loginSuccess()); // Dispatch loginSuccess action on successful login
        console.log('Login successful:', login);
        setSnackbarOpen(true); // Open Snackbar on success
        setTimeout(() => {
          navigate('/');
        }, 1000);
    }
  }
  const handleSnackbarClose = () => {
    setSnackbarOpen(false); // Close Snackbar
  };
  return (
    <div>
      <Box
        border={1}
        borderColor={'darkgray'}
        overflow={'hidden'}
        borderRadius={'5px'}
        marginTop={'80px'}
        width={'60%'}
        marginX={'auto'}
      >
        <Box
          borderBottom={1}
          borderColor={'darkgray'}
          width={'100%'}
          padding={'8px'}
          sx={{
            backgroundColor: '#eee'
          }}
        >
          <Typography fontWeight={'bold'}> Login</Typography>
        </Box>
        <Box padding={'10px'}>
          <form onSubmit={handleSubmit} action=''>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                required
                placeholder='Alamat Email'
                name='email'
                type='email'
                value={login.email}
                onChange={handleInputChange}
                sx={{ marginBottom: '10px' }}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                required
                placeholder='Password'
                name='password'
                type='password'
                value={login.password}
                onChange={handleInputChange}
                sx={{ marginBottom: '10px' }}
              />
            </FormControl>
            <Button variant='solid' color='neutral' type='submit'>
              Login
            </Button>
          </form>
        </Box>
      </Box>
       <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        color='success'
        variant='solid'
        autoHideDuration={3000} // Closes automatically after 3 seconds
        message="Login successful!" // Message to display
      > Login successful! </Snackbar>
    </div>
  )
}

export default Login
