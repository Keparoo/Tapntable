import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class TapntableApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = 'get') {
    console.debug('API Call:', endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
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

  /** Get list of items filtered by query if query is not undefined */

  static async getItems(query) {
    let res = await this.request(`items`, { name: query });
    return res.items;
  }

  static async createOrder(userId) {
    let res = await this.request(`orders`, { userId }, 'post');
    return res.order;
  }

  // ignore customer field
  static async createCheck(userId, tableNum, numGuests) {
    let res = await this.request(
      `checks`,
      { userId, tableNum, numGuests },
      'post'
    );
    return res.check;
  }

  static async createOrdItem(itemId, orderId, checkId, seatNum, itemNote) {
    let res = await this.request(
      `ordered`,
      { itemId, orderId, checkId, seatNum, itemNote },
      'post'
    );
    return res.ordItem;
  }

  static async getChecks(query) {
    let res = await this.request(`checks`, { userId: query });
    return res.checks;
  }

  static async getOpenChecks(userId) {
    let res = await this.request(`checks`, {
      userId,
      isVoid: false,
      closedAt: undefined
    });
    return res.checks;
  }

  static async getOrderedItems(query) {
    let res = await this.request(`ordered`, { checkId: query });
    return res.ordItems;
  }

  static async getPayments(query) {
    let res = await this.request(`payments`, { checkId: query });
    return res.payments;
  }

  static async getUserShiftPayments(loginTime, userId) {
    let res = await this.request(`payments`, {
      printedAt: loginTime,
      userId,
      isVoid: false
    });
    return res.payments;
  }

  static async postPayment(checkId, type, subtotal) {
    let res = await this.request(
      `payments`,
      { checkId, type, subtotal },
      'post'
    );
    return res.payment;
  }

  static async updatePayment(paymentId, tipAmt) {
    console.log('updatePayment', paymentId, tipAmt);
    let res = await this.request(`payments/${paymentId}`, { tipAmt }, 'patch');
    return res.payment;
  }

  static async printCheck(checkId, subtotal, localTax, stateTax, federalTax) {
    let res = await this.request(
      `checks/${checkId}`,
      { printedAt: new Date(), subtotal, localTax, stateTax, federalTax },
      'patch'
    );
    return res.check;
  }

  static async closeCheck(checkId, subtotal, localTax, stateTax, federalTax) {
    let res = await this.request(
      `checks/${checkId}`,
      { closedAt: new Date(), subtotal, localTax, stateTax, federalTax },
      'patch'
    );
    return res.check;
  }

  static async getUser(pin) {
    let res = await this.request(`user`, { pin });
    return res.user;
  }
}

// for now, put token ("manager" / "password" on class)
TapntableApi.token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hbmFnZXIiLCJyb2xlSWQiOjEwLCJpYXQiOjE2NDQzNTYzNjN9.EcgASVCSRs2LGS3uG27KJ6Rr7nlKxi0CvtSfO6pVzIg';

export default TapntableApi;
