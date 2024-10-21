import { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  Input,
  Button,
  Textarea,
  Select,
  Option,
  FormControl,
  FormLabel
} from '@mui/joy'
const Login = () => {
    const [login, setLogin] = useState({
        email: '',
        password : ''
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLogin(prev => ({ ...prev, [name]: value }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(login);
    }
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
                    <form onSubmit={handleSubmit} action="">

                 <FormControl>
          <FormLabel>Email</FormLabel>
                  <Input

required
placeholder='Alamat Email'
name='email'
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
           
            </div>
    )
}

export default Login;