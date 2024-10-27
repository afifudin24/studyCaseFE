import * as React from 'react';
import { useEffect } from 'react';
import { useState, useCallback, useRef, useLayoutEffect } from 'react'
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
  FormLabel,
  Snackbar
} from '@mui/joy';

import List from '@mui/joy/List';
import Accordion, { accordionClasses } from '@mui/joy/Accordion'
import AccordionDetails from '@mui/joy/AccordionDetails'
import AccordionGroup from '@mui/joy/AccordionGroup'
import AccordionSummary from '@mui/joy/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ListItemButton from '@mui/joy/ListItemButton'
import IconButton from '@mui/joy/IconButton'
import DialogTitle from '@mui/joy/DialogTitle'
import DialogContent from '@mui/joy/DialogContent'
import DialogActions from '@mui/joy/DialogActions'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Divider from '@mui/joy/Divider'
import Tooltip from '@mui/joy/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import { EditOutlined } from '@mui/icons-material'
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../app/features/Auth/actions';
function Profile() {
 const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSnackBar, setShowSnackBar] = useState(false);
 
  const orders = [
    {
      kodeOrder: 'ORD-001',
      userId: 101,
      alamat: 'Jl. Merpati No. 10, Jakarta',
      status: 'Proses',
      items: [
        { name: 'Item A', qty: 2, price: 100 },
        { name: 'Item B', qty: 1, price: 150 }
      ]
    },
    {
      kodeOrder: 'ORD-002',
      userId: 102,
      alamat: 'Jl. Kenari No. 5, Bandung',
      status: 'Dikirim',
      items: [
        { name: 'Item C', qty: 3, price: 200 },
        { name: 'Item D', qty: 2, price: 120 }
      ]
    },
    {
      kodeOrder: 'ORD-003',
      userId: 103,
      alamat: 'Jl. Mangga No. 8, Surabaya',
      status: 'Selesai',
      items: [
        { name: 'Item E', qty: 1, price: 300 },
        { name: 'Item F', qty: 4, price: 90 }
      ]
    }
  ];

  const handleLogout = () => {
      dispatch(logout()); // Dispatch loginSuccess action on successful login
    setShowSnackBar(true);
    setTimeout(() => {
      navigate('/');
    }, 1000);
  }
    const handleSnackbarClose = () => {
    setShowSnackBar(false); // Close Snackbar
  };
  const totalPrice = orders.reduce(
    (total, item) => total + item.qty * item.price,
    0
  )

  //   const handleUpdateOrder = useCallback((orderIndex, newStatus) => {
  //     setOrders(prev => prev.map((order, index) =>
  //       index === orderIndex ? { ...order, status: newStatus } : order
  //     ));
  //   }, []);
  const Profil = () => {
    return (
      <Box margin={'0 10px'}>
        <Table aria-label='basic table'>
          <tbody>
            <tr>
              <td>Nama</td>
              <td>Afif Waliyudin</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>afifrider507@gmail.com</td>
            </tr>
          </tbody>
        </Table>
      </Box>
    )
  }
  const Pemesanan = () => (
    <Box margin={'0 10px'} sx={{ backgroundColor: 'neutral.50' }}>
      {/* <Button onClick={() => handleUpdateOrder(0, 'Updated Status')}>
        Update First Order Status
      </Button> */}
      <AccordionGroup
        color='neutral'
        variant='outlined'
        sx={theme => ({
          [`& .${accordionClasses.root}`]: {
            marginTop: '0.5rem',
            transition: '0.2s ease',
            '& button:not([aria-expanded="true"])': {
              transition: '0.2s ease',
              paddingBottom: '0.625rem'
            },
            '& button:hover': {
              background: 'transparent'
            }
          },
          [`& .${accordionClasses.root}.${accordionClasses.expanded}`]: {
            bgcolor: 'background.level1',
            borderRadius: 'md',
            borderBottom: '1px solid',
            borderColor: 'background.level2'
          },
          '& [aria-expanded="true"]': {
            boxShadow: `inset 0 -1px 0 ${theme.vars.palette.divider}`
          }
        })}
      >
        {orders.map(order => (
          <Accordion key={order.kodeOrder}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${order.kodeOrder}-content`}
              id={`panel-${order.kodeOrder}-header`}
            >
              <Typography level='title-sm'>
                Order: {order.kodeOrder} - Status: {order.status}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography level='body-xs'>User ID: {order.userId}</Typography>
              <Typography level='body-xs'>Alamat: {order.alamat}</Typography>
              <Typography level='body-xs'>Items:</Typography>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    <Typography level='body-xs'>
                      {item.name} - Qty: {item.qty} - Price: ${item.price}
                    </Typography>
                  </li>
                ))}
              </ul>
              <Box
                display={'flex'}
                justifyContent={'end'}
                alignContent={'flex-end'}
              >
              <Button variant='outlined' color='primary'>Invoice</Button>
                <Box>
                  <Tooltip title='Delete'>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </AccordionGroup>
    </Box>
  )
  // const [isAdd, setIsAdd] = useState(false);

  const [addresses, setAddresses] = useState([
    {
      name: 'Alamat Rumah',
      detailAlamat: 'Jalan Merpati No. 12',
      provinsi: 'Jawa Tengah',
      kabupaten: 'Banyumas',
      kecamatan: 'Purwokerto Barat'
    },
    {
      name: 'Alamat Kantor',
      detailAlamat: 'Kompleks Anggrek Blok B',
      provinsi: 'DKI Jakarta',
      kabupaten: 'Jakarta Selatan',
      kecamatan: 'Kebayoran Baru'
    }
  ])
  const Alamat = ({ addresses, setAddresses }) => {
    const [isAddAddress, setIsAddAddress] = useState(false)
    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectAddress, setSelectAddress] = useState({})
    const provinsiList = ['Jawa Barat', 'Jawa Tengah', 'Jawa Timur', "DKI Jakarta"] // Contoh data
    const kabupatenList = ['Bandung', 'Cirebon', 'Bogor', 'Jakarta Selatan'] // Contoh data
    const kecamatanList = ['Kecamatan A', 'Kecamatan B', 'Kecamatan C', "Kebayoran Baru"] // Contoh data
    const [formHeight, setFormHeight] = useState(0)
    const formRef = useRef(null)
    const chooseAddress = (address, action) => {
      console.log(address)
      setSelectAddress(address)
      console.log(action)
      if (action === 'delete') {
        setOpen(true)
      } else {
        setIsEdit(true);
        setIsAddAddress(true);
      }
    }

    const deleteAddress = () => {
      const filteredAddress = addresses.filter(item => item === selectAddress);
      console.log(filteredAddress);
      setAddresses(filteredAddress);
      setOpen(false);
    }
    const updateAddress = (updatedAddress) => {
    const updatedAddresses = addresses.map((address) => {
      if (address.name === updatedAddress.name) { // Compare by Name
        return updatedAddress; // Update the address
      }
      return address; // Return the unchanged address
    });
      setAddresses(updatedAddresses);
      setIsEdit(false);
  };

    // const delete
    useLayoutEffect(() => {
      if (isAddAddress && formRef.current) {
        setFormHeight(formRef.current.getBoundingClientRect().height)
      } else {
        setFormHeight(0)
      }
    }, [isAddAddress])

    const [newAddress, setNewAddress] = useState({

      name: '',
      detailAlamat: '',
      provinsi: '',
      kabupaten: '',
      kecamatan: ''
    })

    const handleInputChange = (e) => {
      const { name, value } = e.target
      if (isEdit) {
        setSelectAddress(prev => ({ ...prev, [name]: value }));
      } else {
        setNewAddress(prev => ({ ...prev, [name]: value }))
      }
    }

    // Handle form submission
    const handleSubmit = e => {
      e.preventDefault()
      if (isEdit) {
        updateAddress(selectAddress);
      } else {
          console.log(newAddress)
      console.log(addresses)
      // Update addresses state with new address
      setAddresses(prev => [...prev, newAddress])

      // Reset form
      setNewAddress({
        name: '',
        detailAlamat: '',
        provinsi: '',
        kabupaten: '',
        kecamatan: ''
      })
      // Hide the form after submission
      setIsAddAddress(false)
      }
    
    }

    const handleClick = () => {
      setIsAddAddress(true)
      //  console.log(addresses);
    }
    return (
      <Box
        margin={'0 10px'}
        sx={{ backgroundColor: 'neutral.50' }}
      >
        {!isAddAddress ? (
          <Button
            onClick={handleClick}
            sx={{ marginY: '10px' }}
            variant='solid'
            color='neutral'
          >
            Tambah Alamat
          </Button>
        ) : (
          ''
        )}
      {isAddAddress ? (
  <form
    onSubmit={handleSubmit}
    style={{ margin: '10px 0'}}
  >
    <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
      <Box>
        <FormControl>
          <FormLabel>Nama Alamat</FormLabel>
                  <Input
             disabled={isEdit}
            required
            placeholder='Nama'
            name='name'
            value={isEdit ? selectAddress.name : newAddress.name}
            onChange={handleInputChange}
            sx={{ marginBottom: '10px' }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Detail Alamat</FormLabel>
          <Textarea
            required
            placeholder='Detail Alamat'
            minRows={4}
            name='detailAlamat'
            value={isEdit ? selectAddress.detailAlamat : newAddress.detailAlamat}
            onChange={handleInputChange}
            sx={{ marginBottom: '10px' }}
          />
        </FormControl>
      </Box>
      <Box>
        <FormControl sx={{ marginBottom: '10px' }}>
          <FormLabel>Provinsi</FormLabel>
          <Select
            placeholder='Pilih Provinsi'
            value={isEdit ? selectAddress.provinsi : newAddress.provinsi}
            name='provinsi'
            onChange={(e, newValue) =>
              handleInputChange({
                target: { name: 'provinsi', value: newValue }
              })
            }
            required
          >
            {provinsiList.map(prov => (
              <Option key={prov} value={prov}>
                {prov}
              </Option>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ marginBottom: '10px' }}>
          <FormLabel>Kabupaten</FormLabel>
          <Select
            placeholder='Pilih Kabupaten'
            value={isEdit ? selectAddress.kabupaten : newAddress.kabupaten}
            name='kabupaten'
            onChange={(e, newValue) =>
              handleInputChange({
                target: { name: 'kabupaten', value: newValue }
              })
            }
            required
          >
            {kabupatenList.map(kab => (
              <Option key={kab} value={kab}>
                {kab}
              </Option>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ marginBottom: '10px' }}>
          <FormLabel>Kecamatan</FormLabel>
          <Select
            placeholder='Pilih Kecamatan'
                    value={isEdit ? selectAddress.kecamatan : newAddress.kecamatan}
                    
            name='kecamatan'
            onChange={(e, newValue) =>
              handleInputChange({
                target: { name: 'kecamatan', value: newValue }
              })
            }
            required
          >
            {kecamatanList.map(kec => (
              <Option key={kec} value={kec}>
                {kec}
              </Option>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
    <Button type='submit' variant='solid' color='success'>
      Simpan Alamat
    </Button>
    <Button
              onClick={() => {
                setIsAddAddress(false)
                setIsEdit(false)
              }   
              } 
      variant='outlined'
      style={{ marginLeft: '10px' }}
    >
      Batal
    </Button>
  </form>
) : (
          <AccordionGroup
            color='neutral'
            variant='outlined'
            sx={theme => ({
              [`& .${accordionClasses.root}`]: {
                marginTop: '0.5rem',
                transition: '0.2s ease',
                '& button:not([aria-expanded="true"])': {
                  transition: '0.2s ease',
                  paddingBottom: '0.625rem'
                },
                '& button:hover': {
                  background: 'transparent'
                }
              },
              [`& .${accordionClasses.root}.${accordionClasses.expanded}`]: {
                bgcolor: 'background.level1',
                borderRadius: 'md',
                borderBottom: '1px solid',
                borderColor: 'background.level2'
              },
              '& [aria-expanded="true"]': {
                boxShadow: `inset 0 -1px 0 ${theme.vars.palette.divider}`
              }
            })}
          >
            {addresses.map((address, index) => (
              <Accordion key={index}>
                <AccordionSummary
                  // expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel-${index}-content`}
                  id={`panel-${index}-header`}
                >
                  <Typography level='title-sm'>
                    {address.name} - {address.provinsi}, {address.kabupaten}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography level='body-xs'>
                    Detail Alamat: {address.detailAlamat}
                  </Typography>
                  <Typography level='body-xs'>
                    Provinsi: {address.provinsi}
                  </Typography>
                  <Typography level='body-xs'>
                    Kabupaten: {address.kabupaten}
                  </Typography>
                  <Typography level='body-xs'>
                    Kecamatan: {address.kecamatan}
                  </Typography>
                  <Box
                    display={'flex'}
                    justifyContent={'end'}
                    alignContent={'flex-end'}
                  >
                    <Box>
                      <Tooltip title='Delete'>
                        <IconButton
                          onClick={() => chooseAddress(address, 'delete')}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title='Edit'>
                        <IconButton
                          onClick={() => chooseAddress(address, 'edit')}
                        >
                          <EditOutlined />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionGroup>
        )}
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog variant='outlined' role='alertdialog'>
            <DialogTitle>
              <WarningRoundedIcon />
              Confirmation
            </DialogTitle>
            <Divider />
            <DialogContent>Yakin menghapus alamat ini?</DialogContent>
            <DialogActions>
              <Button
                variant='solid'
                color='danger'
                onClick={() => deleteAddress()}
              >
                Hapus Alamat
              </Button>
              <Button
                variant='plain'
                color='neutral'
                onClick={() => setOpen(false)}
              >
                Batal
              </Button>
            </DialogActions>
          </ModalDialog>
        </Modal>
      </Box>
    )
  }

  const Logout = () => {
    return (
       <Box
        margin={'0 10px'}
        sx={{ backgroundColor: 'neutral.50' }}
      >
        <Typography level='body-md'>Yakin Mau Logout?</Typography>
        <Button onClick={handleLogout}  variant='solid' color='neutral' sx={{marginY : '10px'}}>Logout</Button>
      </Box>
    )
  }
  const [list, setList] = useState([
    { name: 'Profil', component: <Profil /> },
    { name: 'Pemesanan', component: <Pemesanan /> },
    { name: 'Alamat', component: <Alamat /> },
    { name: 'Logout', component: <Logout /> }
  ]) // Empty dependency array means this will only be created once

  const [activeList, setActiveList] = useState('Profil') // State to track the active item
  const [activeComponent, setActiveComponent] = useState(<Profil />)
  const handleChange = item => {
    setActiveList(item.name)
    setActiveComponent(item.component)
  }

  // Memoize the Menu component
  const Menu = () => {
    switch (activeList) {
      case 'Profil':
        return <Profil />
      case 'Pemesanan':
        return <Pemesanan />
      case 'Alamat':
        return <Alamat addresses={addresses} setAddresses={setAddresses} />
      case 'Logout':
        return <Logout />
      default:
        return null
    }
  }

  return (
    <div>
      <Box
        border={1}
        borderColor={'darkgray'}
        borderRadius={'3px'}
        marginTop={'80px'}
        width={'80%'}
        marginX={'auto'}
      >
        <Box
          borderBottom={1}
          borderColor={'darkgray'}
          width={'100%'}
          padding={'5px'}
          sx={{
            backgroundColor: '#eee'
          }}
        >
          <Typography>Account</Typography>
        </Box>
        <Box display={'flex'} width={'100%'} padding={'10px'}>
          <Box
            width={'30%'}
            maxHeight={'auto'}
            display={'flex'}
            flexDirection={'column'}
          >
            <List component='nav' sx={{ padding: 0 }}>
              {list.map((item, index) => (
                <ListItemButton
                  key={index}
                  onClick={() => handleChange(item)} // Set active item on click
                  sx={{
                    backgroundColor:
                      activeList === item.name ? '#708090' : '#eee', // Change background if active
                    color: activeList === item.name ? 'white' : 'black', // Change text color if active
                    borderBottom: '1px solid #ccc' // Border between items
                  }}
                >
                  <p>{item.name}</p>
                </ListItemButton>
              ))}
            </List>
          </Box>
          <Box width={'70%'}>
            <Menu />
            {/* {
                list.map((item, index) => (
                  <Box key={index} display={activeList === item.name ? 'block' : 'none' }>
                    { item.component}
                            </Box>
                          ))
                        } */}

            {/* {activeComponent} */}
          </Box>
        </Box>
      </Box>
        <Snackbar
        open={showSnackBar}
        onClose={handleSnackbarClose}
        color='success'
        variant='solid'
        autoHideDuration={3000} // Closes automatically after 3 seconds
        message="Logout Sukses!" // Message to display
      > Logout Sukses! </Snackbar>
    </div>
  )
}

export default Profile
