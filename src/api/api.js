import axios from 'axios';
import { CLOCK_IN, CASH, OPEN_DAY, LANGUAGE, TIMEZONE } from '../constants';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 *
 */

class TapntableApi {
  // the token for interacting with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = 'get') {
    console.debug('API Call:', endpoint, data, method);

    // Send auth token in request header
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${TapntableApi.token}` };
    const params = method === 'get' ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error('API Error:', err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [ message ];
    }
  }

  //*******************************************************************/
  //                   Individual API routes                          */
  //*******************************************************************/

  //**************Items Queries*************************************** */

  /** Get list of items filtered by query if query is not undefined */

  // Return a list of all items in db
  static async getItems(query) {
    let res = await this.request(`items`, { name: query });
    return res.items;
  }

  static async getCount(itemId) {
    let res = await this.request(`items/${itemId}`);
    return res.item.count;
  }

  static async setCount(itemId, count) {
    console.debug('setCount', itemId, count);
    if (count) count = +count;
    let res = await this.request(`items/${itemId}`, { count }, 'patch');
    return res.item.count;
  }

  static async getCategories() {
    let res = await this.request(`items/categories`);
    return res.categories;
  }

  static async getDestinations() {
    let res = await this.request(`items/destinations`);
    return res.destinations;
  }

  static async createItem(name, price, categoryId, destinationId, description) {
    let res;
    if (description === '') {
      res = await this.request(
        `items`,
        { name, price, categoryId, destinationId },
        'post'
      );
    } else {
      res = await this.request(
        `items`,
        { name, price, categoryId, destinationId, description },
        'post'
      );
    }

    return res.item;
  }

  static async updateItem(
    id,
    name,
    price,
    description,
    categoryId,
    destinationId,
    count,
    isActive
  ) {
    const res = await this.request(
      `items/${id}`,
      { name, price, description, categoryId, destinationId, count, isActive },
      'patch'
    );
    return res.item;
  }

  //**************Mods Queries*************************************** */

  static async getMods(query) {
    let res = await this.request(`mods`, query);
    return res.mods;
  }

  static async getModGroups(query) {
    let res = await this.request(`mods/modgroups/details`);
    return res.modGroups;
  }

  static async getModsInGroup(modGroupId) {
    let res = await this.request(`mods/modgroups/${modGroupId}`);
    return res.modsModGroups;
  }

  static async getModCats(query) {
    let res = await this.request(`mods/categories`);
    return res.categories;
  }

  static async createItemMod(ordItemId, modId) {
    let res = await this.request(`ordered/mods`, { ordItemId, modId }, 'post');
    return res.ordItemMod;
  }

  static async getItemMods(query) {
    let res = await this.request(`ordered/mods`, query);
    return res.ordItemMods;
  }

  static async getItemModGroups(itemId) {
    let res = await this.request(`items/modgroups/${itemId}`);
    return res.itemModGroups;
  }

  //**************Orders Queries*************************************** */

  // Post a new order to database
  static async createOrder(userId) {
    let res = await this.request(`orders`, { userId }, 'post');
    return res.order;
  }

  // Timestamp order as completed
  static async completeOrder(orderId) {
    let res = await this.request(
      `orders/${orderId}`,
      {
        completedAt: new Date()
      },
      'patch'
    );
    return res.order;
  }

  // Get list of open orders from database filtered by destinationId
  static async getOpenOrders() {
    let res = await this.request(`orders`, { isOpen: true });
    return res.orders;
  }

  static async fireCourse(orderId, courseNum) {
    if (courseNum === 2) {
      let res = await this.request(
        `orders/${orderId}`,
        {
          fireCourse2: new Date().toLocaleString(LANGUAGE, {
            timeZone: TIMEZONE
          })
        },
        'patch'
      );
      return res.order.fireCourse2;
    }
    if (courseNum === 3) {
      let res = await this.request(
        `orders/${orderId}`,
        {
          fireCourse3: new Date().toLocaleString(LANGUAGE, {
            timeZone: TIMEZONE
          })
        },
        'patch'
      );
      return res.order.fireCourse3;
    }
  }

  //**************Checks Queries*************************************** */

  // Post a new check to database
  // ignore customer field
  static async createCheck(userId, tableNum, numGuests) {
    let res = await this.request(
      `checks`,
      { userId, tableNum, numGuests },
      'post'
    );
    return res.check;
  }

  // Return all user's checks
  static async getChecks(query) {
    let res = await this.request(`checks`, { userId: query });
    return res.checks;
  }

  // Return user's open checks where isVoid=false and closed_at is null
  static async getOpenChecks(userId) {
    let res = await this.request(`checks`, {
      userId,
      isVoid: false,
      isOpen: true
    });
    return res.checks;
  }

  // Return any open checks (regardless of user) where isVoid=false
  static async getAnyOpenChecks() {
    let res = await this.request(`checks`, {
      isVoid: false,
      isOpen: true
    });
    return res.checks;
  }

  // Get all checks from the day
  static async getDayChecks(timestamp) {
    let res = await this.request(`checks`, { createdAt: timestamp });
    return res.checks;
  }

  // Print Check, timestamp print time and update subtotal and tax
  // This may be done multiple times before closing check
  static async printCheck(checkId, subtotal, localTax, stateTax, federalTax) {
    let res = await this.request(
      `checks/${checkId}`,
      { printedAt: new Date(), subtotal, localTax, stateTax, federalTax },
      'patch'
    );
    return res.check;
  }

  // Update numGuests on Check
  static async updateNumGuests(checkId, numGuests) {
    let res = await this.request(`checks/${checkId}`, { numGuests }, 'patch');
    return res.check;
  }

  // Close check: timestamp and update subtotal and tax (timestamp not null indicates check closed)
  static async closeCheck(checkId, subtotal, localTax, stateTax, federalTax) {
    let res = await this.request(
      `checks/${checkId}`,
      { closedAt: new Date(), subtotal, localTax, stateTax, federalTax },
      'patch'
    );
    return res.check;
  }

  //**************Ordered_Items Queries*************************************** */

  // Post an ordered item to database
  static async createOrdItem(
    itemId,
    orderId,
    checkId,
    seatNum,
    courseNum,
    itemNote
  ) {
    let res = await this.request(
      `ordered`,
      { itemId, orderId, checkId, seatNum, courseNum, itemNote },
      'post'
    );
    return res.ordItem;
  }

  // Return all ordered items related to checkId
  static async getOrderedItems(query) {
    let res = await this.request(`ordered`, { checkId: query });
    return res.ordItems;
  }

  // Return all ordered items related to an orderId
  static async getOrderedItemsByOrder(query) {
    let res = await this.request(`ordered`, { orderId: query });
    return res.ordItems;
  }

  // Return all ordered items from the day: sentAt >= timestamp
  static async getDayItems(timestamp) {
    let res = await this.request(`ordered`, { sentAt: timestamp });
    return res.ordItems;
  }

  // Update the CheckId (used when moving and item to another check)
  static async updateCheckId(ordItemId, checkId) {
    let res = await this.request(`ordered/${ordItemId}`, { checkId }, 'patch');
    return res.ordItem;
  }

  //**************Payments Queries*************************************** */

  // Return a list of all payments related to checkId
  static async getPayments(query) {
    let res = await this.request(`payments`, { checkId: query });
    return res.payments;
  }

  // Return all open user payments (tipAmt=null) since last user login. Exclude voided payments
  static async getUserShiftPayments(loginTime, userId) {
    let res = await this.request(`payments`, {
      printedAt: loginTime,
      userId,
      isVoid: false
    });
    return res.payments;
  }

  // Return all open payments (tipAmt=null) regardless of user. Exclude voided payments
  static async getAnyOpenPayments() {
    let res = await this.request(`payments`, {
      isVoid: false,
      isOpen: true
    });
    return res.payments;
  }

  // Post a payment to db
  static async postPayment(checkId, type, subtotal) {
    let res;
    if (type === CASH) {
      res = await this.request(
        `payments`,
        { checkId, type, subtotal, tipAmt: 0 },
        'post'
      );
    } else {
      res = await this.request(`payments`, { checkId, type, subtotal }, 'post');
    }
    return res.payment;
  }

  // Add a tip amount to a paymnet (tipAmt not null indicates the payment is closed)
  static async updatePayment(paymentId, tipAmt) {
    console.log('updatePayment', paymentId, tipAmt);
    let res = await this.request(`payments/${paymentId}`, { tipAmt }, 'patch');
    return res.payment;
  }

  // Get all payments from the day
  static async getDayPayments(timestamp) {
    let res = await this.request(`payments`, { printedAt: timestamp });
    return res.payments;
  }

  //**************Auth Queries*************************************** */

  static async login(data) {
    let res = await this.request(`auth/token`, data, 'post');
    return res.token;
  }

  //**************Users Queries*************************************** */

  // Query database to get user from pin
  static async getUser(pin) {
    let res = await this.request(`users/pin`, { pin }, 'post');
    return res.user;
  }

  // Update users record to indicate user is clocked in: isClockedIn=true
  static async clockIn(id) {
    const isClockedIn = true;
    let res = await this.request(
      `users/timeclock`,
      { id, isClockedIn },
      'post'
    );
    return res.user;
  }

  // Update users record to indicate user is clocked out: isClockedIn=false
  static async clockOut(id) {
    const isClockedIn = false;
    let res = await this.request(
      `users/timeclock`,
      { id, isClockedIn },
      'post'
    );
    return res.user;
  }

  // Return user's last clock-in time
  static async getUserClockInTime(id) {
    let res = await this.request(`users/logs`, {
      userId: id,
      event: CLOCK_IN,
      desc: true
    });
    return res.logs[0].createdAt;
  }

  // Log event to user_logs: entityId is optional
  static async logEvent(userId, event, declaredTips, entityId) {
    if (declaredTips) declaredTips = +declaredTips;
    let res = await this.request(
      `users/logs`,
      { userId, event, declaredTips, entityId },
      'post'
    );
    return res.log;
  }

  static async getDayOpen() {
    let res = await this.request(`users/logs`, { event: OPEN_DAY, desc: true });
    return new Date(res.logs[0].createdAt);
  }

  static async getDayUserData(createdAt) {
    let res = await this.request(`users/logs`, { after: createdAt });
    return res.logs;
  }
}

// for development, put token ("manager" / "password" on class)

// role='manager'
// Manager token with no expiration for demo purposes
// TapntableApi.token ='';

export default TapntableApi;
