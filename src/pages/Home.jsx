import React, { useEffect } from "react";
import { useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import { Sheet, Box } from "@mui/joy";
import TagList from "../components/TagList/TagList";
import Pagination from "../components/Pagination/Pagination";
import ListProduct from "../components/CardProduct/ListProduct";
const Home = ({totalCartItems, setTotalCartItems}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [tags, setTags] = useState(["tag1", "tag2", "tag3", "tag4", "tag5", "tag6", "tag7", "tag8"]);
  const [chooseTags, setChooseTags] = useState([]);
  const [chooseKategori, setChooseKategori] = useState('kategori');
  const [searchValue, setSearchValue] = useState(null);
      const [product, setProduct] = useState([
    {
      nama: 'Product 1',
      kategori: 'Food',
      tags: ['tag1', 'tag2'],
      harga: 100000
    },
    {
      nama: 'Product 2',
      kategori: 'Drink',
      tags: ['tag3', 'tag4'],
      harga: 150000
    },
    {
      nama: 'Product 3',
      kategori: 'Drink',
      tags: ['tag5', 'tag6'],
      harga: 200000
    },
    {
      nama: 'Product 4',
      kategori: 'Food',
      tags: ['tag7', 'tag8'],
      harga: 250000
    },
    {
      nama: 'Product 5',
      kategori: 'Food',
      tags: ['tag9', 'tag10'],
      harga: 300000
    },
    {
      nama: 'Product 6',
      kategori: 'Drink',
      tags: ['tag11', 'tag12'],
      harga: 350000
    },
    {
      nama: 'Product 7',
      kategori: 'Food',
      tags: ['tag13', 'tag14'],
      harga: 400000
    },
    {
      nama: 'Product 8',
      kategori: 'Drink',
      tags: ['tag15', 'tag16'],
      harga: 450000
    },
    {
      nama: 'Product 9',
      kategori: 'Drink',
      tags: ['tag17', 'tag18'],
      harga: 500000
    },
    {
      nama: 'Product 10',
      kategori: 'Food',
      tags: ['tag19', 'tag20'],
      harga: 550000
    },
    {
      nama: 'Product 9',
      kategori: 'Food',
      tags: ['tag17', 'tag18'],
      harga: 500000
    },
    {
      nama: 'Product 10',
      kategori: 'Drink',
      tags: ['tag19', 'tag20'],
      harga: 550000
    },
      ]);
    
  const [showProduct, setShowProduct] = useState([]);
  useEffect(() => {
    setShowProduct(product);
    setIsLoading(false);
  }, [product]);

  const search = (kategori, searchValue) => {
     setIsLoading(true);
    let filteredProducts = [...product];
    
    // Jika kategori terpilih (tidak sama dengan "kategori")
    if (kategori !== "kategori") {
        filteredProducts = filteredProducts.filter(item => 
            item.kategori.toLowerCase() === kategori.toLowerCase()
        );
    }
    
    // Jika ada nilai searchValue
    if (searchValue && searchValue.trim() !== "") {
        filteredProducts = filteredProducts.filter(item =>
            item.nama.toLowerCase().includes(searchValue.toLowerCase())
        );
    }
    
    setShowProduct(filteredProducts);
    // console.log(filteredProducts);
}

  const handleSearch = () => {
    console.log(searchValue);
    console.log(chooseKategori);
    search(chooseKategori, searchValue);
  }

 useEffect(() => {
  console.log(chooseTags);
  const filteredProducts = product.filter((item) => {
    // Memeriksa apakah ada irisan antara tags produk dengan chooseTags
    return item.tags.some(tag => chooseTags.includes(tag));
  });
  console.log(filteredProducts); // Untuk melihat hasil filter
   // setShowProduct(filteredProducts); // Jika ingin mengupdate state product
   if (filteredProducts.length > 0) {
     setShowProduct(filteredProducts);
   } else {
     setShowProduct(product);
   }
}, [chooseTags]);

    setTimeout(() => {
        setIsLoading(false);
    }, 3000);   

    return (
        <Sheet sx={
            {width : '90%', overflowY : 'hidden', height : '100vh', margin: '0 auto'}
        }>
            <SearchBar handleSearch={handleSearch} chooseKategori={chooseKategori} setChooseKategori={setChooseKategori} searchValue={searchValue} setSearchValue={setSearchValue} />
            <Box display={'flex'} gap={1} margin={'10px 0'}>
                <h5 style={{display : 'inline-block'}}>Tags :</h5>
            <TagList tags={tags} setTags={setTags} chooseTags={chooseTags} setChooseTags={setChooseTags} />
            </Box>
           <Box sx={{
                /* Menyembunyikan scrollbar pada elemen */
                '&::-webkit-scrollbar': {
                    display: 'none', // Menyembunyikan scrollbar di Webkit (Chrome, Safari)
                },
                '-ms-overflow-style': 'none', // Menyembunyikan scrollbar di Internet Explorer dan Edge
                'scrollbar-width': 'none', // Menyembunyikan scrollbar di Firefox
            }} paddingBottom={'20px'} width={'100%'} overflow={'scroll'} height={'80vh'} margin={'10px 0'}>
                <ListProduct totalCartItems={totalCartItems} setTotalCartItems={setTotalCartItems} isLoading={isLoading} product={showProduct} setProduct={setShowProduct} />
                </Box>
         
            <Box sx={{
                textAlign : 'center',
                width: '100%',
                padding : '10px 0',
                position: 'fixed',
                bottom: '0',
                left: '0',
                right : '0',
                zIndex : '100',
                margin: '0 auto',
                backgroundColor : 'lightseagreen'
            }} >
                 
                
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={3} />
            </Box>
           
       </Sheet>
    )
}

export default Home;