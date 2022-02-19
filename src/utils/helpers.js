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

const calculateCheck = (check, items, payments) => {
  const subtotal = items.reduce((a, b) => +a + (+b.price || 0), 0);
  console.log('Subtotal', subtotal, config.tax);
  const localTax = subtotal * config.tax.localRate;
  const stateTax = subtotal * config.tax.stateRate;
  const federalTax = subtotal * config.tax.federalRate;
  const totalTax = localTax + stateTax + federalTax;
  const totalPaid = payments.reduce((a, b) => +a + (+b.price || 0), 0);
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

export { formatTime, calculateCheck };
