import React, { useState, useEffect } from 'react';

import TapntableApi from '../api/api';
// import SearchForm from '../common/SearchForm';
import ItemCardList from './ItemCardList';
import Spinner from '../common/Spinner';

/*  Render page with list of items and filter search form

    On mount, renders list of all items in API
    On reload, if search is not undefined, filter search with search term

    Routed to /items

    Routes calls ItemList
    ItmeList calls ItemCardList, SearchForm, Spinner
*/

const ItemList = () => {
	console.debug('ItemList');

	const [ items, setItems ] = useState([]);

	useEffect(() => {
		console.debug('ItemList useEffect on Mount');
		search();
	}, []);

	// Run on search form submit: reloads companies with filtered results
	const search = async (query) => {
		let items = await TapntableApi.getItems(query);
		setItems(items);
	};

	if (!items) return <Spinner />;

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
