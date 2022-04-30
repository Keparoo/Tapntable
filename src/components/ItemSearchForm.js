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
  Stack,
  Switch
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
  const [ hideInactive, setHideInactive ] = useState(true);
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

  const handleSwitch = (e) => {
    e.preventDefault();
    console.debug('handleSwitch', e.target.checked);

    setHideInactive(e.target.checked);
    filter(e);
  };

  // Filter items by category, isActive and by comparing keyword to item.name and item.description.
  const filter = (e) => {
    console.debug('filter', e);

    e.preventDefault();
    let keyword;

    // if (e.target.name === 'isActive') setHideInactive(e.target.checked);

    if (e.target.name === 'item-category') {
      // Handle Radio button selected
      console.debug('Radio Button', e.target.value);

      setCategory(e.target.value);
      keyword = undefined;
      setItem('');
    } else if (e.target.name === 'item') {
      // Handle chars typed into filter
      console.debug('Keyword', e.target.value);

      keyword = e.target.value;
    } else if (e.target.name === 'isActive') {
      // Handle isActive switch
      console.debug('isActive Switch', e.target.value);

      setHideInactive(e.target.checked);
    } else {
      // Handle clear button clicked
      // e.target.name === 'clear'
      console.debug('Clear', category);

      keyword = undefined;
      e.target.name = 'clear';
      e.target.value = category;
      setItem('');
    }

    // List of item categories for Food & Bev
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

    let results;

    const filterIsActive = (items) => {
      if (!hideInactive) return items;
      else return items.filter((item) => item.isActive === true);
    };

    if (e.target.name)
      if (!keyword) {
        // Radio button and no keyword
        results = items.filter((item) => {
          if (e.target.value === 'All') return true;
          if (e.target.value === 'Food') {
            return foodBev.has(item.category);
          }
          return item.category === e.target.value;
        });
        setFiltered(filterIsActive(results));
      }

    // Case insensitive search in item name and description
    const keywordMatch = (item) => {
      const re = new RegExp(`${keyword}`, 'i');
      return (
        item.name.search(re) !== -1 ||
        (item.description && item.description.search(re) !== -1)
      );
    };

    if (keyword !== undefined) {
      results = filtered.filter((item) => {
        if (category) {
          if (category === 'All') return keywordMatch(item);
          if (category === 'Food')
            return foodBev.has(item.category) && keywordMatch(item);
          return item.category === category && keywordMatch(item);
        } else {
          return keywordMatch(item);
        }
      });
      setFiltered(filterIsActive(results));
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
            sx={{ width: '205px' }}
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

            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  id="isActive"
                  name="isActive"
                  value={hideInactive}
                  checked={hideInactive}
                  onChange={handleSwitch}
                />
              }
              label="Hide Inactive"
              labelPlacement="start"
              sx={{ width: '430px' }}
            />
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
