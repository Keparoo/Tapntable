import React, { useState, memo, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { addItemToCheck, addModToItem } from '../actions/currentCheck';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  ButtonBase,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ModCategories from './ModCategories';
import ModGroup from './ModGroup';
import TapntableApi from '../api/api';
import RequiredModGroup from './RequiredModGroup';

const OrderCats = () => {
  console.debug('OrderCats');

  const items = useSelector((st) => st.items, shallowEqual);
  const mods = useSelector((st) => st.mods, shallowEqual);
  const currentCheck = useSelector((st) => st.currentCheck, shallowEqual);
  const dispatch = useDispatch();
  const [ showCat, setShowCat ] = useState(false);
  const [ currentCat, setCurrentCat ] = useState('');
  const [ showModGroups, setShowModGroups ] = useState(false);
  const [ showMods, setShowMods ] = useState(false);
  const [ currentModGroup, setCurrentModGroup ] = useState([]);
  const [ itemModGroups, setItemModGroups ] = useState([]);
  const [ showRequiredModGroup, setShowRequiredModGroup ] = useState(false);

  // const Item = styled(ButtonBase)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fafafa',
  //   ...theme.typography.button,
  //   variant: 'outlined',
  //   padding: theme.spacing(3),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary
  // }));

  // Display items in category
  const displayCategory = useCallback((cat) => {
    console.debug('displayCategory', cat);
    setShowCat(true);
    setCurrentCat(cat);
    setShowMods(false);
  }, []);

  // Stop display of current category items
  const close = useCallback(() => {
    console.debug('close');
    setShowCat(false);
  }, []);

  // Add item to current check
  const addItem = useCallback(
    async (item) => {
      console.debug('addItem', item);
      item.mods = [];
      dispatch(addItemToCheck(item));
      //it item has item mods show mods
      const itemModGroups = await TapntableApi.getItemModGroups(item.id);
      console.debug('itemModGroups', itemModGroups);
      setItemModGroups(itemModGroups);
      setShowModGroups(true);
      setShowRequiredModGroup(true);
    },
    [ dispatch ]
  );

  // Display mods in mod group
  const displayModGroup = useCallback(async (group) => {
    console.debug('displayModGroup', group);
    const modsInGroup = await TapntableApi.getModsInGroup({
      modGroupId: group
    });
    setCurrentModGroup(modsInGroup);
    setShowModGroups(false);
    setShowMods(true);
  }, []);

  // Stop display of current mod group
  const closeModGroup = useCallback(() => {
    console.debug('closeModGroup');
    setShowMods(false);
    setShowModGroups(true);
  }, []);

  // Add mod to current item
  const addMod = useCallback(
    (mod) => {
      console.debug('addMod', mod);
      // No current item: prevent adding mod
      if (currentCheck.currentItem < 0) return;
      dispatch(addModToItem(mod));
    },
    [ dispatch, currentCheck.currentItem ]
  );

  // View of items in category
  const Category = memo(({ cat }) => {
    console.debug('Category', cat);

    const catItems = items.filter((i) => i.category === cat);
    console.debug('catItems', catItems);

    return (
      <Paper elevation={3} sx={{ padding: '24px' }}>
        <Grid
          container
          direction="row"
          spacing={4}
          justifyContent="space-evenly"
          alignItems="center"
        >
          {catItems.map((i) => (
            <Grid item key={i.id}>
              <Button onClick={() => addItem(i)} variant="contained">
                {i.name}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Stack sx={{ paddingTop: '36px' }}>
          <Button onClick={close}>Close</Button>
        </Stack>
      </Paper>
    );
  });

  // List of item categories and display of selected category items
  return (
    <Container maxWidth="md">
      <Paper
        elevation={3}
        sx={{
          marginBottom: '16px',
          marginTop: '16px',
          padding: '24px'
        }}
      >
        <Typography variant="h3" align="center" gutterBottom>
          Order Categories
        </Typography>
        <Grid
          container
          direction="row"
          spacing={4}
          justifyContent="space-evenly"
          alignItems="center"
        >
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="outlined"
              onClick={() => displayCategory('Appetizer')}
            >
              Appetizers
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button variant="outlined" onClick={() => displayCategory('Soup')}>
              Soup
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button variant="outlined" onClick={() => displayCategory('Salad')}>
              Salad
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="outlined"
              onClick={() => displayCategory('Sandwich')}
            >
              Sandwiches
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="outlined"
              onClick={() => displayCategory('Entree')}
            >
              Entrees
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="outlined"
              onClick={() => displayCategory('Favorites')}
            >
              Favorites
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="outlined"
              onClick={() => displayCategory('Addition')}
            >
              Menu Additions
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="outlined"
              onClick={() => displayCategory('Dessert')}
            >
              Desserts
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="outlined"
              onClick={() => displayCategory('Beverage')}
            >
              Beverages
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button variant="outlined" onClick={() => displayCategory('Beer')}>
              Beer
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button variant="outlined" onClick={() => displayCategory('Wine')}>
              Wine
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="outlined"
              onClick={() => displayCategory('Liquor')}
            >
              Liquor
            </Button>
          </Grid>
        </Grid>
      </Paper>
      {showCat && <Category cat={currentCat} />}
      {showRequiredModGroup && <RequiredModGroup />}
      {showModGroups && <ModCategories display={displayModGroup} />}
      {showMods && (
        <ModGroup group={currentModGroup} add={addMod} close={closeModGroup} />
      )}
    </Container>
  );
};

export default OrderCats;
