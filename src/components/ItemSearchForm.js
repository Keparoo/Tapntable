import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsFromAPI } from '../actions/items';

import {
  TextField,
  Button,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack
} from '@mui/material';
import FilteredItems from '../components/FilteredItems';
import Spinner from './Spinner';

const ItemSearchForm = ({ updateCount }) => {
  console.debug('ItemSearchForm');

  const items = useSelector((st) => st.items);
  const [ filtered, setFiltered ] = useState(items);
  const [ item, setItem ] = useState('');
  const [ category, setCategory ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(true);
  const dispatch = useDispatch();

  useEffect(
    () => {
      console.debug('ItemList useEffect on Mount');

      async function fetchItem() {
        dispatch(fetchItemsFromAPI());
        setIsLoading(false);
      }
      if (isLoading) {
        fetchItem();
      }
      setIsLoading(false);
    },
    [ dispatch, isLoading ]
  );

  // Filter items comparing keyword to item.name and item.description
  const filter = (e) => {
    e.preventDefault();
    const keyword = e.target.value;

    // if (category !== 'All')
    //   setFiltered(filtered.filter((i) => i.category === category));

    if (keyword !== '') {
      const results = filtered.filter((item) => {
        const re = new RegExp(`${keyword}`, 'i');
        if (category) {
          console.log('category', category);
          return (
            item.category === category &&
            (item.name.search(re) !== -1 ||
              (item.description && item.description.search(re) !== -1))
          );
        } else {
          console.log('no category');
          return (
            item.name.search(re) !== -1 ||
            (item.description && item.description.search(re) !== -1)
          );
        }
      });
      setFiltered(results);
    } else {
      // If the text field is empty, show all items
      setFiltered(items);
    }

    setItem(keyword);
  };

  const handleRadio = (e) => {
    if (e.target.value === 'All') setCategory(null);
    else {
      console.log('There is no category');
      setCategory(e.target.value);
    }
    console.log(e.target.value);
  };

  if (isLoading) return <Spinner />;

  if (!isLoading && items.length === 0) {
    return <b>No items in database</b>;
  }

  return (
    <React.Fragment>
      <Stack ml={3}>
        <Box
          noValidate
          autoComplete="off"
          justifyContent="center"
          align="center"
        >
          <TextField
            type="text"
            id="item"
            name="item"
            label="Item Filter"
            variant="outlined"
            value={item}
            onChange={filter}
            autoFocus={true}
          />

          <Button
            onClick={filter}
            variant="contained"
            sx={{ marginLeft: '8px', marginTop: '10px' }}
          >
            Clear
          </Button>

          <FormControl sx={{ marginLeft: '24px' }}>
            <FormLabel id="item-category-group-label">Item Category</FormLabel>
            <RadioGroup
              row
              aria-labelledby="item-category-buttons"
              name="item-category"
              onChange={handleRadio}
              defaultValue="All"
            >
              <FormControlLabel value="All" control={<Radio />} label="All" />
              <FormControlLabel
                value="Food"
                control={<Radio />}
                label="Food & Bev"
              />
              <FormControlLabel
                value="Liquor"
                control={<Radio />}
                label="Liquor"
              />
              <FormControlLabel value="Beer" control={<Radio />} label="Beer" />
              <FormControlLabel value="Wine" control={<Radio />} label="Wine" />
            </RadioGroup>
          </FormControl>
        </Box>
      </Stack>
      <FilteredItems items={filtered} click={updateCount} />
    </React.Fragment>
  );
};

export default ItemSearchForm;

/* Item categories
(1, 'Appetizer'),  (2, 'Soup'), (3, 'Salad'), (4, 'Sandwich'), (5, 'Entree'), (6, 'Addition'), (7, 'Dessert'), (8, 'Favorites'), (9, 'Beverage'), (10, 'Beer'), (11, 'Wine'), (12, 'Liquor'),(13, 'Children'), (14, 'Carryout'), (15, 'Delivery')
*/
