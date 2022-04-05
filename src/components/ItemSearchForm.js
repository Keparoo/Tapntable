import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import FilteredItems from '../components/FilteredItems';
import { useSelector } from 'react-redux';

const ItemSearchForm = ({ save, cancel }) => {
  console.debug('ItemSearchForm');

  const items = useSelector((st) => st.items);
  const [ filtered, setFiltered ] = useState(items);
  const [ item, setItem ] = useState('');

  const filter = (e) => {
    e.preventDefault();
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = filtered.filter((item) => {
        const re = new RegExp(`${keyword}`, 'i');
        return (
          item.name.search(re) !== -1 ||
          (item.description && item.description.search(re) !== -1)
        );
      });
      setFiltered(results);
    } else {
      // If the text field is empty, show all items
      setFiltered(items);
    }

    setItem(keyword);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          '& > :not(style)': { m: 1, width: '30ch' },
          justifyContent: 'center'
        }}
        noValidate
        autoComplete="off"
        justifyContent="center"
        align="center"
      >
        <TextField
          type="text"
          id="item"
          name="item"
          label="Item"
          variant="outlined"
          value={item}
          onChange={filter}
          autoFocus={true}
        />

        <Button onClick={filter} variant="contained">
          Clear
        </Button>
      </Box>
      <FilteredItems items={filtered} />
    </React.Fragment>
  );
};

export default ItemSearchForm;
