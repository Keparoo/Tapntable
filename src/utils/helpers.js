import config from '../restaurantConfig.json';

const formatTime = (time) => {
  console.log(time);
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
  const subtotal = items.reduce((a, b) => +a + (+b.price || 0), 0);
  console.log('Subtotal', subtotal, config.tax);
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
  // Payment type enum values
  const CASH = 'Cash';
  const MASTER_CARD = 'MC';
  const VISA = 'Visa';
  const AMERICAN_EXPRESS = 'Amex';
  const DISCOVER = 'Disc';
  const GOOGLE_PAY = 'Google';
  const APPLE_PAY = 'Apple';
  const VENMO = 'Venmo';

  let cashSales = 0;
  let MCSales = 0;
  let MCTip = 0;
  let VisaSales = 0;
  let VisaTip = 0;
  let AmexSales = 0;
  let AmexTip = 0;
  let DiscSales = 0;
  let DiscTip = 0;
  let GoogleSales = 0;
  let GoogleTip = 0;
  let AppleSales = 0;
  let AppleTip = 0;
  let VenmoSales = 0;
  let VenmoTip = 0;
  let totalCreditTip = 0;
  let totalSales = 0;

  for (let p of payments) {
    if (p.type === CASH) cashSales += +p.subtotal;
    if (p.type === MASTER_CARD) {
      MCSales += +p.subtotal;
      MCTip += +p.tipAmt;
      totalCreditTip += +p.tipAmt;
      totalSales += +p.subtotal;
    }
    if (p.type === VISA) {
      VisaSales += +p.subtotal;
      VisaTip += +p.tipAmt;
      totalCreditTip += +p.tipAmt;
      totalSales += +p.subtotal;
    }
    if (p.type === AMERICAN_EXPRESS) {
      AmexSales += +p.subtotal;
      AmexTip += +p.tipAmt;
      totalCreditTip += +p.tipAmt;
      totalSales += +p.subtotal;
    }
    if (p.type === DISCOVER) {
      DiscSales += +p.subtotal;
      DiscTip += +p.tipAmt;
      totalCreditTip += +p.tipAmt;
      totalSales += +p.subtotal;
    }
    if (p.type === GOOGLE_PAY) {
      GoogleSales += +p.subtotal;
      GoogleTip += +p.tipAmt;
      totalCreditTip += +p.tipAmt;
      totalSales += +p.subtotal;
    }
    if (p.type === APPLE_PAY) {
      AppleSales += +p.subtotal;
      AppleTip += +p.tipAmt;
      totalCreditTip += +p.tipAmt;
      totalSales += +p.subtotal;
    }
    if (p.type === VENMO) {
      VenmoSales += +p.subtotal;
      VenmoTip += +p.tipAmt;
      totalCreditTip += +p.tipAmt;
      totalSales += +p.subtotal;
    }
  }
  const serverCashDue = cashSales - totalCreditTip;

  return {
    cashSales,
    MCSales,
    MCTip,
    VisaSales,
    VisaTip,
    AmexSales,
    AmexTip,
    DiscSales,
    DiscTip,
    GoogleSales,
    GoogleTip,
    AppleSales,
    AppleTip,
    VenmoSales,
    VenmoTip,
    totalCreditTip,
    serverCashDue,
    totalSales
  };
};

export { formatTime, calculateCheck, calculateShift };
