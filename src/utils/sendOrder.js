// import { useSelector, useDispatch, shallowEqual } from 'react-redux';
// import { clearCurrentCheck } from '../actions/currentCheck';
import { KITCHEN_HOT, KITCHEN_COLD, BAR, NO_SEND } from '../constants';
import TapntableApi from '../api/api';

const useSendOrder = async (check, user) => {
  console.debug('sendOrder', check, user);

  // const dispatch = useDispatch();

  if (check.newItems.length === 0) return;

  //Separate newItems into destinations
  const kitchenHotOrder = check.newItems.filter(
    (i) => i.destination === KITCHEN_HOT
  );
  const kitchenColdOrder = check.newItems.filter(
    (i) => i.destination === KITCHEN_COLD
  );
  const barOrder = check.newItems.filter((i) => i.destination === BAR);

  // No send orders are filled by servers: eg: fountain drinks, coffee, tea, etc
  // These items do not display/print in kitchen or bar
  const noSendOrder = check.newItems.filter((i) => i.destination === NO_SEND);

  // Item missing destination or has invalid destinationId. Check item in database
  if (
    kitchenHotOrder.length +
      kitchenColdOrder.length +
      barOrder.length +
      noSendOrder.length <
    check.newItems.length
  )
    console.error(
      '****Warning, items not being sent to order! Check item details****'
    );

  console.debug(
    'Kitchen/Bar Order: ',
    check.newItems,
    kitchenHotOrder,
    kitchenColdOrder,
    barOrder,
    noSendOrder
  );

  // Create order in db: get order id
  let kitchenHotOrderRes;
  let kitchenColdOrderRes;
  let barOrderRes;
  let noSendOrderRes;

  // Combine these into one call ?
  if (kitchenHotOrder.length) {
    kitchenHotOrderRes = await TapntableApi.createOrder(user.id);
    console.debug('order', kitchenHotOrderRes, kitchenHotOrder);
  }
  if (kitchenColdOrder.length) {
    kitchenColdOrderRes = await TapntableApi.createOrder(user.id);
    console.debug('order', kitchenColdOrderRes, kitchenColdOrder);
  }
  if (barOrder.length) {
    barOrderRes = await TapntableApi.createOrder(user.id);
    console.debug('order', barOrderRes, barOrder);
  }
  if (noSendOrder.length) {
    noSendOrderRes = await TapntableApi.createOrder(user.id);
    console.debug('order', noSendOrderRes, noSendOrder);
  }

  // Create ordered_items in database for each item in itemList
  const createOrderedItems = async (itemList, orderId, checkId, seatNum) => {
    for (const item of itemList) {
      const ordItem = await TapntableApi.createOrdItem(
        item.id,
        orderId,
        checkId,
        seatNum,
        item.itemNote
      );
      console.debug('ordItem: ', ordItem);

      // Create ordered_item_mods for ordered items to db
      let itemMod;
      for (const mod of item.mods) {
        itemMod = await TapntableApi.createItemMod(ordItem.id, mod.modId);
      }
      console.debug('itemMod: ', itemMod);
    }
  };

  if (check.id) {
    // Create ordered items for Kitchen-Hot
    if (kitchenHotOrder.length) {
      createOrderedItems(kitchenHotOrder, kitchenHotOrderRes.id, check.id, 1);
    }
    // Create ordered items for Kitchen-Cold
    if (kitchenColdOrder.length) {
      createOrderedItems(kitchenColdOrder, kitchenColdOrderRes.id, check.id, 1);
    }
    // Create ordered items for Bar
    if (barOrder.length) {
      createOrderedItems(barOrder, barOrderRes.id, check.id, 1);
    }
    // Create ordered items for no-send (eg, fountain drinks)
    if (noSendOrder.length) {
      createOrderedItems(noSendOrder, noSendOrderRes.id, check.id, 1);
    }
  } else {
    // Create Check in db, get Check Id,
    // ignore customer field
    const checkRes = await TapntableApi.createCheck(
      user.id,
      check.tableNum,
      check.numGuests
    );
    console.debug('check', checkRes);

    // Create ordered items for Kitchen-Hot
    if (kitchenHotOrder.length) {
      createOrderedItems(
        kitchenHotOrder,
        kitchenHotOrderRes.id,
        checkRes.id,
        1
      );
    }
    // Create ordered items for Kitchen-Cold
    if (kitchenColdOrder.length) {
      createOrderedItems(
        kitchenColdOrder,
        kitchenColdOrderRes.id,
        checkRes.id,
        1
      );
    }
    // Create ordered items for Bar
    if (barOrder.length) {
      createOrderedItems(barOrder, barOrderRes.id, checkRes.id, 1);
    }
    // Create ordered items for no-send (eg, fountain drinks)
    if (noSendOrder.length) {
      createOrderedItems(noSendOrder, noSendOrderRes.id, checkRes.id, 1);
    }
  }

  // // Clear current check
  // dispatch(clearCurrentCheck());
  // // Return to server page (show open checks)
  // reload(true);
  // showOrderCats(false);
};

export default useSendOrder;
