import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
    { id : 1, namaBarang: 'namabarang1', qty: 3, hargaPerItem: 4000 },
    { id : 2, namaBarang: 'namabarang2', qty: 2, hargaPerItem: 5000 },
    { id : 3,  namaBarang: 'namabarang3', qty: 1, hargaPerItem: 3000 },
  ]);
 // useEffect untuk menghitung subtotal setiap kali keranjang berubah
  useEffect(() => {
    const total = keranjang.map(item => item.qty * item.hargaPerItem).reduce((acc, curr) => acc + curr, 0);
    setSubtotal(total);
  }, [keranjang]); // Dependensi keranjang

  // State untuk subtotal
    const [subtotal, setSubtotal] = useState(0);
  const decOrIncQty = (action, item) => {
    console.log(item);
  // Cari item dalam keranjang berdasarkan ID atau nama
  const foundItem = keranjang.find((cartItem) => cartItem.id === item.id);

  if (foundItem) {
    if (action === "dec") {
      // Kurangi kuantitas jika kuantitas lebih dari 1
      if (foundItem.qty > 1) {
        foundItem.qty -= 1;
      } else {
        // Jika kuantitas mencapai 0, Anda mungkin ingin menghapus item
        console.log("Hapus item dari keranjang");
      }
    } else if (action === "inc") {
      // Tambah kuantitas
      foundItem.qty += 1;
    }
  } else {
    console.log("Item tidak ditemukan dalam keranjang");
  }

  // Update state dengan data baru
  setKeranjang([...keranjang]);
};

  const deleteItemCart = (item) => {
    const filteredCart = keranjang.filter(itm => itm !== item);
    console.log(filteredCart);
    setKeranjang(filteredCart);
  }
    return (
            <div>
      <Box
        border={1}
                borderColor={'darkgray'}
                overflow={'hidden'}
        borderRadius={'5px'}
        marginTop={'80px'}
        width={'70%'}
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
          <th style={{width: '10%'}}>#</th>
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
                                                <tr key={index}>
          <td><Button onClick={() => deleteItemCart(item)} color="danger">-</Button></td>
          <td>Gambar</td>
                                            <td>{ item.namaBarang}</td>
                                            <td>{ item.hargaPerItem}</td>
                                            <td> <Button onClick={() => decOrIncQty("dec", item)} variant="outlined" color="neutral">-</Button> { item.qty} <Button variant="outlined" color="neutral" onClick={()  => decOrIncQty("inc", item)}>+</Button></td>
         
        </tr>
                                    ))
                                ) : 'Tidak Ada Data'
                            }
    
      
      </tbody>
            </Table>
            <Link to={'/checkout'}>
            <Button style={{margin : '10px 0'}} variant="solid" color="neutral" fullWidth>Checkout</Button>
            </Link>
            </Box>
            </Box>
           
            </div>
    )
}

export default Cart;