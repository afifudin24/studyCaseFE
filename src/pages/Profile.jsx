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
import TopBar from '../components/TopBar/TopBar';
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
import authService from '../app/api/auth/authService';
import deliveryAddressService from '../app/api/deliveryAddress/deliveryAddressService';
import ZoneServices from '../app/api/zoneServices/zoneServices';
function Profile() {
 const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(''); // State for dynamic Snackbar message
  const [snackbarColor, setSnackbarColor] = useState(''); // State for dynamic Snackbar message
  const [isLogin, setIsLogin] = useState(true);
  const [provinsi, setProvinsi] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [kabupaten, setKabupaten] = useState([]);
  const [totalCartItem, setTotalCartItems] = useState(2);
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



  const handleLogout = async () => {
    // dispatch(logout()); // Dispatch loginSuccess action on successful login
    try {
      const response = await authService.logout();
      console.log(response);
      if (response.data.error === 1) {
        setShowSnackBar(true);
        setSnackbarMessage(response.data.message);
        setSnackbarColor('danger');
      } else {
        setShowSnackBar(true);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
         setSnackbarMessage(response.data.message);
        setSnackbarColor('success');
        setTimeout(() => {
          navigate('/');
          }, 1000);
      }
    } catch (err) { 
      console.log(err);
    }
    
    // setTimeout(() => {
    //   navigate('/');
    // }, 1000);
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
      const [addressList, setAddressList] = useState([]);
    const [selectAddress, setSelectAddress] = useState({})
    const [provinsi, setProvinsi] = useState([]);
    const [selectedProvinsi, setSelectedProvinsi] = useState(null);
    const [kabupaten, setKabupaten] = useState([]);
    const [selectedKabupaten, setSelectedKabupaten] = useState(null);
    const [kecamatan, setKecamatan] = useState([]);
    const [selectedKecamatan, setSelectedKecamatan] = useState(null);
    const [kelurahan, setkelurahan] = useState([]);
    const [selectedKelurahan, setSelectedKelurahan] = useState(null)
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

    const getAddress = async () => {
      try {
        const response = await deliveryAddressService.getDeliveryAddress();
        console.log('address', response);
        setAddressList(response.data);
      } catch (err) { 
        console.log(err);
        }
    }
      const getProvinsi = async () => {
    try {
      const response = await ZoneServices.getProvinces();
      const data = response;
      console.log(data);
      setProvinsi(data);

      // setProvinsi(response);
    } catch (err) {
      console.log(err);
    }
    }
    const getCountry = async () => {
      try {
        const response = await ZoneServices.getCountry(selectedProvinsi);
        console.log('kabupaten', response);
        const data = response;
        setKabupaten(data);
      } catch (err) {
        console.log(err);
      }
    }
    const getDistrict = async () => {
      try {
        const response = await ZoneServices.getDistrict(selectedKabupaten);
        console.log(response);
        const data = response;
        setKecamatan(data);
      } catch (err) {
        console.log(err);
      }
    }
    const getVillages = async () => {
      try {
        const response = await ZoneServices.getVillages(selectedKecamatan);
        console.log(response);
        const data = response;
        setkelurahan(data);
      } catch (err) {
        console.log(err);
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
      kecamatan: '',
      kelurahan : ''
    })

    const handleInputChange = (e) => {
      const { name, value, id } = e.target
      console.log(value);
      if (name === 'provinsi') {
        setSelectedProvinsi(id? id : '');
      } else if (name === 'kabupaten') {
        setSelectedKabupaten(id ? id : '');
      } else if(name === 'kecamatan') {
        setSelectedKecamatan(id? id : '');
      } else {
        setSelectedKabupaten(id ? id : '');
      }
      if (isEdit) {
        setSelectAddress(prev => ({ ...prev, [name]: value? value : '' }));
      } else {
        setNewAddress(prev => ({ ...prev, [name]: value? value : '' }))
      }
    }

    // Handle form submission
    const handleSubmit = e => {
      e.preventDefault()
      if (isEdit) {
        updateAddress(selectAddress);
      } else {
          console.log('ini address baru', newAddress)
      console.log(addresses)
      // Update addresses state with new address
      // setAddresses(prev => [...prev, newAddress])

      // Reset form
      setNewAddress({
        name: '',
        detail: '',
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
    useEffect(() => {
      getAddress();
    }, []);
    
    useEffect(() => {
      getProvinsi();
    }, [])

    useEffect(() => {
      if (selectedProvinsi) {
        getCountry();
        console.log(newAddress);
      }
    }, [selectedProvinsi]);

    useEffect(() => {
      if (selectedKabupaten) {
        getDistrict();
      }
    }, [selectedKabupaten]);
    useEffect(() => {
      if (selectedKecamatan) {
        getVillages();
      }
    }, [selectedKecamatan]);
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
            minRows={6}
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
           onChange={(e, newValue) => {
      // Misalkan Anda ingin menambahkan id provinsi yang dipilih
      const selectedProvinsi = provinsi.find(prov => prov.name === newValue);
      handleInputChange({
        target: {
          name: 'provinsi',
          value: newValue,
          id: selectedProvinsi ? selectedProvinsi.id : null, // Menambahkan id provinsi
          type: 'provinsi', // Menambahkan tipe
        }
      });
    }}
            required
          >
            {provinsi.map(prov => (
              <Option key={prov.id} value={prov.name}>
                {prov.name}
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
           onChange={(e, newValue) => {
      // Misalkan Anda ingin menambahkan id provinsi yang dipilih
      const selectedKabupaten = kabupaten.find(kab => kab.name === newValue);
      handleInputChange({
        target: {
          name: 'kabupaten',
          value: newValue,
          id: selectedKabupaten ? selectedKabupaten.id : null, // Menambahkan id provinsi
          type: 'kabupaten', // Menambahkan tipe
        }
      });
    }}
            required
          >
            {kabupaten.map(kab => (
              <Option key={kab.id} value={kab.name}>
                {kab.name}
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
              onChange={(e, newValue) => {
      // Misalkan Anda ingin menambahkan id provinsi yang dipilih
      const selectedKecamatan = kecamatan.find(kec => kec.name === newValue);
      handleInputChange({
        target: {
          name: 'kecamatan',
          value: newValue,
          id: selectedKecamatan ? selectedKecamatan.id : null, // Menambahkan id provinsi
          type: 'kecamatan', // Menambahkan tipe
        }
      });
    }}
            required
          >
            {kecamatan.map(kec => (
              <Option key={kec.id} value={kec.name}>
                {kec.name}
              </Option>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ marginBottom: '10px' }}>
          <FormLabel>Kelurahan</FormLabel>
          <Select
            placeholder='Pilih Kelurahan'
                    value={isEdit ? selectAddress.kelurahan : newAddress.kelurahan}
                    
            name='kelurahan'
              onChange={(e, newValue) => {
      // Misalkan Anda ingin menambahkan id provinsi yang dipilih
      const selectedKelurahan = kelurahan.find(kel => kel.name === newValue);
      handleInputChange({
        target: {
          name: 'kelurahan',
          value: newValue,
          id: selectedKelurahan ? selectedKelurahan.id : null, // Menambahkan id provinsi
          type: 'kelurahan', // Menambahkan tipe
        }
      });
    }}
            required
          >
            {kelurahan.map(kel => (
              <Option key={kel.id} value={kel.name}>
                {kel.name}
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
            {addressList.map((address, index) => (
              <Accordion key={index}>
                <AccordionSummary
                  // expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel-${index}-content`}
                  id={`panel-${index}-header`}
                >
                  <Typography level='title-sm'>
                    {address.nama} 
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography level='body-xs'>
                    Detail Alamat: {address.detail}
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
        <TopBar
        totalCartItems={totalCartItem}
        setTotalCartItems={setTotalCartItems}
        isLogin={isLogin}
      />
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
