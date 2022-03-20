import React, { useState, memo, useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
  addItemToCheck,
  removeItemFromCheck,
  addModToItem
} from '../actions/currentCheck';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Stack,
  Badge
} from '@mui/material';
// import { styled } from '@mui/material/styles';
import ModCategories from './ModCategories';
import ModGroup from './ModGroup';
import TapntableApi from '../api/api';
import ReqModGroup from './ReqModGroup';
import { v4 as uuid } from 'uuid';
import { fetchItemsFromAPI } from '../actions/items';

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

  const [ optionalModGroups, setOptionalModGroups ] = useState([]);
  const [ showOptionalModGroup, setShowOptionalModGroup ] = useState(false);

  const [ requiredModGroups, setRequiredModGroups ] = useState([]);
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
    console.debug('Close category items');
    setShowCat(false);
  }, []);

  // Add item to current check
  const addItem = useCallback(
    async (item) => {
      console.debug('addItem', item);

      //Query database is count > 0 if yes add item, if no display message and return
      const itemCount = await TapntableApi.getCount(item.id);
      if (itemCount === 0) {
        console.debug(`****${item.name} is sold out`);
        alert(`****${item.name} is sold out`);
        return;
      }
      // There is an item count (not zero and not null)
      if (itemCount > 0) {
        //subtract 1 from itemCount
        const newCount = await TapntableApi.setCount(item.id, itemCount - 1);
        const itemToUpdate = items.filter((i) => i.id === item.id);
        itemToUpdate[0].count--;
        console.log('Item to update', itemToUpdate[0]);
        console.log(`${item.name} count is now `, newCount);
      }

      item.mods = [];
      dispatch(addItemToCheck(item));

      // Get Item Mods
      const itemModGroups = await TapntableApi.getItemModGroups(item.id);
      console.debug('itemModGroups', itemModGroups);

      // Separate required from optional
      let required = [];
      let optional = [];
      for (let group of itemModGroups) {
        mods.groups.find((g) => g.id === group.modGroupId).isRequired
          ? required.push(group)
          : optional.push(group);
      }
      setRequiredModGroups(required);
      console.debug('Item Required & Optional Groups', required, optional);

      // If there are required mods: show them
      required.length
        ? setShowRequiredModGroup(true)
        : setShowRequiredModGroup(false);
      setShowModGroups(true);

      // Get optional mods for each optional mod group
      let optMods = [];
      for (let optionalMod of optional) {
        const modsInGroup = await TapntableApi.getModsInGroup(
          optionalMod.modGroupId
        );
        optMods.push(modsInGroup);
      }
      setOptionalModGroups(optMods);
      console.debug('Optional Mods', optionalModGroups);

      // If there are optional mods: show them
      optional.length
        ? setShowOptionalModGroup(true)
        : setShowOptionalModGroup(false);
      setShowModGroups(true);
    },
    [ dispatch, mods.groups, optionalModGroups, items ]
  );

  // Cancel a required mod removing item from check
  const cancelAddItem = () => {
    console.debug('Cancel added item');

    dispatch(
      removeItemFromCheck({
        arr: currentCheck.newItems,
        idx: currentCheck.currentItem
      })
    );
    // Refetch items to update count badges
    dispatch(fetchItemsFromAPI());
  };

  // Display mods in mod group
  const displayModGroup = useCallback(async (groupId) => {
    console.debug('displayModGroup', groupId);

    const modsInGroup = await TapntableApi.getModsInGroup(groupId);
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

  // View of menu items in the passed in category
  const ItemCategory = memo(({ cat }) => {
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
              <Badge badgeContent={i.count ? i.count : null} color="secondary">
                <Button
                  key={uuid()}
                  onClick={() => addItem(i)}
                  variant="contained"
                  disabled={i.count === 0 ? true : false}
                >
                  {i.name}
                </Button>
              </Badge>
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

      {showCat && <ItemCategory cat={currentCat} />}

      {showRequiredModGroup && (
        <ReqModGroup
          groups={requiredModGroups}
          add={addMod}
          cancel={cancelAddItem}
          close={() => setShowRequiredModGroup(false)}
        />
      )}

      {showOptionalModGroup &&
        optionalModGroups.map((o) => (
          <ModGroup
            key={o.modId}
            group={o}
            add={addMod}
            close={closeModGroup}
          />
        ))}

      {showModGroups && <ModCategories display={displayModGroup} />}

      {showMods && (
        <ModGroup group={currentModGroup} add={addMod} close={closeModGroup} />
      )}
    </Container>
  );
};

export default OrderCats;
