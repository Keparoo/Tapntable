import React from 'react';
import { Link } from 'react-router-dom';

import ItemCard from './ItemCard';

/* Render a list of cards containing ItemCards

    Called by ItemList, Calls ItemCard
*/

const ItemCardList = ({ items }) => {
	console.debug('ItemCardList');

	return (
		<div className="ItemCardList">
			{items.map((i) => (
				<Link key={i.id} to={`/items/${i.id}`}>
					<ItemCard
						key={i.handle}
						name={i.name}
						description={i.description}
						price={i.price}
						category={i.category}
						destination={i.destination}
						count={i.count}
						isActive={i.isActive}
					/>
				</Link>
			))}
		</div>
	);
};

export default ItemCardList;
