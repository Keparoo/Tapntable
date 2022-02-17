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

export default formatTime;
