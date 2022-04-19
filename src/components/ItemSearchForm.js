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

/**
 * 
 * ItemSearchForm Component
 * 
 * Display a list of items filtered by the following:
 *  categories: All, Liquor, Beer, Wine
 *    Food & Bev returns all food and non-alchoholic beverages
 * keywords: characters in the item filter field will filter by both
 *  selected category and characaters found in either the name or description
 *  this is case insensitive
 * 
 * Called by ItemDashboard, ItemCount
 * Calls FilteredItems (component to display the filtered items), Spinner
 * 
 */

const ItemSearchForm = ({ updateItem, message }) => {
  console.debug('ItemSearchForm', message);

  const items = useSelector((st) => st.items);
  const [ filtered, setFiltered ] = useState(items);
  const [ item, setItem ] = useState('');
  const [ category, setCategory ] = useState('All');
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

  // Filter items by category and by comparing keyword to item.name and item.description
  const filter = (e) => {
    e.preventDefault();
    let keyword;

    if (e.target.name === 'item-category') {
      console.log('Radio Button', e.target.value, keyword);
      setCategory(e.target.value);
    } else if (e.target.name === 'item') {
      console.log('Keyword', e.target.value, e);
      keyword = e.target.value;
    } else {
      // e.target.name === 'clear'
      console.log('Clear', category);
      keyword = undefined;
      e.target.name = 'clear';
      e.target.value = category;
      setItem('');
    }

    let results;
    const foodBev = new Set([
      'Appetizer',
      'Soup',
      'Salad',
      'Sandwich',
      'Entree',
      'Addition',
      'Dessert',
      'Favorites',
      'Beverage',
      'Children'
    ]);

    if (e.target.name)
      if (!keyword) {
        results = items.filter((item) => {
          if (e.target.value === 'All') return true;
          if (e.target.value === 'Food') {
            return foodBev.has(item.category);
          }
          return item.category === e.target.value;
        });
        setFiltered(results);
        console.log('Filtered Results', results);
      }

    if (keyword !== undefined) {
      results = filtered.filter((item) => {
        const re = new RegExp(`${keyword}`, 'i');
        if (category) {
          return (
            item.category === category &&
            (item.name.search(re) !== -1 ||
              (item.description && item.description.search(re) !== -1))
          );
        } else {
          return (
            item.name.search(re) !== -1 ||
            (item.description && item.description.search(re) !== -1)
          );
        }
      });
      setFiltered(results);
      setItem(keyword);
    }
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
            name="clear"
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
              onChange={filter}
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
      <FilteredItems items={filtered} click={updateItem} message={message} />
    </React.Fragment>
  );
};

export default ItemSearchForm;

/* Item categories
(1, 'Appetizer'),  (2, 'Soup'), (3, 'Salad'), (4, 'Sandwich'), (5, 'Entree'), (6, 'Addition'), (7, 'Dessert'), (8, 'Favorites'), (9, 'Beverage'), (10, 'Beer'), (11, 'Wine'), (12, 'Liquor'),(13, 'Children'), (14, 'Carryout'), (15, 'Delivery')
*/
