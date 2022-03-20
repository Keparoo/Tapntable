import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItemsFromAPI } from '../actions/items';

// import TapntableApi from '../api/api';
// import SearchForm from '../common/SearchForm';
import ItemCardList from '../components/ItemCardList';
import Spinner from '../components/Spinner';
import { clearCurrentCheck } from '../actions/currentCheck';
import { useHistory } from 'react-router-dom';

/*  Render page with list of items and filter search form

    On mount, renders list of all items in API
    On reload, if search is not undefined, filter search with search term

    Routed to /items

    Routes calls ItemList
    ItmeList calls ItemCardList, SearchForm, Spinner
*/

const ItemList = () => {
  console.debug('ItemList');

  // const [ items, setItems ] = useState([]);
  const items = useSelector((st) => st.items);
  const user = useSelector((st) => st.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [ isLoading, setIsLoading ] = useState(true);

  if (!user.pin) history.push('/');

  useEffect(
    () => {
      console.debug('ItemList useEffect on Mount');

      dispatch(clearCurrentCheck());
      async function fetchItem() {
        await dispatch(fetchItemsFromAPI());
        setIsLoading(false);
      }
      if (isLoading) {
        fetchItem();
      }
      // search();
    },
    [ dispatch, isLoading ]
  );

  // Run on search form submit: reloads companies with filtered results
  // const search = async (query) => {
  //   let items = await TapntableApi.getItems(query);
  //   setItems(items);
  // };

  if (isLoading) return <Spinner />;

  if (!isLoading && items.length === 0) {
    return <b>No items in database</b>;
  }

  // <SearchForm setQuery={search} />

  return (
    <div className="ItemList col-md-8 offset-md-2">
      <h1 className="lead-1">Items List</h1>
      {items.length ? (
        <ItemCardList items={items} />
      ) : (
        <p className="lead">Sorry, no results were found!</p>
      )}
    </div>
  );
};

export default ItemList;
