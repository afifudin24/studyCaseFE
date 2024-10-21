import React, {useState, useEffect} from "react";
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
} from '@mui/joy';

const Cart = () => {
     const [keranjang, setKeranjang] = useState([
    { namaBarang: 'namabarang1', qty: 3, hargaPerItem: 4000 },
    { namaBarang: 'namabarang2', qty: 2, hargaPerItem: 5000 },
    { namaBarang: 'namabarang3', qty: 1, hargaPerItem: 3000 },
  ]);
 // useEffect untuk menghitung subtotal setiap kali keranjang berubah
  useEffect(() => {
    const total = keranjang.map(item => item.qty * item.hargaPerItem).reduce((acc, curr) => acc + curr, 0);
    setSubtotal(total);
  }, [keranjang]); // Dependensi keranjang

  // State untuk subtotal
    const [subtotal, setSubtotal] = useState(0);
    
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
          <Typography fontWeight={'bold'}>Keranjang Belanja</Typography>
                </Box>
                <Box padding={'10px'}>
                    <Typography>Sub Total {subtotal}</Typography>
                     <Table aria-label="basic table">
      <thead>
        <tr>
          <th>Gambar</th>
          <th>Barang</th>
          <th>Harga Per Item</th>
          <th>QTY</th>
         
        </tr>
      </thead>
                        <tbody>
                            {
                                keranjang.length > 0 ? (
                                    keranjang.map((item, index) => (
                                                <tr>
          <td>Gambar</td>
                                            <td>{ item.namaBarang}</td>
                                            <td>{ item.hargaPerItem}</td>
                                            <td>{ item.qty}</td>
         
        </tr>
                                    ))
                                ) : 'Tidak Ada Data'
                            }
    
      
      </tbody>
    </Table>
            </Box>
            </Box>
           
            </div>
    )
}

export default Cart;