import config from '../restaurantConfig.json';
import {
  CASH,
  MASTER_CARD,
  VISA,
  AMERICAN_EXPRESS,
  DISCOVER,
  GOOGLE_PAY,
  APPLE_PAY,
  VENMO
} from '../constants';

const formatTime = (time) => {
  console.debug('formatTime', time);

  let hours;
  let minutes;
  let pm = false;
  if (time) {
    if (time.getHours() > 12) {
      hours = time.getHours() - 12;
      pm = true;
    }
    hours = time.getHours() > 12 ? time.getHours() - 12 : time.getHours();
    hours = hours === 0 ? 12 : hours;
    minutes = time.getMinutes();
    minutes = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
    const twelveHourTime = pm
      ? `${hours}:${minutes} PM`
      : `${hours}:${minutes} AM`;
    return twelveHourTime;
  }
};

const floatToMoney = (num) => {
  return Math.round(+num * 100) / 100;
};

const calculateCheck = (check, items, payments) => {
  console.debug('calculateCheck', check, items, payments);

  const subtotal = items.reduce((a, b) => +a + (+b.price || 0), 0);
  const localTax = floatToMoney(subtotal * config.tax.localRate);
  const stateTax = floatToMoney(subtotal * config.tax.stateRate);
  const federalTax = floatToMoney(subtotal * config.tax.federalRate);
  const totalTax = localTax + stateTax + federalTax;
  const totalPaid = payments.reduce((a, b) => +a + (+b.subtotal || 0), 0);
  const amountDue = subtotal + totalTax - totalPaid - check.discountTotal;
  return {
    subtotal,
    localTax,
    stateTax,
    federalTax,
    totalTax,
    totalPaid,
    amountDue
  };
};

const calculateShift = (payments) => {
  console.debug(payments);

  let cashSales = 0;
  let masterCardSales = 0;
  let masterCardTip = 0;
  let visaSales = 0;
  let visaTip = 0;
  let amexSales = 0;
  let amexTip = 0;
  let discSales = 0;
  let discTip = 0;
  let googleSales = 0;
  let googleTip = 0;
  let appleSales = 0;
  let appleTip = 0;
  let venmoSales = 0;
  let venmoTip = 0;
  let totalCreditTip = 0;
  let totalSales = 0;

  for (let p of payments) {
    if (p.type === CASH) cashSales += +p.subtotal;
    if (p.type === MASTER_CARD) {
      masterCardSales += +p.subtotal;
      masterCardTip += +p.tipAmt;
      totalCreditTip += +p.tipAmt;
      totalSales += +p.subtotal;
    }
    if (p.type === VISA) {
      visaSales += +p.subtotal;
      visaTip += +p.tipAmt;
      totalCreditTip += +p.tipAmt;
      totalSales += +p.subtotal;
    }
    if (p.type === AMERICAN_EXPRESS) {
      amexSales += +p.subtotal;
      amexTip += +p.tipAmt;
      totalCreditTip += +p.tipAmt;
      totalSales += +p.subtotal;
    }
    if (p.type === DISCOVER) {
      discSales += +p.subtotal;
      discTip += +p.tipAmt;
      totalCreditTip += +p.tipAmt;
      totalSales += +p.subtotal;
    }
    if (p.type === GOOGLE_PAY) {
      googleSales += +p.subtotal;
      googleTip += +p.tipAmt;
      totalCreditTip += +p.tipAmt;
      totalSales += +p.subtotal;
    }
    if (p.type === APPLE_PAY) {
      appleSales += +p.subtotal;
      appleTip += +p.tipAmt;
      totalCreditTip += +p.tipAmt;
      totalSales += +p.subtotal;
    }
    if (p.type === VENMO) {
      venmoSales += +p.subtotal;
      venmoTip += +p.tipAmt;
      totalCreditTip += +p.tipAmt;
      totalSales += +p.subtotal;
    }
  }
  const serverCashDue = cashSales - totalCreditTip;
  const creditSales = totalSales - cashSales;

  return {
    masterCardSales,
    masterCardTip,
    visaSales,
    visaTip,
    amexSales,
    amexTip,
    discSales,
    discTip,
    googleSales,
    googleTip,
    appleSales,
    appleTip,
    venmoSales,
    venmoTip,
    cashSales,
    creditSales,
    totalCreditTip,
    totalSales,
    serverCashDue
  };
};

export { formatTime, calculateCheck, floatToMoney, calculateShift };
