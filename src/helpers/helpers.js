const formatTime = (check) => {
  let hours;
  let minutes;
  if (check.createdAt) {
    console.log('Time', check.createdAt);
    hours =
      check.createdAt.getHours() > 12
        ? check.createdAt.getHours() - 12
        : check.createdAt.getHours();
    hours = hours === 0 ? 12 : hours;
    minutes = check.createdAt.getMinutes();
    minutes = minutes < 10 ? '0' + minutes.toString() : minutes.toString();
    console.log(`Hours-Minutes ${hours}:${minutes}`);
  }
  return `${hours.toString()}:${minutes}`;
};

export default formatTime;
