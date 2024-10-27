import React, { useState } from 'react'
import {
  Button,
  Box,
  Typography,
  Checkbox,
  FormControl,
  FormLabel,
  Table
} from '@mui/joy'

const Checkout = () => {
  const [step, setStep] = useState(1) // To track the current step in the process
  const [selectedAddresses, setSelectedAddresses] = useState([]) // Track selected addresses
  const [confirmed, setConfirmed] = useState(false)

  // Sample list of addresses
  const addresses = [
    { id: 1, name: 'Alamat Rumah', label: '123 Main St, Cityville' },
    { id: 2, name: 'Alamat Kantor', label: '456 Elm St, Townsville' },
    { id: 3, name: 'Alamat Cadangan', label: '789 Oak St, Hamlet' }
  ]

  // Handle selecting and deselecting addresses
  const handleAddressSelect = id => {
    setSelectedAddresses(
      prevSelected =>
        prevSelected.includes(id)
          ? prevSelected.filter(addressId => addressId !== id) // Remove if already selected
          : [...prevSelected, id] // Add if not selected
    )
  }

  // Proceed to the next step
  const handleNext = () => {
    setStep(prevStep => prevStep + 1)
  }

  // Go back to the previous step
  const handleBack = () => {
    setStep(prevStep => prevStep - 1)
  }

  // Confirm the details
  const handleConfirm = () => {
    setConfirmed(true)
    handleNext()
  }

  // Submit payment and show receipt
  const handlePayment = () => {
    // Placeholder for payment logic
    handleNext()
  }

  return (
    <>
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
                      <Typography fontWeight={'bold'}>{ step === 3 ? 'Invoices' : 'Checkout'}</Typography>
          </Box>
          <Box padding={'10px'}>
            <Box padding={'5px'}>
              {step === 1 && (
                <Box>
                  <Typography variant='h5'>Pilih Alamat Pengiriman</Typography>
                  {selectedAddresses.length > 0 ? (
                    <Typography variant='body1'>
                      Alamat Terpilih: {selectedAddresses.length}
                    </Typography>
                  ) : (
                    ''
                  )}

                  <Box marginTop={'10px'}>
                    <Table>
                      <thead>
                        <tr>
                          <th style={{ width: '10%' }}>#</th>
                          <th>Nama</th>
                          <th>Alamat</th>
                        </tr>
                      </thead>
                      <tbody>
                        {addresses.map(address => (
                          <tr>
                            {/* <FormControl key={address.id} fullWidth sx={{ marginBottom: 1 }}> */}
                            <td>
                              <Checkbox
                                checked={selectedAddresses.includes(address.id)}
                                onChange={() => handleAddressSelect(address.id)}
                              />
                            </td>
                            <td>
                              <FormLabel>{address.name}</FormLabel>
                            </td>
                            <td>
                              <FormLabel>{address.label}</FormLabel>
                            </td>

                            {/* </FormControl> */}
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Box>
                  <Box display={'flex'} justifyContent={'flex-end'}>
                    <Button
                      onClick={handleNext}
                      variant='solid'
                      color='primary'
                      disabled={selectedAddresses.length === 0} // Disable if no address is selected
                      sx={{ marginTop: '10px' }}
                    >
                      Selanjutnya
                    </Button>
                  </Box>
                </Box>
              )}

              {step === 2 && (
                <Box>
                  <Typography variant='h5'>Konfirmasi</Typography>
                  <Table aria-label='basic table'>
                    <tr>
                      <td>Alamat</td>
                      <td>
                        {selectedAddresses.map(id => (
                            <Typography key={id}>
                           
                            {addresses.find(addr => addr.id === id).label}
                          </Typography>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <td>Sub Total</td>
                      <td> Rp. 60000</td>
                    </tr>
                    <tr>
                      <td>Ongkir</td>
                      <td>Rp. 23000</td>
                    </tr>
                    <tr>
                      <td>Total</td>
                      <td>Rp. 83000</td>
                    </tr>
                  </Table>

                  <Box
                    marginTop={'10px'}
                    display={'flex'}
                    justifyContent={'space-between'}
                  >
                    <Button onClick={handleBack} variant='soft' color='neutral'>
                      Sebelumnya
                    </Button>
                    <Button
                      onClick={handleConfirm}
                      variant='solid'
                      color='primary'
                      sx={{ marginLeft: 2 }}
                    >
                      Konfirmasi
                    </Button>
                  </Box>
                </Box>
              )}

              {step === 3 && confirmed && (
                <Box>
                  {/* <Typography variant='h5'>Payment</Typography> */}
                                  <Table>
                                      <tr>
                                          <td>Status</td>
                                          <td>Waiting Payment</td>
                                      </tr>
                                      <tr>
                                          <td>
                                          Order ID
                                          </td>
                                          <td>#4</td>
                                      </tr>
                                      <tr>
                                          <td>
                                          Total Tagihan
                                          </td>
                                          <td>
                                              Rp. 25000
                                          </td>
                                          
                                      </tr>
                                      <tr>
                                          <td>
                                          Tagihan untuk
                                          </td>
                                          <td>
                                              <h3>Afif Waliyudin</h3>
                                              <p>afifrider507@gmail.com</p>
                                              <p>    {selectedAddresses.map(id => (
                            <Typography key={id}>
                           
                            {addresses.find(addr => addr.id === id).label}
                          </Typography>
                        ))} </p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td>Bayar ke</td>
                                          <td>
                                               <p>Afif Waliyudin</p>
                                              <p>afifrider507@gmail.com</p>
                                              <p>BCA</p>
                                              <p>8743659233477584</p>
                                          </td>
                                      </tr>
                                  </Table>
                                      
                  <Box marginTop={'10px'}>
                    <Button onClick={handleBack} variant='soft' color='neutral'>
                      Sebelumnya
                    </Button>
                    <Button
                      onClick={handlePayment}
                      variant='solid'
                      color='neutral'
                      sx={{ marginLeft: 2 }}
                    >
                      Bayar
                    </Button>
                  </Box>
                </Box>
              )}

              {step === 4 && (
                <Box>
                  <Typography variant='h5'>Payment Receipt</Typography>
                  <Typography>
                    Thank you for your purchase! Your payment was successful.
                  </Typography>
                  <Typography>Addresses used for delivery:</Typography>
                  <Box marginTop={'10px'}>
                    {selectedAddresses.map(id => (
                      <Typography key={id}>
                        {addresses.find(addr => addr.id === id).label}
                      </Typography>
                    ))}
                  </Box>
                  <Button
                    onClick={() => setStep(1)} // Reset to the first step if needed
                    variant='soft'
                    color='neutral'
                    sx={{ marginTop: 2 }}
                  >
                    Back to Checkout
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </div>
    </>
  )
}

export default Checkout
