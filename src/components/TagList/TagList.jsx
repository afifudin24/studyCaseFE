import React from 'react';
import { useState } from 'react';
import { Box } from '@mui/joy';
import Chip from '@mui/joy/Chip';
import { LocalOffer } from '@mui/icons-material';
const TagList = ({tags, setTags, chooseTags, setChooseTags}) => {
   
    const handleChipClick = (e) => {
       const cekData = chooseTags.includes(e);

    if (cekData) {
       const newTags = chooseTags.filter((item) => item !== e);
            setChooseTags(newTags);
            console.log('Data dihapus:', e);
    } else {
       setChooseTags([...chooseTags, e]);
            console.log('Data ditambahkan:', e);
    }
    }
    return (
        <Box display={'flex'} gap={1}>
            { 
                tags.length > 0 ? (
                    tags.map((item, index) => (
                        <Chip
            key={index}
                            size="sm"
                            
            color={chooseTags.find((itm) => itm === item) ? 'neutral' : 'neutral'} // Set color based on selection
            onClick={() => handleChipClick(item)} // Trigger the click handler
            variant={chooseTags.find((itm) => itm === item) ? 'solid' : 'outlined'} // Optional: change variant based on selection
          >
            <Box display="flex" alignItems="center" padding={'2px'}>
        <LocalOffer sx={{ fontSize: 16, marginRight: 0.5 }} /> {/* Icon with margin */}
        {item}
      </Box>
          </Chip>
                ))
                ) : ''
            }
        </Box>
    )
}


export default TagList;