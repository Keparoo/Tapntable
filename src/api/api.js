import axios from 'axios';
import { CLOCK_IN, CASH, OPEN_DAY } from '../constants';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 *
 */

class TapntableApi {
  // the token for interactive with the API will be stored here.
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

  // Individual API routes

  //**************Items Queries*************************************** */

  /** Get list of items filtered by query if query is not undefined */

  // Return a list of all items in db
  static async getItems(query) {
    let res = await this.request(`items`, { name: query });
    return res.items;
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
    let res = await this.request(`orders`, { completedAt: undefined });
    return res.orders;
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

  // Return user's open checks where isVoid=false
  static async getOpenChecks(userId) {
    let res = await this.request(`checks`, {
      userId,
      isVoid: false,
      closedAt: undefined
    });
    return res.checks;
  }

  // Get all checks from the day
  static async getDayChecks(timestamp) {
    let res = await this.request(`checks`, { createdAt: timestamp });
    console.debug('********************Checks', res);
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
  static async createOrdItem(itemId, orderId, checkId, seatNum, itemNote) {
    let res = await this.request(
      `ordered`,
      { itemId, orderId, checkId, seatNum, itemNote },
      'post'
    );
    return res.ordItem;
  }

  // Return all ordered items related to checkId
  static async getOrderedItems(query) {
    let res = await this.request(`ordered`, { checkId: query });
    return res.ordItems;
  }

  // Return all ordered items related to checkId
  static async getOrderedItemsByOrder(query) {
    let res = await this.request(`ordered`, { orderId: query });
    return res.ordItems;
  }

  // Return all ordered items from the day
  static async getDayItems(timestamp) {
    let res = await this.request(`ordered`, { sentAt: timestamp });
    return res.ordItems;
  }

  //**************Payments Queries*************************************** */

  // Return a list of all payments related to checkId
  static async getPayments(query) {
    let res = await this.request(`payments`, { checkId: query });
    return res.payments;
  }

  // // Return a list of all payments related to checkId
  // static async getOpenPayments(query) {
  //   let res = await this.request(`payments`, { userId: query });
  //   return res.payments;
  // }

  // Return all open user payments (tipAmt=null) since last user login. Exclude voided payments
  static async getUserShiftPayments(loginTime, userId) {
    let res = await this.request(`payments`, {
      printedAt: loginTime,
      userId,
      isVoid: false
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

  // Log user cash-out
  // static async cashOut(userId) {
  //   let res = await this.request(
  //     `users/logs`,
  //     { userId, event: CASH_OUT },
  //     'post'
  //   );
  //   return res.user;
  // }

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
// TapntableApi.token = '';

export default TapntableApi;
