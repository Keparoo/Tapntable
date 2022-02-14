import React from 'react';
// import './ItemCard.css';

/* Render Item with info about the item

ItemList renders ItemCardList which renders ItemCard
*/

const ItemCard = ({
	name,
	description,
	price,
	category,
	destination,
	count,
	isActive
}) => {
	console.debug('ItemCard');

	return (
		<div className="ItemCard card">
			<div className="card-body">
				<h5 className="card-title">{name}</h5>
				<p>
					<small>
						Price: <strong>{price}</strong>
						<br />
						Category: <strong>{category}</strong>
						<br />
						Destination: <strong>{destination}</strong>
						{count && (
							<span>
								<br />
								Count: <strong>{count}</strong>
							</span>
						)}
						<br />
						isActive:{' '}
						{isActive ? <strong>true</strong> : <strong>false</strong>}
					</small>
				</p>
				<p>
					<small>{description}</small>
				</p>
			</div>
		</div>
	);
};

export default ItemCard;
