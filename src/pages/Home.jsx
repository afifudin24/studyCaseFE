import React from "react";
import { useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import { Sheet, Box } from "@mui/joy";
import TagList from "../components/TagList/TagList";
import Pagination from "../components/Pagination/Pagination";
import ListProduct from "../components/CardProduct/ListProduct";
const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [tags, setTags] = useState(["Tag1", "Tag2", "Tag3"]);
    const [chooseTags, setChooseTags] = useState([]);
      const [product, setProduct] = useState([
    {
      nama: 'Product 1',
      kategori: 'Category A',
      tags: ['tag1', 'tag2'],
      harga: 100000
    },
    {
      nama: 'Product 2',
      kategori: 'Category B',
      tags: ['tag3', 'tag4'],
      harga: 150000
    },
    {
      nama: 'Product 3',
      kategori: 'Category C',
      tags: ['tag5', 'tag6'],
      harga: 200000
    },
    {
      nama: 'Product 4',
      kategori: 'Category D',
      tags: ['tag7', 'tag8'],
      harga: 250000
    },
    {
      nama: 'Product 5',
      kategori: 'Category E',
      tags: ['tag9', 'tag10'],
      harga: 300000
    },
    {
      nama: 'Product 6',
      kategori: 'Category F',
      tags: ['tag11', 'tag12'],
      harga: 350000
    },
    {
      nama: 'Product 7',
      kategori: 'Category G',
      tags: ['tag13', 'tag14'],
      harga: 400000
    },
    {
      nama: 'Product 8',
      kategori: 'Category H',
      tags: ['tag15', 'tag16'],
      harga: 450000
    },
    {
      nama: 'Product 9',
      kategori: 'Category I',
      tags: ['tag17', 'tag18'],
      harga: 500000
    },
    {
      nama: 'Product 10',
      kategori: 'Category J',
      tags: ['tag19', 'tag20'],
      harga: 550000
    },
    {
      nama: 'Product 9',
      kategori: 'Category I',
      tags: ['tag17', 'tag18'],
      harga: 500000
    },
    {
      nama: 'Product 10',
      kategori: 'Category J',
      tags: ['tag19', 'tag20'],
      harga: 550000
    },
      ]);
    
    setTimeout(() => {
        setIsLoading(false);
    }, 3000);   

    return (
        <Sheet sx={
            {width : '90%', overflowY : 'hidden', height : '100vh', margin: '0 auto'}
        }>
            <SearchBar />
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
                <ListProduct isLoading={isLoading} product={product} setProduct={setProduct} />
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